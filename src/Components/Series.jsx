import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './Cards';
const Series = () => {
  const [res, setRes] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchSeries = async () => {
    // const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`);
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`);
    setRes(data.results)
    setLoading(true);
  }
  //handle previous button
  const handlePrev = async () => {

    setpage(page - 1);
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`); setRes(data.results)
    window.scroll(0, 0);
  }


  //handle next button
  const handleNext = async () => {

    setpage(page + 1);
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`);;
    setRes(data.results)
    window.scroll(0, 0);
  }
  useEffect(() => {
    fetchSeries();
    // eslint-disable-next-line
  }, [page])
  return (
    <>
      <div className='app'>
        <span className='trending'>DISCOVER SERIES </span>
        {/* loading spinner */}
        {loading ? '' :
          <div className="spinner-container">
            <div className="spinner-ring"></div>
            <div className="spinner"></div>
          </div>
        }



        <div className='movieList'>
          {res && res.map((ele) => {
            return <div key={ele.id}>
              <Cards img={ele.poster_path ? ` https://image.tmdb.org/t/p/w300${ele.poster_path}` : 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'} title={ele.title || ele.name} type="tv" date={ele.release_date || ele.first_air_date} rating={ele.vote_average} id={ele.id} />
            </div>
          })}
        </div>
        <div className='buttons'>
          {page !== 1 ?
            <>
              <button className='btn' id='prevBtn' onClick={handlePrev}>&#60; Previous</button>
              <span className='pageMark'>Page {page}</span>
            </>
            :
            ''}

          {!loading ? '' : <button className='btn' id='nextBtn' onClick={handleNext}>Next &#62;</button>}
        </div>
      </div>

    </>
  )
}
export default Series;
