/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Flex, Image, Paper, ScrollArea, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { DetailsDrawer } from "../../features/detailsDrawer";
import { Movie } from "../../types/movie";
import { useMovies } from "../../hooks/useMovies";

export const Repertoire = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  const handleDrawer = (movie: Movie) => {
    setMovie(movie);
    setDrawerOpen(!drawerOpen);
  };

  const { getMovies } = useMovies();

  useEffect(() => {
    getMovies().then(data => setMovies(data.movies));
  }, []);

  return (
    <>
      <div>
        <h1>Repertuar</h1>
        <ScrollArea>
          <Flex>
            {movies.map((movie, idx) => (
              <Paper
                w={450}
                h={800}
                m={"xs"}
                p={"xs"}
                pos={"relative"}
                key={idx}
              >
                <h2>{movie.title}</h2>
                <Image src={movie.img} fit={"contain"} />

                <Flex pos={"absolute"} bottom={10}>
                  <Button
                    size={"xl"}
                    color={"dark"}
                    onClick={() => handleDrawer(movie)}
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
