import {
  Box,
  Center,
  Group,
  Button,
  Text,
  Grid,
  Space,
  Stack,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie } from "../../types/movie";
import { useMovies } from "../../hooks/useMovies";
import { MovieListItem } from "../../features/admin/components/movieListItem";

export const NewMovie = () => {
  const navigate = useNavigate();

  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [storedMovies, setStoredMovies] = useState<Movie[]>([]);

  const { getMovies, getStoredMovies, postStoredMovie, deleteStoredMovie } = useMovies();

  useEffect(() => {
    getMovies().then(data => {
      setAllMovies(data.results);
    });

    getStoredMovies().then(data => {
      setStoredMovies(data);
    });
  }, []);

  const handleAddToStored = (movieId: number) => {
    const movieToAdd = allMovies.find(movie => movie.id === movieId);

    if (movieToAdd) {
      const movieData = {
        title: movieToAdd?.title,
        poster_path: movieToAdd?.poster_path,
        backdrop_path: movieToAdd?.backdrop_path,
        overview: movieToAdd?.overview,
        release_date: movieToAdd?.release_date,
        vote_average: movieToAdd?.vote_average,
        vote_count: movieToAdd?.vote_count,
        original_language: movieToAdd?.original_language,
        original_title: movieToAdd?.original_title,
        genres: movieToAdd?.genres,
        runtime: movieToAdd?.runtime,
      };

      postStoredMovie(movieData);
    }
  };

  const handleRemoveFromStored = (movieId: number) => {
    deleteStoredMovie(movieId);
  };

  return (
    <Stack>
      <Grid>
        <Grid.Col span={2} />
        <Grid.Col span={4}>
          <h1>Filmy dostępne</h1>

          <Stack>
            {allMovies?.map((movie, idx) => (
              <MovieListItem
                key={idx}
                title={movie.title}
                genres={movie.genres}
                duration={movie.runtime}
                movieId={movie.id}
                onClickHandle={handleAddToStored}
                stored={false}
              ></MovieListItem>
            ))}
          </Stack>
        </Grid.Col>
        <Space w='xl' />
        <Grid.Col span={4}>
          <h1>Filmy w naszym kinie</h1>
          <Stack>
            {storedMovies?.map((movie, idx) => (
              <MovieListItem
                key={idx}
                title={movie.title}
                genres={movie.genres}
                duration={movie.runtime}
                movieId={movie.id}
                onClickHandle={handleRemoveFromStored}
                stored={true}
              ></MovieListItem>
            ))}
          </Stack>
          <Group position='center' mt='xl'></Group>
        </Grid.Col>
      </Grid>
      <Space />
      <Center>
        <Button variant='default' onClick={() => navigate("/admin")}>
          Powrót
        </Button>
      </Center>
    </Stack>
  );
};
