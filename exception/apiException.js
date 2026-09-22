/**
 * File: exception/apiException.js
 * Responsibility: Custom exception class for API, database (Supabase), and network errors.
 * Formats errors into friendly, user-readable messages suitable for display on the campaign UI.
 */

/**
 * ApiException represents any network, Supabase, or external AI API failure.
 * Extends the native Error class to preserve stack traces while adding user-facing details.
 */
export class ApiException extends Error {
  /**
   * Creates a new ApiException.
   * @param {string} message - Technical error message or system detail.
   * @param {string} [userFriendlyMessage] - Simplified message safe and clear for the player.
   * @param {number|string} [statusCode] - Optional HTTP status code or Supabase error code.
   */
  constructor(message, userFriendlyMessage = "The archives could not be reached. Check your connection or arcane credentials.", statusCode = null) {
    // Call parent Error constructor with the technical message
    super(message);
    this.name = "ApiException";
    this.userFriendlyMessage = userFriendlyMessage;
    this.statusCode = statusCode;
  }
}

/**
 * Wraps unknown caught errors into a guaranteed ApiException instance.
 * @param {unknown} err - The caught error object or value.
 * @param {string} fallbackUserMessage - Friendly message if none can be deduced.
 * @returns {ApiException} A normalized ApiException ready to throw or display.
 */
export function handleApiError(err, fallbackUserMessage) {
  // If it's already an ApiException, we don't need to re-wrap it
  if (err instanceof ApiException) {
    return err;
  }

  // Extract message from standard Error or Supabase error payload
  const technicalMessage = err?.message || String(err);
  const code = err?.status || err?.code || null;

  // Provide guidance if the error relates to invalid API keys or offline status
  let userMessage = fallbackUserMessage;
  if (technicalMessage.includes("Failed to fetch") || technicalMessage.includes("NetworkError")) {
    userMessage = "Network connection failed. The realm cannot reach the server.";
  } else if (technicalMessage.includes("JWT") || technicalMessage.includes("apikey") || code === 401 || code === 403) {
    userMessage = "Authentication failed. Please verify your Supabase anon key or Groq API key.";
  }

  return new ApiException(technicalMessage, userMessage, code);
}
