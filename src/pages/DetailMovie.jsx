import NavbarMovie from "../components/NavbarMovie";
import ListDetail from "../components/movies/ListDetail";

const DetailMovie = () => {
  return (
    <>
      <div className="Movie-detail">
        <NavbarMovie />
        <div className="Movie-contianer">
          <ListDetail />
        </div>
      </div>
    </>
  );
};
export default DetailMovie;
