import { Text } from "@mantine/core";
import { TicketColors } from "../types";

export const TicketTextRow = ({
  description,
  value,
}: {
  description: string;
  value: string | number;
}) => {
  return (
    <Text ff={"Courier New"} c={TicketColors.fontPrimary}>
      {description}:
      <Text fw={"bold"} ff={"Courier New"} display={"inline"}>
        {value}
      </Text>
    </Text>
  );
};
