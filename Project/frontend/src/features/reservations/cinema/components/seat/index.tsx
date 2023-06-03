import { Flex, Menu, Text, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import { ROW_SPACE, SEAT_SIZE, SEAT_SPACE } from "../../../../../constants";
import { useReservationContext } from "../../../state";
import { Ticket } from "../../../../../types/ticket";

type SeatProps = {
  row: number;
  i: string;
  ticket: Ticket;
};

export const Seat = ({ row, i, ticket }: SeatProps) => {
  const { addReservation, removeReservation } = useReservationContext();

  const [isReserved, setIsReserved] = useState(false);

  const initColor = ticket.is_sold ? "#b7adb9" : "#00ff00";

  const seatColor = isReserved ? "#00c3ff" : initColor;

  const isClickable = !ticket.is_sold;

  const HandlerElement = (
    <Flex
      w={SEAT_SIZE}
      h={SEAT_SIZE}
      mx={SEAT_SPACE}
      my={ROW_SPACE}
      bg={seatColor}
      align={"center"}
      justify={"center"}
      style={{
        border: "1px solid black",
      }}
    >
      <Text>{i}</Text>
    </Flex>
  );

  const addReservationHandler = (ticket: Ticket) => {
    addReservation(ticket);
    setIsReserved(true);
  };

  const removeReservationHandler = () => {
    removeReservation(ticket.id);
    setIsReserved(false);
  };

  return (
    <Menu shadow='md' width={200}>
      {isClickable ? (
        <Menu.Target>
          <UnstyledButton>{HandlerElement}</UnstyledButton>
        </Menu.Target>
      ) : (
        HandlerElement
      )}

      <Menu.Dropdown>
        <Menu.Label>Bilety</Menu.Label>
        <Menu.Item onClick={() => addReservationHandler(ticket)}>
          Normalny - {`${ticket.price} zł`}
        </Menu.Item>
        <Menu.Divider></Menu.Divider>
        <Menu.Item onClick={removeReservationHandler}>Anuluj</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
