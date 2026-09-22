/**
 * File: exception/validationException.js
 * Responsibility: Custom exception class and validation routines for user input.
 * Ensures player answers meet minimum substance requirements before triggering API calls to Groq.
 * Supports single answers and multi-question chamber trials (2-3 questions).
 */

/**
 * ValidationException represents errors caused by invalid or incomplete user input.
 */
export class ValidationException extends Error {
  /**
   * Creates a new ValidationException.
   * @param {string} message - Description of the validation failure for the user.
   * @param {string|number} [fieldName=""] - The input field or question index associated with this error.
   */
  constructor(message, fieldName = "") {
    super(message);
    this.name = "ValidationException";
    this.fieldName = fieldName;
  }
}

/**
 * Validates a single combat answer string.
 * Allows short and concise answers while ensuring the field is not left blank.
 * @param {string} answerText - The raw text entered by the player.
 * @param {string} [questionLabel="answer"] - Descriptive name of the question for error messages.
 * @returns {string} The trimmed valid answer.
 * @throws {ValidationException} If answer is blank.
 */
export function validateCombatAnswer(answerText, questionLabel = "answer") {
  const trimmed = typeof answerText === "string" ? answerText.trim() : "";

  if (!trimmed || trimmed.length === 0) {
    throw new ValidationException(
      `Your scroll is blank for ${questionLabel}. Inscribe your answer before confronting the Arbiter.`,
      questionLabel
    );
  }

  return trimmed;
}

/**
 * Validates an array of player answers for a multi-question chamber trial (2-3 questions).
 * @param {Array<{question: string, answer: string, index: number}>} answersList - List of question/answer pairs.
 * @returns {Array<{question: string, answer: string, index: number}>} Validated answers with trimmed text.
 * @throws {ValidationException} If any question is left empty or too short.
 */
export function validateMultiCombatAnswers(answersList) {
  if (!answersList || !Array.isArray(answersList) || answersList.length === 0) {
    throw new ValidationException("No trial answers were submitted.", "general");
  }

  const validatedList = [];

  for (let i = 0; i < answersList.length; i++) {
    const item = answersList[i];
    const qNumber = i + 1;
    const label = `Question ${qNumber}`;

    const trimmed = validateCombatAnswer(item.answer, label);
    validatedList.push({
      question: item.question,
      answer: trimmed,
      index: qNumber
    });
  }

  return validatedList;
}
