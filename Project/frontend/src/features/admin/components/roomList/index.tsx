import { Stack, Paper, ScrollArea, Text, Title, Badge } from "@mantine/core";
import { useEffect, useState } from "react";

import { Room } from "../../../../types/show";
import { useRooms } from "../../../../hooks/useRooms";

export const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const { getRooms } = useRooms();

  useEffect(() => {
    getRooms().then(data => {
      setRooms(data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ScrollArea h={300}>
        <Stack>
          {rooms.map((room, idx) => (
            <Paper shadow='xs' radius='md' p={'xs'} key={idx}>
              <Stack spacing={0}>
                <Title order={2}>{room.name}</Title>
                <Text>{`${room.rows} rzędów po ${room.seats_per_row} miejsc (${room.rows*room.seats_per_row})`}</Text>
                {
                  room.is_IMAX && <Badge color='red'>IMAX</Badge>
                }
              </Stack>
            </Paper>
          ))}
        </Stack>
      </ScrollArea>
    </>
  );
};
