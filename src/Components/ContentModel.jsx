import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { useSpring, animated } from '@react-spring/web';
import axios from 'axios';
import Carousel from './Carousel';
// import { YouTubeIcon } from '@mui/icons-material/YouTube';
import YouTube from '@mui/icons-material/YouTube';

const Fade = React.forwardRef(function Fade(props, ref) {
    const {
        children,
        in: open,
        onClick,
        onEnter,
        onExited,
        ownerState,
        ...other
    } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter(null, true);
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited(null, true);
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {React.cloneElement(children, { onClick })}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any,
};

const style = {
    position: 'absolute',
    fontSize: '60px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "87%",
    bgcolor: '#203e68',
    color: 'white',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2,
};

export default function ContentModel({ children, type, id }) {  //getting props value
    const [open, setOpen] = React.useState(false);
    const [res, setRes] = React.useState([]);
    const [video, setVideo] = React.useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    //api called fetchdata as a type and id provided by the user
    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setRes(data);
    }
    //api called fetchvideodata as a type and id provided by the user
    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setVideo(data.results[0]?.key)
    }

    React.useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div title="Click to see more details" onClick={handleOpen} className="movie_card">
                {children}
            </div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {/* if there is something in res then only then the div will render */}
                        {res &&
                            <div className='contentModel'>
                                <img className="contentPoster" src={res.poster_path ?` https://image.tmdb.org/t/p/w300${res.poster_path}` : 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'} alt={res.name || res.title} />
                                <div className='contentInfo'>
                                    <span className='ctitle'>{res.name || res.title}({(res.release_date || res.first_air_date || "----").substring(0, 4)})</span> {/**for displaying only year from the date */}
                                    {res.tagline &&
                                        <span className='tagline'>{res.tagline}</span>}
                                    {res.overview ?
                                        <span className='description'>{res.overview}</span> :
                                        <span className='description'>No Data Available</span>
                                    }
                                    <div className='contentCarousel'>
                                        <Carousel type={type} id={id} />
                                    </div>
                                    <Button
                                        fullWidth='true'
                                        variant='contained'
                                        startIcon={<YouTube />}
                                        color="secondary"
                                        target="_blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    >
                                        <span className='ytbtn'> Watch Trailer </span></Button>
                                </div>
                            </div>
                        }
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}