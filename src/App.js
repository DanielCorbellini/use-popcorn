import { useEffect, useState } from "react";
import { Main } from "./main/Main";
import { NavBar } from "./navbar/NavBar";

import { Box } from "./main/box/Box.js";
import { MovieList } from "./main/box/MovieList.js";
import { WatchedMovieList } from "./main/box/WatchedMovieList.js";
import { WatchedSummary } from "./main/box/WatchedSummary.js";
import { NumResults } from "./navbar/NumResults";
import { Search } from "./navbar/Search";
import { Loader } from "./components/Loader.js";
import { ErrorMessage } from "./components/ErrorMessage.js";
import { SelectedMovie } from "./main/box/SelectedMovie.js";
import { useMovies } from "./useMovies.js";
import { useLocalStorageState } from "./useLocalStorageState.js";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// replace with your OMDB API key

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, error, isLoading } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatch(movie) {
    setWatched((watched) =>
      watched.some((item) => item.imdbID === movie.imdbID)
        ? watched.map((item) =>
            item.imdbID === movie.imdbID ? { ...item, ...movie } : item
          )
        : [...watched, movie]
    );
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onSelectMovie={handleSelectMovie}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
