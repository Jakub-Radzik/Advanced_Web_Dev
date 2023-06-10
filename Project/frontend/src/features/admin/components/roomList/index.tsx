import { Button, Flex, Image, Stack, Paper, ScrollArea, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import { Room } from "../../../../types/show";
import { useRooms } from "../../../../hooks/useRooms";
import { SessionListItem } from "../sessionListItem"

export const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const { getRooms } = useRooms();

  useEffect(() => {
    getRooms().then(data => {
      setRooms(data);
    });
  }, []);

  return (
    <>
      <ScrollArea h={300}>
        <Stack>
          {rooms.map((room, idx) => (
            <SessionListItem 
              key={idx}
              sessionId={room.id}
              roomName={`${room.rows} rzędów po ${room.seats_per_row} miejsc`}
              movieTitle={room.name}
              renderDateAndButton={false}
            />
          ))}
        </Stack>
      </ScrollArea>
    </>
  );
};
