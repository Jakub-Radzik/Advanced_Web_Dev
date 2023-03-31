import { ReservationFlow } from "../../features/reservations/reservationFlow";
import { ReservationProvider } from "../../features/reservations/state";

export const Reservation = () => {
  return (
    <ReservationProvider>
      <ReservationFlow />
    </ReservationProvider>
  );
};
