/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Flex,
  Image,
  Loader,
  Paper,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { DetailsDrawer } from "../../features/detailsDrawer";
import { Movie } from "../../types/movie";
import { useMovies } from "../../hooks/useMovies";

export const Repertoire = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDrawer = (movie: Movie) => {
    setMovie(movie);
    setDrawerOpen(!drawerOpen);
  };

  const { getStoredMovies } = useMovies();

  useEffect(() => {
    setLoading(true);
    getStoredMovies().then(data => {
      setMovies(data);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div>
        <h1>Repertoire</h1>
        {loading && <Loader/>}
        <ScrollArea>
          <Flex>
            {movies?.map((movie, idx) => (
              <Paper
                shadow='xs'
                w={200}
                m={"xs"}
                p={"xs"}
                pos={"relative"}
                key={idx}
              >
                <Box h={60}>
                  <Text fz={"md"}>{movie.title}</Text>
                </Box>
                <Image src={movie.poster_path} fit={"contain"} />

                <Flex>
                  <Button
                    size={"sm"}
                    color={"dark"}
                    onClick={() => handleDrawer(movie)}
                    mt={"sm"}
                  >
                    <Text>Kup bilet</Text>
                  </Button>
                </Flex>
              </Paper>
            ))}
          </Flex>
        </ScrollArea>
      </div>

      <DetailsDrawer
        opened={drawerOpen}
        movie={movie}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
};
