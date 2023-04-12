import { Flex, Text } from "@mantine/core";
import { SEAT_SIZE, SEAT_SPACE } from "../../../constants";
import { Screen } from "./components/screen";
import { Seat } from "./components/seat";
import { Space } from "./components/space";
import { SeatState } from "./components/seat/types";

const kino = {
  name: "Sala 1",
  rows: 5,
  seats: 11,
  isIMAX: false,
  aligment: "left",
  screenWidth: 15,
  matrix: [
    [1, 1, 1, 1, 1, 1, 1, null, null, null],
    [1, 1, 1, 1, 1, 1, 1, null, null, null],
    [1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1],
  ],
};

const stateSiedzenia = {
  reserved: [
    {
      row: 1,
      seat: 1,
    },
    {
      row: 2,
      seat: 2,
    },
  ],
  sold: [
    {
      row: 3,
      seat: 3,
    },
    {
      row: 3,
      seat: 4,
    },
    {
      row: 3,
      seat: 5,
    },
  ],
};

export const Cinema = () => {
  const getSeatState = (row: number, seat: number) => {
    const reserved = stateSiedzenia.reserved.find(
      siedzenie => siedzenie.row === row && siedzenie.seat === seat
    );
    const sold = stateSiedzenia.sold.find(
      siedzenie => siedzenie.row === row && siedzenie.seat === seat
    );
    if (reserved) {
      return SeatState.RESERVED;
    }
    if (sold) {
      return SeatState.SOLD;
    }
    return SeatState.FREE;
  };

  return (
    <Flex bg={"#dbd9d9"} p={"md"} direction={"column"} align={"center"}>
      <Text>{kino.name}</Text>
      <Screen seatWidth={kino.screenWidth} justify={"center"} />
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        w={SEAT_SIZE * kino.screenWidth}
      >
        {kino.matrix.map((row, rowIndex) => {
          return (
            <Flex
              align={"flex-start"}
              w={(SEAT_SIZE + SEAT_SPACE * 4) * kino.seats}
            >
              {row.map((seat, seatIndex) => {
                return seat ? (
                  <Seat
                    row={rowIndex + 1}
                    i={seatIndex + 1}
                    seatState={getSeatState(rowIndex + 1, seatIndex + 1)}
                  />
                ) : (
                  <Space />
                );
              })}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
