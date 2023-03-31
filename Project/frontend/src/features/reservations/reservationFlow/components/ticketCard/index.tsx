import { Box, Card, CSSObject, Flex, Text } from "@mantine/core";
import { CSSProperties } from "react";
import { SelectedPlace } from "../../../state/mocks";

type TicketCardProps = {
  place: SelectedPlace;
};

export const TicketCard = ({ place }: TicketCardProps) => {
  return (
    <Box maw={300} h={130} pos={"relative"}>
      <Card
        h={130}
        bg={"#ff0000"}
        style={{
          border: "2px solid black",
        }}
      >
        <Text>Bilet</Text>
        <Flex>
          <Text>Rzad: </Text>
          <Text>{place.row}</Text>
        </Flex>
        <Flex>
          <Text>Miejsce: </Text>
          <Text>{place.seat}</Text>
        </Flex>

        {place.ticket.type}

        <Flex
          w={130}
          style={{
            borderTop: "5px dotted black",
            transform: "rotate(-90deg)",
            position: "absolute",
            top: 40,
            right: -25,
          }}
          align={"center"}
          justify={"center"}
        >
          <Text size={30}>{place.ticket.price} zł</Text>
        </Flex>
      </Card>
      <TicketEdge type={TicketEdgeType.TOP_LEFT}/>
      <TicketEdge type={TicketEdgeType.TOP_RIGHT}/>
      <TicketEdge type={TicketEdgeType.BOTTOM_LEFT}/>
      <TicketEdge type={TicketEdgeType.BOTTOM_RIGHT}/>

      {/* <Box
        style={{
          position: "absolute",
          border: "2px solid transparent",
          background: "#f8f9fa",
          borderRightColor: "black",
          width: 20,
          height: 20,
          top: 0,
          left: -2,
          borderRadius: "0 0 100px 0",
        }}
      />

      <Box
        style={{
          position: "absolute",
          border: "2px solid transparent",
          background: "#f8f9fa",
          borderBottomColor: "black",
          width: 20,
          height: 20,
          top: -2,
          right: 0,
          borderRadius: "0 0 0 100px",
        }}
      />

      <Box
        style={{
          position: "absolute",
          border: "2px solid transparent",
          background: "#f8f9fa",
          borderTopColor: "black",
          width: 20,
          height: 20,
          bottom: -2,
          right: 0,
          borderRadius: "100px 0 0 0",
        }}
      />

      <Box
        style={{
          position: "absolute",
          border: "2px solid transparent",
          background: "#f8f9fa",
          borderTopColor: "black",
          width: 20,
          height: 20,
          bottom: 0,
          left: 0,
          borderRadius: "0 100px  0 0",
        }}
      /> */}
    </Box>
  );
};

enum TicketEdgeType {
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_RIGHT,
    BOTTOM_LEFT
}

const TicketEdge = ({type}: {type:TicketEdgeType}) => {

    const commonStyles: CSSProperties = {
        position: "absolute",
        border: "2px solid transparent",
        background: "#f8f9fa",
        width: 20,
        height: 20,
    }

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
    }

    const style = {
        ...commonStyles,
        ...uniqueStyles[type]
    }

    return <Box
        style={style}
    />
}