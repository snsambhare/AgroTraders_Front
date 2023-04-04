import axios from "axios";
import React, { useState, useEffect } from "react";
import { URL } from "../../config";
import { useLocation, useNavigate } from "react-router";
import Sidebar from "../../components/sidebar/Sidebar";
import { toast } from "react-toastify";
import Topbar from "../../components/topbar/Topbar";
import { Col, Row } from "reactstrap";

const PlaceBid = () => {
  const navigate = useNavigate();
  const { state } = useLocation("");
  const [farmgood, setFarmgood] = useState([]);
  const { buyerProducts } = state;
  const [finalPrice, setFinalPrice] = useState();
  const [goodsId, setGoodsId] = useState();
  const { userEmailId } = sessionStorage;

  useEffect(() => {
    console.log(buyerProducts.goodsId);
    console.log("useeffect");
    getSingle();
  }, []);

  const getSingle = async () => {
    await axios
      .get(`${URL}/fetchsinglegood/${buyerProducts.goodsId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(response.data);
        setFarmgood(result);
        setGoodsId(result.goodsId);
      });
  };

  const Placefinalprice = async () => {
    const body = {
      goodsId,
      finalPrice,
      userEmailId,
    };

    await axios
      .post(`${URL}/placebid`, body, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(result);
        toast.success("Bid Placed");
        navigate("/productsBuyer/PlacedBidsList");
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  return (
    <>
      <Topbar />
      <Row>
        <Col className="col-3">
          <Sidebar />
        </Col>
        <Col>
          <div className="billingList">
            <div className="container">
              <div
                className="py-3"
                style={{ paddingLeft: "200px", paddingRight: "200px" }}
              >
                <h1 className="text-center" style={{ fontSize: "40px" }}>
                  Place Bid
                </h1>

                <div className="form-group">
                  <div>
                    <lable className=" form-control-lg">
                      <strong>Goods Name :-</strong>
                    </lable>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={farmgood.goodsName}
                      disabled
                    />
                  </div>
                  <br />
                  {/* <div>
                <lable className=" form-control-lg">
                  <strong>Farmer Name :-</strong>
                </lable>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={farmgood.farmer.userinfo.userName}
                  disabled
                />
              </div>
              <br /> */}

                  <div>
                    <lable className=" form-control-lg">
                      <strong> Expected Price :-</strong>
                    </lable>

                    <input
                      type="number"
                      className="form-control form-control-lg"
                      value={farmgood.expectedPrice}
                      disabled
                    />
                  </div>
                  <br />

                  <div>
                    <lable className=" form-control-lg">
                      <strong>Goods Quantity (KG):-</strong>
                    </lable>

                    <input
                      type="number"
                      className="form-control form-control-lg"
                      value={farmgood.quantity}
                      disabled
                    />
                  </div>
                  <br />

                  <div>
                    <lable className=" form-control-lg">
                      <strong>Goods Bid Price :-</strong>
                    </lable>

                    <input
                      type="number"
                      className="form-control form-control-lg"
                      value={farmgood.finalPrice}
                      disabled
                    />
                  </div>
                  <br />

                  <div>
                    <lable className=" form-control-lg">
                      <strong>Status :-</strong>
                    </lable>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={farmgood.status}
                      disabled
                    />
                  </div>
                  <br />

                  <div>
                    <lable className=" form-control-lg">
                      <strong>Goods Buyer Id:-</strong>
                    </lable>

                    <input
                      type="number"
                      className="form-control form-control-lg"
                      value={farmgood.buyerId}
                      disabled
                    />
                  </div>
                  <br />

                  <div>
                    <lable className=" form-control-lg">
                      {" "}
                      <strong>Enter Bid Price :-</strong>{" "}
                    </lable>
                    <input
                      type="number"
                      name="finalPrice"
                      className="form-control form-control-lg"
                      placeholder="Enter your bid price here!!"
                      onChange={(e) => {
                        setFinalPrice(e.target.value);
                      }}
                    />
                  </div>
                  <br />

                  <button onClick={Placefinalprice} className="btn btn-success">
                    Place Bid
                  </button>
                </div>
              </div>
            </div>
          </div>{" "}
        </Col>
      </Row>
    </>
  );
};

export default PlaceBid;
