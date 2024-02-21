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
import {
  saveTag,
  getTags,
  deleteTag,
  getSingleTag,
  updateTag,
} from "../apiMethods";
import { toast } from "react-toastify";
import { baseUrl } from "../request";

const columns = [
  {
    label: "Name",
    field: "tag_name",
    sort: "disabled",
    width: 150,
  },
  {
    label: "Desciption",
    field: "tag_desc",
    sort: "disabled",
    width: 150,
  },
  {
    label: "Image",
    field: "tag_img",
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

const Tag = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
  });
  const [tagList, setTagList] = useState({ columns });
  const [updater, setUpdater] = useState({});
  const [toggleSubmit, setToggleSubmit] = useState("submit");
  const [updateId, setUpdateId] = useState("");

  const handleSubmit = () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", formData.image);
    data.append("description", formData.description);
    const token = JSON.parse(localStorage.getItem("token"));

    if (toggleSubmit === "submit") {
      saveTag(data, token).then((res) => {
        if (res.data) {
          setShow(false);
          setFormData({ name: "", description: "", image: "" });
          setUpdater(res.data);
          toast("tag Added");
        }
      });
    } else if (toggleSubmit === "update") {
      data.append("tag_id", updateId);
      updateTag(data, token).then((res) => {
        if (res.data) {
          setShow(false);
          setFormData({ name: "", description: "", image: "" });
          setUpdater(res.data);
          setToggleSubmit("submit");
          toast("tag updated");
        }
      });
    }
  };

  const rowMaker = (name, desc, img, id, token) => {
    return {
      tag_name: name,
      tag_desc: desc,
      tag_img: (
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
              onClick={() => handleEdit(id, token)}
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
    getTags(token).then((res) => {
      if (res.data) {
        const rows = res.data.data.map(({ name, description, image, _id }) => {
          return rowMaker(name, description, image, _id, token);
        });

        setTagList({ ...tagList, rows: rows.reverse() });
      } else {
        console.log(res.error);
      }
    });
  }, [updater]);

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
        deleteTag({ tag_id: id }, token).then((res) => {
          if (res.data) {
            toast("tag deleted");
            setUpdater(res.data);
          }
        });
      }
    });
  };

  const handleEdit = (id, token) => {
    setToggleSubmit("update");
    setUpdateId(id);
    getSingleTag({ tag_id: id }, token).then((res) => {
      setFormData({
        name: res.name,
        image: res.image,
        description: res.description,
      });
      setShow(true);
    });
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target;

    if (name === "image") {
      console.log(value.files);
      setFormData({
        ...formData,
        [name]: value.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value.value,
      });
    }
  };

  const handleCloseModel = () => {
    setShow(false);
    setToggleSubmit("submit");
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
              <li className="breadcrumb-item active">Tag</li>
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
                      onClick={() => setShow(true)}
                      type="button"
                      className="custom-btn"
                    >
                      <span>
                        <MdAdd className="custom-icon" />
                      </span>
                      Add Tag
                    </a>
                  </div>
                </div>
              </div>
              <div className="custom-table">
                <MDBDataTable data={tagList} tableFoot={false} />
              </div>
            </div>
          </section>
        </div>
        <Modal show={show} onHide={handleCloseModel}>
          <Modal.Header closeButton>
            <Modal.Title>Add Tag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
                  placeholder="Enter Product Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Password"
                  name="image"
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Product descrition</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Product desciption here"
                  style={{ height: "100px" }}
                  value={formData.description}
                  name="description"
                  onChange={changeHandler}
                />
              </Form.Group>
              <div className="text-end">
                <Button variant="primary" onClick={handleSubmit}>
                  Add Tag
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </main>
    </>
  );
};
export default Tag;
