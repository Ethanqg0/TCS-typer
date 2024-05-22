const { createClient } = require("@supabase/supabase-js");


// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://mjdbcmqftdfkonuolgbc.supabase.co/",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZGJjbXFmdGRma29udW9sZ2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNDc0MDEsImV4cCI6MjAzMTkyMzQwMX0.v-PIg3KmT8etL81Eq5H7Tmt7xzH5ZtEc-NDSO-9mofs"
);


function sendSuccess(message) {
    return {
        statusCode: 200,
        body: JSON.stringify({ output: message })
    }
}
function sendError(message) {
    return {
        statusCode: 500,
        body: JSON.stringify({ error: message })
    }
}

const handler = async (event) => {

    try {

        console.log("Function init, fetching users...");
        const { data, error } = await supabase.from("users").select();
        if (error || !data) {
            return sendError("Server error: " + (error || "No DATA"))
        }

        console.log("Function Success, sending:", data.length);
        return sendSuccess(data);
    } catch (error) {
        console.log("Runtime Error:", error)
        return sendError("Server Error")
    }
}

module.exports = { handler }
