/**
 * File: js/service/groqService.js
 * Responsibility: Evaluates player combat explanations using Groq's Chat Completions API.
 * In production on Netlify, it proxies requests through the secure Netlify Serverless Function
 * (/.netlify/functions/evaluate) which reads process.env.GROQ_API_KEY without exposing it in the client.
 * For local development, it can also read a key from localStorage or use the built-in simulated Arbiter.
 */

import { ApiException, handleApiError } from "../../exception/apiException.js";

// ----------------------------------------------------------------------------
// ENDPOINTS & CONFIGURATION
// ----------------------------------------------------------------------------
const NETLIFY_FUNCTION_ENDPOINT = "/.netlify/functions/evaluate";
const DIRECT_GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
export const GROQ_MODEL = "openai/gpt-oss-120b";
const FALLBACK_MODELS = ["openai/gpt-oss-120b", "openai/gpt-oss-20b"];

/**
 * Retrieves the local Groq API key from localStorage if provided by user.
 * @returns {string}
 */
export function getLocalGroqKey() {
  if (typeof localStorage !== "undefined") {
    return (localStorage.getItem("lorecraft_groq_api_key") || "").trim();
  }
  return "";
}

/**
 * Sets or removes the local Groq API key in localStorage.
 * @param {string} key - API key starting with gsk_
 */
export function setLocalGroqKey(key) {
  if (typeof localStorage !== "undefined") {
    if (key && key.trim()) {
      localStorage.setItem("lorecraft_groq_api_key", key.trim());
    } else {
      localStorage.removeItem("lorecraft_groq_api_key");
    }
  }
}

/**
 * Checks if Groq is available either through Netlify function or local key.
 * @returns {boolean}
 */
export function isGroqConfigured() {
  return true;
}

/**
 * Offline fallback evaluator used if network is unavailable or function is offline.
 * Analyzes the player's answers and provides an authentic encouraging grade,
 * respecting short answers in the player's own words.
 * @param {Array<{question: string, answer: string}>|string} questionOrList - Trial questions or list.
 * @param {string} [playerAnswer] - Answer string if passed as dual arguments.
 * @returns {object} Simulated grade result.
 */
function simulateArbiterEvaluation(questionOrList, playerAnswer) {
  console.info(
    "[LoreCraft] Using simulated Arbiter grading. Groq evaluation active on Netlify or when local key set."
  );

  const items = Array.isArray(questionOrList)
    ? questionOrList
    : [{ question: questionOrList, answer: playerAnswer, index: 1 }];

  let correctCount = 0;
  const questionsFeedback = items.map((item, idx) => {
    const qNum = idx + 1;
    const ans = (item.answer || "").trim();
    const words = ans.split(/\s+/).filter(Boolean).length;

    if (words >= 3) {
      correctCount++;
      return {
        questionIndex: qNum,
        rating: "Correct",
        suggestion: "Sound explanation of the fundamental rule inscribed.",
        correction: "Your understanding aligns with the manuscript lore. Keep this logic close."
      };
    } else if (words >= 1) {
      correctCount += 0.5;
      return {
        questionIndex: qNum,
        rating: "Partially Correct",
        suggestion: "You captured the basic keyword or concept.",
        correction: "To master this rune, expand on the practical context and mechanics next time."
      };
    } else {
      return {
        questionIndex: qNum,
        rating: "Incorrect",
        suggestion: "Review the Scroll of Knowledge manuscript above.",
        correction: "Ensure you define the syntax rules clearly before attempting the trial."
      };
    }
  });

  const ratio = correctCount / items.length;
  let grade = "C";
  let verdict = "A worthy effort! You passed the chamber trial.";
  let isPassing = true;

  if (ratio >= 0.85) {
    grade = "S";
    verdict = "Flawless comprehension across all questions! You mastered this chamber's lore.";
  } else if (ratio >= 0.7) {
    grade = "A";
    verdict = "Strong command of the core principles demonstrated.";
  } else if (ratio >= 0.5) {
    grade = "B";
    verdict = "Solid grasp of the foundations. Continue honing your knowledge.";
  } else if (ratio >= 0.3) {
    grade = "C";
    verdict = "Acceptable inscription. Review the suggested fixes to deepen your mastery.";
  } else {
    grade = "D";
    verdict = "The runes resist your inscription. Review the scroll and retry!";
    isPassing = false;
  }

  return {
    grade,
    isPassing,
    verdict,
    questionsFeedback
  };
}

/**
 * Parses and sanitizes the JSON output returned from the AI model.
 * @param {string} rawContent - Raw text content from the completion.
 * @returns {object} Cleaned evaluation result object.
 */
