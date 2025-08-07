import axios from "axios";

export const searchLocation = async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        key: process.env.OPENCAGE_API_KEY,
        q: query,
        limit: 5,
      },
    });

    const results = response.data.results.map((result) => ({
      name: result.formatted,
      lat: result.geometry.lat,
      lng: result.geometry.lng,
    }));

    res.json(results);
  } catch (error) {
    console.error('OpenCage error:', error.message);
    res.status(500).json({ error: 'OpenCage API failed' });
  }
};
