const { createClient } = require("@supabase/supabase-js");

exports.handler = async function (event, context) {
  // Define the allowed origins
  const allowedOrigins = ["*"];

  // Create the Supabase client
  const supabase = createClient(
    "https://mjdbcmqftdfkonuolgbc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZGJjbXFmdGRma29udW9sZ2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNDc0MDEsImV4cCI6MjAzMTkyMzQwMX0.v-PIg3KmT8etL81Eq5H7Tmt7xzH5ZtEc-NDSO-9mofs"
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
    const { data, error } = await supabase.from("users").select();

    if (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: `Failed to fetch users: ${error.message}`,
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: `Failed to fetch users: ${err.message}` }),
    };
  }
};
