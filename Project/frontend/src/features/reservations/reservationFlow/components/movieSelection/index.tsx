import { Badge, Box, Flex, Image, Rating } from "@mantine/core";
import { Show } from "../../../../../types/show";

type MovieSelectionProps = {
  show: Show;
};

export const MovieSelection = ({ show }: MovieSelectionProps) => {
  return (
    <Flex align={"center"} justify={"space-between"}>
      <Box>
        <h1>
          {show.movie.title} - {show.movie.year}
        </h1>
        <h2>{show.movie.director}</h2>
        <h2>{show.movie.duration}</h2>

        {show.movie.genre.map(genre => (
          <Badge color={"dark"} size={"md"} mr='xs'>
            {genre}
          </Badge>
        ))}
        <Rating value={show.movie.rate} count={10} />
        <h2>{show.date}</h2>
        <h2>{show.time}</h2>
      </Box>
      <Box w={300}>
        <Image src={show.movie.img} />
      </Box>
    </Flex>
  );
};
