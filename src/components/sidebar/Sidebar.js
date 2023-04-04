import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  MdAddBox,
  MdProductionQuantityLimits,
  MdBorderColor,
  MdNotificationsActive,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { FaUsersSlash, FaUserTie, FaHistory } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiHistoryFill, RiLogoutBoxLine } from "react-icons/ri";
import { Button } from "reactstrap";

const Sidebar = () => {
  const navigate = useNavigate();
  const { userType } = sessionStorage;

  const logoutUser = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userEmailId");
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("loginStatus");
    sessionStorage.removeItem("userToken");

    navigate("/signin");
  };

  return (
    <div className="sidebar ">
      <div className="sidebarWrapper p-1">
        <div className="sidebarMenu p-1">
          <button className="dropdown-item">
            <CgProfile color="black" fontSize="3em" />
            <strong>Hello {sessionStorage.userName}</strong>
          </button>
          <hr />
          {/* ==========================Admin======================= */}
          {userType === "ROLE_ADMIN" && (
            <ul className="sidebarList p-1">
              <li className="sidebarListItem  ">
                <Button outline color="info" size="lg" block>
                  <MdOutlineDashboardCustomize color="black" fontSize="1.4em" />
                  <Link to="/dash">
                    <strong>Dashboard</strong>
                  </Link>
                </Button>
              </li>

              <li className="sidebarListItem">
                <Button outline color="info" size="lg" block>
                  <FaUserTie color="black" fontSize="1.4em" />
                  <Link to="/Admin/AdminActivefarmers">
                    {" "}
                    <strong>Active Farmers</strong>
                  </Link>
                </Button>
              </li>
              <li className="sidebarListItem">
                <Button outline color="info" size="lg" block>
                  <FaUserTie color="black" fontSize="1.4em" />
                  <Link to="/Admin/AdminActivebuyers">
                    {" "}
                    <strong>Active Buyers</strong>
                  </Link>
                </Button>
              </li>
              <li className="sidebarListItem">
                <Button outline color="info" size="lg" block>
                  <FaUsersSlash color="black" fontSize="1.4em" />
                  <Link to="/Admin/DeactivatedUsers">
                    {" "}
                    <strong>Deactivated Users</strong>
                  </Link>
                </Button>
              </li>
              <li className="sidebarListItem">
                <Button outline color="info" size="lg" block>
                  <BiDetail color="black" fontSize="1.4em" />
                  <Link to="/Admin/AdminTodaysBids">
                    <strong>Today's Bids</strong>
                  </Link>
                </Button>
              </li>
              <li className="sidebarListItem">
                <Button outline color="info" size="lg" block>
                  <RiHistoryFill color="black" fontSize="1.4em" />
                  <Link to="/Admin/AdminBidsHistory">
                    {" "}
                    <strong>Bids History</strong>
                  </Link>
                </Button>
              </li>
            </ul>
          )}

          {/* ==========================Farmer======================= */}
          {userType === "ROLE_FARMER" && (
            <ul className="sidebarList p-1">
              <li className="sidebarListItem  ">
                <Button outline color="info" size="lg" block>
                  <MdOutlineDashboardCustomize color="black" fontSize="1.4em" />
                  <Link to="/dash">
                    <strong>Dashboard</strong>
                  </Link>
                </Button>
              </li>

              <li className="sidebarListItem">
                <Button outline color="info" size="lg" block>
                  <MdProductionQuantityLimits color="black" fontSize="1.4em" />
                  <Link to="/products">
                    {" "}
                    <strong>Product</strong>
                  </Link>
                </Button>
              </li>

              <li className="sidebarListItem">
                <Button outline color="info" size="lg" block>
                  <MdAddBox color="black" fontSize="1.4em" />
                  <Link to="/products/add">
                    {" "}
                    <strong>Add Products</strong>
                  </Link>
                </Button>
              </li>

              <li className="sidebarListItem">
                <Button outline color="info" size="lg" block>
                  <FaHistory color="black" fontSize="1.4em" />
                  <Link to="/billing/farmerBillHistory">
                    {" "}
                    <strong>History</strong>
                  </Link>
                </Button>
              </li>
            </ul>
          )}

          {/* ==========================Dealer======================= */}
          {userType === "ROLE_BUYER" && (
            <ul>
              <li className="sidebarListItem  ">
                <Button outline color="info" size="lg" block>
                  <MdOutlineDashboardCustomize color="black" fontSize="1.4em" />
                  <Link to="/dash">
                    <strong>Dashboard</strong>
                  </Link>
                </Button>
              </li>

              <li className="sidebarListItem">
                <Button outline color="info" size="lg" block>
                  <MdProductionQuantityLimits color="black" fontSize="1.4em" />
                  <Link to="/productsBuyer">
                    {" "}
                    <strong>Product List</strong>
                  </Link>
                </Button>
              </li>

              <li className="sidebarListItem">
                <Button outline color="info" size="lg" block>
                  <MdNotificationsActive color="black" fontSize="1.4em" />
                  <Link to="/productsBuyer/PlacedBidsList">
                    {" "}
                    <strong>My Active Bids</strong>
                  </Link>
                </Button>
              </li>

              <li className="sidebarListItem">
                <Button outline color="info" size="lg" block>
                  <FaHistory color="black" fontSize="1.4em" />
                  <Link to="/productsBuyer/BuyerHistory">
                    {" "}
                    <strong>Bid History</strong>
                  </Link>
                </Button>
              </li>
            </ul>
          )}

          {/* ================================FertilizerDealer========================= */}
          {userType === "FertilizerDealer" && (
            <ul>
              <li className="sidebarListItem">
                <Button outline color="info" size="lg" block>
                  <MdBorderColor color="black" fontSize="1.4em" />
                  <Link to="/orders">
                    {" "}
                    <strong>Order</strong>
                  </Link>
                </Button>
              </li>
            </ul>
          )}

          <button onClick={logoutUser} className="dropdown-item">
            <RiLogoutBoxLine color="black" fontSize="1.5em" />
            <strong> Logout</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
