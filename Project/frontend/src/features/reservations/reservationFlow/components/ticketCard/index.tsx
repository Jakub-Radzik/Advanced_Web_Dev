import { Box, Card, Center, Flex, Text, Title } from "@mantine/core";
import { SelectedPlace } from "../../../state/mocks";
import { TicketColors, TicketEdgeType } from "./types";
import { TicketTextRow } from "./components/TicketTextRow";
import { TicketEdge } from "./components/TicketEdge";

type TicketCardProps = {
  place: SelectedPlace;
};

export const TicketCard = ({ place }: TicketCardProps) => {
  return (
    <Box miw={300} h={130} pos={"relative"} display={"inline"} m='xs'>
      <Card
        h={130}
        bg={TicketColors.base}
        style={{
          border: "2px solid black",
        }}
      >
        <Flex w={220} direction={"column"}>
          <Center>
            <Title order={2} ff={"Brush Script MT"} c={TicketColors.fontPrimary}>
              Bilet - Kino 'nazwa'
            </Title>
          </Center>

          <Flex justify={"space-between"}>
            <TicketTextRow description={"Rzad"} value={place.row} />
            <TicketTextRow description={"Miejsce"} value={place.seat} />
          </Flex>
          <TicketTextRow description={"Typ"} value={place.ticket.type} />
        </Flex>

        <Flex
          w={130}
          bg={TicketColors.secondary}
          style={{
            borderTop: "5px dotted black",
            transform: "rotate(-90deg)",
            position: "absolute",
            top: 35,
            right: -40,
          }}
          align={"center"}
          justify={"center"}
        >
          <Text size={30} ff={"Courier New"} fw={"bold"} c={TicketColors.fontSecondary}>
            {place.ticket.price} zł
          </Text>
        </Flex>
      </Card>
      <TicketEdge type={TicketEdgeType.TOP_LEFT} />
      <TicketEdge type={TicketEdgeType.TOP_RIGHT} />
      <TicketEdge type={TicketEdgeType.BOTTOM_LEFT} />
      <TicketEdge type={TicketEdgeType.BOTTOM_RIGHT} />
    </Box>
  );
};


