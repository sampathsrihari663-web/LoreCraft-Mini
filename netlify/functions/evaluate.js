/**
 * File: netlify/functions/evaluate.js
 * Netlify Serverless Function for LoreCraft AI Arbiter evaluation.
 * Securely calls Groq API using process.env.GROQ_API_KEY without exposing
 * the API key to the client browser or committing it to GitHub.
 */

exports.handler = async function (event, context) {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 503,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        error: "GROQ_API_KEY is not configured in Netlify environment variables.",
        code: "KEY_MISSING"
      })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { systemPrompt, userPrompt } = body;

    if (!systemPrompt || !userPrompt) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing required prompt payloads." })
      };
    }

    const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
    const models = ["openai/gpt-oss-120b", "openai/gpt-oss-20b"];

    let payload = null;
    let lastError = null;

    for (const modelToUse of models) {
      try {
        const response = await fetch(GROQ_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey.trim()}`
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

        if (!response.ok) {
          const errorText = await response.text();
          if (response.status === 404 || errorText.includes("model")) {
            lastError = errorText;
            continue;
          }
          return {
            statusCode: response.status,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: errorText
          };
        }

        payload = await response.json();
        break;
      } catch (err) {
        lastError = err.message;
      }
    }

    if (!payload) {
      return {
        statusCode: 502,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ error: `Groq evaluation failed: ${lastError}` })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(payload)
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: err.message })
    };
  }
};
