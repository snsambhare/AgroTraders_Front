import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "../../components/pagination/pagination";
import { URL } from "../../config";
import Sidebar from "../../components/sidebar/Sidebar";

import { GiWeight } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { GrHistory } from "react-icons/gr";
import { MdConfirmationNumber } from "react-icons/md";
import { Col, Row } from "reactstrap";
import Topbar from "../../components/topbar/Topbar";

//---------
const BuyerHistory = () => {
  const { userEmailId } = sessionStorage;
  const [buyerBidHistory, setBuyerBidHistory] = useState([]);

  //to show pages
  const [showPerPage, setShowPerPage] = useState(50);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    loadbuyerhistory();
  }, []);

  const loadbuyerhistory = async () => {
    await axios
      .get(`${URL}/buyerhistory/${userEmailId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(response.data);
        setBuyerBidHistory(result);
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
            <div className="container">
              <div className="py-4">
                <h1 className="text-center" style={{ fontSize: "40px" }}>
                  <GrHistory fontSize="1.2em" />
                  HISTORY PAGE
                </h1>
                <table class="table table-success table-striped">
                  <thead class="thead-dark" style={{ textAlign: "center" }}>
                    <tr>
                      <th scope="col">
                        <MdConfirmationNumber fontSize="1em" />
                        Sr. No
                      </th>
                      <th scope="col">Goods Name</th>
                      <th scope="col">Farmer Name</th>
                      <th scope="col">Farmer Contact</th>
                      <th scope="col">Date</th>
                      <th scope="col">
                        Final Price{" "}
                        <FaRupeeSign
                          fontSize="1em"
                          style={{ textAlign: "right" }}
                        />
                      </th>
                      <th scope="col">
                        Quantity <GiWeight fontSize="1em" />
                      </th>
                      <th scope="col">
                        Total Amount
                        <FaRupeeSign fontSize="1em" />
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {buyerBidHistory
                      .slice(pagination.start, pagination.end)
                      .map((buyerBidHistory, index) => (
                        <tr>
                          <td scope="row">{index + 1}</td>
                          <td>{buyerBidHistory.goodsName}</td>
                          <td>{buyerBidHistory.farmerName}</td>
                          <td>{buyerBidHistory.farmerContact}</td>
                          {/* <td>{buyerBidHistory.buyerName}</td> */}
                          <td>{buyerBidHistory.date}</td>
                          <td>
                            {buyerBidHistory.finalprice} <BiRupee />
                          </td>
                          <td>
                            {buyerBidHistory.quantity}
                            <GiWeight />
                          </td>
                          <td>
                            {buyerBidHistory.totalAmount}
                            <BiRupee />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <Pagination
                      showPerPage={showPerPage}
                      onPaginationChange={onPaginationChange}
                      total={buyerBidHistory.length}
                    />
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BuyerHistory;
