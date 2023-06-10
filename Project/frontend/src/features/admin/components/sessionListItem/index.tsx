import { Paper, Button, Stack, Text, Center, Badge, Box } from "@mantine/core";

type SessionListItemProps = {
  sessionId: number;
  roomName: string;
  movieTitle: string;
  datetime?: Date;
  onClickHandle?: Function;
  renderDateAndButton: Boolean;
};

export const SessionListItem = ({
  sessionId,
  roomName,
  movieTitle,
  renderDateAndButton,
  datetime = new Date(),
  onClickHandle = () => { },
}: SessionListItemProps) => {

  return (
    <Paper shadow='xs' radius='md'>
      <Stack ml='md' mb='md'>
        <h3>{movieTitle}</h3>
        <Text>{roomName}</Text>
        {
          renderDateAndButton &&
          <>
            <Text>{datetime.toLocaleString("pl-PL", { dateStyle: "long", timeStyle: "short" })}</Text>
            <Center>
              <Button onClick={() => onClickHandle(sessionId)} variant='outline'>
                Usuń seans
              </Button>
            </Center>
          </>
        }
      </Stack>
    </Paper>
  );
};
