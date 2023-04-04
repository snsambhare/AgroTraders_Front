import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "../pagination/pagination";
import { URL } from "../../config";
import Sidebar from "../sidebar/Sidebar";
import { Table } from "react-bootstrap";
import { Col, Row } from "reactstrap";
import { GiWeight } from "react-icons/gi";
import { FaRupeeSign, FaHistory } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { MdConfirmationNumber } from "react-icons/md";
import Topbar from "../topbar/Topbar";

//---------
const AdminBidsHistory = () => {
  const [allbidsHistory, setAllbidsHistory] = useState([]);
  const [showPerPage] = useState(50);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    loadallbidshistory();
  }, []);

  const loadallbidshistory = async () => {
    await axios
      .get(`${URL}/bidshistory`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(response.data);
        setAllbidsHistory(result);
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
                  BIDS HISTORY <FaHistory fontSize="1em" />
                </h1>
                <Table striped class="table table-success table-striped">
                  <thead class="thead-dark" style={{ textAlign: "center" }}>
                    <tr>
                      <th scope="col">
                        <MdConfirmationNumber fontSize="1em" />
                        Sr. No
                      </th>
                      <th scope="col">Farmer Name</th>
                      <th scope="col">Farmer Contact</th>
                      <th scope="col">Buyer Name</th>
                      <th scope="col">Buyer Contact</th>
                      <th scope="col">Goods Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">
                        Bid Price <FaRupeeSign fontSize="1em" />
                      </th>
                      <th scope="col">
                        Quantity <GiWeight fontSize="1em" />
                      </th>
                      <th scope="col">
                        Total Amount <FaRupeeSign fontSize="1em" />
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {allbidsHistory
                      .slice(pagination.start, pagination.end)
                      .map((allbidsHistory, index) => (
                        <tr>
                          <td scope="row">{index + 1}</td>
                          <td>{allbidsHistory.farmerName}</td>
                          <td>{allbidsHistory.farmerContact}</td>
                          <td>{allbidsHistory.buyerName}</td>
                          <td>{allbidsHistory.buyerContact}</td>
                          <td>{allbidsHistory.goodsName}</td>
                          <td>{allbidsHistory.date}</td>
                          <td>
                            {allbidsHistory.finalprice}
                            <BiRupee />
                          </td>
                          <td>{allbidsHistory.quantity}</td>
                          <td>
                            {allbidsHistory.totalAmount}
                            <BiRupee />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <Pagination
                      showPerPage={showPerPage}
                      onPaginationChange={onPaginationChange}
                      total={allbidsHistory.length}
                    />
                  </tfoot>
                </Table>
              </div>
            </div>
          </div>{" "}
        </Col>
      </Row>
    </>
  );
};

export default AdminBidsHistory;
