import { Paper, Button, Stack, Text, Center, Flex, Title} from "@mantine/core";

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
      <Flex align={"center"} justify={"space-between"} gap={'xs'}>
      <Stack ml='md' mb='md' spacing={0}>
        <Title order={3}>{movieTitle}</Title>
        <Text>{roomName}</Text>
        {
          renderDateAndButton &&
          <>
            <Text>{datetime.toLocaleString("pl-PL", { dateStyle: "long", timeStyle: "short" })}</Text>
            <Center>
            </Center>
          </>
        }
      </Stack>
        <Button onClick={() => onClickHandle(sessionId)} variant='outline'>
          Usuń seans
        </Button>
      </Flex>
    </Paper>
  );
};
