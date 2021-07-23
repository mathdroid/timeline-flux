import jwt from "next-auth/jwt";
import Twitter from "twitter-lite";
import {
  subMinutes,
  isAfter,
  eachMinuteOfInterval,
  add,
  setSeconds,
  addMinutes,
  isBefore,
  isEqual,
} from "date-fns";

const secret = process.env.SECRET;

const handler = async (req, res) => {
  const now = new Date();
  const decoded = await jwt.getToken({ req, secret });
  console.log({ decoded });
  if (decoded) {
    const client = new Twitter({
      subdomain: "api", // "api" is the default (change for other subdomains)
      version: "1.1", // version "1.1" is the default (change for other subdomains)
      consumer_key: process.env.TWITTER_CONSUMER_CLIENT_ID, // from Twitter.
      consumer_secret: process.env.TWITTER_CONSUMER_CLIENT_SECRET, // from Twitter.
      access_token_key: decoded.oauth_token, // from your User (oauth_token)
      access_token_secret: decoded.oauth_token_secret, // from your User (oauth_token_secret)
    });

    const data = await client.get("statuses/home_timeline", { count: 200 });

    const tweets = {};
    const users = {};

    for (const tweet of data) {
      tweets[tweet.id_str] = {
        id: tweet.id_str,
        user_id: tweet.user.id_str,
        created_at: tweet.created_at,
      };
      users[tweet.user.id_str] = {
        id: tweet.user.id_str,
        name: tweet.user.screen_name,
      };
    }

    const isTweetOlderThanMinutes = (tweet, minute) =>
      isAfter(new Date(tweet.created_at), subMinutes(now, minute));
    const getLastXMinutes = (minute) =>
      Object.entries(tweets)
        .filter(([, tweet]) => isTweetOlderThanMinutes(tweet, minute))
        .map(([id]) => id);
    const last5 = getLastXMinutes(5);
    const last15 = getLastXMinutes(15);
    const last30 = getLastXMinutes(30);

    const minuteIntervals = eachMinuteOfInterval({
      start: setSeconds(new Date(data[data.length - 1].created_at), 0),
      end: addMinutes(setSeconds(new Date(data[0].created_at), 0), 1),
    });

    const tweetsByMinute = [];

    for (let i = 0; i < minuteIntervals.length - 1; i++) {
      const [start, end] = minuteIntervals.slice(i, i + 2);
      const minuteTweets = data
        .filter((tweet) => {
          const tweetTime = new Date(tweet.created_at);

          return (
            isEqual(tweetTime, start) ||
            (isAfter(tweetTime, start) && isBefore(tweetTime, end))
          );
        })
        .map((tweet) => tweet.id_str);
      tweetsByMinute.push(minuteTweets);
    }
    tweetsByMinute.reverse();
    console.log({ minuteIntervals, tweetsByMinute, tweets, users });
    res.json({ minuteIntervals, tweetsByMinute, tweets, users });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};

export default handler;
