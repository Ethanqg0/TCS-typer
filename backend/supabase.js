const express = require("express");
const cors = require("cors")
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());
app.use(cors())
const port = 3000;

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://mjdbcmqftdfkonuolgbc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZGJjbXFmdGRma29udW9sZ2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNDc0MDEsImV4cCI6MjAzMTkyMzQwMX0.v-PIg3KmT8etL81Eq5H7Tmt7xzH5ZtEc-NDSO-9mofs"
);

// checks if user already exists
async function checkUserExists(username) {
  const { data, error } = await supabase
  .from("users")
  .select("*")
  .eq("username", username);

  if (error)
    return res
      .status(500)
      .send({ error: `Failed to fetch users: ${error.message}` });

  if (data.length > 0) {
    return true;
  } else {
    return false;
  }
} 

app.get("/users", async function(req, res) {
  const { data, error } = await supabase.from("users").select();

  if (error)
    return res
      .status(500)
      .send({ error: `Failed to fetch users: ${error.message}` });

  return res.status(200).send(data);
});

app.get("/tests", async function(req, res) {
  const { data, error } = await supabase
  .from("tests")
  .select("*")
  .gte("accuracy", 90);

  if (error)
    return res
      .status(500)
      .send({ error: `Failed to fetch tests: ${error.message}` });

  return res.status(200).send(data);
});

// From the frontend
app.post("/register", async function(req, res) {
  const { username, password } = req.body;

  if ( !username || !password ) {
    return res.status(400).send({ error: "Username and password are required" });
  }

  if (await checkUserExists(username)) {
    return res.status(400).send({ error: "User already exists" });
  }

  const { data, error } = await supabase.from("users").insert([
    { "username": username, 
      "password": password },
  ]);

  if (error)
    return res
      .status(500)
      .send({ error: `Failed to create user: ${error.message}` });

  return res.status(200).send(data);
});

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
