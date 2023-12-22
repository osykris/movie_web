import { Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarMovie from "../components/NavbarMovie";

const Movie = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="myBG">
      <NavbarMovie warna={"dark"}/>
        <div className="intro">
          <Container className="text-white text-center d-flex justify-content-center align-items-center">
            <Row>
              <Col>
                <div className="title">NONTON GRATIS NIH!!!</div>
                <div className="title">GAK PAKEK KARCIS</div>
                <div className="introButton mt-4 text-center">
                  <Button variant="dark"  onClick={() => navigate("/now-playing")}>
                    Now Playing
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Movie;
