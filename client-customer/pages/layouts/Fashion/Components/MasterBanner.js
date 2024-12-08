import Link from "next/link";
import { Col, Container, Row } from "reactstrap";

const MasterBanner = ({ img, title, desc, link, classes, btn, btnClass }) => {
  return (
    <div>
      <div className={`home ${img} ${classes ? classes : "text-center"} gradient-overlay`}>
        <Container>
          <Row>
            <Col>
              <div className="slider-contain">
                <div>
                  <h4 style={{color: "white"}}>{title}</h4>
                  {/* {img === "home1" ? {color: "white"} : {} */}
                  <h1 style={img === "home1" ? {color: "white"} : {color: "white"}}>{desc}</h1>
                  <Link href={link}>
                    <a className={`btn ${btnClass ? btnClass : "btn-solid"}`}>
                      {btn ? btn : "Shop Now"}{" "}
                    </a>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MasterBanner;
