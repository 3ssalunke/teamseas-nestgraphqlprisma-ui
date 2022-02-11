import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "urql";

import CountSelection from "../donation/CountSelection";
import DonationDetails from "../donation/DonationDetails";
import { CreateDonation } from "../graphql/queries";

const DonationWizard = () => {
  const [donationResult, createDonation] = useMutation(CreateDonation);
  const [step, setStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [donationDetails, setDonationDetails] = useState({
    count: 20,
  });
  const next = (values: any) => {
    const mergedDetails = { ...donationDetails, ...values };
    if (step === pages.length - 1) {
      submitDonation(mergedDetails);
    } else {
      setStep(step + 1);
      setDonationDetails(mergedDetails);
    }
  };
  const previous = () => setStep(step - 1);
  const submitDonation = async (values: any) => {
    await createDonation({ createDonationInput: values });
    setShowConfirmation(true);
  };

  const pages = [
    <CountSelection initialCount={donationDetails.count} next={next} />,
    <DonationDetails next={next} previous={previous} />,
  ];

  return (
    <Box boxShadow="xl" p={8} bg="white" borderRadius="xl" minW="sm">
      {showConfirmation ? (
        <div>
          Thank you for your donation of $
          {donationResult?.data.createDonation?.count}!!
        </div>
      ) : (
        pages[step]
      )}
    </Box>
  );
};

export default DonationWizard;
