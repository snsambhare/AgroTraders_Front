import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { BiRupee } from "react-icons/bi";
import {
  CardImg,
  CardGroup,
  Row,
  Col,
  Card,
  Button,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
} from "reactstrap";
import "./table.css";
import img12 from "../../images/12.jpeg";
import img13 from "../../images/13.jpg";
import img14 from "../../images/14.jpeg";
import img15 from "../../images/15.jpeg";
import img16 from "../../images/16.jpeg";
import img17 from "../../images/17.jpeg";

function Table() {
  return (
    <>
      <Topbar />
      <Row>
        <Col className="col-3">
          <Sidebar />
        </Col>
        <Col>
          <div className="featured">
            <div className="featuredItem">
              <div className="featuredMoneyContainer">
                <span className="featuredMoney">
                  <b>Rice :-</b>50.00 <BiRupee />
                </span>
              </div>
            </div>
            <div className="featuredItem">
              <div className="featuredMoneyContainer">
                <span className="featuredMoney">
                  <b>Gehu :-</b>35.00 <BiRupee />
                </span>
              </div>
            </div>
            <div className="featuredItem">
              <div className="featuredMoneyContainer">
                <span className="featuredMoney">
                  <b>Soyabin :- </b>80.00 <BiRupee />
                  <p></p>
                </span>
              </div>
            </div>
            <div className="featuredItem">
              <div className="featuredMoneyContainer">
                <span className="featuredMoney">
                  <b>Bajri :-</b>32.00 <BiRupee />
                </span>
              </div>
            </div>
          </div>
          <br />

          <div>
            <CardGroup>
              <Card
                className="mx-2"
                style={{ boxShadow: "0 0 9px rgba(0, 0, 1)" }}
              >
                <CardImg top width="100%" src={img13} alt="Card image cap" />
                <CardBody>
                  <CardTitle className="text-center">Growth</CardTitle>

                  <CardText className="text-center">
                    "Without farmers, no country can progress."
                  </CardText>
                </CardBody>
              </Card>
              <Card
                className="mx-2"
                style={{ boxShadow: "0 0 9px rgba(0, 0, 1)" }}
              >
                <CardImg top width="100%" src={img14} alt="Card image cap" />
                <CardBody>
                  <CardTitle className="text-center">Good Rates</CardTitle>

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
                <CardImg top width="100%" src={img16} alt="Card image cap" />
                <CardBody>
                  <CardTitle className="text-center">Progress</CardTitle>

                  <CardText className="text-center">
                    "Without farmers, no country can progress."
                  </CardText>
                </CardBody>
              </Card>
            </CardGroup>

            <CardGroup style={{ marginTop: "20px" }}>
              <Card
                className="mx-2"
                style={{ boxShadow: "0 0 9px rgba(0, 0, 1)" }}
              >
                <CardImg top width="100%" src={img15} alt="Card image cap" />
                <CardBody>
                  <CardTitle className="text-center">Goods</CardTitle>
                  <CardText className="text-center">
                    "A better fruitful future to the farmers who grow us
                    healthier."
                  </CardText>
                </CardBody>
              </Card>
              <Card
                className="mx-2"
                style={{ boxShadow: "0 0 9px rgba(0, 0, 1)" }}
              >
                <CardImg top width="100%" src={img17} alt="Card image cap" />
                <CardBody>
                  <CardTitle className="text-center">Goods</CardTitle>

                  <CardText className="text-center">
                    "Give Groth to thr farmers Goods "
                  </CardText>
                </CardBody>
              </Card>
              <Card
                className="mx-2"
                style={{ boxShadow: "0 0 9px rgba(0, 0, 1)" }}
              >
                <CardImg top width="100%" src={img12} alt="Card image cap" />
                <CardBody>
                  <CardTitle className="text-center">Future</CardTitle>

                  <CardText className="text-center">
                    "A better fruitful future to the farmers who grow us
                    healthier."
                  </CardText>
                </CardBody>
              </Card>
            </CardGroup>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Table;
