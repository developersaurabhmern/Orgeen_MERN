import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { MDBDataTable } from "mdbreact";
import { BiEdit } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { RxTrash } from "react-icons/rx";
import Swal from "sweetalert2";
import Sidebar from "../navbar/sidebar";
import Header from "../navbar/header";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../utils/user.context";
import { toast } from "react-toastify";
import {
  saveCategory,
  getCategory,
  deleteCategory,
  getSingleCategory,
  updateCategory,
} from "../apiMethods";
import { baseUrl } from "../request";

const columns = [
  {
    label: "Name",
    field: "category_name",
    sort: "disabled",
    width: 150,
  },
  {
    label: "Desciption",
    field: "category_desc",
    sort: "disabled",
    width: 150,
  },
  {
    label: "Image",
    field: "category_img",
    sort: "disabled",
    width: 270,
  },
  {
    label: <div className="text-center">Action</div>,
    field: "action",
    sort: "disabled",
    width: 270,
  },
];

const Product_Category = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setToggleSubmit("submit");
    setShow(false);
    setData({ catname: "", catslug: "", image: "", catdesc: "" });
  };
  const handleShow = () => setShow(true);
  const [categoryList, setCategoryList] = useState({ columns });
  const [updater, setUpdater] = useState({});
  const [toggleSubmit, setToggleSubmit] = useState("submit");
  const [updateId, setUpdateId] = useState("");

  const deleteData = (id, token) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(
          {
            cat_id: id,
          },
          token
        ).then((res) => {
          if (res.data) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setUpdater(res.data.data);
          }
        });
      }
    });
  };

  const rowMaker = (name, desc, img, id, token) => {
    return {
      category_name: name,
      category_desc: desc,
      category_img: (
        <div>
          <img
            src={`${baseUrl}/images${img}`}
            alt=""
            className="img-fluid"
            wd-80
            style={{width: "100px"}}
          />
        </div>
      ),
      action: (
        <div class="action-btn d-flex justify-content-between">
          <div className="pe-3">
            <BiEdit
              className="edit-btn"
              onClick={() => editHandler(id, token)}
            />
          </div>
          <div>
            {" "}
            <RxTrash
              className="delete-btn"
              onClick={() => deleteData(id, token)}
            />
          </div>
        </div>
      ),
    };
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    getCategory(token).then((res) => {
      if (res.data) {
        const rows = res.data.data.map(({ name, description, image, _id }) => {
          return rowMaker(name, description, image, _id, token);
        });

        setCategoryList({ ...categoryList, rows: rows.reverse() });
      } else {
        console.log(res.error);
      }
    });
  }, [updater]);

  const [dataform, setData] = useState({
    catname: "",
    catslug: "",
    image: "",
    catdesc: "",
  });

  const updateData = (e) => {
    const value = e.target.value;

    if (e.target.name == "catname") {
      if (value.split(" ").length < 2) {
        setData({ ...dataform, catname: value, catslug: value.toLowerCase() });
        return;
      } else {
        setData({
          ...dataform,
          catname: value,
          catslug: value.replace(/\s+/g, "-").toLowerCase(),
        });
        return;
      }
    }

    setData({
      ...dataform,
      [e.target.name]: value,
    });
  };

  const appendFile = (e) => {
    setData({
      ...dataform,
      ["image"]: e.target.files[0],
    });
  };

  const editHandler = (id, token) => {
    setUpdateId(id);
    getSingleCategory({ cat_id: id }, token).then((res) => {
      setData({
        catname: res.name,
        catslug: res.slug,
        image: "",
        catdesc: res.description,
      });
      setToggleSubmit("update");
      setShow(true);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("token"));

    const data = new FormData();
    data.append("name", dataform.catname);
    data.append("slug", dataform.catslug);
    data.append("description", dataform.catdesc);
    data.append("image", dataform.image);
    const resetState = {
      catname: "",
      catslug: "",
      image: "",
      catdesc: "",
    };

    if (toggleSubmit === "submit") {
      const res = await saveCategory(data, token);
      if (res.data) {
        toast("category saved");
        setData(resetState);
        handleClose(false);
        setUpdater(res.data);
      } else {
        console.log(res.error);
      }
    } else if (toggleSubmit === "update") {
      data.append("cat_id", updateId);
      const res = await updateCategory(data, token);
      if (res.data) {
        console.log(res.data);
        toast("category updated");
        setData(resetState);
        handleClose(false);
        setUpdater(res.data);
        setToggleSubmit("submit");
      } else {
        console.log(res.error);
      }
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb ps-2 pb-2 pt-2">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active">Category</li>
            </ol>
          </nav>
        </div>
        <div className="main main-bg">
          <section className="py-5">
            <div className="staff-management">
              <div className="add-btn">
                <div className="row">
                  <div className="col-md-12 pb-5">
                    <a
                      href="#"
                      onClick={handleShow}
                      type="button"
                      className="custom-btn"
                    >
                      <span>
                        <MdAdd className="custom-icon" />
                      </span>
                      Add Category
                    </a>
                  </div>
                </div>
              </div>
              <div className="custom-table">
                <MDBDataTable data={categoryList} tableFoot={false} />
              </div>
            </div>
          </section>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product Category </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="addform" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  name="catname"
                  placeholder="Enter Category Name"
                  onChange={updateData}
                  value={dataform?.catname}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category Slug</Form.Label>
                <Form.Control
                  type="text"
                  name="catslug"
                  placeholder="Enter Category Name"
                  onChange={updateData}
                  value={dataform?.catslug}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Category Image</Form.Label>
                <Form.Control
                  type="file"
                  name="catimage"
                  onChange={appendFile}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Category descrition</Form.Label>
                <Form.Control
                  as="textarea"
                  name="catdesc"
                  value={dataform.catdesc}
                  placeholder="Product desciption here"
                  style={{ height: "100px" }}
                  onChange={updateData}
                />
              </Form.Group>
              <div className="text-end">
                {/* <Button variant="primary" onClick={handleClose} >
                  Submit
                </Button> */}
                <Button type="submit" variant="primary" value="save">
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </main>
    </>
  );
};
export default Product_Category;
