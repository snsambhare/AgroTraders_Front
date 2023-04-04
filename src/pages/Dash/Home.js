import React from "react";
import Table from "./Table";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "./Table";
import { Col, Row } from "reactstrap";

const Home = () => {
  return (
    <>
      <Topbar />
      <Row>
        <Col className="col-3">
          <Sidebar />
        </Col>
        <Col className="col-9">
          <Table />
        </Col>
      </Row>
    </>
  );
};

export default Home;
