const { createClient } = require("@supabase/supabase-js");

exports.handler = async function (event, context) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  console.log(process.env.SUPABASE_URL);
  console.log(process.env.SUPABASE_KEY);
  
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
