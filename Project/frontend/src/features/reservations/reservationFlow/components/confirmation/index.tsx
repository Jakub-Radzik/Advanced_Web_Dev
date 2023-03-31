import { useReservationContext } from "../../../state";
import { TicketCard } from "../ticketCard";

export const Confirmation = () => {
  const { reservation } = useReservationContext();

  return (
    <>
      {reservation.map(r => (
        <TicketCard place={r} />
      ))}
    </>
  );
};
