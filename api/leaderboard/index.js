import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Check if KV is available
      if (!kv) {
        console.error('KV not available - returning demo data');
        // Return demo data when KV is not available
        return res.status(200).json([
          {
            id: "demo1",
            playerName: "CodeMaster",
            score: 2500,
            level: 8,
            achievementsUnlocked: 5,
            gameMode: "normal",
            timestamp: new Date().toISOString(),
            rank: 1
          },
          {
            id: "demo2", 
            playerName: "EmojiWiz",
            score: 2200,
            level: 7,
            achievementsUnlocked: 4,
            gameMode: "normal",
            timestamp: new Date().toISOString(),
            rank: 2
          }
        ]);
      }

      // Get top 10 scores
      let leaderboard;
      try {
        leaderboard = await kv.zrevrange('leaderboard', 0, 9, {
          withScores: true
        });
      } catch (kvError) {
        console.error('KV operation failed:', kvError);
        // Return empty array if KV fails
        return res.status(200).json([]);
      }
      
      console.log('Raw leaderboard data:', leaderboard);
      
      // Handle empty leaderboard
      if (!leaderboard || leaderboard.length === 0) {
        console.log('No scores found in leaderboard');
        return res.status(200).json([]);
      }
      
      // Convert to array of objects
      const scores = [];
      for (let i = 0; i < leaderboard.length; i += 2) {
        try {
          const playerData = JSON.parse(leaderboard[i]);
          scores.push({
            ...playerData,
            score: parseInt(leaderboard[i + 1]),
            rank: Math.floor(i / 2) + 1
          });
        } catch (parseError) {
          console.error('Error parsing player data:', parseError, leaderboard[i]);
          // Skip invalid entries
          continue;
        }
      }
      
      console.log('Processed scores:', scores.length);
      res.status(200).json(scores);
      
    } else if (req.method === 'POST') {
      // Add new score
      const { playerName, score, level, categoriesCompleted, achievementsUnlocked, gameMode } = req.body;
      
      if (!playerName || typeof score !== 'number') {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const playerData = {
        id: Date.now().toString(),
        playerName: playerName.substring(0, 20), // Limit name length
        level: level || 1,
        categoriesCompleted: categoriesCompleted || [],
        achievementsUnlocked: achievementsUnlocked || 0,
        gameMode: gameMode || 'normal',
        timestamp: new Date().toISOString()
      };

      // Store in sorted set (Redis ZADD)
      await kv.zadd('leaderboard', {
        score: score,
        member: JSON.stringify(playerData)
      });

      // Keep only top 100 to avoid unlimited growth
      await kv.zremrangebyrank('leaderboard', 0, -101);

      res.status(201).json({ 
        message: 'Score saved successfully',
        rank: await getPlayerRank(score)
      });
      
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Leaderboard API error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      error: 'Internal server error',
      debug: process.env.NODE_ENV === 'development' ? error.message : 'Check server logs'
    });
  }
}

async function getPlayerRank(score) {
  try {
    const rank = await kv.zrevrank('leaderboard', score);
    return rank !== null ? rank + 1 : null;
  } catch (error) {
    console.error('Error getting rank:', error);
    return null;
  }
}