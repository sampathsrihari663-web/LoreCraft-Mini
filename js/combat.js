/**
 * File: js/combat.js
 * Responsibility: Controls the chamber learning and boss battle arena (views/combat.html).
 * Loads the topic lesson and 2 to 3 targeted questions via combatService.js.
 * Teaches the learner first with the Scroll of Knowledge, validates multi-question answers
 * using validationException.js, dispatches to groqService.js, and updates campaign progress.
 * Strictly manages DOM rendering and event listeners for the combat screen.
 */

import { fetchTopicBossBattle } from "./service/combatService.js";
import { gradePlayerAnswer } from "./service/groqService.js";
import { markTopicCompleted } from "./service/topicService.js";
import { qs, qsa, getUrlParam, escapeHTML } from "./utils.js";
import { handleApiError } from "../exception/apiException.js";
import { validateMultiCombatAnswers, ValidationException } from "../exception/validationException.js";

// Cached state for current combat battle
let currentTopicData = null;

/**
 * Renders the lesson lore and questions into the chamber page.
 * @param {object} battleData - The topic battle and lesson data.
 */
function renderChamber(battleData) {
  const worldName = (battleData.world || "Realm").toUpperCase();
  const tierName = battleData.tier_name || `Tier ${battleData.tier || 1}`;

  // 1. Render Lesson Panel ("Scroll of Knowledge")
  const realmBadgeEl = qs("#lesson-realm-badge");
  const lessonTitleEl = qs("#lesson-topic-title");
  const summaryEl = qs("#lesson-summary");
  const keypointsListEl = qs("#lesson-keypoints-list");
  const codeEl = qs("#lesson-code");

  if (realmBadgeEl) realmBadgeEl.textContent = `${worldName} — ${tierName}`;
  if (lessonTitleEl) lessonTitleEl.textContent = battleData.title;

  const lesson = battleData.lesson || {};
  if (summaryEl) {
    summaryEl.innerHTML = "";
    const paragraphs = Array.isArray(lesson.summary)
      ? lesson.summary
      : [lesson.summary || battleData.description || ""];
    paragraphs.forEach((pText) => {
      if (typeof pText === "string" && pText.trim()) {
        const p = document.createElement("p");
        p.className = "lesson-paragraph";
        p.textContent = pText.trim();
        summaryEl.appendChild(p);
      }
    });
  }

  if (keypointsListEl) {
    keypointsListEl.innerHTML = "";
    const points = lesson.keyPoints || [
      "Core Principle: Understand the conceptual foundations before attempting the trial.",
      "Practical Usage: Consider how this mechanic operates in actual code.",
      "Trial Advice: Inscribe your reasoning in your own words."
    ];
    points.forEach((pt) => {
      const li = document.createElement("li");
      const colonIndex = pt.indexOf(":");
      if (colonIndex > 0) {
        const strong = document.createElement("strong");
        strong.textContent = pt.slice(0, colonIndex + 1);
        li.appendChild(strong);
        li.appendChild(document.createTextNode(pt.slice(colonIndex + 1)));
      } else {
        li.textContent = pt;
      }
      keypointsListEl.appendChild(li);
    });
  }

  if (codeEl) {
    codeEl.textContent = lesson.codeExample || `// ${worldName}: Key demonstration of ${battleData.title}`;
  }

  // 2. Render Trial Header
  const chamberLabelEl = qs("#chamber-label");
  const combatTitleEl = qs("#combat-topic-title");

  if (chamberLabelEl) {
    chamberLabelEl.textContent = `${worldName} Guardian Trial — ${tierName}`;
  }
  if (combatTitleEl) {
    combatTitleEl.textContent = `Guardian's Trial: ${battleData.title}`;
  }

  // 3. Render 2 to 3 Question Cards Dynamically
  const questionsContainer = qs("#questions-container");
  if (questionsContainer) {
    questionsContainer.innerHTML = "";
    const questions = battleData.questions || [battleData.question];

    questions.forEach((qText, idx) => {
      const qNum = idx + 1;
      const totalQ = questions.length;

      const card = document.createElement("div");
      card.className = "question-card";
      card.setAttribute("data-question-index", String(qNum));

      card.innerHTML = `
        <div class="question-card-header">
          <span class="question-number-badge">Question ${qNum} of ${totalQ}</span>
        </div>
        <p class="question-prompt-text">${escapeHTML(qText)}</p>
        <label for="answer-${qNum}" class="combat-label">Inscribe Your Answer:</label>
        <textarea
          id="answer-${qNum}"
          name="answer-${qNum}"
          class="combat-textarea"
          rows="3"
          placeholder="Inscribe your answer (even a short phrase or in your own words)..."
          aria-label="Answer for Question ${qNum}"
          required
        ></textarea>
      `;

      questionsContainer.appendChild(card);
    });
  }

  // 4. Update Navigation return links so player returns to the correct world map
  const targetWorld = battleData.world || "python";
  const returnUrl = `index.html?world=${encodeURIComponent(targetWorld)}`;

  const backLink = qs(".back-link");
  if (backLink) backLink.href = returnUrl;

  const returnMapBtn = qs(".btn-return-map");
  if (returnMapBtn) returnMapBtn.href = returnUrl;
}

