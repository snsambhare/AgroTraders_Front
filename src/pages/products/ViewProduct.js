import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router";
import { URL } from "../../config";
import Sidebar from "../../components/sidebar/Sidebar";
import { AiOutlineRollback } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { GiWeight } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { Col, Row } from "reactstrap";
import { toast } from "react-toastify";
import Topbar from "../../components/topbar/Topbar";

const ViewProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation("");
  const [farmgood, setFarmgood] = useState([]);
  const { products } = state;

  useEffect(() => {
    console.log(products.goodsId);
    getSingle();
  }, []);

  const getSingle = async () => {
    await axios
      .get(`${URL}/getsinglegood/${products.goodsId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(response.data);
        setFarmgood(result);
      });
  };

  return (
    <>
      <div>
        <Topbar />
      </div>

      <Row>
        <Col className="col-3">
          <Sidebar />
        </Col>
        <Col className="col-9">
          <div className="container">
            <Link className="btn btn-primary" to="/products">
              <AiOutlineRollback />
            </Link>
            <div style={{ paddingLeft: "400px", fontSize: "25px" }}>
              <h1 className="display-4" style={{ fontSize: "40px" }}>
                &nbsp;<strong> GOODS DETAILS</strong>
              </h1>

              <ul className="list-group w-100">
                <li className="list-group-item w-50">
                  <b>Good Id :-</b>
                  &nbsp; {farmgood.goodsId}
                </li>
                <li className="list-group-item w-50">
                  <b>Good Name :-</b> &nbsp;
                  {farmgood.goodsName}
                </li>
                <li className="list-group-item w-50">
                  <b>Quantity :- </b> &nbsp;{farmgood.quantity}{" "}
                  <GiWeight fontSize="1em" />
                </li>
                <li className="list-group-item w-50">
                  <b>Expected Price :-</b> &nbsp;{farmgood.expectedPrice}
                  <FaRupeeSign fontSize="1em" />
                </li>
                <li className="list-group-item w-50">
                  <b>Bid Price :-</b>
                  &nbsp;{farmgood.finalPrice}
                  <FaRupeeSign fontSize="1em" />
                </li>
                <li className="list-group-item w-50">
                  <b>Status:-</b> &nbsp;{farmgood.status}
                </li>
                <li className="list-group-item w-50">
                  <b>Buyer Id :- </b> &nbsp;{farmgood.buyerId}
                </li>
              </ul>
              <br />

              <div style={{ paddingLeft: "105px" }}>
                <Button
                  size="lg"
                  onClick={() => {
                    if (farmgood.buyerId != "None") {
                      navigate(`/products/receipt`, {
                        state: { farmgood: farmgood },
                      });
                      toast.success("Bid Ended Sucessfully", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    } else {
                      toast.warn("Bid is Not Placed yet!!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }
                  }}
                  block
                >
                  End Bid
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ViewProduct;
