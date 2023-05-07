import { createContext, useContext, useState } from "react";
import { SelectedPlace, Ticket } from "./mocks";
import { ClientForm } from "../../../types/forms";

type ClientData = Omit<ClientForm, "termsOfService">;

type ReservationContextValue = {
  reservation: SelectedPlace[];
  addReservation: (row: number, seat: number, ticket: Ticket) => void;
  removeReservation: (row: number, seat: number) => void;
  clientData: ClientData;
  setClientData: (values: ClientData) => void;
};

const ReservationContext = createContext<ReservationContextValue>({
  reservation: [],
  addReservation: () => {},
  removeReservation: () => {},
  clientData: {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  },
  setClientData: () => {},
});

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [reservation, setReservation] = useState<SelectedPlace[]>([]);
  const [clientData, setClientData] = useState<ClientData>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const addReservation = (row: number, seat: number, ticket: Ticket) => {
    const existingReservation = reservation.findIndex(
      r => r.row === row && r.seat === seat
    );

    if (existingReservation !== -1) {
      reservation[existingReservation].ticket = ticket;
      setReservation([...reservation]);
      return;
    }

    setReservation([
      ...reservation,
      {
        row,
        seat,
        ticket,
      },
    ]);
  };

  const removeReservation = (row: number, seat: number) => {
    setReservation(reservation.filter(r => r.row !== row && r.seat !== seat));
  };

  return (
    <ReservationContext.Provider
      value={{
        reservation,
        addReservation,
        removeReservation,
        clientData,
        setClientData: values => setClientData(values),
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservationContext() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error(
      "useReservationContext must be used within a ReservationProvider"
    );
  }
  return context;
}

export { ReservationProvider, useReservationContext };
