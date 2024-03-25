import React, { Fragment, useEffect, useState } from "react";
import "./newbook.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import MetaData from "../../Components/layouts/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { resetActions,clearErrors } from "../../Store/Slices/adminslice";
import { useNavigate } from "react-router-dom";
import { createbook } from "../../Actions/adminAction";
import Loader from "../../Components/layouts/Loader/Loader";

const NewBook = () => {
const dispatch = useDispatch();
const navigate= useNavigate();
const {token}  = useSelector((state) => state.auth);
const { isLoading, error, message } = useSelector((state) => state.admin);

  const [name, setName] = useState("");
  const [Semester, setsemester] = useState(0);
  const [description, setDescription] = useState("");
  const [branch, setbranch] = useState("");
  const [writer, setwriter] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const sem = [
    "1st",
    "2nd",
    "3th",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "Not Academic"
  ];
  const branches=[
    "CSE",
    "ECE",
    "MEA",
    "Not Academic"
  ]

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success("Book Created Successfully");
     navigate("/admin/books");
      dispatch(resetActions());
    }
  }, [dispatch, navigate, error,  message]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("writer", writer);
    myForm.set("branch", branch);
    myForm.set("semester", Semester);
    myForm.set("stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createbook(token,myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      {
        isLoading?(<Loader/>):(
          <Fragment>
            <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Book</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Book Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Writer"
                required
                onChange={(e) => setwriter(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Book Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setbranch(e.target.value)}>
                <option value="">Choose Branch</option>
                {branches.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setsemester(e.target.value)}>
                <option value="">Choose Semester</option>
                {sem.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

             <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div> 

             <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div> 

            <Button
              id="createProductBtn"
              type="submit"
              disabled={isLoading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
      </Fragment>
        )
      }
    </Fragment>
  );
};

export default NewBook;
