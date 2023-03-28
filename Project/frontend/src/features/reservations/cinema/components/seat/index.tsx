import { Box, Text } from "@mantine/core";
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

  return (
    <Box
      w={SEAT_SIZE}
      h={SEAT_SIZE}
      mx={SEAT_SPACE}
      my={ROW_SPACE}
      bg={color}
      style={{
        border: "1px solid black",
      }}
    >
      <Text>{i}</Text>
    </Box>
  );
};
