const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://mjdbcmqftdfkonuolgbc.supabase.co",
  "your-supabase-key"
);

module.exports = async (req, res) => {
  const { data, error } = await supabase.from("users").select();
  if (error)
    return res
      .status(500)
      .send({ error: `Failed to fetch users: ${error.message}` });

  return res.status(200).send(data);
};
