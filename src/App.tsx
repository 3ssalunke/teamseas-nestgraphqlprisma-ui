import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  Heading,
  extendTheme,
} from "@chakra-ui/react";
import { useQuery, useSubscription } from "urql";
import Counter from "./donation/Counter";
import DonationWizard from "./donation/DonationWizard";
import Leaderboard from "./leaderboard/Leaderboard";
import { Logo } from "./Logo";
import { TotalDonationsQuery, TotalUpdatedQuery } from "./graphql/queries";

const theme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
});

const handleSubscription = (previous: any, newTotal: any) => {
  return newTotal?.totalUpdated?.total;
};

export const App = () => {
  const [{ data, error, fetching }] = useQuery({
    query: TotalDonationsQuery,
  });

  const [res] = useSubscription(
    {
      query: TotalUpdatedQuery,
    },
    handleSubscription
  );

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} bg="gray.50">
          <VStack spacing={8}>
            <Logo h="32" pointerEvents="none" />
            <Heading as="h1" size="xl">
              JOIN THE MOVEMENT!
            </Heading>
            <Text>
              The team is growing everyday and scoring wins for the planet.
              <br /> Remove trash with us and track our program.
            </Text>
            <Heading as="h2" size="4xl">
              <Counter from={0} to={res.data || data.totalDonations} />
            </Heading>
            <DonationWizard />
            <Leaderboard />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
