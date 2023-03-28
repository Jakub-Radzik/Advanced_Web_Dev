import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Paper,
  Rating,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { DetailsDrawer } from "../../features/detailsDrawer";
import { Movie } from "../../types/movie";

const seanse = [
  {
    date: "2021-10-10",
    times: ["12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
  },
  {
    date: "2021-10-11",
    times: ["12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
  },
  {
    date: "2021-10-12",
    times: ["12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
  },
];

const Movies: Movie[] = [
  {
    title: "The Shawshank Redemption",
    year: "1994",
    director: "Frank Darabont",
    img: "https://shatpod.com/movies/wp-content/uploads/2017/03/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
    duration: "2h 22min",
    genre: ["Crime", "Drama"],
    rate: 9.3,
    cinemaScreenings: seanse,
  },
  {
    title: "The Godfather",
    year: "1972",
    director: "Francis Ford Coppola",
    img: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    duration: "2h 55min",
    genre: ["Crime", "Drama"],
    rate: 9.2,
    cinemaScreenings: seanse,
  },
  {
    title: "The Godfather: Part II",
    year: "1974",
    director: "Francis Ford Coppola",
    img: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    duration: "3h 22min",
    genre: ["Crime", "Drama"],
    rate: 9.0,
    cinemaScreenings: seanse,
  },
  {
    title: "The Dark Knight",
    year: "2008",
    director: "Christopher Nolan",
    img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    duration: "2h 32min",
    genre: ["Action", "Crime", "Drama", "Thriller"],
    rate: 9.0,
    cinemaScreenings: seanse,
  },
];

export const Repertoire = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  const handleDrawer = (movie: Movie) => {
    setMovie(movie);
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div>
        <h1>Repertoire</h1>
        <ScrollArea>
          <Flex>
            {[...Movies, ...Movies].map(movie => (
              <Paper w={450} h={800} m={"xs"} p={"xs"} pos={"relative"}>
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
