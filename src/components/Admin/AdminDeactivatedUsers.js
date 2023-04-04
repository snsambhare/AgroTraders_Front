import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "../pagination/pagination";
import { URL } from "../../config";
import Sidebar from "../sidebar/Sidebar";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Button } from "reactstrap";
import { Col, Row } from "reactstrap";
import Topbar from "../topbar/Topbar";

const AdminDeactivatedUsers = () => {
  const [deactivatedUsers, setDeactivatedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPerPage] = useState(50);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    loaddeactivatedusers();
  }, []);

  const loaddeactivatedusers = async () => {
    await axios
      .get(`${URL}/deactivatedusers`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(result);
        setDeactivatedUsers(result);
      });
  };

  const ActivateUser = async (userId) => {
    await axios
      .get(`${URL}/activateuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(result);
        loaddeactivatedusers();
        toast.success("User Activated Successfully");
      });
  };
  const deleteUser = async (userId) => {
    await axios
      .delete(`${URL}/deleteuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(result.data);
        loaddeactivatedusers();
        toast.warning("User deleted !!");
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

            <div className="container">
              <div className="py-4">
                <h1 className="text-center" style={{ fontSize: "40px" }}>
                  DEACTIVATED USERS
                </h1>

                <table class="table table-success table-striped">
                  <thead class="thead-dark" style={{ textAlign: "center" }}>
                    <tr>
                      <th scope="col">Sr. No</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Mobile No.</th>
                      <th scope="col">
                        Email Id
                        <MdEmail fontSize="1em" />
                      </th>
                      <th scope="col">City</th>
                      <th scope="col">State</th>
                      <th scope="col">Pincode</th>
                      <th scope="col">User Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {deactivatedUsers
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
                      .map((deactivatedUsers, index) => (
                        <tr>
                          <td scope="row">{index + 1}</td>
                          <td>{deactivatedUsers.userName}</td>
                          <td>{deactivatedUsers.userMobileNo}</td>
                          <td>{deactivatedUsers.userEmailId}</td>
                          <td>{deactivatedUsers.city}</td>
                          <td>{deactivatedUsers.state}</td>
                          <td>{deactivatedUsers.pincode}</td>
                          <td>{deactivatedUsers.userType}</td>
                          <td>
                            <Button
                              color="success"
                              onClick={() =>
                                ActivateUser(deactivatedUsers.userId)
                              }
                            >
                              Activate
                            </Button>

                            <Button
                              color="danger"
                              onClick={() =>
                                deleteUser(deactivatedUsers.userId)
                              }
                            >
                              {" "}
                              <RiDeleteBin6Line fontSize="1.5em" />
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <Pagination
                      showPerPage={showPerPage}
                      onPaginationChange={onPaginationChange}
                      total={deactivatedUsers.length}
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

export default AdminDeactivatedUsers;
