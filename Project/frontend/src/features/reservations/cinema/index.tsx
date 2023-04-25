import { Flex, Text, Box } from "@mantine/core";
import { SEAT_SIZE, SEAT_SPACE } from "../../../constants";
import { Screen } from "./components/screen";
import { Seat } from "./components/seat";
import { Space } from "./components/space";
import { SeatState } from "./components/seat/types";
import { Room, SoldSeat } from "../../../types/show";

type CinemaProps = {
  soldSeats?: SoldSeat[];
  room: Room;
};

export const Cinema = ({ soldSeats, room }: CinemaProps) => {
  const getSeatState = (row: number, seat: number) => {
    if (soldSeats) {
      const sold = soldSeats.find(
        siedzenie => siedzenie.row === row && siedzenie.seat === seat
      );
      if (sold) {
        return SeatState.SOLD;
      }
    }
    return SeatState.FREE;
  };

  return (
    <Flex bg={"#dbd9d9"} p={"md"} direction={"column"} align={"center"}>
      <Text>{room.name}</Text>
      <Screen
        seatWidth={room.screenWidth}
        justify={"center"}
        isIMAX={room.isIMAX}
      />
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        w={SEAT_SIZE * room.screenWidth}
      >
        {room.matrix.map((row, rowIndex) => {
          return (
            <Flex
              align={"flex-start"}
              w={(SEAT_SIZE + SEAT_SPACE * 4) * room.seats}
              my={room.isIMAX ? SEAT_SPACE * 5 : undefined}
            >
              {row.map((seat, seatIndex) => {
                return seat ? (
                  <Box mt={room.isIMAX ? -Math.abs(room.rows - seatIndex) : 0}>
                    <Seat
                      row={rowIndex + 1}
                      i={seatIndex + 1}
                      seatState={getSeatState(rowIndex + 1, seatIndex + 1)}
                    />
                  </Box>
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
