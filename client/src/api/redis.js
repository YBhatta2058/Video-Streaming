async function initializeRedisClient() {
    let redisURL = process.env.REDIS_URI
    if (redisURL) {
      redisClient = createClient({ url: redisURL }).on("error", (e) => {
        console.error(`Failed to create the Redis client with error:`);
        console.error(e);
      });
  
      try {
        await redisClient.connect();
        console.log(`Connected to Redis successfully!`);
      } catch (e) {
        console.error(`Connection to Redis failed with error:`);
        console.error(e);
      }
    }
    function requestToKey(req) {
        const reqDataToHash = {
          query: req.query,
          body: req.body,
        };
        return `${req.path}@${hash.sha1(reqDataToHash)}`;
      }
      async function writeData(key, data, options) {
        if (isRedisWorking()) {
          try {
            await redisClient.set(key, data, options);
          } catch (e) {
            console.error(`Failed to cache data for key=${key}`, e);
          }
        }
      }
      
  }

  export {requestToKey}