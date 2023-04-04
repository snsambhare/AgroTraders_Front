import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useNavigate } from "react-router";
import { contactConfig } from "./content_option";

export default function ContactUs() {
  const navigate = useNavigate();
  return (
    <>
      <div className="background1">
        <Container>
          <Row className="mb-5 mt-3">
            <Col lg="8">
              <h1 className="display-4 mb-4">Contact Us</h1>
              <hr className="t_border my-4 ml-0 text-left" />
            </Col>
          </Row>
          <Row className="sec_sp">
            <Col lg="5" className="mb-5">
              <h3 className="color_sec py-4">Get in touch</h3>
              <address>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                  {contactConfig.YOUR_EMAIL}
                </a>
                <br />
                <br />
                {contactConfig.hasOwnProperty("YOUR_FONE") ? (
                  <p>
                    <strong>Phone:</strong> {contactConfig.YOUR_FONE}
                  </p>
                ) : (
                  ""
                )}
              </address>
              <p>{contactConfig.description}</p>
            </Col>
            <Col lg="7" className="d-flex align-items-center">
              <form className="contact__form w-100">
                <Row>
                  <Col lg="6" className="form-group">
                    <input
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Name"
                      type="text"
                      required
                    />
                  </Col>
                  <Col lg="6" className="form-group">
                    <input
                      className="form-control rounded-0"
                      id="email"
                      name="email"
                      placeholder="Email"
                      type="email"
                      required
                    />
                  </Col>
                </Row>
                <div style={{ marginTop: "20px" }}>
                  <textarea
                    className="form-control rounded-0"
                    id="message"
                    name="message"
                    placeholder="Message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <br />
                <Row>
                  <Col lg="12" className="form-group">
                    <Button type="submit" size="lg" color="primary">
                      {" "}
                      Submit
                    </Button>
                    <Button
                      color="info"
                      size="lg"
                      className="mx-2"
                      onClick={() => {
                        navigate(`/`);
                      }}
                    >
                      {/* <Link to="/HomePage"> Home</Link> */}Home
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
