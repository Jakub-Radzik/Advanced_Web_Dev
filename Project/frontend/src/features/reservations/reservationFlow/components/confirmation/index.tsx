import { Center, Flex, Title } from "@mantine/core";
import { useReservationContext } from "../../../state";
import { Ticket } from "../../../../../types/ticket";

const ticketSorter = (r1: Ticket, r2: Ticket) => {
  return r1.id - r2.id;
};

export const Confirmation = () => {
  const { reservation } = useReservationContext();
  return (
<Center>    <Flex direction={"column"}>
    <Title>Tickets:</Title>
      <Flex direction={"column"} my='lg'>
        {reservation.sort(ticketSorter).map((ticket, idx) => (
            <Title>{ticket.row}{ticket.seat} - {ticket.price} zł</Title>
        ))}
      </Flex>
    <Title>Razem: {reservation.length * 20} zł</Title>
    </Flex>
    </Center>
  );
};
