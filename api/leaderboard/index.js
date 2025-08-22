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

  // Log environment info
  console.log('Leaderboard API called:', {
    method: req.method,
    hasKvUrl: !!process.env.KV_REST_API_URL,
    hasKvToken: !!process.env.KV_REST_API_TOKEN,
    kvUrlPreview: process.env.KV_REST_API_URL ? process.env.KV_REST_API_URL.substring(0, 30) + '...' : 'undefined'
  });

  try {
    if (req.method === 'GET') {
      // Test KV connection first
      console.log('Testing KV connection...');
      try {
        await kv.ping();
        console.log('KV ping successful');
      } catch (pingError) {
        console.error('KV ping failed:', pingError);
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
      console.log('POST request received, body:', req.body);
      
      const { playerName, score, level, categoriesCompleted, achievementsUnlocked, gameMode } = req.body;
      
      console.log('Extracted data:', { playerName, score, level, categoriesCompleted, achievementsUnlocked, gameMode });
      
      // Validate required fields
      if (!playerName || playerName.trim() === '') {
        console.error('Missing or empty playerName');
        return res.status(400).json({ error: 'Player name is required' });
      }
      
      if (typeof score !== 'number' || isNaN(score) || score < 0) {
        console.error('Invalid score:', score);
        return res.status(400).json({ error: 'Valid score is required' });
      }

      const playerData = {
        id: Date.now().toString(),
        playerName: playerName.trim().substring(0, 20), // Limit name length
        level: level || 1,
        categoriesCompleted: categoriesCompleted || [],
        achievementsUnlocked: achievementsUnlocked || 0,
        gameMode: gameMode || 'normal',
        timestamp: new Date().toISOString()
      };

      console.log('Player data to save:', playerData);

      try {
        // Test KV connection first for POST too
        await kv.ping();
        console.log('KV ping successful for POST');

        // Store in sorted set (Redis ZADD)
        const addResult = await kv.zadd('leaderboard', {
          score: score,
          member: JSON.stringify(playerData)
        });

        console.log('ZADD result:', addResult);

        // Keep only top 100 to avoid unlimited growth
        await kv.zremrangebyrank('leaderboard', 0, -101);

        const playerRank = await getPlayerRank(score);
        console.log('Player rank calculated:', playerRank);

        res.status(201).json({ 
          message: 'Score saved successfully',
          rank: playerRank,
          playerData: playerData
        });
      } catch (postError) {
        console.error('Error saving score:', postError);
        return res.status(500).json({ 
          error: 'Failed to save score',
          details: postError.message
        });
      }
      
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
    // Get count of scores higher than current score
    const higherScores = await kv.zcount('leaderboard', score + 1, '+inf');
    const rank = higherScores + 1;
    console.log('Rank calculation - score:', score, 'higher scores:', higherScores, 'rank:', rank);
    return rank;
  } catch (error) {
    console.error('Error getting rank:', error);
    return null;
  }
}