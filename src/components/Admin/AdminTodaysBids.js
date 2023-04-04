import axios from "axios";
import React, { useState, useEffect } from "react";

import Pagination from "../pagination/pagination";
import { URL } from "../../config";
import { useNavigate } from "react-router";
import Sidebar from "../sidebar/Sidebar";
import { GiWeight } from "react-icons/gi";
import { FaRupeeSign, FaHistory } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { MdConfirmationNumber } from "react-icons/md";
import { Col, Row } from "reactstrap";
import Topbar from "../topbar/Topbar";

//---------
const AdminTodaysBids = () => {
  //search item
  const [searchTerm, setSearchTerm] = useState("");
  const [todaysbids, setTodaysbids] = useState([]);
  const [showPerPage] = useState(50);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  const { navigate } = useNavigate();
  useEffect(() => {
    loadtodaysbids();
  }, []);

  const loadtodaysbids = async () => {
    await axios
      .get(`${URL}/todaysbids`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(response.data);
        setTodaysbids(result);
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
          <div className="userList">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search...."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
            <div className="container">
              <div className="py-4">
                <h1 className="text-center" style={{ fontSize: "40px" }}>
                  TODAY'S BIDS <FaHistory fontSize="1em" />
                </h1>
                {/* <table class="table border shadow  sticky"> */}
                <table class="table table-success table-striped">
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
                        Quantity
                        <GiWeight fontSize="1em" />
                      </th>
                      <th scope="col">
                        Total Amount <FaRupeeSign fontSize="1em" />
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {todaysbids
                      .filter((val) => {
                        if (searchTerm === "") {
                          return val;
                        } else if (
                          val.farmerName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .slice(pagination.start, pagination.end)
                      .map((todaysbids, index) => (
                        <tr>
                          <td scope="row">{index + 1}</td>
                          <td>{todaysbids.farmerName}</td>
                          <td>{todaysbids.farmerContact}</td>
                          <td>{todaysbids.buyerName}</td>
                          <td>{todaysbids.buyerContact}</td>
                          <td>{todaysbids.goodsName}</td>
                          <td>{todaysbids.date}</td>
                          <td>
                            {todaysbids.finalprice}
                            <BiRupee />
                          </td>
                          <td>{todaysbids.quantity}</td>
                          <td>
                            {todaysbids.totalAmount}
                            <BiRupee />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <Pagination
                      showPerPage={showPerPage}
                      onPaginationChange={onPaginationChange}
                      total={todaysbids.length}
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

export default AdminTodaysBids;
