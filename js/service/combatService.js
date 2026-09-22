/**
 * File: js/service/combatService.js
 * Responsibility: Handles combat-specific data operations, specifically loading
 * the boss question for a selected topic across any world and tier.
 * Communicates with Supabase or demo storage. Never touches the DOM.
 */

import { getSupabaseClient, isSupabaseConfigured, SCHEMA } from "./supabaseConfig.js";
import { ApiException, handleApiError } from "../../exception/apiException.js";
import { findTopicById, getTopicLessonAndQuestions } from "./topicService.js";

/**
 * Fetches the boss battle information (title, description, lesson, questions, world, tier) for a given topic ID.
 * @param {string|number} topicId - The ID of the topic to fight.
 * @returns {Promise<object>} Object containing topic title, description, lesson, questions, world, and tier.
 * @throws {ApiException} If the topic cannot be found or the database query errors.
 */
export async function fetchTopicBossBattle(topicId) {
  if (!topicId) {
    throw new ApiException(
      "Missing topic identifier.",
      "No dungeon coordinate was provided. Return to the map to choose a quest."
    );
  }

  try {
    const match = await findTopicById(topicId);
    if (!match) {
      throw new ApiException(
        `Topic ${topicId} not found in syllabus.`,
        "This dungeon chamber could not be found on the campaign map."
      );
    }

    const { lesson, questions } = getTopicLessonAndQuestions(match);

    return {
      id: match.id,
      world: match.world || "python",
      tier: match.tier || 1,
      tier_name: match.tier_name || "Foundations",
      title: match.title,
      description: match.description,
      question: match.boss_question,
      lesson,
      questions,
      status: match.status
    };
  } catch (err) {
    throw handleApiError(err, "Failed to load boss trial details from the realm archives.");
  }
}
