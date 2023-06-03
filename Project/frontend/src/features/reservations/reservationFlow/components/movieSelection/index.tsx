import { Badge, Box, Flex, Image, Rating, Title } from "@mantine/core";
import { Session } from "../../../../../types/movie";
import { getDate, getTime } from "../../../../../utils/datetime";

type MovieSelectionProps = {
  session: Session;
};

export const MovieSelection = ({ session }: MovieSelectionProps) => {
  return (
    <Flex justify={"center"} w={"100%"}>
      <Flex
        align={"center"}
        w={900}
        justify={"space-between"}
        p={"lg"}
        style={{
          border: "1px solid #dbd9d9",
          borderRadius: 20,
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        }}
      >
        <Box>
          <Title>{session.movie_fk.title}</Title>
          <Rating value={session.movie_fk.vote_average} count={10} my={"sm"} />

          {session.movie_fk.genres.map((genre, idx) => (
            <Badge color={"dark"} size={"md"} mr='xs' key={idx}>
              {genre}
            </Badge>
          ))}
          <Title order={2} pt={"xl"}>
            Date: {getDate(session.datetime)}
          </Title>
          <Title order={2}>Time: {getTime(session.datetime)}</Title>
          <Title order={4}>Runtime {session.movie_fk.runtime} min.</Title>
        </Box>
        <Box w={300}>
          <Image src={session.movie_fk.poster_path} />
        </Box>
      </Flex>
    </Flex>
  );
};
