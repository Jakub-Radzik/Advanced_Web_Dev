import { Box, Button, Group, Stepper } from "@mantine/core";
import { useState } from "react";

export const ReservationFlow = () => {
    const [active, setActive] = useState(0);
    const [highestStepVisited, setHighestStepVisited] = useState(active);
  
    const handleStepChange = (nextStep: number) => {
      const isOutOfBounds = nextStep > 3 || nextStep < 0;
  
      if (isOutOfBounds) {
        return;
      }
  
      setActive(nextStep);
      setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
    };
  
    // Allow the user to freely go back and forth between visited steps.
    const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;
  
    return (
      <>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false}>
          <Stepper.Step
            label="Wybór seansu"
            description="Potwierdź wybrany film"
            allowStepSelect={false}
          >
            <Box>Wypisz dane filmu tutaj</Box>
          </Stepper.Step>

          <Stepper.Step
            label="Wybór miejsc"
            description="Wybierz miejsca i bilety"
          >
            <Box>Step 2 content: Verify email</Box>
          </Stepper.Step>

          <Stepper.Step
            label="Potwierdzenie rezerwacji"
            description="Potwierdź miejsca i bilety"
          >
            <Box>Step 3 content: Get full access</Box>
          </Stepper.Step>

          <Stepper.Step
            label="Dane osobowe"
            description="Podaj dane kupującego"
          >
            <Box>Step 3 content: Get full access</Box>
          </Stepper.Step>
  
          <Stepper.Completed>
            <Box>Completed, click back button to get to previous step</Box>
          </Stepper.Completed>
        </Stepper>
  
        <Group position="center" mt="xl">
          <Button variant="default" onClick={() => handleStepChange(active - 1)}>
            Back
          </Button>
          <Button onClick={() => handleStepChange(active + 1)}>Next step</Button>
        </Group>
      </>
    );
  }