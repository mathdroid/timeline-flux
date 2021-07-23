import {
  SimpleGrid,
  Box,
  Stack,
  Heading,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useMemo } from "react";

import { AxisOptions, Chart } from "react-charts";

const Page = () => {
  const data = [
    {
      label: "main",
      data: [
        { x: 1, y: 5 },
        { x: 2, y: 10 },
        { x: 3, y: 15 },
      ],
    },
  ];
  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.x,
    }),
    []
  );

  const secondaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.y,
    }),
    []
  );
  return (
    <Box minHeight="100vh" p="2rem">
      <Flex justifyContent="space-between" flexWrap="wrap">
        <Heading>Timeline stats</Heading>
        <Flex alignItems="center">
          <Text>Signed in as mathdroid.</Text>
          <Button ml="2rem">Sign out</Button>
        </Flex>
      </Flex>
      <Stack spacing="2rem" mt="2rem">
        <Text>Total data: 200 tweets from the past 43 minutes.</Text>
        <Text>Last checked: {new Date().toLocaleString()}</Text>
        <SimpleGrid minChildWidth="15rem" spacing="1rem">
          <Box p="1rem" shadow="md">
            <Text textTransform="uppercase" letterSpacing="wide" fontSize="xs">
              1 minute
            </Text>
            <Stack mt="0.5rem" direction="row" alignItems="center">
              <Heading>3</Heading>
              <Text as="span">(+3)</Text>
              <Chart
                options={{
                  data,
                  primaryAxis,
                  secondaryAxis,
                }}
              />
            </Stack>
            <Text fontSize="sm">
              tweets from{" "}
              <Text as="span" fontWeight="bold">
                2
              </Text>{" "}
              users
            </Text>
            <Button mt="0.5rem" variant="outline" size="xs" width="100%">
              Details
            </Button>
          </Box>
          <Box p="1rem" shadow="md">
            <Text textTransform="uppercase" letterSpacing="wide" fontSize="xs">
              1 minute
            </Text>
            <Stack mt="0.5rem" direction="row" alignItems="center">
              <Heading>3</Heading>
              <Text as="span">(+3)</Text>
            </Stack>
            <Text fontSize="sm">
              tweets from{" "}
              <Text as="span" fontWeight="bold">
                2
              </Text>{" "}
              users
            </Text>
            <Button mt="0.5rem" variant="outline" size="xs" width="100%">
              Details
            </Button>
          </Box>
          <Box p="1rem" shadow="md">
            <Text textTransform="uppercase" letterSpacing="wide" fontSize="xs">
              1 minute
            </Text>
            <Stack mt="0.5rem" direction="row" alignItems="center">
              <Heading>3</Heading>
              <Text as="span">(+3)</Text>
            </Stack>
            <Text fontSize="sm">
              tweets from{" "}
              <Text as="span" fontWeight="bold">
                2
              </Text>{" "}
              users
            </Text>
            <Button mt="0.5rem" variant="outline" size="xs" width="100%">
              Details
            </Button>
          </Box>
          <Box p="1rem" shadow="md">
            <Text textTransform="uppercase" letterSpacing="wide" fontSize="xs">
              1 minute
            </Text>
            <Stack mt="0.5rem" direction="row" alignItems="center">
              <Heading>3</Heading>
              <Text as="span">(+3)</Text>
            </Stack>
            <Text fontSize="sm">
              tweets from{" "}
              <Text as="span" fontWeight="bold">
                2
              </Text>{" "}
              users
            </Text>
            <Button mt="0.5rem" variant="outline" size="xs" width="100%">
              Details
            </Button>
          </Box>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default Page;
