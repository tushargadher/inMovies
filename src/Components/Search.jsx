import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Cards from "./Cards";
import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
const Search = () => {
  const [res, setRes] = useState([]);
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#e3f2fd",
      },
    },
  });

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );

    setRes(data.results);
    setLoading(true);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);
  return (
    <>
      <div className="app">
        <ThemeProvider theme={darkTheme}>
          <div className="search">
            <TextField
              inputProps={{ style: { fontSize: 20 } }} // font size of input text
              InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
              className="searchBox"
              label="Search Movies and Series"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
              color="primary"
              fontSize="large"
            />
            <Button
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 5 }}
            >
              <SearchIcon fontSize="large" />
            </Button>
          </div>
        </ThemeProvider>
        <div className="searchTab">
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary.light"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
          >
            <Tab
              style={{ width: "40%", height: "70px" }}
              label={
                <Typography className="categoryHeading">
                  SEARCH MOVIES
                </Typography>
              }
            />
            <Tab
              style={{ width: "40%", height: "70px" }}
              label={
                <Typography className="categoryHeading">
                  SEARCH TV-SERIES
                </Typography>
              }
            />
          </Tabs>
        </div>

        <div className="movieList">
          {/* loading spinner */}
          {loading ? (
            ""
          ) : (
            <div className="spinner-container">
              <div className="spinner-ring"></div>
              <div className="spinner"></div>
            </div>
          )}
          {searchText &&
            !res &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
          {res &&
            res.map((ele) => {
              return (
                <div key={ele.id}>
                  <Cards
                    img={
                      ele.poster_path
                        ? `https://image.tmdb.org/t/p/w300//${ele.poster_path}`
                        : "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"
                    }
                    title={ele.title || ele.name}
                    type={type ? "tv" : "movie"}
                    date={ele.release_date || ele.first_air_date}
                    rating={ele.vote_average}
                    id={ele.id}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default Search;
