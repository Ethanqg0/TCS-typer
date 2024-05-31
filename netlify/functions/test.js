const { createClient } = require("@supabase/supabase-js");

exports.handler = async function (event, context) {

  // Define the allowed origins
  const allowedOrigins = ["*"];
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

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );



  try {
    const { username, wpm, accuracy } = JSON.parse(event.body);

    if (!username || !wpm || !accuracy) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Username, wpm, and accuracy are required",
        }),
      };
    }

    // Fetches the previous tests of the user
    const { data, error: fetchError } = await supabase
      .from("users")
      .select("tests")
      .eq("username", username)
      .single();

    if (fetchError) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch user's tests" }),
      };
    }

    let tests = data.tests || [];
    tests.push({ wpm, accuracy });

    const { error } = await supabase
      .from("users")
      .update({ tests: tests })
      .eq("username", username);

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to update user's tests" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Tests updated successfully" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Failed to process request: ${err.message}`,
      }),
    };
  }
};
