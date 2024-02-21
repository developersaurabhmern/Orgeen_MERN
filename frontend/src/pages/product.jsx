import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { BiEdit } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { RxTrash } from "react-icons/rx";
import Swal from "sweetalert2";
import Sidebar from "../navbar/sidebar";
import Header from "../navbar/header";
import { getProducts, deleteProduct } from "../apiMethods";
import { baseUrl } from "../request";
import { Link } from "react-router-dom";
const columns = [
  {
    label: "Product Name",
    field: "product_name",
    sort: "disabled",
    width: 150,
  },
  {
    label: "Category",
    field: "category",
    sort: "disabled",
    width: 150,
  },
  {
    label: "Product Image",
    field: "product_img",
    sort: "disabled",
    width: 270,
  },
  {
    label: "Sales Price",
    field: "product_price",
    sort: "disabled",
    width: 150,
  },
  {
    label: "Stock Status",
    field: "stock_status",
    sort: "disabled",
    width: 150,
  },
  {
    label: <div className="text-center">Action</div>,
    field: "action",
    sort: "disabled",
    width: 270,
  },
];

const Product = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productList, setProductList] = useState({ columns, rows: [] });
  const [updater, setUpdater] = useState({});

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    getProducts(token).then((res) => {
      const dataRows = res.data.data.map((el) => {
        return rowMaker(
          el.name,
          el.offer_price,
          el.stock_status,
          el.image,
          el.category,
          el._id,
          token
        );
      });
      setProductList({ ...productList, rows: dataRows });
    });
  }, [updater]);

  const rowMaker = (name, price, stock, image, category, id, token) => {
    return {
      product_name: name,
      category: category.name,
      product_price: price,
      stock_status: stock ? "In Stock" : "Out Of Stock",
      product_img: (
        <div>
          <img
            src={`${baseUrl}/images${image}`}
            alt=""
            className="img-fluid wd-40"
          />
        </div>
      ),
      action: (
        <div class="action-btn d-flex justify-content-around">
          <Link to="/update-product" state={{ pid: id }} className="pe-3">
            <BiEdit className="edit-btn" onClick={handleShow} />
          </Link>
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
        deleteProduct(
          {
            pid: id,
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
              <li className="breadcrumb-item active">Product</li>
            </ol>
          </nav>
        </div>
        <div className="main main-bg">
          <section className="py-5 product-table">
            <div className="staff-management">
              <div className="add-btn">
                <div className="row">
                  <div className="col-md-12 pb-5">
                    <a href="/add-product" type="button" className="custom-btn">
                      <span>
                        <MdAdd className="custom-icon" />
                      </span>
                      Add Product
                    </a>
                  </div>
                </div>
              </div>
              <div className="custom-table">
                <MDBDataTable data={productList} tableFoot={false} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
export default Product;
