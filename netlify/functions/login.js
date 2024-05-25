const { createClient } = require("@supabase/supabase-js");

exports.handler = async function (event, context) {
  const supabase = createClient(
    "https://mjdbcmqftdfkonuolgbc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZGJjbXFmdGRma29udW9sZ2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNDc0MDEsImV4cCI6MjAzMTkyMzQwMX0.v-PIg3KmT8etL81Eq5H7Tmt7xzH5ZtEc-NDSO-9mofs"
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
