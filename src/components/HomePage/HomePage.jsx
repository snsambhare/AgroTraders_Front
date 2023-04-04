import React from "react";
import Carousel from "react-bootstrap/Carousel";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import img1 from "../../images/1.jpg";
import img2 from "../../images/2.jpg";
import img3 from "../../images/3.jpeg";
import img8 from "../../images/8.jpg";
import img5 from "../../images/5.jpg";
import img6 from "../../images/6.jpg";
import img7 from "../../images/11.jpg";
// import NavBar from "./Navbar";
import NavBar2 from "./NavBar";
import AboutUs from "../HomePage/AboutUs";

const HomePage = () => {
  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        {/* <NavBar /> */}
        <NavBar2 />
      </div>
      <div>
        <h1 className="text-center">AgroTraders</h1>
      </div>
      <div className="container " style={{ width: "80%" }}>
        <Carousel style={{ boxShadow: "0 0 9px rgba(0, 0, 1)" }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img1}
              alt="First slide"
              style={{ height: 550 }}
            />
            <Carousel.Caption>
              <h3 className="text-center">
                Reaping under the hot sun is not easy
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img2}
              alt="Second slide"
              style={{ height: 550 }}
            />

            <Carousel.Caption>
              <h3 className="text-center">We give growth to the economy</h3>
              {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img3}
              alt="Third slide"
              style={{ height: 500 }}
            />

            <Carousel.Caption>
              <h3 className="text-center">
                Our Hand is Dirty to Provide you Clean Food
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div>
          <hr />
          <div className="text-center" style={{ marginTop: "30px" }}>
            <h1 className="my-5">
              Our Sustainability Efforts are Guided by Strong Environmental
              Principles
            </h1>
            <hr />
            <h1>
              <strong>Our Goal</strong>
            </h1>
            <h3>
              Our Main Purpose is to give Farmers and Agriculture a voice of
              Appreciation and Respect.
            </h3>
          </div>

          <div>
            {" "}
            <CardGroup>
              <Card
                className="mx-2"
                style={{ boxShadow: "0 0 9px rgba(0, 0, 1)" }}
              >
                <CardImg top width="100%" src={img5} alt="Card image cap" />
                <CardBody>
                  {/* //<CardTitle className="text-center">Card title</CardTitle> */}

                  <CardText className="text-center">
                    "Without farmers, no country can progress."
                  </CardText>
                </CardBody>
              </Card>
              <Card
                className="mx-2"
                style={{ boxShadow: "0 0 9px rgba(0, 0, 1)" }}
              >
                <CardImg top width="100%" src={img6} alt="Card image cap" />
                <CardBody>
                  {/* // <CardTitle className="text-center">Card title</CardTitle> */}

                  <CardText className="text-center">
                    "No discipline seems pleasant at the time, but later it
                    produces a harvest of righteousness."
                  </CardText>
                </CardBody>
              </Card>
              <Card
                className="mx-2"
                style={{ boxShadow: "0 0 9px rgba(0, 0, 1)" }}
              >
                <CardImg top width="100%" src={img7} alt="Card image cap" />
                <CardBody>
                  {/* //<CardTitle className="text-center">Card title</CardTitle> */}

                  <CardText className="text-center">
                    "A better fruitful future to the farmers who grow us
                    healthier."
                  </CardText>
                </CardBody>
              </Card>
            </CardGroup>
          </div>

          <div style={{ margin: "100px" }}>
            <CardGroup className="ml-1">
              <Card>
                <CardImg top width="100%" src={img8} alt="Card image cap" />
              </Card>
              <Card>
                <CardBody style={{ align: "center", fontSize: "30px" }}>
                  <CardTitle className="text-center">
                    {" "}
                    <strong>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      "Agriculture is our wisest pursuit, because it will in the
                      end contribute most to real wealth, good morals &
                      happiness."
                    </strong>
                  </CardTitle>
                </CardBody>
              </Card>
            </CardGroup>
          </div>

          {/* <div className="row" style={{ marginTop: 25, marginBottom: 100 }}>
            <div className="col-5">
              <img
                src={img8}
                className="card-img-top fertilizerImg"
                alt=""
                style={{ padding: 60 }}
              />
            </div>
          </div>
          <div className="col-7" style={{ marginTop: 150 }}>
            Fertilizer Dealers can sell their products online to the farmers
            directly on this platform such that they can sell at reasonable
            price which will be beneficial for both farmer and himself.
            <p>
              It is all-in-one store for farmers and dealers where they can
              purchase products from any categories like Seeds, Crop protection
              Pesticides, fertilizers etc. for agricultural, residential or
              commercial purposes.
            </p>
          </div> */}
        </div>
      </div>
      <AboutUs />
    </>
  );
};

export default HomePage;

const styles = {
  container: {
    padding: "0px",
    marginRight: "15px",
    marginLeft: "15px",
    borderRadius: "8px",
    borderWidth: "0px",
    borderStyle: "solid",
    boxShadow: "rgb(201 201 201) 1px 1px 20px 5px",
    width: "31%",
  },
  // signinButton: {
  //     position: 'relative',
  //     width: '100%',
  //     height: 40,
  //     backgroundColor: '#db0f62',
  //     color: 'white',
  //     borderRadius: 5,
  //     border: 'none',
  //     margintop: 10,
  // },
};
