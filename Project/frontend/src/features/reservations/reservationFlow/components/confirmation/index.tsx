import { Flex, ScrollArea } from "@mantine/core";
import { useReservationContext } from "../../../state";
import { TicketCard } from "../ticketCard";
import { Ticket } from "../../../../../types/ticket";

const ticketSorter = (r1: Ticket, r2: Ticket) => {
  return r1.id - r2.id;
};

export const Confirmation = () => {
  const { reservation } = useReservationContext();

  return (
    <ScrollArea type={"always"}>
      <Flex p='xs'>
        {reservation.sort(ticketSorter).map((ticket, idx) => (
          <TicketCard ticket={ticket} key={idx} />
        ))}
      </Flex>
    </ScrollArea>
  );
};
