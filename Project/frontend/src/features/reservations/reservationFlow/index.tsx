/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Group, Loader, Stepper } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { Cinema } from "../cinema";
import { useReservationContext } from "../state";
import { Confirmation } from "./components/confirmation";
import { MovieSelection } from "./components/movieSelection";
import { ClientConfirmation } from "./components/clientConfirmation";
import { useSessions } from "../../../hooks/useSessions";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { ClientForm } from "../../../types/forms";
import { Payment } from "./components/payment";
import { Session } from "../../../types/movie";
import { usePayments } from "../../../hooks/usePayments";

export const ReservationFlow = () => {
  const MAX_STEP = 4;
  const [active, setActive] = useState(0);
  const [, setHighestStepVisited] = useState(active);
  const { reservation, clearReservation, setClientData } =
    useReservationContext();
  let { showId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [backButtonVisible, setBackButtonVisible] = useState(true);
  const [nextButtonVisible, setNextButtonVisible] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const { getSessionById } = useSessions();
  const { reserveTickets, reserveTicketsEmail, reserveCheckout } =
    usePayments();

  useEffect(() => {
    if (showId) {
      getSessionById(parseInt(showId)).then(data => setSession(data));
    }
  }, [showId]);

  useEffect(() => {
    if (active === 0) {
      clearReservation();
    }
  }, [active]);

  const setBackVisibility = (nextStep: number) => {
    if (nextStep === 0 || nextStep === 1 || nextStep === 2 || nextStep === 4) {
      setBackButtonVisible(true);
      return;
    }

    if (nextStep === 3) {
      setBackButtonVisible(false);
      return;
    }
  };

  const setNextVisibility = (nextStep: number) => {
    if (nextStep !== 4) {
      setNextButtonVisible(true);
      return;
    }

    if (nextStep === 4) {
      setNextButtonVisible(false);
      return;
    }
  };

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > MAX_STEP || nextStep < 0;

    setBackVisibility(nextStep);
    setNextVisibility(nextStep);

    if (isOutOfBounds) {
      return;
    }

    if (nextStep === 2 && !reservation.length) {
      return;
    }

    if (nextStep === 3 && reservation.length) {
      reserveTickets(reservation.map(r => r.id));
    }

    // We want to submit form
    if (nextStep === 4) {
      form.validate();
      if (!form.isValid()) {
        return;
      }
      setClientData(form.values);
      reserveTicketsEmail(form.values.email).then(data => {
        reserveCheckout().then(res => {
          setClientSecret(res.data.client_secret);
        });
      });
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
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      firstName: value => (value.length > 0 ? null : "First name is required"),
      lastName: value => (value.length > 0 ? null : "Last name is required"),
      phone: value => (value.length > 0 ? null : "Phone number is required"),
      termsOfService: value =>
        value ? null : "You must agree to terms of service",
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
          {session ? (
            <MovieSelection session={session} />
          ) : (
            <Loader/>
          )}
        </Stepper.Step>

        <Stepper.Step
          label='Wybór miejsc'
          description='Wybierz miejsca i bilety'
        >
          {session ? <Cinema session={session} /> : <Loader/>}
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
          {
            clientSecret ? <Payment clientSecret={clientSecret} /> : <Loader/>
          }
        </Stepper.Completed>
      </Stepper>

      <Group position='center' mt='xl'>
        {backButtonVisible && (
          <Button variant='default' onClick={handleBackButton}>
            Powrót
          </Button>
        )}
        {nextButtonVisible && (
          <Button
            disabled={disabled}
            onClick={() => handleStepChange(active + 1)}
          >
            Następny krok
          </Button>
        )}
      </Group>
    </>
  );
};
