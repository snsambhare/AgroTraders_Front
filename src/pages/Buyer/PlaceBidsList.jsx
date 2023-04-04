import axios from "axios";
import React, { useState, useEffect } from "react";
import Pagination from "../../components/pagination/pagination";
import { URL } from "../../config";
import { useNavigate } from "react-router";
import Sidebar from "../../components/sidebar/Sidebar";
import { GiWeight } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { MdConfirmationNumber, MdNotificationsActive } from "react-icons/md";
import { Col, Row } from "reactstrap";
import Topbar from "../../components/topbar/Topbar";
import { Button } from "reactstrap";
import { toast } from "react-toastify";

function PlacedBidsList() {
  const navigate = useNavigate();
  const [bidsList, setBidsList] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["goodsName"]);
  const { userEmailId } = sessionStorage;
  const [showPerPage] = useState(50);

  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    loadBidsList();
  }, []);

  const loadBidsList = async () => {
    await axios
      .get(`${URL}/viewmybids/${userEmailId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(response.data);
        setBidsList(result);
      });
  };
  const CancelMyBid = async (goodsId) => {
    await axios
      .get(`${URL}/cancelmybid/${goodsId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        //console.log(result);
        loadBidsList();
        toast.success("Bid Cancled");
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
          <div className="billingList ">
            <div
              className="search-bar form-control-lg"
              // style={{
              //   border: "4px solid black",
              //   width: "300px",
              //   borderRadius: "25px",
              // }}
            >
              <input
                type="search"
                name="search-form"
                placeholder="Search...."
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                }}
              />
            </div>
            {/* <button>
          <Link className="btn " to="/products/add">
            Add Product
          </Link>
        </button> */}
            <div className="container">
              <div className="py-4">
                <h1 className="text-center" style={{ fontSize: "40px" }}>
                  <MdNotificationsActive fontSize="1.2em" />
                  ACTIVE BIDS
                </h1>

                <table class="table table-success table-striped">
                  <thead class="thead-dark" style={{ textAlign: "center" }}>
                    <tr>
                      <th scope="col">
                        <MdConfirmationNumber fontSize="1em" />
                        Sr.No{" "}
                      </th>
                      <th scope="col">Farmer Name </th>
                      <th scope="col">Goods Name</th>
                      <th scope="col">
                        Expected Price <FaRupeeSign fontSize="1em" />
                      </th>
                      <th scope="col">
                        Quantity
                        <GiWeight fontSize="1em" />
                      </th>
                      <th scope="col">
                        Bid Price <FaRupeeSign fontSize="1em" />
                      </th>
                      <th scope="col">Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {bidsList
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
                      .map((bidsList, index) => (
                        <tr>
                          <td scope="row">{index + 1}</td>
                          <td scope="row">
                            {bidsList.farmer.userinfo.userName}
                          </td>
                          <td>{bidsList.goodsName}</td>
                          <td>
                            {bidsList.expectedPrice}
                            <BiRupee />
                          </td>
                          <td>
                            {bidsList.quantity}
                            <GiWeight />
                          </td>
                          <td>
                            {bidsList.finalPrice}
                            <BiRupee />
                          </td>
                          <td>{bidsList.status}</td>
                          <td>
                            <Button
                              color="success"
                              onClick={() => CancelMyBid(bidsList.goodsId)}
                            >
                              Cancel Bid
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <Pagination
                      showPerPage={showPerPage}
                      onPaginationChange={onPaginationChange}
                      total={bidsList.length}
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
}

export default PlacedBidsList;