function parseEvaluationPayload(rawContent) {
  let parsedResult;
  try {
    parsedResult = JSON.parse(rawContent);
  } catch {
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsedResult = JSON.parse(jsonMatch[0]);
    } else {
      throw new ApiException(
        "Failed to parse Arbiter verdict JSON.",
        "The Arbiter's decree was illegible. Try submitting your answer again."
      );
    }
  }

  const validGrades = ["S", "A", "B", "C", "D"];
  const grade = (parsedResult.grade || "C").toUpperCase();
  const cleanGrade = validGrades.includes(grade) ? grade : "C";
  const isPassing = typeof parsedResult.isPassing === "boolean"
    ? parsedResult.isPassing
    : cleanGrade !== "D";
  const verdict = parsedResult.verdict || "Your answer has been weighed by the Arbiter.";

  const rawFeedback = Array.isArray(parsedResult.questionsFeedback)
    ? parsedResult.questionsFeedback
    : [];

  const questionsFeedback = rawFeedback.map((fb, idx) => ({
    questionIndex: fb.questionIndex || (idx + 1),
    rating: fb.rating || "Partially Correct",
    suggestion: fb.suggestion || "Good effort inscribed.",
    correction: fb.correction || "Review the lesson scroll above for the canonical syntax."
  }));

  return {
    grade: cleanGrade,
    isPassing,
    verdict,
    questionsFeedback
  };
}

/**
 * Grades the player's multi-question combat answers using Groq AI.
 * First queries the secure Netlify Serverless Function (production).
 * If running locally without Netlify CLI, checks for a direct local key or simulated Arbiter.
 *
 * @param {Array<{question: string, answer: string, index?: number}>|string} questionOrList - List of questions with answers.
 * @param {string} [playerAnswer] - Single answer string (if using legacy single question call).
 * @returns {Promise<{grade: string, isPassing: boolean, verdict: string, questionsFeedback: Array<object>}>}
 */
export async function gradePlayerAnswer(questionOrList, playerAnswer) {
  const systemPrompt = `You are the ancient Combat Arbiter for LoreCraft, an RPG educational fantasy game where students confront dungeon bosses by mastering programming concepts.

CRITICAL PEDAGOGICAL INSTRUCTIONS:
1. The student just read a lesson and is answering 2 to 3 targeted questions about it.
2. Even if the answer is concise, written in informal speech, in keywords, or in the student's own native language / vernacular (e.g. Hindi, Hinglish, informal English), evaluate whether the CORE UNDERLYING CONCEPT is factually correct.
3. For EVERY question evaluated:
   - Provide an individual rating: "Correct", "Partially Correct", or "Incorrect".
   - Provide an encouraging "suggestion" on what they got right or how to think about it.
   - Provide an explicit "correction" explaining the correct concept and fixing any misconception if they were wrong or incomplete.
4. Scale:
   - S: Outstanding, accurate across questions.
   - A: Strong grasp, minor missing detail.
   - B: Good attempt, understood main points.
   - C: Minimally passing, partial understanding.
   - D: Factually wrong, fundamentally flawed, or nonsensical gibberish.

You MUST respond strictly with a single valid JSON object in this exact schema:
{
  "grade": "S" | "A" | "B" | "C" | "D",
  "isPassing": true | false,
  "verdict": "Single concise sentence (max 20 words) giving encouraging feedback on their overall trial.",
  "questionsFeedback": [
    {
      "questionIndex": 1,
      "rating": "Correct" | "Partially Correct" | "Incorrect",
      "suggestion": "Encouraging analysis and advice on their answer.",
      "correction": "Clear explanation of the correct answer and how to fix any misconception."
    }
  ]
}`;

  let userPrompt = "";
  if (Array.isArray(questionOrList)) {
    userPrompt = "TRIAL QUESTIONS AND STUDENT ANSWERS:\n\n";
    questionOrList.forEach((item, idx) => {
      userPrompt += `QUESTION ${idx + 1}:\n${item.question}\n\nSTUDENT'S ANSWER ${idx + 1}:\n${item.answer}\n\n---\n\n`;
    });
    userPrompt += "Evaluate the student's collective answers (rate each question, give suggestions, and fix any mistakes) and return ONLY the JSON object.";
  } else {
    userPrompt = `BOSS QUESTION:\n${questionOrList}\n\nPLAYER'S ANSWER:\n${playerAnswer}\n\nEvaluate the answer and return ONLY the JSON object.`;
  }

  // 1. Attempt call via secure Netlify Serverless Function (Production on Netlify)
  try {
    const netlifyResp = await fetch(NETLIFY_FUNCTION_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt, userPrompt })
    });

    if (netlifyResp.ok) {
      const payload = await netlifyResp.json();
      const rawContent = payload?.choices?.[0]?.message?.content;
      if (rawContent) {
        return parseEvaluationPayload(rawContent);
      }
    }
  } catch {
    // If not running on Netlify or serverless endpoint is offline, proceed to fallback
  }

  // 2. Attempt direct call if user set a local key in localStorage (e.g. for localhost testing)
  const localKey = getLocalGroqKey();
  if (localKey && localKey.startsWith("gsk_")) {
    for (const modelToUse of FALLBACK_MODELS) {
      try {
        const response = await fetch(DIRECT_GROQ_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localKey}`
          },
          body: JSON.stringify({
            model: modelToUse,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt }
            ],
            temperature: 0.2,
            response_format: { type: "json_object" }
          })
        });

        if (response.ok) {
          const payload = await response.json();
          const rawContent = payload?.choices?.[0]?.message?.content;
          if (rawContent) {
            return parseEvaluationPayload(rawContent);
          }
        }
      } catch {
        // continue
      }
    }
  }

  // 3. Simulated Arbiter fallback (Offline / Demo resiliency)
  return simulateArbiterEvaluation(questionOrList, playerAnswer);
}
