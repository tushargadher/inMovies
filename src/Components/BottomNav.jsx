import React from "react";
import { Link } from "react-router-dom";
const BottomNav = () => {
    return (<>
        <nav>
            <ul className="menu">
                <li>
                    <Link to="/" className="li-flex">
                        <i className='bx bxs-hot '></i>
                        <span>Trending</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Movies" className="li-flex">
                        <i className='bx bx-movie-play '></i>
                        <span>Movies</span>
                    </Link>
                </li>
                <li>
                    <Link to="/TvSeries" className="li-flex">
                        <i className='bx bx-tv'></i>
                        <span>TV Series</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Search" className="li-flex">
                        <i className='bx bx-search-alt'></i>
                        <span>Search</span>
                    </Link>
                </li>
            </ul>
        </nav>

    </>);
}
export default BottomNav;