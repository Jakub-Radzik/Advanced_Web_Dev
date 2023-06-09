import { Button, Flex, Image, Paper, ScrollArea, Text } from "@mantine/core";
import { useState } from "react";

import { Show } from "../../../../types/show";

export const ShowList = () => {
  const [shows, setShows] = useState<Show[]>([]);

  return (
    <>
      <div>Admin</div>
      <ScrollArea>
        <Flex>
          {shows.map((show, idx) => (
            <div></div>
          ))}
        </Flex>
      </ScrollArea>
    </>
  );
};