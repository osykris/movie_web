import React from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useDetailMovie } from "../../service/Query";

const ListDetail = () => {
  const { id } = useParams();
  const { data } = useDetailMovie(id);
  return (
    <div>
      <div className="Movie-list">
        <h3 className="Movie-title">{data && data.title}</h3>
        <img
          className="Movie-image"
          src={`${"https://image.tmdb.org/t/p/w500"}/${
            data && data.poster_path
          }`}
          alt={data && data.title}
          width={200}
        />
        <br />
        <p>
          <StarIcon></StarIcon>
          {data && data.vote_average} <CalendarMonthIcon></CalendarMonthIcon>
          {data && data.release_date}
        </p>
        <p>{data && data.overview}</p>
      </div>
    </div>
  );
};

export default ListDetail;
