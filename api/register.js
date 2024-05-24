const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://mjdbcmqftdfkonuolgbc.supabase.co",
  "your-supabase-key"
);

async function checkUserExists(username) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data.length > 0;
}

module.exports = async (req, res) => {
  const { username, password, full_name, tests } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "Username and password are required" });
  }

  try {
    if (await checkUserExists(username)) {
      return res.status(400).send({ error: "User already exists" });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ username, password, full_name, tests }]);

    if (error)
      return res
        .status(500)
        .send({ error: `Failed to create user: ${error.message}` });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
