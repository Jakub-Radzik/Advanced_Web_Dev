import { createServer } from "miragejs";
import { Movie } from "../types/movie";

export const useBackend = () => {
  return {};
};

createServer({
  routes() {
    this.urlPrefix = "http://localhost:5000/api/v1";

    this.get("/movies/:movieId", () => {
      return {movie: {
        id: 1,
        title: "The Shawshank Redemption",
        year: "1994",
        director: "Frank Darabont",
        img: "https://shatpod.com/movies/wp-content/uploads/2017/03/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
        duration: "2h 22min",
        genre: ["Crime", "Drama"],
        rate: 9.3,
      }};
    });

    this.get("/movies", () => {
      const movies: Movie[] = [
        {
          id: 1,
          title: "The Shawshank Redemption",
          year: "1994",
          director: "Frank Darabont",
          img: "https://shatpod.com/movies/wp-content/uploads/2017/03/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
          duration: "2h 22min",
          genre: ["Crime", "Drama"],
          rate: 9.3,
        },
        {
          id: 2,
          title: "The Godfather",
          year: "1972",
          director: "Francis Ford Coppola",
          img: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
          duration: "2h 55min",
          genre: ["Crime", "Drama"],
          rate: 9.2,
        },
        {
          id: 3,
          title: "The Godfather: Part II",
          year: "1974",
          director: "Francis Ford Coppola",
          img: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
          duration: "3h 22min",
          genre: ["Crime", "Drama"],
          rate: 9.0,
        },
        {
          id: 4,
          title: "The Dark Knight",
          year: "2008",
          director: "Christopher Nolan",
          img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
          duration: "2h 32min",
          genre: ["Action", "Crime", "Drama", "Thriller"],
          rate: 9.0,
        },
      ];

      return {
        movies: movies
      };
    });

    this.get("/screenings/:movieId", () => {
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

          return {
            screenings: seanse,
          }
    });

    this.get("/screening/:screeningId", () => {
      return {
        show: {
          movie: {
            id: 1,
            title: "The Shawshank Redemption",
            year: "1994",
            director: "Frank Darabont",
            img: "https://shatpod.com/movies/wp-content/uploads/2017/03/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
            duration: "2h 22min",
            genre: ["Crime", "Drama"],
            rate: 9.3,
          },
          date: "2021-05-01",
          time: "20:00",
        }
      }
    });
  },
});
