import { Badge, Box, Flex, Image, Rating, Title } from "@mantine/core";
import { Show } from "../../../../../types/show";

type MovieSelectionProps = {
  show: Show;
};

export const MovieSelection = ({ show }: MovieSelectionProps) => {
  return (
    <Flex align={"center"} justify={"space-between"}>
      <Box>
        <Title>
          {show.movie.title} - {show.movie.year}
        </Title>
        <Title order={2}>{show.movie.director}</Title>
        <Title order={2}>{show.movie.duration}</Title>

        {show.movie.genre.map(genre => (
          <Badge color={"dark"} size={"md"} mr='xs'>
            {genre}
          </Badge>
        ))}
        <Rating value={show.movie.rate} count={10} />
        <Title order={2}>{show.date}</Title>
        <Title order={2}>{show.time}</Title>
      </Box>
      <Box w={300}>
        <Image src={show.movie.img} />
      </Box>
    </Flex>
  );
};
