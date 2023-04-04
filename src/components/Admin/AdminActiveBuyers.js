import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "../pagination/pagination";
import { useNavigate } from "react-router";
import { URL } from "../../config";
import Sidebar from "../sidebar/Sidebar";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import { MdConfirmationNumber } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { Button } from "reactstrap";
import Topbar from "./../topbar/Topbar";

const AdminActiveBuyers = () => {
  const [activebuyers, setActivebuyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPerPage, setShowPerPage] = useState(50);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    loadActiveBuyers();
  }, []);

  const loadActiveBuyers = async () => {
    await axios
      .get(`${URL}/activegoodsbuyers`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(result);
        setActivebuyers(result);
      });
  };

  const deactivateUser = async (userId) => {
    await axios
      .get(`${URL}/deactivateuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(result);
        loadActiveBuyers();
        toast.success("User Deactivated");
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
            <div
              className="search-bar form-control-lg"
              // style={{
              //   border: "2px solid black",
              //   width: "300px",
              //   borderRadius: "25px",
              // }}
            >
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
                  ACTIVE BUYERS
                </h1>

                <table class="table table-success table-striped">
                  <thead class="thead-dark" style={{ textAlign: "center" }}>
                    <tr>
                      <th scope="col">
                        <MdConfirmationNumber fontSize="1em" />
                        Sr. No
                      </th>
                      <th scope="col">Buyer's Name</th>
                      <th scope="col">Mobile No.</th>
                      <th scope="col">
                        Email Id
                        <MdEmail fontSize="1em" />
                      </th>
                      <th scope="col">City</th>
                      <th scope="col">State</th>
                      <th scope="col">Pincode</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {activebuyers
                      .filter((val) => {
                        if (searchTerm === "") {
                          return val;
                        } else if (
                          val.userName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .slice(pagination.start, pagination.end)
                      .map((activebuyers, index) => (
                        <tr>
                          <td scope="row">{index + 1}</td>
                          <td>{activebuyers.userName}</td>
                          <td>{activebuyers.userMobileNo}</td>
                          <td>{activebuyers.userEmailId}</td>
                          <td>{activebuyers.city}</td>
                          <td>{activebuyers.state}</td>
                          <td>{activebuyers.pincode}</td>
                          <td>
                            <Button
                              color="warning"
                              onClick={() =>
                                deactivateUser(activebuyers.userId)
                              }
                            >
                              Deactivate
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <Pagination
                      showPerPage={showPerPage}
                      onPaginationChange={onPaginationChange}
                      total={activebuyers.length}
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

export default AdminActiveBuyers;
