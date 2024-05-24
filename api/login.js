const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://mjdbcmqftdfkonuolgbc.supabase.co",
  "your-supabase-key"
);

module.exports = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "Username and password are required" });
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("password", password);

  if (error)
    return res
      .status(500)
      .send({ error: `Failed to fetch users: ${error.message}` });

  if (data.length > 0) {
    return res.status(200).send(data);
  } else {
    return res.status(400).send({ error: "Invalid username or password" });
  }
};