/**
 * Displays an inline validation error message beneath the form.
 * @param {string} message - Validation error text.
 */
function showValidationError(message) {
  const errorEl = qs("#answer-validation-error");
  if (!errorEl) return;

  errorEl.textContent = message;
  errorEl.classList.add("visible");
}

/**
 * Clears any visible validation error message.
 */
function clearValidationError() {
  const errorEl = qs("#answer-validation-error");
  if (!errorEl) return;

  errorEl.textContent = "";
  errorEl.classList.remove("visible");
}

/**
 * Reveals the wax stamped-seal grade badge and verdict calmly inline in the parchment scroll.
 * @param {object} gradeResult - Result object from groqService containing { grade, isPassing, verdict }.
 */
/**
 * Reveals the wax stamped-seal grade badge, verdict, and per-question ratings, suggestions, and corrections.
 * @param {object} gradeResult - Result object from groqService containing { grade, isPassing, verdict, questionsFeedback }.
 * @param {Array<{question: string, answer: string, index: number}>} [answersList=[]] - The player's submitted answers.
 */
function displayGradeSeal(gradeResult, answersList = []) {
  const container = qs("#grade-container");
  const badge = qs("#seal-badge");
  const verdictEl = qs("#grade-verdict");
  const feedbackContainer = qs("#feedback-cards-container");

  if (!container || !badge || !verdictEl) return;

  container.hidden = false;
  badge.textContent = gradeResult.grade;

  badge.className = "seal-badge";
  const gradeLower = gradeResult.grade.toLowerCase();
  badge.classList.add(`seal-grade-${gradeLower}`);

  verdictEl.textContent = gradeResult.verdict;

  // Render per-question rating, suggestion, and correction cards
  if (feedbackContainer) {
    feedbackContainer.innerHTML = "";
    const feedbackItems = gradeResult.questionsFeedback || [];

    feedbackItems.forEach((fb, idx) => {
      const qNum = fb.questionIndex || (idx + 1);
      const answerObj = answersList && answersList[idx] ? answersList[idx] : null;
      const questionPrompt = answerObj?.question || `Question ${qNum}`;
      const playerAnswer = answerObj?.answer || "(No answer recorded)";

      const card = document.createElement("div");
      card.className = "counsel-feedback-card";

      // Rating classification and icon
      const ratingLower = (fb.rating || "partially").toLowerCase();
      let badgeClass = "rating-badge-partial";
      let badgeIcon = "⚠️";
      let ratingText = fb.rating || "Partially Correct";

      if (ratingLower.includes("correct") && !ratingLower.includes("partial") && !ratingLower.includes("in")) {
        badgeClass = "rating-badge-correct";
        badgeIcon = "✅";
        ratingText = "Correct";
      } else if (ratingLower.includes("incorrect") || ratingLower.includes("wrong")) {
        badgeClass = "rating-badge-incorrect";
        badgeIcon = "❌";
        ratingText = "Needs Correction";
      }

      card.innerHTML = `
        <div class="counsel-card-header">
          <span class="counsel-q-number">Question ${qNum}</span>
          <span class="counsel-rating-badge ${badgeClass}">${badgeIcon} ${escapeHTML(ratingText)}</span>
        </div>
        <p class="counsel-q-prompt"><strong>Prompt:</strong> ${escapeHTML(questionPrompt)}</p>
        <div class="counsel-student-answer">
          <span class="counsel-field-label">Your Inscription:</span>
          <span class="counsel-field-val">"${escapeHTML(playerAnswer)}"</span>
        </div>
        <div class="counsel-suggestion-box">
          <span class="counsel-field-label">💡 Arbiter's Suggestion:</span>
          <p class="counsel-field-text">${escapeHTML(fb.suggestion || "Solid effort inscribed.")}</p>
        </div>
        <div class="counsel-correction-box">
          <span class="counsel-field-label">⚔️ How to Fix & Perfect It:</span>
          <p class="counsel-field-text">${escapeHTML(fb.correction || "Review the lesson scroll above.")}</p>
        </div>
      `;

      feedbackContainer.appendChild(card);
    });
  }

  requestAnimationFrame(() => {
    container.classList.add("revealed");
    container.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/**
 * Handles the combat answer form submission across all 2-3 questions.
 * @param {Event} event - Form submit event.
 */
async function handleCombatSubmit(event) {
  event.preventDefault();
  clearValidationError();

  const form = qs("#combat-form");
  const submitButton = qs("#btn-submit-answer");
  const textareas = qsa(".combat-textarea", form);

  // Collect answers for all questions
  const questionsList = currentTopicData?.questions || [currentTopicData?.question || ""];
  const answersList = textareas.map((ta, idx) => ({
    question: questionsList[idx] || `Question ${idx + 1}`,
    answer: ta.value,
    index: idx + 1
  }));

  // 1. Validate all answers BEFORE calling external service
  let validAnswers;
  try {
    validAnswers = validateMultiCombatAnswers(answersList);
  } catch (err) {
    if (err instanceof ValidationException) {
      showValidationError(err.message);
      // Focus the first invalid field
      const emptyIdx = answersList.findIndex((item) => !item.answer.trim());
      if (emptyIdx !== -1 && textareas[emptyIdx]) {
        textareas[emptyIdx].focus();
      }
      return;
    }
    throw err;
  }

  // 2. Lock UI while consulting the Arbiter
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Consulting the Arbiter...";
  }
  textareas.forEach((ta) => {
    ta.disabled = true;
  });

  try {
    // 3. Dispatch to groqService for AI evaluation across all answers
    const gradeResult = await gradePlayerAnswer(validAnswers);

    // 4. Reveal the wax stamp grade result inline along with per-question ratings and corrections
    displayGradeSeal(gradeResult, validAnswers);

    // 5. If grade is passing, update topic completion in Supabase
    if (gradeResult.isPassing && currentTopicData?.id) {
      try {
        await markTopicCompleted(currentTopicData.id);
      } catch (saveError) {
        console.warn("[LoreCraft] Could not save progress to database:", saveError.message);
      }
    }

    // Update submit button text to reflect final state
    if (submitButton) {
      submitButton.textContent = gradeResult.isPassing
        ? "Trial Concluded"
        : "Trial Failed — Review Corrections & Retry";
      if (!gradeResult.isPassing) {
        submitButton.disabled = false;
        textareas.forEach((ta) => {
          ta.disabled = false;
        });
      }
    }
  } catch (rawError) {
    const apiError = handleApiError(
      rawError,
      "The Combat Arbiter could not evaluate your answers. Please try again."
    );
    showValidationError(apiError.userFriendlyMessage);

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Answers to Arbiter";
    }
    textareas.forEach((ta) => {
      ta.disabled = false;
    });
  }
}

/**
 * Initializes the chamber view on page load.
 */
async function initializeCombat() {
  const topicId = getUrlParam("topic");

  if (!topicId) {
    const titleEl = qs("#combat-topic-title");
    if (titleEl) {
      titleEl.innerHTML = `
        Chamber Coordinate Missing.<br>
        <a href="index.html" class="back-link" style="margin-top: 1rem; display: inline-block;">Return to Campaign Map</a>
      `;
    }
    const form = qs("#combat-form");
    if (form) form.style.display = "none";
    const lessonPanel = qs("#lesson-panel");
    if (lessonPanel) lessonPanel.style.display = "none";
    return;
  }

  try {
    // Load boss question and lesson data through combatService
    currentTopicData = await fetchTopicBossBattle(topicId);
    renderChamber(currentTopicData);

    const form = qs("#combat-form");
    if (form) {
      form.addEventListener("submit", handleCombatSubmit);
    }
  } catch (rawError) {
    const apiError = handleApiError(
      rawError,
      "Could not reach this dungeon chamber. It may be sealed or inaccessible."
    );
    const titleEl = qs("#combat-topic-title");
    if (titleEl) titleEl.textContent = apiError.userFriendlyMessage;

    const form = qs("#combat-form");
    if (form) form.style.display = "none";
  }
}

// Kick off combat view initialization on DOM load
document.addEventListener("DOMContentLoaded", initializeCombat);
