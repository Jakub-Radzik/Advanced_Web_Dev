import { Center, Flex, Title, Table } from "@mantine/core";
import { useReservationContext } from "../../../state";
import { Ticket } from "../../../../../types/ticket";

const ticketSorter = (r1: Ticket, r2: Ticket) => {
  return r1.id - r2.id;
};

export const Confirmation = () => {
  const { reservation } = useReservationContext();
  return (
    <Center>
      {" "}
      <Flex direction={"column"} mt={100}>
        <Title>Wybrane bilety:</Title>
        <Table my='lg' verticalSpacing="xs" fontSize="lg" highlightOnHover>
          <tbody>
            {reservation.sort(ticketSorter).map((ticket, idx) => (
              <tr key={idx}>
                <td>
                  {ticket.row}{ticket.seat}
                </td>
                <td>
                  {ticket.price} zł
                </td>
              </tr>
            ))}

          </tbody>
          <tfoot>
            <tr>
              <th>
                Razem
              </th>
              <th>
                {reservation.length * 20} zł
              </th>
            </tr>
          </tfoot>
        </Table>
      </Flex>
    </Center>
  );
};
