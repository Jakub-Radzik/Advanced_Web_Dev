import { createContext, useContext, useState } from "react";
import { ClientForm } from "../../../types/forms";
import { Ticket } from "../../../types/ticket";

type ClientData = Omit<ClientForm, "termsOfService">;

type ReservationContextValue = {
  reservation: Ticket[];
  addReservation: (ticket: Ticket) => void;
  removeReservation: (ticketId: number) => void;
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
  const [reservation, setReservation] = useState<Ticket[]>([]);
  const [clientData, setClientData] = useState<ClientData>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const addReservation = (ticket: Ticket) => {
    const existingReservation = reservation.findIndex(t => t.id === ticket.id);

    if (existingReservation === -1) {
      setReservation([...reservation, ticket]);
    }
  };

  const removeReservation = (ticketId: number) => {
    setReservation(reservation.filter(t => t.id !== ticketId));
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
