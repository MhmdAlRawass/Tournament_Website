const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

const CHALLONGE_API_KEY = "llUkUZumsye4tMYh4fyrH07lJJNZWep8hSnGnGdD";
const CHALLONGE_USERNAME = "Mhmd_R";

// Get all tournaments
app.get("/api/tournaments", async (req, res) => {
  try {
    const respone = await axios.get(
      `https://api.challonge.com/v1/tournaments.json`,
      {
        params: {
          api_key: CHALLONGE_API_KEY,
        },
      }
    );
    res.json(respone.data);
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    res.status(500).json({ error: "Failed to fetch tournaments" });
  }
});

// get single tournament information
app.get('/api/tournament/:id', async(req, res)=> {
  try {
    const response = await axios.get(

      `https://api.challonge.com/v1/tournaments/${req.params.id}.json`,
      {
        params: {
          api_key: CHALLONGE_API_KEY,
        }
      }
    );
    res.json(response.data);
  }catch (error) {
    console.error("Error fetching tournament:", error);
    res.status(500).json({ error: "Failed to fetch tournament" });
  }
})

// get participants of a tournament
app.get('/api/tournament/:id/participants', async(req, res)=> {
  try {
    const response = await axios.get(
      `https://api.challonge.com/v1/tournaments/${req.params.id}/participants.json`,
      {
        params: {
          api_key: CHALLONGE_API_KEY,
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({ error: "Failed to fetch participants" });
  }
});

// get matches of a tournament
app.get('/api/tournament/:id/matches', async(req, res)=> {
  try {
    const response = await axios.get(
      `https://api.challonge.com/v1/tournaments/${req.params.id}/matches.json`,
      {
        params: {
          api_key: CHALLONGE_API_KEY,
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
