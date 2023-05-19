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
          {show.movie.title} - {show.movie.release_date}
        </Title>
        {/* <Title order={2}>{show.movie.director}</Title> */}
        <Title order={2}>{show.movie.runtime}</Title>

        {show.movie.genres.map((genre, idx) => (
          <Badge color={"dark"} size={"md"} mr='xs' key={idx}>
            {genre}
          </Badge>
        ))}
        <Rating value={show.movie.vote_average} count={10} />
        <Title order={2}>{show.screening.date}</Title>
        <Title order={2}>{show.screening.time}</Title>
      </Box>
      <Box w={300}>
        <Image src={show.movie.poster_path} />
      </Box>
    </Flex>
  );
};
