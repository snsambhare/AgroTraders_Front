import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/pagination";
import { URL } from "../../config";
import { useNavigate } from "react-router";
import Sidebar from "../../components/sidebar/Sidebar";
import { GiWeight } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView, GrStatusGood } from "react-icons/gr";
import { AiFillInteraction } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { Button, Col, Row } from "reactstrap";
import Topbar from "../../components/topbar/Topbar";

function Products() {
  const navigate = useNavigate();
  const { userEmailId } = sessionStorage;
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [showPerPage] = useState(50);
  const [searchParam] = useState(["goodsName"]);

  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    await axios
      .get(`${URL}/viewgoods/${userEmailId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        console.log(result.data);
        setProducts(result);
      });
  };

  const deleteProducts = async (goodsId) => {
    await axios.delete(`${URL}/deletegoods/${goodsId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    loadProduct();
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
            <Row>
              <Col className="col-5">
                <div className="search-bar form-control-lg">
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
              </Col>
              <Col className="col-7">
                <div style={{ paddingLeft: "450px" }}>
                  <Button color="info" size="lg">
                    <Link className="btn " to="/products/add">
                      Add Product
                    </Link>
                  </Button>
                </div>
              </Col>
            </Row>
            <div className="container">
              <div className="">
                <h1 className="text-center" style={{ fontSize: "40px" }}>
                  <FaClipboardList fontSize="1.2em" /> PRODUCT LIST
                </h1>

                <table className="table table-success table-striped">
                  <thead className="thead-dark" style={{ textAlign: "center" }}>
                    <tr>
                      <th scope="col">Goods Name</th>
                      <th scope="col">
                        Expected Price
                        <FaRupeeSign fontSize="1em" />
                      </th>
                      <th scope="col">
                        Goods Quantity(KG) <GiWeight fontSize="1em" />
                      </th>
                      <th scope="col">
                        Bid Price
                        <FaRupeeSign fontSize="1em" />
                      </th>
                      <th scope="col">Buyer Id</th>
                      <th scope="col">
                        Status <GrStatusGood fontSize="1em" />
                      </th>
                      <th>
                        Action <AiFillInteraction fontSize="1em" />
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {products
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
                      .map((products, index) => (
                        <tr>
                          {/* <td scope="row">{index + 1}</td> */}
                          {/* <td scope="row">{products.goodsId}</td> */}
                          <td>{products.goodsName}</td>
                          <td>
                            {products.expectedPrice}
                            <BiRupee />
                          </td>
                          <td>
                            {products.quantity}
                            <GiWeight />
                          </td>
                          <td>
                            {products.finalPrice}
                            <BiRupee />
                          </td>
                          <td>{products.buyerId}</td>
                          <td>{products.status} </td>
                          {/* <td>
                        {user.productStatus === 0 ? "Disabled" : "enabled"}
                      </td> */}
                          <td>
                            <button
                              onClick={() => {
                                navigate(
                                  `/products/viewProduct/${products.goodsId}`,
                                  {
                                    state: { products: products },
                                  }
                                );
                              }}
                              className="btn btn-success"
                            >
                              <GrView fontSize="1em" />
                              View
                            </button>

                            <button
                              class="btn btn-danger size=sm"
                              onClick={() => deleteProducts(products.goodsId)}
                            >
                              <RiDeleteBin6Line fontSize="1em" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <Pagination
                      showPerPage={showPerPage}
                      onPaginationChange={onPaginationChange}
                      total={Products.length}
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
}

export default Products;
