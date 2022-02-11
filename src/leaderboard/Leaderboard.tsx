import {
  Box,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "urql";
import { DonationsQuery } from "../graphql/queries";
import { Donation } from "../types";
import LeaderboardItem from "./LeaderboardItem";

interface Props {}

type DonationsQueryRes = {
  donations: Donation[];
};

const Leaderboard = (props: Props) => {
  const [field, setOrderField] = useState("createdAt");
  const [{ data, fetching, error }] = useQuery<DonationsQueryRes>({
    query: DonationsQuery,
    variables: {
      orderBy: {
        field,
        direction: "desc",
      },
    },
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Box width="100%">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" fontWeight="extrabold" mb={5}>
          LEADERBOARD
        </Heading>
        <RadioGroup onChange={setOrderField} value={field}>
          <Stack direction="row">
            <Radio value="createdAt">Most Recent</Radio>
            <Radio value="count">Most Donatons</Radio>
          </Stack>
        </RadioGroup>
        {data &&
          data.donations.length > 0 &&
          data.donations.map((_donation) => (
            <LeaderboardItem
              key={_donation.id}
              donation={{
                displayName: _donation.displayName,
                count: _donation.count,
                createdAt: _donation.createdAt,
                message: _donation.message,
                team: _donation.team,
              }}
            />
          ))}
      </VStack>
    </Box>
  );
};

export default Leaderboard;
