import { Flex, Text, Box } from "@mantine/core";
import { ALPHABET, SEAT_SIZE, SEAT_SPACE } from "../../../constants";
import { Screen } from "./components/screen";
import { Seat } from "./components/seat";
import { Space } from "./components/space";
import { Session } from "../../../types/movie";

type CinemaProps = {
  session: Session;
};

export const Cinema = ({ session }: CinemaProps) => {
  const { room_fk: room, tickets } = session;

  const getTicket = (row: string, seat: number) => {
    return tickets.filter(t => t.row === row && t.seat === seat)[0];
  };
  console.log(tickets);

  return (
    <Flex bg={"#dbd9d9"} p={"md"} direction={"column"} align={"center"}>
      <Text>{room.name}</Text>
      <Screen
        seatWidth={room.screen_size}
        justify={"center"}
        isIMAX={room.is_IMAX}
      />
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        w={SEAT_SIZE * room.screen_size}
      >
        {room.matrix.map((row, rowIndex) => {
          return (
            <Flex
              align={"flex-start"}
              w={(SEAT_SIZE + SEAT_SPACE * 4) * room.seats_per_row}
              my={room.is_IMAX ? SEAT_SPACE * 5 : undefined}
            >
              {row.map((seat, seatIndex) => {
                return seat ? (
                  <Box
                    key={seatIndex}
                    mt={room.is_IMAX ? -Math.abs(room.rows - seatIndex) : 0}
                  >
                    <Seat
                      row={rowIndex + 1}
                      i={`${ALPHABET.at(rowIndex)}${seatIndex + 1}`}
                      ticket={getTicket(ALPHABET.at(rowIndex)!, seatIndex + 1)}
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
