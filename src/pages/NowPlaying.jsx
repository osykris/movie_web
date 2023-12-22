import NavbarMovie from "../components/NavbarMovie";
import ListMovie from "../components/movies/ListMovie";

const NowPlaying = () => {
  return (
    <>
      <div className="movie">
        <NavbarMovie warna={"dark"} />
        <div className="Movie-contianer">
         <ListMovie/>
        </div>
      </div>
    </>
  );
};
export default NowPlaying;
