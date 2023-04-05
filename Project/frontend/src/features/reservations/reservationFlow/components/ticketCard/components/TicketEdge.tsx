import { CSSProperties } from "react";
import { TicketEdgeType } from "../types";
import { Box } from "@mantine/core";

const commonStyles: CSSProperties = {
  position: "absolute",
  border: "2px solid transparent",
  background: "#f8f9fa",
  width: 20,
  height: 20,
};

type TicketEdgeProps = {
  type: TicketEdgeType;
};

export const TicketEdge = ({ type }: TicketEdgeProps) => {
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
