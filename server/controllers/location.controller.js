import axios from 'axios';

export const searchLocation = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter q is required' });
    }

    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: query,
        key: process.env.OPENCAGE_API_KEY,
        limit: 5,
      },
    });

    const suggestions = response.data.results.map((result) => ({
      name: result.formatted,
      lat: result.geometry.lat,
      lng: result.geometry.lng,
    }));

    res.json(suggestions);
  } catch (error) {
    console.error('OpenCage API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch location data' });
  }
};
