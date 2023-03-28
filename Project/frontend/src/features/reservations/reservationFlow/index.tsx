import { Box, Button, Group, Stepper } from "@mantine/core";
import { useState } from "react";
// import { useParams } from "react-router-dom";
import { Show } from "../../../types/show";
import { Cinema } from "../cinema";
import { MovieSelection } from "./components/movieSelection";

export const ReservationFlow = () => {
  const [active, setActive] = useState(0);
  const [, setHighestStepVisited] = useState(active);

  // let { showId } = useParams();

  const show: Show = {
    movie: {
      title: "The Shawshank Redemption",
      year: "1994",
      director: "Frank Darabont",
      img: "https://shatpod.com/movies/wp-content/uploads/2017/03/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
      duration: "2h 22min",
      genre: ["Crime", "Drama"],
      rate: 9.3,
      cinemaScreenings: [],
    },
    date: "2021-05-01",
    time: "20:00",
  };

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited(hSC => Math.max(hSC, nextStep));
  };

  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint='sm'
        allowNextStepsSelect={false}
      >
        <Stepper.Step
          label='Wybór seansu'
          description='Potwierdź wybrany film'
          allowStepSelect={false}
        >
          <MovieSelection show={show} />
        </Stepper.Step>

        <Stepper.Step
          label='Wybór miejsc'
          description='Wybierz miejsca i bilety'
        >
          <Cinema />
        </Stepper.Step>

        <Stepper.Step
          label='Potwierdzenie rezerwacji'
          description='Potwierdź miejsca i bilety'
        >
          <Box>Step 3 content: Get full access</Box>
        </Stepper.Step>

        <Stepper.Step label='Dane osobowe' description='Podaj dane kupującego'>
          <Box>Step 3 content: Get full access</Box>
        </Stepper.Step>

        <Stepper.Completed>
          <Box>Completed, click back button to get to previous step</Box>
        </Stepper.Completed>
      </Stepper>

      <Group position='center' mt='xl'>
        <Button variant='default' onClick={() => handleStepChange(active - 1)}>
          Back
        </Button>
        <Button onClick={() => handleStepChange(active + 1)}>Next step</Button>
      </Group>
    </>
  );
};