const redis = require('redis');
const util = require('util');

const client = redis.createClient();
client.on('error', (err) => {
  console.error('Redis error:', err);
});

const getAsync = util.promisify(client.get).bind(client);
const setAsync = util.promisify(client.set).bind(client);


const cacheMiddleware = async (req, res, next) => {
    const { id } = req.params;
    const cacheKey = `schedule_${id}`;
  
    try {
      const cacheData = await getAsync(cacheKey);
  
      if (cacheData) {
        return res.status(200).json({
          data: JSON.parse(cacheData),
          message: 'Data retrieved from cache'
        });
      }
  
      next();
    } catch (err) {
      console.error('Cache error:', err);
      next();
    }
  };
  
