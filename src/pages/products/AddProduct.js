import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { URL } from "../../config";
import Sidebar from "../../components/sidebar/Sidebar";
import { AiOutlineRollback } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { toast } from "react-toastify";
import { Button, Col, Row } from "reactstrap";
import Topbar from "../../components/topbar/Topbar";

function AddProduct() {
  const navigate = useNavigate();
  const [goodsName, setgoodsName] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const { userEmailId } = sessionStorage;

  useEffect(() => {
    handleCategory();
  }, []);

  const handleCategory = async (e) => {
    console.log(e);
  };
  const addProduct = async (event) => {
    const body = {
      goodsName,
      expectedPrice,
      quantity,
      userEmailId,
    };

    await axios
      .post(`${URL}/addgoods`, body, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(result);
        toast.success(result);
        navigate("/products");
      })
      .catch((error) => {
        toast.error("Error");
      });
  };

  return (
    <>
      <div>
        <Topbar />
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
                  style={{ fontSize: "50px" }}
                >
                  <IoMdAddCircleOutline fontSize="1em" />
                  ADD PRODUCT
                </h2>
                <div className="form-group">
                  <div>
                    <lable className=" form-control-lg">
                      <strong>Product Name :-</strong>
                    </lable>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter Product Name"
                      name="goodsName"
                      value={goodsName}
                      required
                      onChange={(e) => {
                        setgoodsName(e.target.value);
                      }}
                    />
                  </div>
                  <br />

                  <div>
                    <lable className=" form-control-lg">
                      <strong>
                        Product Expected Price <FaRupeeSign fontSize="1em" />
                      </strong>
                      :-
                    </lable>

                    <input
                      type="number"
                      className="form-control form-control-lg"
                      placeholder="Enter Product Price"
                      name="expectedPrice"
                      value={expectedPrice}
                      required
                      onChange={(e) => {
                        setExpectedPrice(e.target.value);
                      }}
                    />
                  </div>
                  <br />

                  <div>
                    <lable className=" form-control-lg">
                      <strong>
                        {" "}
                        Product Quantity <GiWeight fontSize="1em" />
                        :-{" "}
                      </strong>
                    </lable>

                    <input
                      type="number"
                      className="form-control form-control-lg"
                      placeholder="Enter Product Quantity In KG"
                      name="quantity"
                      value={quantity}
                      required
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    />
                  </div>
                  <br />

                  <Button
                    color="primary"
                    size="lg"
                    onClick={addProduct}
                    className="btn btn-primary btn-block"
                  >
                    Add product
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddProduct;
