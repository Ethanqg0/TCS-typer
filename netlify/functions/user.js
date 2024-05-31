const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv").config()

exports.handler = async function (event, context) {
  // Define the allowed origins
  const allowedOrigins = ["*"];

  // Create the Supabase client
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  // Define the response headers with CORS headers
  const headers = {
    "Access-Control-Allow-Origin": allowedOrigins.join(","),
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: "",
    };
  }

  let requestUsername = "tcswc_egutierrez"

  if (!requestUsername) return {
    statusCode: 500,
    headers,
    body: JSON.stringify({ error: `No username provided.` }),
  };

  try {
    const { data: usersData, error } = await supabase.from("users").select().eq("username", requestUsername);

    if (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: `Failed to fetch users from supabase: ${error.message}`,
        }),
      };
    }

    if (!usersData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify("No user data."),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(usersData),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: `Failed to filter users: ${err.message}` }),
    };
  }
};
