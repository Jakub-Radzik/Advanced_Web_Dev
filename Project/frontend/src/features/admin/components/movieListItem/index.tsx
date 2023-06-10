import { Paper, Button, Stack, Text, Center, Badge, Box } from "@mantine/core";

type MovieListItemProps = {
  title: string;
  genres: string[];
  duration: number;
  movieId: number;
  onClickHandle: Function;
  stored: Boolean;
};

export const MovieListItem = ({
  title,
  genres,
  duration,
  movieId,
  onClickHandle,
  stored,
}: MovieListItemProps) => {
  const btnText = stored ? "Usuń z kina" : "Dodaj do kina";

  return (
    <Paper shadow='xs' radius='md'>
      <Stack ml='md' mb='md'>
        <h3>{title}</h3>
        <Text>{duration} minut</Text>
        <Box>
          {genres.map((genre, idx) => (
            <Badge color={"dark"} size={"sm"} mr='xs' key={idx}>
              {genre}
            </Badge>
          ))}
        </Box>
        <Center>
          <Button onClick={() => onClickHandle(movieId)} variant='outline'>
            {btnText}
          </Button>
        </Center>
      </Stack>
    </Paper>
  );
};
