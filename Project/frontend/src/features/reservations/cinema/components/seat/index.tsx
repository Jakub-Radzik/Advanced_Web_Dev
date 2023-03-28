import { Box, Flex, Menu, Text, UnstyledButton } from "@mantine/core";
import { ROW_SPACE, SEAT_SIZE, SEAT_SPACE } from "../../../../../constants";

type SeatProps = {
  i: number;
  seatState: SeatState;
};

export enum SeatState {
  FREE = "free",
  RESERVED = "reserved",
  SOLD = "sold",
}

export const Seat = ({ i, seatState }: SeatProps) => {
  const color =
    seatState === SeatState.FREE
      ? "#00ee00"
      : seatState === SeatState.RESERVED
      ? "cyan"
      : "#ff0000";

  const isClickable = seatState === SeatState.FREE;

  const HandlerElement = (
    <Flex
      w={SEAT_SIZE}
      h={SEAT_SIZE}
      mx={SEAT_SPACE}
      my={ROW_SPACE}
      bg={color}
      align={"center"}
      justify={"center"}
      style={{
        border: "1px solid black",
      }}
    >
      <Text>{i}</Text>
    </Flex>
  );

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
        <Menu.Item>Normalny</Menu.Item>
        <Menu.Item>Senior -70%</Menu.Item>
        <Menu.Item>Student -51%</Menu.Item>
        <Menu.Item>Uczeń -30%</Menu.Item>
        <Menu.Divider></Menu.Divider>
        <Menu.Item>Anuluj</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
