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

  try {
    const { data: usersData, error } = await supabase.from("users").select("id,username,full_name,tests,coach");

    if (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: `Failed to fetch users from supabase: ${error.message}`,
        }),
      };
    }

    let filteredUsersData = usersData.map(({ full_name, tests, coach }) => {
      let best_test
      for (const test of tests) {
        if (test["wpm"] && test["accuracy"] && test["accuracy"] >= 90 && !(test["wpm"] >= 200) && !(test["accuracy"] > 100)) {
          if (!best_test || test["wpm"] > best_test?.["wpm"]) {
            best_test = {
              wpm: test["wpm"],
              accuracy: test["accuracy"],
            }
          }
        }
      }

      return {
        full_name,
        best_test,
        coach
      }
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(filteredUsersData),
    };
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: `Failed to filter users: ${err.message}` }),
    };
  }
};
