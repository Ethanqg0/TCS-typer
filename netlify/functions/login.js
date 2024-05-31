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
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Username and password are required" }),
      };
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password);

    if (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: `Failed to fetch users: ${error.message}`,
        }),
      };
    }

    if (data.length > 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid username or password" }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: `Failed to fetch users: ${err.message}` }),
    };
  }
};
