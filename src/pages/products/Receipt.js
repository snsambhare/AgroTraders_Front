import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useLocation } from "react-router";
import { URL } from "../../config";
import Sidebar from "../../components/sidebar/Sidebar";
import { AiOutlineRollback } from "react-icons/ai";
import { MdReceipt, MdPermContactCalendar } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { Button } from "react-bootstrap";
import { Col, Row } from "reactstrap";
import { toast } from "react-toastify";
const { userEmailId } = sessionStorage;

const Receipt = () => {
  const navigate = useNavigate();
  const { state } = useLocation("");
  const [bidentity, setBidentity] = useState([]);
  const { farmgood } = state;

  useEffect(() => {
    console.log(farmgood.goodsId);
    endBid();
  }, []);

  const endBid = async () => {
    await axios
      .get(`${URL}/endbid/${farmgood.goodsId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(response.data);
        setBidentity(result);
      });
  };

  const generateemail = async (userEmailId) => {
    let subject = "Bid Closed || Receipt ";
    let message =
      "Goods Name: " +
      bidentity.goodsName +
      "\n" +
      "Farmer Name: " +
      bidentity.farmerName +
      "\n" +
      "Farmer Contact: " +
      bidentity.farmerContact +
      "\n" +
      "Buyer Name: " +
      bidentity.buyerName +
      "\n" +
      "Buyer Contact: " +
      bidentity.buyerContact +
      "\n" +
      "Final Bid Price: " +
      bidentity.finalprice +
      "\n" +
      "Quantity: " +
      bidentity.quantity +
      "\n" +
      "Total Amount: " +
      bidentity.totalAmount +
      "\n";

    let buyerid = bidentity.buyerId;
    let farmeremail = sessionStorage.getItem("userEmailId");
    const body = {
      farmeremail,
      buyerid,
      subject,
      message,
    };

    await axios
      .post(`${URL}/endbidsendemail`, body, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        if (response.data === "Email sent") {
          toast.success("Check Mail for Receipt details");
        } else if (response.data === "Email not sent !!") {
          toast.error("Unable send Receipt Details");
        } else if (response.data === "User Is Not Registered") {
          toast.warning(response.data);
        }

        navigate("/products");
      });
  };

  return (
    <>
      <Row>
        <Col className="col-3">
          <Sidebar />
        </Col>
        <Col className="col-9">
          <div className="container">
            <Link className="btn btn-primary" to="/products">
              <AiOutlineRollback />
            </Link>

            <div className="w-75 mx-auto shadow p-5">
              <h2
                className="text-center mb-4 text-center"
                style={{ fontSize: "70px" }}
              >
                Receipt <MdReceipt fontSize="1.2em" />
              </h2>

              <div>
                <lable className=" form-control-lg">
                  <strong>Farmer's Name :-</strong>
                </lable>

                <input
                  type="Name"
                  className="form-control form-control-lg"
                  value={bidentity.farmerName}
                  disabled
                />
              </div>
              <br />
              <div>
                <lable className=" form-control-lg">
                  <strong>Goods Name :-</strong>
                </lable>

                <input
                  type="Name"
                  className="form-control form-control-lg"
                  value={bidentity.goodsName}
                  disabled
                />
              </div>
              <br />

              <div>
                <lable className=" form-control-lg">
                  <strong>Buyer's Name :-</strong>
                </lable>

                <input
                  type="Name"
                  className="form-control form-control-lg"
                  value={bidentity.buyerName}
                  disabled
                />
              </div>
              <br />
              <div>
                <lable className=" form-control-lg">
                  <strong>
                    Final Price <FaRupeeSign fontSize="1.3em" />
                  </strong>{" "}
                  :-
                </lable>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  value={bidentity.finalprice}
                  disabled
                />
              </div>
              <br />
              <div>
                <lable className=" form-control-lg">
                  <strong>
                    Quantity (KG) <GiWeight fontSize="1.3em" />
                    :-
                  </strong>
                </lable>

                <input
                  type="number"
                  className="form-control form-control-lg"
                  value={bidentity.quantity}
                  disabled
                />
              </div>
              <br />
              <div>
                <lable className=" form-control-lg">
                  <strong>
                    Total Amount <FaRupeeSign fontSize="1.3em" /> :-
                  </strong>
                </lable>

                <input
                  type="number"
                  className="form-control form-control-lg"
                  value={bidentity.totalAmount}
                  disabled
                />
              </div>
              <br />
              <div>
                <lable className=" form-control-lg">
                  <strong>
                    Buyer Contact
                    <MdPermContactCalendar fontSize="1.3em" /> :-
                  </strong>
                </lable>

                <input
                  type="number"
                  className="form-control form-control-lg"
                  value={bidentity.buyerContact}
                  disabled
                />
              </div>
              <br />
              <div style={{ paddingLeft: "300px" }}>
                <Button onClick={() => generateemail(userEmailId)} size="lg">
                  Done
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Receipt;
