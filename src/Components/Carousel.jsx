import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();



const Carousel = ({ type, id }) => {

    const [res, setRes] = useState([]);
    const fetchCredits = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setRes(data.cast)
    }
    const items = res.map((c) => (
        <div className='CarouselItem'>
            <img className='CarouselImg' src={c.profile_path ? `https://image.tmdb.org/t/p/w300//${c.profile_path}` : 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'} alt={c.name} onDragStart={handleDragStart} />
            <b className='Carouseltxt'>{c.name}</b>
        </div>
    ));
    useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
    }, [])


    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    }
    return (
        <AliceCarousel
            autoPlay
            // responsive={responsive}
            responsive={responsive}
            infinite
            disableDotsControls
            disableButtonsControls
            mouseTracking
            items={items} />
    );
}
export default Carousel;