import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "../../components/pagination/pagination";
import { URL } from "../../config";
import Sidebar from "../../components/sidebar/Sidebar";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import { MdConfirmationNumber } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { AiFillInteraction } from "react-icons/ai";
import { Button } from "reactstrap";
import Topbar from "../topbar/Topbar";

const AdminActiveFarmers = () => {
  const [activefarmers, setActivefarmers] = useState([]);

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
    loadActiveFarmers();
  }, []);

  const loadActiveFarmers = async () => {
    await axios
      .get(`${URL}/activefarmers`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(result);
        setActivefarmers(result);
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
        loadActiveFarmers();
        toast.success("User Deactivated Successfully");
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
              //   border: "4px solid black",
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
            {/* <button>
          <Link className="btn " to="/trials/add">
            Add User
          </Link>
        </button> */}
            <div className="container">
              <div className="py-4">
                <h1 className="text-center" style={{ fontSize: "40px" }}>
                  ACTIVE FARMERS
                </h1>

                <table class="table table-success table-striped">
                  <thead class="thead-dark" style={{ textAlign: "center" }}>
                    <tr>
                      <th scope="col">
                        <MdConfirmationNumber fontSize="1em" />
                        Sr. No
                      </th>
                      <th scope="col">Farmer's Name</th>
                      <th scope="col">Mobile No.</th>
                      <th scope="col">
                        Email Id
                        <MdEmail fontSize="1em" />
                      </th>
                      <th scope="col">City</th>
                      <th scope="col">State</th>
                      <th scope="col">Pincode</th>
                      <th>
                        Action <AiFillInteraction fontSize="1em" />
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {activefarmers
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
                      .map((activefarmers, index) => (
                        <tr>
                          <td scope="row">{index + 1}</td>
                          <td>{activefarmers.userName}</td>
                          <td>{activefarmers.userMobileNo}</td>
                          <td>{activefarmers.userEmailId}</td>
                          <td>{activefarmers.city}</td>
                          <td>{activefarmers.state}</td>
                          <td>{activefarmers.pincode}</td>
                          <td>
                            <Button
                              color="warning"
                              onClick={() =>
                                deactivateUser(activefarmers.userId)
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
                      total={activefarmers.length}
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

export default AdminActiveFarmers;
