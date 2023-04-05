import { Box, Card, Center, Flex, Group, Text, Title } from "@mantine/core";
import { CSSProperties } from "react";
import { SelectedPlace } from "../../../state/mocks";

const TicketColors = {
  base: "#f3e2c3",
  secondary: "#ccbea0",
  fontPrimary: "#433519",
  fontSecondary: "#433519",
};

type TicketCardProps = {
  place: SelectedPlace;
};

const TicketTextRow = ({
  description,
  value,
}: {
  description: string;
  value: string | number;
}) => {
  return (
    <Text ff={"Courier New"}>
      {description}:
      <Text fw={"bold"} ff={"Courier New"} display={"inline"}>
        {value}
      </Text>
    </Text>
  );
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
            <Title order={2} ff={"Brush Script MT"}>
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
          <Text size={30} ff={"Courier New"} fw={"bold"}>
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

enum TicketEdgeType {
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_RIGHT,
  BOTTOM_LEFT,
}

const TicketEdge = ({ type }: { type: TicketEdgeType }) => {
  const commonStyles: CSSProperties = {
    position: "absolute",
    border: "2px solid transparent",
    background: "#f8f9fa",
    width: 20,
    height: 20,
  };

  const uniqueStyles: Record<TicketEdgeType, CSSProperties> = {
    [TicketEdgeType.TOP_LEFT]: {
      top: 0,
      left: -2,
      borderRadius: "0 0 100px 0",
      borderRightColor: "black",
    },
    [TicketEdgeType.TOP_RIGHT]: {
      borderBottomColor: "black",
      top: -2,
      right: 0,
      borderRadius: "0 0 0 100px",
    },
    [TicketEdgeType.BOTTOM_RIGHT]: {
      borderLeftColor: "black",
      bottom: 0,
      right: -2,
      borderRadius: "100px 0 0 0",
    },
    [TicketEdgeType.BOTTOM_LEFT]: {
      borderTopColor: "black",
      bottom: -2,
      left: 0,
      borderRadius: "0 100px  0 0",
    },
  };

  const style = {
    ...commonStyles,
    ...uniqueStyles[type],
  };

  return <Box style={style} />;
};
