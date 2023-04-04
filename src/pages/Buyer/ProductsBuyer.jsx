import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "../../components/pagination/pagination";
import { URL } from "../../config";
import { useNavigate } from "react-router";
import Sidebar from "../../components/sidebar/Sidebar";

import { GiWeight } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { GrView, GrHistory } from "react-icons/gr";
import { AiFillInteraction } from "react-icons/ai";
import { MdConfirmationNumber } from "react-icons/md";
import { Col, Row } from "reactstrap";
import Topbar from "../../components/topbar/Topbar";

function ProductsBuyer() {
  const navigate = useNavigate();
  const [buyerProducts, setBuyerProducts] = useState([]);
  const { userEmailId } = sessionStorage;
  const [q, setQ] = useState("");
  const [searchParam] = useState(["goodsName"]);
  const [showPerPage, setShowPerPage] = useState(50);

  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    loadbuyerProducts();
  }, []);

  const loadbuyerProducts = async () => {
    await axios
      .get(`${URL}/fetchfarmgoods/${userEmailId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(response.data);
        setBuyerProducts(result);
      });
  };

  return (
    <>
      <Topbar />
      <Row>
        <Col className="col-3">
          <Sidebar />
        </Col>
        <Col className="col-9">
          <div className="billingList">
            <div className="search-bar form-control-lg">
              <input
                type="search"
                name="search-form"
                placeholder="Search Good Name"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                }}
              />
            </div>
            <div className="billingList">
              <div className="container">
                <div className="py-4">
                  <h1 className="text-center" style={{ fontSize: "40px" }}>
                    <HiOutlineClipboardList fontSize={"1.2em"} /> GOODS LIST
                  </h1>

                  <table class="table table-success table-striped">
                    <thead class="thead-dark" style={{ textAlign: "center" }}>
                      <tr>
                        <th scope="col">
                          <MdConfirmationNumber fontSize="1em" />
                          Sr No
                        </th>
                        <th scope="col">Farmer Name</th>
                        <th scope="col">Goods Name</th>
                        <th scope="col">
                          Expected Price <FaRupeeSign fontSize="1em" />
                        </th>
                        <th scope="col">
                          Quantity
                          <GiWeight fontSize="1.5em" />
                        </th>
                        <th scope="col">
                          Bid Price <FaRupeeSign fontSize="1em" />
                        </th>
                        {/* <th scope="col">Buyer Id</th> */}
                        <th scope="col">Status</th>
                        <th>
                          Action <AiFillInteraction fontSize="1em" />
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      {buyerProducts
                        .filter((val) => {
                          return searchParam.some((newVal) => {
                            return (
                              val[newVal]
                                .toString()
                                .toLowerCase()
                                .indexOf(q.toLocaleLowerCase()) > -1
                            );
                          });
                        })
                        .slice(pagination.start, pagination.end)
                        .map((buyerProducts, index) => (
                          <tr>
                            <td scope="row">{index + 1}</td>
                            <td scope="row">
                              {buyerProducts.farmer.userinfo.userName}
                            </td>
                            <td>{buyerProducts.goodsName}</td>
                            <td>
                              {buyerProducts.expectedPrice}
                              <BiRupee />
                            </td>
                            <td>
                              {buyerProducts.quantity}
                              <GiWeight />
                            </td>
                            <td>
                              {buyerProducts.finalPrice}
                              <BiRupee />
                            </td>
                            {/* <td>{buyerProducts.buyerId}</td> */}
                            <td>{buyerProducts.status}</td>
                            {/* <td>
                        {user.productStatus === 0 ? "Disabled" : "enabled"}
                      </td> */}
                            <td>
                              <button
                                onClick={() => {
                                  navigate(`/productsBuyer/PlaceBid`, {
                                    state: { buyerProducts: buyerProducts },
                                  });
                                }}
                                className="btn btn-success"
                              >
                                <GrView fontSize="1em" />
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                    <tfoot>
                      <Pagination
                        showPerPage={showPerPage}
                        onPaginationChange={onPaginationChange}
                        total={buyerProducts.length}
                      />
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>{" "}
        </Col>
      </Row>
    </>
  );
}

export default ProductsBuyer;
