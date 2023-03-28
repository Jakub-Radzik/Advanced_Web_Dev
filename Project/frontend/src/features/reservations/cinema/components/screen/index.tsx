import { Box, Flex } from "@mantine/core";
import { SEAT_SIZE } from "../../../../../constants";

export type ScreenProps = {
  seatWidth: number;
  justify: string;
};

export const Screen = ({ seatWidth, justify }: ScreenProps) => {
  return (
    <Flex justify={justify}>
      <Box
        w={seatWidth * SEAT_SIZE}
        mb={SEAT_SIZE}
        style={{
          borderTop: "100px solid white",
          borderLeft: "50px solid transparent",
          borderRight: "50px solid transparent",
          transform: "rotateX(45deg)",
        }}
      ></Box>
    </Flex>
  );
};
