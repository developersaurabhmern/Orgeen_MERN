import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";
import Swal from "sweetalert2";
import Sidebar from "../navbar/sidebar";
import Header from "../navbar/header";
import { getCategory, getTags, saveProduct } from "../apiMethods";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  slug: "",
  image: "",
  category: "",
  tag: "",
  salesPrice: "",
  discountPercentage: "",
  discountRupees: "",
  offerPrice: "",
  stockStatus: "",
  productDescription: "",
};

const Add_Product = () => {
  const [category_options, setCategoryOptions] = useState([]);
  const [tag_options, setTagOptions] = useState([]);
  const [dataForm, setDataForm] = useState(initialState);
  const [selectCategory, setSelectCat] = useState("");
  const [selectTag, setSelectTag] = useState([]);
  const [selectStock, setSelectStock] = useState("");

  const [toggleDiscounts, setToggleDiscounts] = useState({
    disablePer: false,
    disableRupees: false,
  });
  const [salesStyle, setSalesStyle] = useState("");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    getCategory(token).then((res) => {
      const category_options = res.data.data.map((el) => {
        return { label: el.name, value: el._id };
      });
      setCategoryOptions(category_options);
    });

    getTags(token).then((res) => {
      const tag_options = res.data.data.map((el) => {
        return { label: el.name, value: el._id };
      });

      setTagOptions(tag_options);
    });
  }, []);

  const updateData = (e) => {
    const value = e.target.value;
    const fieldName = e.target.name;

    if (fieldName === "salesPrice") {
      setDataForm({
        ...dataForm,
        offerPrice: "",
        salesPrice: value,
        discountPercentage: "",
        discountRupees: "",
      });
      setToggleDiscounts({ disableRupees: false, disablePer: false });
      return;
    }

    if (
      fieldName == "discountPercentage" &&
      dataForm.discountRupees === "" &&
      value !== ""
    ) {
      if (dataForm.salesPrice === "") {
        setSalesStyle("3px solid red");
        return;
      }
      const percentage = (value / 100) * dataForm.salesPrice;

      setDataForm({
        ...dataForm,
        offerPrice: dataForm.salesPrice - percentage,
        discountPercentage: value,
      });

      setToggleDiscounts({ ...toggleDiscounts, disableRupees: true });
      return;
    } else if (
      fieldName == "discountRupees" &&
      dataForm.discountPercentage === "" &&
      value !== ""
    ) {
      if (dataForm.salesPrice === "") {
        setSalesStyle("3px solid red");
        return;
      }

      setDataForm({
        ...dataForm,
        offerPrice: dataForm.salesPrice - value,
        discountRupees: value,
      });

      setToggleDiscounts({ ...toggleDiscounts, disablePer: true });
      return;
    } else if (
      fieldName === "discountPercentage" ||
      fieldName === "discountRupees"
    ) {
      setToggleDiscounts({ disableRupees: false, disablePer: false });
      setDataForm({
        ...dataForm,
        offerPrice: dataForm.salesPrice,
        [fieldName]: value,
      });
      return;
    }

    setSalesStyle("");

    if (fieldName == "name") {
      if (value.split(" ").length < 2) {
        setDataForm({
          ...dataForm,
          name: value,
          slug: value.toLowerCase(),
        });
        return;
      } else {
        setDataForm({
          ...dataForm,
          name: value,
          slug: value.replace(/\s+/g, "-").toLowerCase(),
        });
        return;
      }
    } else if (fieldName == "image") {
      setDataForm({
        ...dataForm,
        [fieldName]: e.target.files[0],
      });
      return;
    }

    setDataForm({
      ...dataForm,
      [fieldName]: value,
    });
  };

  const stock_options = [
    { label: "In Stock", value: 1 },
    { label: "Out Of Stock", value: 0 },
  ];

  const addProduct = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    let tags = "";
    selectTag.forEach((el) => {
      tags += el.value + ",";
    });

    const data = new FormData();
    data.append("name", dataForm.name);
    data.append("slug", dataForm.slug);
    data.append("image", dataForm.image);
    data.append("sale_price", dataForm.salesPrice);
    data.append("discount_percen", dataForm.discountPercentage);
    data.append("discount_rupee", dataForm.discountRupees);
    data.append("offer_price", dataForm.offerPrice);
    data.append("product_desc", dataForm.productDescription);
    data.append("tag", tags.slice(0, tags.length - 1));
    data.append("stock_status", selectStock.value);
    data.append("category", selectCategory.value);

    saveProduct(data, token).then((res) => {
      if (res.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Add Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        toast.error(res.error);
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
              <li className="breadcrumb-item active">Add Product</li>
            </ol>
          </nav>
        </div>
        <div className="main main-bg">
          <section className="py-5">
            <div className="add-product custom-form">
              <div className="add-btn">
                <div className="row">
                  <div className="col-md-12 pb-5">
                    <Form>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={dataForm.name}
                              name="name"
                              onChange={updateData}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Product Slug</Form.Label>
                            <Form.Control
                              type="text"
                              name="slug"
                              value={dataForm.slug}
                              onChange={updateData}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control
                              type="file"
                              name="image"
                              placeholder="Image"
                              onChange={updateData}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Category</Form.Label>
                            <Select
                              options={category_options}
                              onChange={setSelectCat}
                              value={selectCategory}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Tag</Form.Label>
                            <MultiSelect
                              options={tag_options}
                              value={selectTag}
                              onChange={setSelectTag}
                              labelledBy={"Select"}
                              isCreatable={true}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Sales Price</Form.Label>
                            <Form.Control
                              type="number"
                              name="salesPrice"
                              value={dataForm.salesPrice}
                              onChange={updateData}
                              style={{ border: salesStyle }}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Discount( in %) </Form.Label>
                            <Form.Control
                              type="number"
                              name="discountPercentage"
                              value={dataForm.discountPercentage}
                              onChange={updateData}
                              disabled={toggleDiscounts.disablePer}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Discount( in Rs.)</Form.Label>
                            <Form.Control
                              type="number"
                              name="discountRupees"
                              value={dataForm.discountRupees}
                              onChange={updateData}
                              disabled={toggleDiscounts.disableRupees}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Offer Price</Form.Label>
                            <Form.Control
                              type="number"
                              name="offerPrice"
                              value={dataForm.offerPrice}
                              onChange={updateData}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Stock Status</Form.Label>
                            <Select
                              options={stock_options}
                              value={selectStock}
                              onChange={setSelectStock}
                            />
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Product Short Descrition</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="productDescription"
                              value={dataForm.productDescription}
                              onChange={updateData}
                              placeholder="Product short desciption"
                              style={{ height: "100px" }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="text-end">
                        <Button variant="primary" onClick={addProduct}>
                          Add Product
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
export default Add_Product;
