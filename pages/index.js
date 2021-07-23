import { signIn, signOut, useSession } from "next-auth/client";
import useSWR from "swr";
import { subMinutes, isAfter, add, addMinutes } from "date-fns";
import {
  SimpleGrid,
  Box,
  Stack,
  Heading,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { Sparklines, SparklinesBars, SparklinesLine } from "react-sparklines";

const getTweetCount = (tweetsByMinute) => {
  return tweetsByMinute.reduce((previous, current) => {
    return previous + current.length;
  }, 0);
};

const Datacard = ({ title, data, count }) => {
  const isComplete = data.tweetsByMinute.length > count;
  const currentTweets = data.tweetsByMinute.slice(0, count);
  const previousTweets = data.tweetsByMinute.slice(count, count + count);
  const currentCount = getTweetCount(currentTweets);
  const previousCount = getTweetCount(previousTweets);
  const delta = currentCount - previousCount;
  const users = new Set();
  for (const tweets of currentTweets) {
    for (const tweetId of tweets) {
      users.add(data.tweets[tweetId].user_id);
    }
  }

  return (
    <Box p="1rem" shadow="md">
      <Text textTransform="uppercase" letterSpacing="wide" fontSize="xs">
        {title}
        {isComplete ? "" : " (incomplete data)"}
      </Text>
      <Flex direction="row" justifyContent="space-between">
        <Stack
          flexGrow={1}
          mt="0.5rem"
          mr="2rem"
          direction="row"
          alignItems="center"
        >
          <Heading>{currentCount}</Heading>
          <Text as="span">
            ({delta > 0 ? "+" : ""}
            {delta})
          </Text>
        </Stack>
        <Sparklines
          color="black"
          data={data.tweetsByMinute.map((arr) => arr.length)}
        >
          <SparklinesBars color="black" />
        </Sparklines>
      </Flex>
      <Text fontSize="sm">
        tweets from{" "}
        <Text as="span" fontWeight="bold">
          {users.size}
        </Text>{" "}
        users
      </Text>
    </Box>
  );
};

export default function Page() {
  const [session, loading] = useSession();
  const [lastChecked, setLastChecked] = useState(null);
  const { data, isValidating } = useSWR(
    ["session", session?.user?.email],
    async () => {
      const now = new Date();
      if (!lastChecked || isAfter(now, addMinutes(lastChecked, 1))) {
        return await fetch("/api/hello").then((r) => {
          setLastChecked(new Date());
          return r.json();
        });
      } else {
        console.error("not 1 minute yet");
        throw new Error("not 1 minute yet");
      }
    },
    {
      errorRetryCount: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 60 * 1000,
    }
  );

  // const latestTweet = data.tweetsByMinute.find((array) => array.length > 0)[0];

  const getLastXMinutesTweets = (x) => {
    let tweets = [];
    for (let i = 0; i < x; i++) {
      tweets = tweets.concat(data?.tweetsByMinute[i] ?? []);
    }
    return tweets;
  };

  return (
    <Flex direction="column" minHeight="100vh" p="2rem">
      <Flex justifyContent="space-between" flexWrap="wrap">
        <Heading>Timeline stats</Heading>

        <Flex alignItems="center">
          {!session && (
            <>
              <Text>Not signed in.</Text>
              <Button ml="2rem" onClick={() => signIn()}>
                Sign in
              </Button>
            </>
          )}
          {session && (
            <>
              <Text>
                Signed in as{" "}
                <Text fontWeight="bold" as="span">
                  {session.user.screen_name}
                </Text>
                .
              </Text>
              <Button ml="2rem" onClick={() => signOut()}>
                Sign out
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {!session && (
        <Flex placeContent="center" alignItems="center" flexGrow="1">
          <Text>Sign in to view your timeline stats.</Text>
          <Button ml="2rem" onClick={() => signIn()}>
            Sign in
          </Button>
        </Flex>
      )}

      {session && isValidating && !data && (
        <Flex placeContent="center" alignItems="center" flexGrow="1">
          <Text>Loading timeline...</Text>
        </Flex>
      )}

      {session && data && (
        <Stack spacing="2rem" mt="2rem">
          <Text>
            Total data: {Object.keys(data.tweets).length} tweets from the past{" "}
            {data.tweetsByMinute.length} minutes.
          </Text>
          <Text>Last checked: {lastChecked.toLocaleString()}</Text>
          <SimpleGrid minChildWidth="15rem" spacing="1rem">
            <Datacard title="1 Minute" data={data} count={1} />

            <Datacard title="5 Minute" data={data} count={5} />

            <Datacard title="15 Minute" data={data} count={15} />

            <Datacard title="30 Minute" data={data} count={30} />
          </SimpleGrid>
        </Stack>
      )}

      {/* {session && !isValidating && data && (
        <>
          {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
          {isValidating && <h1>Loading</h1>}

          {data && (
            <pre>Caught {data.tweetsByMinute.length} minutes of tweets</pre>
          )}
          <pre>
            {data && getLastXMinutesTweets(1).length} Tweets in last 1 minute
          </pre>
          <pre>
            {data && getLastXMinutesTweets(5).length} Tweets in last 5 minutes
          </pre>
          <pre>
            {data && getLastXMinutesTweets(15).length} Tweets in last 15 minutes
          </pre>
          <pre>
            {data && getLastXMinutesTweets(30).length} Tweets in last 30 minutes
          </pre>
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </>
      )} */}
    </Flex>
  );
}
