import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import HomePage from "./components/HomePage/HomePage";
import RegisterPage from "./components/SignIn/RegisterPage";
import SignIn from "./components/SignIn/SignIn";
import ContactUs from "./components/HomePage/contactpage";

// Sidebar,Topbar,Home
import Dash from "./pages/Dash/Home";
import Table from "./pages/Dash/Table";
import AboutUs from "./components/HomePage/AboutUs";
import ForgetPassword from "./components/SignIn/ForgetPass";

// Farmer Products
import ProductList from "./pages/products/ProductsList";
import AddProduct from "./pages/products/AddProduct";
import ViewProduct from "./pages/products/ViewProduct";
import Receipt from "./pages/products/Receipt";
import FarmerBillHistory from "./pages/History/FarmerBillHistory";

// Buyer
import BuyerHistory from "./pages/History/BuyerHistory";
import ProductsBuyer from "./pages/Buyer/ProductsBuyer";
import PlacedBidsList from "./pages/Buyer/PlaceBidsList";
import PlaceBid from "./pages/Buyer/PlaceBid";

// Admin
import AdminActiveFarmers from "./components/Admin/AdminActivefarmers";
import AdminActiveBuyers from "./components/Admin/AdminActiveBuyers";
import AdminDeactivatedUsers from "./components/Admin/AdminDeactivatedUsers";
import AdminBidsHistory from "./components/Admin/AdminBidsHistory";
import AdminTodaysBids from "./components/Admin/AdminTodaysBids";

const AuthorizeUser = () => {
  const loginStatus = sessionStorage["loginStatus"];
  return loginStatus === "1" ? <Dash /> : <SignIn />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="side">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/AuthorizeUser" element={<AuthorizeUser />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/registerPage" element={<RegisterPage />} />
            <Route exact path="/contactUs" element={<ContactUs />} />
            <Route exact path="/aboutUs" element={<AboutUs />} />
            <Route exact path="/ForgetPassword" element={<ForgetPassword />} />

            <Route path="/dash" element={<Table />} />

            {/* Farmer */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/viewProduct/:id" element={<ViewProduct />} />

            <Route path="/products/receipt" element={<Receipt />} />
            <Route
              path="/billing/farmerBillHistory"
              element={<FarmerBillHistory />}
            />

            {/* Buyer */}
            <Route path="/productsBuyer" element={<ProductsBuyer />} />
            <Route path="/productsBuyer/PlaceBid" element={<PlaceBid />} />
            <Route
              path="/productsBuyer/PlacedBidsList"
              element={<PlacedBidsList />}
            />
            <Route
              path="/productsBuyer/BuyerHistory"
              element={<BuyerHistory />}
            />

            {/* Admin */}
            <Route
              path="/Admin/AdminActivefarmers"
              element={<AdminActiveFarmers />}
            />
            <Route
              path="/Admin/AdminActivebuyers"
              element={<AdminActiveBuyers />}
            />
            <Route
              path="/Admin/DeactivatedUsers"
              element={<AdminDeactivatedUsers />}
            />
            <Route
              path="/Admin/AdminBidsHistory"
              element={<AdminBidsHistory />}
            />
            <Route
              path="/Admin/AdminTodaysBids"
              element={<AdminTodaysBids />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
