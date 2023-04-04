import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "../../components/pagination/pagination";
import { URL } from "../../config";
import Sidebar from "../../components/sidebar/Sidebar";
import { GiWeight } from "react-icons/gi";
import { FaRupeeSign, FaHistory } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { MdConfirmationNumber } from "react-icons/md";

import { Col, Row } from "reactstrap";
import Topbar from "../../components/topbar/Topbar";

//---------
const FarmerBillHistory = () => {
  const { userEmailId } = sessionStorage;
  const [bidHistory, setBidHistory] = useState([]);

  const [showPerPage] = useState(50);
  const [pagination, setPagination] = useState({
    start: 1,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    await axios
      .get(`${URL}/farmerhistory/${userEmailId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        setBidHistory(result);
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
                <h1
                  className="text-center"
                  style={{ fontSize: "40px", paddingTop: "10px" }}
                >
                  HISTORY PAGE <FaHistory fontSize="1em" />
                </h1>

                <table class="table table-success table-striped">
                  <thead class="thead-dark" style={{ textAlign: "center" }}>
                    <tr>
                      <th scope="col">
                        <MdConfirmationNumber fontSize="1em" />
                        Sr.No
                      </th>
                      <th scope="col">Goods Name</th>
                      {/* <th scope="col">Farmer Name</th> */}
                      <th scope="col">Buyer Name</th>
                      <th scope="col">Buyer Contact</th>
                      <th scope="col">Date</th>
                      <th scope="col">
                        Final Price <FaRupeeSign fontSize="1em" />
                      </th>
                      <th scope="col">
                        Quantity(KG)
                        <GiWeight fontSize="1em" />
                      </th>
                      <th scope="col">
                        Total Amount <FaRupeeSign fontSize="1em" />
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {bidHistory
                      .slice(pagination.start, pagination.end)
                      .map((bidHistory, index) => (
                        <tr>
                          <td scope="row">{index + 1}</td>
                          <td scope="row">{bidHistory.goodsName}</td>
                          {/* <td>{bidHistory.farmerName}</td> */}
                          <td>{bidHistory.buyerName}</td>
                          <td>{bidHistory.buyerContact}</td>
                          <td>{bidHistory.date}</td>
                          <td>
                            {bidHistory.finalprice}
                            <BiRupee />
                          </td>
                          <td>{bidHistory.quantity}</td>
                          <td>
                            {bidHistory.totalAmount}
                            <BiRupee />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <Pagination
                      showPerPage={showPerPage}
                      onPaginationChange={onPaginationChange}
                      total={bidHistory.length}
                    />
                  </tfoot>
                </table>
              </div>
            </div>
          </div>{" "}
        </Col>
      </Row>
    </>
  );
};

export default FarmerBillHistory;
