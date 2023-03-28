import { Box } from "@mantine/core";
import { SEAT_SIZE, SEAT_SPACE } from "../../../../../constants";

export const Space = () => {
  return <Box w={SEAT_SIZE} h={SEAT_SIZE} mx={SEAT_SPACE} />;
};
