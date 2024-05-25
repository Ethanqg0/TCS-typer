const { createClient } = require("@supabase/supabase-js");

exports.handler = async function (event, context) {
  const supabase = createClient(
    "https://mjdbcmqftdfkonuolgbc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZGJjbXFmdGRma29udW9sZ2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNDc0MDEsImV4cCI6MjAzMTkyMzQwMX0.v-PIg3KmT8etL81Eq5H7Tmt7xzH5ZtEc-NDSO-9mofs"
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
