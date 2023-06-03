import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Rating,
  Image,
} from "@mantine/core";
import { Movie, Sessions } from "../../types/movie";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSessions } from "../../hooks/useSessions";

type DetailsDrawerProps = {
  opened: boolean;
  movie: Movie | null;
  onClose: () => void;
};

export const DetailsDrawer = ({
  opened,
  movie,
  onClose,
}: DetailsDrawerProps) => {
  const [sessions, setSessions] = useState<Sessions>({});
  const { getMovieSessions } = useSessions();

  useEffect(() => {
    if (movie) {
      getMovieSessions(movie?.id).then(data => setSessions(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);

  return movie ? (
    <Drawer opened={opened} onClose={onClose} position={"right"}>
      <Image src={movie.poster_path} fit={"contain"} />
      <h2>{movie.title}</h2>
      <Rating value={movie.vote_average} count={10} />
      <Box my={"xs"}>
        {movie.genres.map((genre, idx) => (
          <Badge color={"dark"} size={"md"} mr='xs' my={5} key={idx}>
            {genre}
          </Badge>
        ))}
      </Box>

      <p>{movie.overview}</p>
      <p>Duration: {movie.runtime} min</p>
      <p>Released: {movie.release_date}</p>
      <Divider my={"xs"} />
      <Box>
        <h3>Seanse</h3>
        {Object.keys(sessions).map((date, screeningIdx) => (
          <Box key={screeningIdx}>
            <p>{date}</p>
            {sessions[date].map(({ time, id }, seansIdx) => (
              <Link to={`/reservate/${id}`} key={seansIdx}>
                <Button radius={"xl"} mr={"xs"} mb={"xs"} color={"dark"}>
                  {time}
                </Button>
              </Link>
            ))}
          </Box>
        ))}
      </Box>
    </Drawer>
  ) : null;
};
