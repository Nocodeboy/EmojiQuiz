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
      // Get top 10 scores
      const leaderboard = await kv.zrevrange('leaderboard', 0, 9, {
        withScores: true
      });
      
      // Convert to array of objects
      const scores = [];
      for (let i = 0; i < leaderboard.length; i += 2) {
        const playerData = JSON.parse(leaderboard[i]);
        scores.push({
          ...playerData,
          score: parseInt(leaderboard[i + 1]),
          rank: Math.floor(i / 2) + 1
        });
      }
      
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
    res.status(500).json({ error: 'Internal server error' });
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