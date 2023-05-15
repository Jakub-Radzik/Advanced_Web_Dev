/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Group, Stepper } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { Show } from "../../../types/show";
import { Cinema } from "../cinema";
import { useReservationContext } from "../state";
import { Confirmation } from "./components/confirmation";
import { MovieSelection } from "./components/movieSelection";
import { ClientConfirmation } from "./components/clientConfirmation";
import { useScreenings } from "../../../hooks/useScreenings";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { ClientForm } from "../../../types/forms";

export const ReservationFlow = () => {
  const [active, setActive] = useState(0);
  const [, setHighestStepVisited] = useState(active);
  const { reservation, setClientData } = useReservationContext();
  let { showId } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState<Show | null>(null);
  const [backButtonVisible] = useState(true); // we will think about it

  const { getScreening } = useScreenings();

  useEffect(() => {
    if (showId) {
      getScreening(showId).then(data => setShow(data.show));
    }
  }, [showId]);

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 4 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    // We want to submit form
    if (nextStep === 4) {
      form.validate();
      if (!form.isValid()) {
        return;
      }
      setClientData(form.values);
    }

    setActive(nextStep);
    setHighestStepVisited(hSC => Math.max(hSC, nextStep));
  };

  const handleBackButton = useCallback(() => {
    if (active === 0) {
      navigate("/");
    } else {
      handleStepChange(active - 1);
    }
  }, [active]);

  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (active === 1 && !reservation.length) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [active, reservation]);

  const form = useForm<ClientForm>({
    initialValues: {
      email: "",
      termsOfService: false,
      phone: "",
      firstName: "",
      lastName: "",
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Niepoprawny email"),
      firstName: value => (value.length > 0 ? null : "Imię jest wymagane"),
      lastName: value => (value.length > 0 ? null : "Nazwisko jest wymagane"),
      phone: value => (value.length > 0 ? null : "Numer telefonu jest wymagany"),
      termsOfService: value =>
        value ? null : "Akceptacja zgody na przetwarzanie danych osobowych jest wymagana",
    },
  });

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
          {show ? <MovieSelection show={show} /> : <Box>Ładowanie...</Box>}
        </Stepper.Step>

        <Stepper.Step
          label='Wybór miejsc'
          description='Wybierz miejsca i bilety'
        >
          {show ? (
            <Cinema soldSeats={show.soldSeats} room={show.room} />
          ) : (
            <Box>Ładowanie...</Box>
          )}
        </Stepper.Step>

        <Stepper.Step
          label='Potwierdzenie rezerwacji'
          description='Potwierdź miejsca i bilety'
          allowStepSelect={!!reservation.length}
        >
          <Confirmation />
        </Stepper.Step>

        <Stepper.Step label='Dane osobowe' description='Podaj dane kupującego'>
          <ClientConfirmation form={form} />
        </Stepper.Step>

        <Stepper.Completed>
          <Box>Sukces, kliknij powrót by wrócić do poprzednich kroków</Box>
        </Stepper.Completed>
      </Stepper>

      <Group position='center' mt='xl'>
        {backButtonVisible && (
          <Button variant='default' onClick={handleBackButton}>
            Powrót
          </Button>
        )}
        <Button
          disabled={disabled}
          onClick={() => handleStepChange(active + 1)}
        >
          Dalej
        </Button>
      </Group>
    </>
  );
};
