const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = 3000;

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://mjdbcmqftdfkonuolgbc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZGJjbXFmdGRma29udW9sZ2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNDc0MDEsImV4cCI6MjAzMTkyMzQwMX0.v-PIg3KmT8etL81Eq5H7Tmt7xzH5ZtEc-NDSO-9mofs"
);

app.get("/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select();

  if (error)
    return res
      .status(500)
      .send({ error: `Failed to fetch users: ${error.message}` });

  return res.status(200).send(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
