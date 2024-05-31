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
    const { username, password, full_name, tests } = JSON.parse(event.body);

    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Username and password are required" }),
      };
    }

    const userExists = await checkUserExists(username, supabase);

    if (userExists) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "User already exists" }),
      };
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ username, password, full_name, tests }]);

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: `Failed to create user: ${error.message}`,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to create user: ${err.message}` }),
    };
  }
};

async function checkUserExists(username, supabase) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    return data.length > 0;
  } catch (err) {
    throw new Error(`Failed to check user existence: ${err.message}`);
  }
}
