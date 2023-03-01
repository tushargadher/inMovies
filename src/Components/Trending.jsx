import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './Cards';

const Trending = () => {

    const [res, setRes] = useState([]);
    const [page, setpage] = useState(1);
    const [loading, setLoading] = useState(false);
    //api call function
    const fetchTrendling = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        setRes(data.results)
        setLoading(true);
    }



    //handle previous button
    const handlePrev = async () => {

        setpage(page - 1);
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        setRes(data.results)
        window.scroll(0, 0);
    }


    //handle next button
    const handleNext = async () => {

        setpage(page + 1);
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        setRes(data.results)
        window.scroll(0, 0);
    }

    useEffect(() => {
        fetchTrendling();
        // eslint-disable-next-line
    }, [page])
    return (
        <>

            <div className='app'>
                <span className='trending'>TRENDING NOW </span>
                {loading ? '' :
                    <div className="spinner-container">
                        <div className="spinner-ring"></div>
                        <div className="spinner"></div>
                    </div>
                }

                <div className='movieList'>
                    
                    {res &&
                     res.map((ele) => {
                        
                        return <div key={ele.id}>
                        <Cards img={ele.poster_path ? ` https://image.tmdb.org/t/p/w300${ele.poster_path}` : 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'} title={ele.title || ele.name} type={ele.media_type} date={ele.release_date || ele.first_air_date} rating={ele.vote_average} id={ele.id} />
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

                    <button className='btn' id='nextBtn' onClick={handleNext}>Next &#62;</button>
                </div>
            </div>

        </>
    )
}
export default Trending;
