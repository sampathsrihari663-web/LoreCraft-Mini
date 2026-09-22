/**
 * File: js/service/supabaseConfig.js
 * Responsibility: Initializes the Supabase client using the global CDN script
 * (https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2) and defines your
 * database table and column name mappings.
 *
 * ============================================================================
 * INSTRUCTIONS FOR USER:
 * 1. Replace SUPABASE_URL and SUPABASE_ANON_KEY below with your actual project
 *    credentials from your Supabase dashboard (Project Settings -> API).
 * 2. Update the SCHEMA object below to match your real database table and
 *    column names. Do not change the variable names on the left; only edit
 *    the strings on the right to match your database.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. SUPABASE PROJECT CREDENTIALS (REPLACE THESE PLACEHOLDERS)
// ----------------------------------------------------------------------------
export const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL_HERE";
export const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY_HERE";

// ----------------------------------------------------------------------------
// 2. DATABASE SCHEMA MAPPING (REPLACE VALUES WITH YOUR REAL TABLE & COLUMN NAMES)
// ----------------------------------------------------------------------------
/**
 * Expected Schema Reference:
 * - TABLE_TOPICS: The table storing your campaign map locations/topics.
 *   - COL_TOPIC_ID: Primary key column (e.g. 'id' or 'topic_id')
 *   - COL_TOPIC_TITLE: Name of the topic/dungeon node (e.g. 'title' or 'name')
 *   - COL_TOPIC_DESCRIPTION: Short flavor text or summary (e.g. 'description')
 *   - COL_TOPIC_ORDER: Numeric sequence for ordering along the path (e.g. 'order_index' or 'sequence')
 *   - COL_TOPIC_STATUS: Status indicating locked/unlocked/completed (e.g. 'status' or 'state')
 *   - COL_BOSS_QUESTION: The open-ended question asked in combat (e.g. 'boss_question' or 'prompt')
 *   - COL_IS_COMPLETED: Boolean or flag column marking completion (e.g. 'is_completed')
 */
export const SCHEMA = {
  TABLE_TOPICS: "topics", // Placeholder: replace with your topics table name
  COL_TOPIC_ID: "id", // Placeholder: primary key column name
  COL_TOPIC_WORLD: "world", // Placeholder: world/language identifier ('python', 'csharp', etc.)
  COL_TOPIC_TIER: "tier", // Placeholder: numeric tier (1, 2, 3)
  COL_TOPIC_TIER_NAME: "tier_name", // Placeholder: tier label ('Foundations', 'Core', 'Advanced')
  COL_TOPIC_TITLE: "title", // Placeholder: topic title column name
  COL_TOPIC_DESCRIPTION: "description", // Placeholder: topic description column name
  COL_TOPIC_ORDER: "order_index", // Placeholder: sequence/order column name
  COL_TOPIC_STATUS: "status", // Placeholder: status column ('locked', 'unlocked', 'completed')
  COL_BOSS_QUESTION: "boss_question", // Placeholder: boss battle prompt column name
  COL_IS_COMPLETED: "is_completed" // Placeholder: completion boolean column name
};

// Cached Supabase client instance so we don't recreate it on every call
let cachedClient = null;

/**
 * Checks whether the user has replaced the default placeholder credentials.
 * @returns {boolean} True if real credentials appear to be configured.
 */
export function isSupabaseConfigured() {
  const isUrlSet = SUPABASE_URL && SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL_HERE";
  const isKeySet = SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY_HERE";
  return Boolean(isUrlSet && isKeySet);
}

/**
 * Returns the initialized Supabase client instance.
 * Reads window.supabase provided by the CDN script tag in the HTML files.
 * @returns {object|null} The initialized Supabase client or null if not configured.
 */
export function getSupabaseClient() {
  if (cachedClient) {
    return cachedClient;
  }

  // Verify that the CDN script has finished loading before attempting to create client
  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    console.warn(
      "[LoreCraft] Supabase CDN script (window.supabase) is not loaded on this page yet."
    );
    return null;
  }

  // If user hasn't supplied credentials yet, log a helpful notice and return null
  if (!isSupabaseConfigured()) {
    console.info(
      "[LoreCraft] Using offline demo mode. To connect your live Supabase database, paste your URL and anon key into js/service/supabaseConfig.js."
    );
    return null;
  }

  // Initialize and cache the real Supabase client
  cachedClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return cachedClient;
}
