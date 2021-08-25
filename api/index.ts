import express from 'express';
import { getFeeds } from './routes/feeds';

const app = express();
const port = 3005;

/**
 * Get Feeds
 * @function
 * @name /feeds
 */
app.get('/feeds', getFeeds);

app.listen(port, () => {
  console.log(`Feed server is running on port: ${port}`);
});