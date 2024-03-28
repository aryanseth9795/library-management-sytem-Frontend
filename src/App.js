import "./App.css";
import { React, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useSelector } from "react-redux";
// Loader
import { loadUser } from "./Actions/useraction.js";
import store from "./Store/store";
//Navbar component
import Header from "./Components/layouts/Header/Header";
import UserOptions from "./Components/layouts/Header/UserOptions.js";
import Home from "./pages/Landing_page/Home";
import Search from "./pages/Book/Search";
import About from "./Components/layouts/About/About.js";
import Logout from "./Components/layouts/Logout/logout.js";
import Footer from "./Components/layouts/Footer/Footer";
import LoginSignUp from "./pages/Login/LoginSignUp";
import ForgotPassword from "./pages/Login/ForgotPassword.js";
import ResetPassword from "./pages/Login/ResetPassword.js";
import Books from "./pages/Book/Book";
import BookDetails from "./pages/Book/BookDetails.js";
import Profile from "./pages/Profile/Profile.js";
import UpdatePassword from "./pages/Profile/UpdatePassword.js";
import Dashboard from "./pages/Admin/Dashboard.js";
import UsersList from "./pages/Admin/UsersList.js";
import Bookslist from "./pages/Admin/BooksList.js";
import ProcessBorrow from "./pages/Admin/ProcessBorrow.js";
import ProcessReturn from "./pages/Admin/ProcessReturn .js";
import RequestList from "./pages/Admin/RequestList.js";
import ReturnList from "./pages/Admin/ReturnList.js";
import BorrowedList from "./pages/Admin/BorrowedList.js";
import NewBook from "./pages/Admin/NewBook.js";
import UpdateProfile from "./pages/Profile/UpdateProfile.js";
import ProtectedRoute from "./Components/layouts/auth/ProtectedRoute.js";
import Myborrow from "./pages/Profile/Myborrow.js";
import Userupdate from "./pages/Admin/Userupdate.js";
import NotFound from "./Components/layouts/Not Found/NotFound.js"
function App() {
  const {  user, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    if (localStorage.getItem('token')) {
      store.dispatch(loadUser(localStorage.getItem('token')));
    }
  }, [token]);
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Router>
        {isAuthenticated && <Header />}
        {isAuthenticated && <UserOptions user={user} />}

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={!user} redirect="/home">
                <LoginSignUp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/forgot"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <ForgotPassword />
              </ProtectedRoute>
            }
          />

          <Route
            path="/password/reset/:token"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/logout" element={<Logout />} />
            <Route path="/home" element={<Home />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/Books" element={<Books />} />
            <Route exact path="/Books/:keyword" element={<Books />} />
            <Route exact path="/book/:id" element={<BookDetails />} />
            <Route exact path="/account" element={<Profile />} />
            <Route exact path="/myborrow" element={<Myborrow />} />
            <Route exact path="/me/update" element={<UpdateProfile />} />
            <Route exact path="/password/update" element={<UpdatePassword />} />
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
            <Route exact path="/admin/users" element={<UsersList />} />
            <Route exact path="/admin/user/:id" element={<Userupdate />} />
            <Route exact path="/admin/books" element={<Bookslist />} />
            <Route exact path="/admin/requestList" element={<RequestList />} />
            <Route exact path="/admin/borrowList" element={<BorrowedList />} />
            <Route exact path="/admin/returnList" element={<ReturnList />} />
            <Route exact path="/admin/borrow/:id" element={<ProcessBorrow />} />
            <Route exact path="/admin/Return/:id" element={<ProcessReturn />} />
            <Route exact path="/admin/books/new" element={<NewBook />} />
          </Route>
            <Route exact path="/*" element={<NotFound />} />
        </Routes>
        {isAuthenticated &&  <Footer />}
      </Router>
    </>
  );
}
export default App;
