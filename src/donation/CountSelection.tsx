import {
  Button,
  Heading,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Text,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import RadioCard from "./RadioCard";

interface Props {
  initialCount: number;
  next: (values: any) => void;
}

const CountSelection = ({ initialCount, next }: Props) => {
  const options = [5, 20, 50, 100];
  const [pounds, setPounds] = useState(initialCount);
  const [customAmount, setCustomAmount] = useState(
    "" + (options.includes(pounds) ? "" : pounds)
  );

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "pounds",
    defaultValue: pounds,
    onChange: (nextVal) => {
      setCustomAmount("");
      setPounds(parseInt(nextVal));
    },
  });

  const nextStep = () => {
    next({ count: pounds });
  };

  const group = getRootProps();

  return (
    <VStack spacing={4} align="stretch" mb={5}>
      <Heading as="h3" size="md">
        JOIN #TEAMSEAS
      </Heading>
      <Text fontSize="md" fontWeight="bold">
        $1 removes a pound of trash
      </Text>
      <SimpleGrid columns={2} spacing={3} {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value} pounds
            </RadioCard>
          );
        })}
      </SimpleGrid>
      <NumberInput
        value={customAmount}
        onFocus={() => setPounds(0)}
        onChange={(value) => {
          setPounds(parseInt(value));
          setCustomAmount(value);
        }}
      >
        <NumberInputField placeholder="Other Amount" />
      </NumberInput>
      <hr />
      <Button
        isFullWidth
        colorScheme="orange"
        size="lg"
        borderRadius="full"
        onClick={nextStep}
      >
        Next
      </Button>
    </VStack>
  );
};

export default CountSelection;
