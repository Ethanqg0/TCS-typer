const { createClient } = require("@supabase/supabase-js");

exports.handler = async function (event, context) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  try {
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return {
        statusCode: 400,
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
        body: JSON.stringify({
          error: `Failed to fetch users: ${error.message}`,
        }),
      };
    }

    if (data.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid username or password" }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to fetch users: ${err.message}` }),
    };
  }
};
