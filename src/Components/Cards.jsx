import React from "react";
import ContentModel from "./ContentModel";
//passing props
const Cards = ({ img, title, type, date, rating, id }) => {
    return (
        <>
            <ContentModel type={type} id={id}>
                <img className="poster" src={img} alt={title} />
                <span className="title">{title}</span>
                <span className="detail">

                    <span className="align-justify">{type === 'tv' ? 'TV Series' : 'Movie'}</span>
                    <span style={{ overflow: 'hidden' }}>{date}</span>
                </span>
                {/* if the rating is below 6 then show in red color else show in green */}
                <span className={`${rating <= 6 ? 'belowRating' : ''} rating `}>{rating}</span>
            </ContentModel>

        </>
    );
}
export default Cards;
// lassName="movie_card"