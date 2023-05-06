import { createServer } from "miragejs";
import { Movie, Screenings } from "../types/movie";
import { Show } from "../types/show";

export const useBackend = () => {
  return {};
};

createServer({
  routes() {
    this.urlPrefix = "http://localhost:5000/api/v1";

    this.get("/movies/:movieId", () => {
      return {
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
      };
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
        movies: movies,
      };
    });

    this.get("/screenings/:movieId", () => {
      const seanse: Screenings = [
        {
          date: "2021-10-10",
          times: [
            {
              id: 1,
              time: "12:00",
            },
            {
              id: 2,
              time: "14:00",
            },
            {
              id: 3,
              time: "16:00",
            },
            {
              id: 4,
              time: "18:00",
            },
            {
              id: 5,
              time: "20:00",
            },
          ],
        },
        {
          date: "2021-10-11",
          times: [
            {
              id: 6,
              time: "12:00",
            },
            {
              id: 7,
              time: "14:00",
            },
            {
              id: 8,
              time: "16:00",
            },
            {
              id: 9,
              time: "18:00",
            },
            {
              id: 11,
              time: "20:00",
            },
          ],
        },
        {
          date: "2021-10-12",
          times: [
            {
              id: 22,
              time: "12:00",
            },
            {
              id: 223,
              time: "14:00",
            },
            {
              id: 31,
              time: "16:00",
            },
            {
              id: 42,
              time: "18:00",
            },
            {
              id: 545,
              time: "20:00",
            },
          ],
        },
      ];

      return {
        screenings: seanse,
      };
    });

    this.get("/screening/:screeningId", () => {
      const show: Show = {
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
        screening: {
          id: 1,
          date: "2021-05-01",
          time: "20:00",
        },
        soldSeats: [
          {
            row: 3,
            seat: 3,
          },
          {
            row: 3,
            seat: 4,
          },
          {
            row: 3,
            seat: 5,
          },
        ],
        room: {
          name: "Sala 1",
          rows: 5,
          seats: 11,
          isIMAX: false,
          aligment: "left",
          screenWidth: 15,
          matrix: [
            [1, 1, 1, 1, 1, 1, 1, null, null, null],
            [1, 1, 1, 1, 1, 1, 1, null, null, null],
            [1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, null, 1, 1, 1],
          ],
        },
      };
      return {
        show: show,
      };
    });
  },
});
