import { Box, Button, Group, Stepper } from "@mantine/core";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Show } from "../../../types/show";
import { Cinema } from "../cinema";
import { useReservationContext } from "../state";
import { Confirmation } from "./components/confirmation";
import { MovieSelection } from "./components/movieSelection";
import { ClientConfirmation } from "./components/clientConfirmation";

export const ReservationFlow = () => {
  const [active, setActive] = useState(0);
  const [, setHighestStepVisited] = useState(active);
  const { reservation } = useReservationContext();

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
    const isOutOfBounds = nextStep > 4 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited(hSC => Math.max(hSC, nextStep));
  };

  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (active == 1 && !reservation.length) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [active, reservation]);

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
          allowStepSelect={!!reservation.length}
        >
          <Confirmation />
        </Stepper.Step>

        <Stepper.Step label='Dane osobowe' description='Podaj dane kupującego'>
          <ClientConfirmation onSubmitCallback={() => handleStepChange(4)} />
        </Stepper.Step>

        <Stepper.Completed>
          <Box>Completed, click back button to get to previous step</Box>
        </Stepper.Completed>
      </Stepper>

      <Group position='center' mt='xl'>
        <Button variant='default' onClick={() => handleStepChange(active - 1)}>
          Back
        </Button>
        <Button
          disabled={disabled}
          onClick={() => handleStepChange(active + 1)}
        >
          Next step
        </Button>
      </Group>
    </>
  );
};
