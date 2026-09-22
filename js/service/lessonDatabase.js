/**
 * File: js/service/lessonDatabase.js
 * Central lookup repository for all LoreCraft chamber teaching scrolls and trial questions.
 * Aggregates all 6 worlds (92 topics total):
 *  - Python (16 topics)
 *  - C# (16 topics)
 *  - C++ (16 topics)
 *  - HTML (14 topics)
 *  - CSS (14 topics)
 *  - JavaScript (16 topics)
 */

import { PYTHON_LESSONS } from "./lessons/pythonLessons.js";
import { CSHARP_LESSONS } from "./lessons/csharpLessons.js";
import { CPP_LESSONS } from "./lessons/cppLessons.js";
import { HTML_LESSONS } from "./lessons/htmlLessons.js";
import { CSS_LESSONS } from "./lessons/cssLessons.js";
import { JAVASCRIPT_LESSONS } from "./lessons/javascriptLessons.js";

// Combined map of all 92 lessons keyed by topic ID
const MASTER_LESSONS = {
  ...PYTHON_LESSONS,
  ...CSHARP_LESSONS,
  ...CPP_LESSONS,
  ...HTML_LESSONS,
  ...CSS_LESSONS,
  ...JAVASCRIPT_LESSONS
};

/**
 * Retrieves the full teaching lesson and 2 to 3 targeted questions for any topic.
 * @param {object|string} topicOrId - The topic object or topic ID string.
 * @returns {{lesson: {summary: string|string[], keyPoints: string[], codeExample: string}, questions: string[]}}
 */
export function getChamberLessonData(topicOrId) {
  const topicId = typeof topicOrId === "string" ? topicOrId : topicOrId?.id;
  const match = MASTER_LESSONS[topicId];

  if (match) {
    return {
      lesson: {
        summary: match.summary,
        keyPoints: match.keyPoints,
        codeExample: match.codeExample
      },
      questions: match.questions
    };
  }

  // Fallback for custom or newly added topics
  const title = (typeof topicOrId === "object" && topicOrId?.title) ? topicOrId.title : "Core Programming Concept";
  const desc = (typeof topicOrId === "object" && topicOrId?.description) ? topicOrId.description : "";
  const worldName = (typeof topicOrId === "object" && topicOrId?.world) ? topicOrId.world.toUpperCase() : "PROGRAMMING";
  const baseQuestion = (typeof topicOrId === "object" && topicOrId?.boss_question) 
    ? topicOrId.boss_question 
    : `Explain how ${title} works in ${worldName}.`;

  return {
    lesson: {
      summary: [
        `In this chamber, you master ${title}. ${desc}`,
        `Understanding how ${title} operates in ${worldName} allows you to write cleaner, more maintainable code and prevent runtime defects.`
      ],
      keyPoints: [
        `Core Definition: Understand the fundamental purpose and role of ${title}.`,
        `Syntax & Mechanics: Review standard usage conventions and common pitfalls to avoid.`,
        `Practical Application: Apply this concept to write modular, efficient software.`
      ],
      codeExample: `// ${worldName}: Demonstration of ${title}\n// Apply this wisdom to inscribe your answers below.`
    },
    questions: [
      `Foundational Concept: In your own words, what is the core purpose of ${title}?`,
      baseQuestion,
      `Practical Application: What is a key rule or common mistake to keep in mind when using ${title}?`
    ]
  };
}
