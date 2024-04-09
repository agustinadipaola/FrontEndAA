import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserHome from "./components/user/UserHome";
import AddItemToCart from "./components/cart/AddItemToCart";
import CreateItem from "./components/admin/CreateItem";
import DisplayCartContent from "./components/cart/DisplayCartContent";
import UpdateCartItem from "./components/item/UpdateCartItem";
import DisplayStockItems from "./components/item/DisplayStockItems";
import LogIn from "./components/login/LogIn";
import SignupForm from "./components/login/SignUpForm";
import SignUpDashboard from "./components/login/SignUpDashboard";
import UserItems from "./components/item/UserItems";
import AdminHome from "./components/admin/AdminHome";
import Checkout from "./components/user/Checkout";
import SaveForLater from "./components/user/SaveForLater";
import { Link } from "react-router-dom";
import homeLogo from "./pictures/homeLogo.png"
import { Navbar, Container, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const USER_TYPES = {
  PUBLIC: "",
  NORMAL_USER: "",
  ADMIN_USER: (
    <div>
      {" "}
      <MdAdminPanelSettings size={30} />
    </div>
  ),
};
const CURRENT_USER_TYPE = USER_TYPES.NORMAL_USER;
// const CURRENT_USER_TYPE = USER_TYPES.ADMIN_USER;

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          {CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER ? (
            <a className="navbar-brand" href="/AdminHome">
              <img
                className="navbar-brand"
                href="/AdminHome"
                alt="Big Cart Saver Logo"
                style={{ width: "15%" }}
                src={homeLogo}
              ></img>
            </a>
          ) : null}
          {CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER ? (
            <a className="navbar-brand" href="/UserHome">
              <img
                className="navbar-brand"
                href="/UserHome"
                alt="Big Cart Saver Logo"
                style={{ width: "15%" }}
                src={homeLogo}
              ></img>
            </a>
          ) : null}
          {CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER ? (
            <>
              <Link to="/item" className="roboto">
                <Button variant="light">
                  <strong>CREATE ITEM</strong>
                </Button>
              </Link>{" "}
            </>
          ) : null}
          {CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER ? (
            <>
              <Link to="/UserItems" className="roboto">
                <Button variant="light">
                  <strong>ITEMS</strong>
                </Button>
              </Link>{" "}
            </>
          ) : null}

          {CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER ? (
            <>
              <Link to="/login" className="roboto">
                <Button variant="dark">
                  <strong>LOG IN</strong>
                </Button>
              </Link>{" "}
            </>
          ) : null}
          {CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER ? (
            <>
              <Link
                className="nav-link icon-cart"
                to="/shopping"
                style={{ color: "black" }}
              >
                <Button variant="light">
                  <FaShoppingCart size={30} />
                  <span>
                    <strong> 0 </strong>
                  </span>
                </Button>
              </Link>{" "}
            </>
          ) : null}

          <div>
            <strong>{CURRENT_USER_TYPE}</strong>{" "}
          </div>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/item/:id" element={<AddItemToCart />} />
        <Route path="/item" element={            <AdminElement>
<CreateItem />            </AdminElement>
} />
        <Route path="/cart/get/:id" element={<DisplayCartContent />} />
        <Route path="/item/update/:id" element={<UpdateCartItem />} />
        <Route path="/shopping" element={            <UserElement>
<DisplayCartContent />            </UserElement>
} />
        <Route path="/item" element={<DisplayStockItems />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/welcomesignup" element={<SignUpDashboard />} />
        <Route
          path="/UserHome"
          element={
            <UserElement>
              <UserHome />
            </UserElement>
          }
        />
        <Route
          path="/UserItems"
          element={
            <UserElement>
              <UserItems />
            </UserElement>
          }
        />
        <Route
          path="/AdminHome"
          element={
            <AdminElement>
              <AdminHome />
            </AdminElement>
          }
        />
        <Route
          path="/checkout"
          element={
            <UserElement>
              <Checkout />
            </UserElement>
          }
        />
                <Route path="/save-for-later" element={<SaveForLater />} />
      </Routes>
    </BrowserRouter>
  );
  function PublicElement({ children }) {
    return <>{children}</>;
  }
  function AdminElement({ children }) {
    if (CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
      return <>{children}</>;
    } else {
      return <h3> You do not have access to this page</h3>;
    }
  }
  function UserElement({ children }) {
    if (CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER) {
      return <>{children}</>;
    } else {
      return <h3> You do not have access to this page</h3>;
    }
  }
}

export default App;