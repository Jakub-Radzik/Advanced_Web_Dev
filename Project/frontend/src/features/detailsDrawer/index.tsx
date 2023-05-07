import { Badge, Box, Button, Divider, Drawer, Rating } from "@mantine/core";
import { Movie, Screenings } from "../../types/movie";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useScreenings } from "../../hooks/useScreenings";

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
  const [screenings, setScreenings] = useState<Screenings>([]);
  const { getMovieScreenings } = useScreenings();

  useEffect(() => {
    if (movie) {
      getMovieScreenings(movie?.id).then(data =>
        setScreenings(data.screenings)
      );
    }
  }, [getMovieScreenings, movie]);

  return movie ? (
    <Drawer opened={opened} onClose={onClose} position={"right"}>
      <h2>{movie.title}</h2>
      <Rating value={movie.rate} count={10} />
      <p>{movie.director}</p>
      <p>{movie.duration}</p>
      {movie.genre.map((genre, idx) => (
        <Badge color={"dark"} size={"md"} mr='xs' key={idx}>
          {genre}
        </Badge>
      ))}
      <Divider my={"xs"} />
      <Box>
        <h3>Seanse</h3>
        {screenings.map((seans, screeningIdx) => (
          <Box key={screeningIdx}>
            <p>{seans.date}</p>
            {seans.times.map(({ time, id }, seansIdx) => (
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
