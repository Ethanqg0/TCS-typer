const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://mjdbcmqftdfkonuolgbc.supabase.co",
  "your-supabase-key"
);

module.exports = async (req, res) => {
  const { username, wpm, accuracy } = req.body;

  if (!username || !wpm || !accuracy) {
    return res
      .status(400)
      .send({ error: "Username, wpm and accuracy are required" });
  }

  const { data, error: fetchError } = await supabase
    .from("users")
    .select("tests")
    .eq("username", username)
    .single();

  if (fetchError) {
    return res.status(500).send({ error: "Failed to fetch user's tests" });
  }

  let tests = data.tests || [];
  tests.push({ wpm, accuracy });

  const { error } = await supabase
    .from("users")
    .update({ tests })
    .eq("username", username);

  if (error) {
    return res.status(500).send({ error: "Failed to update user's tests" });
  }

  return res.status(200).send({ message: "Tests updated successfully" });
};
