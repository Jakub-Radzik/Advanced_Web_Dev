import { Flex, Menu, Text, Tooltip, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import { ROW_SPACE, SEAT_SIZE, SEAT_SPACE } from "../../../../../constants";
import { useReservationContext } from "../../../state";
import { Ticket, tickets } from "../../../state/mocks";
import { SeatState } from "./types";

type SeatProps = {
  i: number;
  row: number;
  seatState: SeatState;
};

export const Seat = ({ row, i, seatState }: SeatProps) => {
  const { reservation, addReservation, removeReservation } =
    useReservationContext();

  const [ticket, setTicket] = useState<Ticket | null>(() => {
    const r = reservation.find(r => r.row === row && r.seat === i);
    return r?.ticket || null;
  });

  const initColor =
    seatState === SeatState.FREE
      ? "#00ee00"
      : seatState === SeatState.RESERVED
      ? "cyan"
      : "#ff0000";

  const isClickable = seatState === SeatState.FREE;

  const isSelected = ticket !== null;

  const seatColor = isSelected ? "white" : initColor;

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
    setTicket(ticket);
    addReservation(row, i, ticket);
  };

  const removeReservationHandler = () => {
    setTicket(null);
    removeReservation(row, i);
  };

  return (
    <Menu shadow='md' width={200}>
      {isClickable ? (
        ticket ? (
          <Tooltip label={ticket?.type}>
            <Menu.Target>
              <UnstyledButton>{HandlerElement}</UnstyledButton>
            </Menu.Target>
          </Tooltip>
        ) : (
          <Menu.Target>
            <UnstyledButton>{HandlerElement}</UnstyledButton>
          </Menu.Target>
        )
      ) : (
        HandlerElement
      )}

      <Menu.Dropdown>
        <Menu.Label>Bilety</Menu.Label>
        {tickets.map(t => {
          return (
            <Menu.Item onClick={() => addReservationHandler(t)}>
              {t.type} - {`${t.price} zł`}
            </Menu.Item>
          );
        })}
        <Menu.Divider></Menu.Divider>
        <Menu.Item onClick={removeReservationHandler}>Anuluj</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
