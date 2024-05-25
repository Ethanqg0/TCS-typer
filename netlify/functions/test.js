const { createClient } = require("@supabase/supabase-js");

exports.handler = async function (event, context) {
  const supabase = createClient(
    "https://mjdbcmqftdfkonuolgbc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZGJjbXFmdGRma29udW9sZ2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNDc0MDEsImV4cCI6MjAzMTkyMzQwMX0.v-PIg3KmT8etL81Eq5H7Tmt7xzH5ZtEc-NDSO-9mofs"
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
