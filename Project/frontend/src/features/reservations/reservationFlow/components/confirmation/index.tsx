import { Flex, ScrollArea } from "@mantine/core";
import { useReservationContext } from "../../../state";
import { TicketCard } from "../ticketCard";
import { SelectedPlace } from "../../../state/mocks";

const ticketSorter = (r1: SelectedPlace, r2: SelectedPlace) => {
  const place1 = r1.row * 10 + r1.seat;
  const place2 = r2.row * 10 + r2.seat;
  return place1 - place2;
};

export const Confirmation = () => {
  const { reservation } = useReservationContext();

  return (
    <ScrollArea type={"always"}>
      <Flex p='xs'>
        {reservation.sort(ticketSorter).map(r => (
          <TicketCard place={r} />
        ))}
      </Flex>
    </ScrollArea>
  );
};
