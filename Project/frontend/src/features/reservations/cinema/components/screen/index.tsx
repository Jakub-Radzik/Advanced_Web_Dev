import { Box, Flex } from "@mantine/core";
import { SEAT_SIZE } from "../../../../../constants";

export type ScreenProps = {
  seatWidth: number;
  justify: string;
  isIMAX: boolean;
};

export const Screen = ({ seatWidth, justify, isIMAX }: ScreenProps) => {
  return (
    <Flex justify={justify}>
      <Box
        w={seatWidth * SEAT_SIZE}
        mb={SEAT_SIZE}
        style={{
          borderTop: `${isIMAX ? 200 : 100}px solid white`,
          borderLeft: "50px solid transparent",
          borderRight: "50px solid transparent",
          transform: "rotateX(45deg)",
          position: "relative",
          borderRadius: isIMAX ? "50% 50% 0 0" : undefined,
        }}
      >
        {isIMAX && (
          <Box
            w={seatWidth * SEAT_SIZE}
            style={{
              borderTop: "100px solid #dbd9d9",
              borderLeft: "50px solid transparent",
              borderRight: "50px solid transparent",
              borderRadius: "100% 100% 0 0",
              position: "absolute",
              top: -50,
              left: -SEAT_SIZE * 1.5,
            }}
          />
        )}
      </Box>
    </Flex>
  );
};
