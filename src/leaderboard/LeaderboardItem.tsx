import { Avatar, Badge, Flex, Text } from "@chakra-ui/react";

import formatDate from "../utils/formatDate";
import { Donation } from "../types";

interface Props {
  donation: Donation;
}

const LeaderboardItem = ({ donation }: Props) => {
  return (
    <Flex
      boxShadow="md"
      p={3}
      bg="white"
      borderRadius="lg"
      maxWidth="xl"
      width="100%"
      justifyContent="space-between"
    >
      <Flex>
        <Avatar position="relative" left={-12} size="lg" />
        <Flex flexDirection="column" textAlign="left" marginLeft={-10}>
          <Text
            fontWeight="bold"
            fontSize="sm"
            color="blue.500"
            textTransform="uppercase"
          >
            {donation.team}
          </Text>
          <Text fontWeight="bold">{donation.displayName}</Text>
          <Text fontSize="sm">{donation.message}</Text>
        </Flex>
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="space-around"
        justify="right"
      >
        <Badge
          colorScheme="blue"
          borderRadius="full"
          textTransform="lowercase"
          py={1}
          px={3}
          as="div"
        >
          {donation.count.toLocaleString()} pounds
        </Badge>
        <Text fontSize="xs">{formatDate(donation.createdAt)}</Text>
      </Flex>
    </Flex>
  );
};

export default LeaderboardItem;
