import React, { useState } from "react";
import { MDBDataTable } from 'mdbreact';
import { BiEdit } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Sidebar from "../navbar/sidebar";
import Header from "../navbar/header";

const Order = () => {

    const [color, setColor] = useState("")
    const [color2, setColor2] = useState("")
    const [color3, setColor3] = useState("")

    const handlerChange = (e, method) => {

        const value = e.target.value

        if (value == "pending") {
            method("text-warning")
        } else if (value == "completed") {
            method("text-success")
        } else {
            method("text-danger")
        }
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const data = {

        columns: [
            {
                label: 'User name',
                field: 'user_name',
                sort: 'disabled',
                width: 150
            },
            {
                label: 'Item Name',
                field: 'item_name',
                sort: 'disabled',
                width: 150
            },
            {
                label: 'Price',
                field: 'price',
                sort: 'disabled',
                width: 150
            },
            {
                label: 'Order Date',
                field: 'order_date',
                sort: 'disabled',
                width: 270
            },
            // {
            //     label: 'Payment Status',
            //     field: 'payment_status',
            //     sort: 'disabled',
            //     width: 270
            // },
            {
                label: 'Payment Mode',
                field: 'payment_mode',
                sort: 'disabled',
                width: 270
            },
            // {
            //     label: 'Action',
            //     field: 'action',
            //     sort: 'disabled',
            //     width: 270
            // }
        ],

        rows: [
            {
                item_name: 'Spinach',
                user_name: <div className="user-view" onClick={handleShow}> Pranesh Kumar Singh</div>,
                price: "₹200.00",
                order_date: "20/05/2022",
                // payment_status: 'Complited',
                payment_mode: 'Online',
                // action:
                //     <div className="active-status">
                //         <select className={`form-select ${color3}`} aria-label="select example" onChange={(e) => handlerChange(e, setColor3)}>
                //             <option selected>Select</option>
                //             <option value="pending" className="text-warning">Pending</option>
                //             <option value="completed" className="text-success">Complited</option>
                //             <option value="failed" className="text-danger">Faild</option>
                //         </select>
                //     </div>
            },
            {
                item_name: 'Spinach',
                user_name: <div className="user-view" onClick={handleShow}> Pranesh Kumar Singh</div>,
                price: "₹200.00",
                order_date: "04/03/2022",
                // payment_status: 'Complited',
                payment_mode: 'Online',
                // action:
                //     <div className="active-status">
                //         <select className={`form-select ${color}`} aria-label="select example" onChange={(e) => handlerChange(e, setColor)}>
                //             <option selected>Select</option>
                //             <option value="pending" className="text-warning">Pending</option>
                //             <option value="completed" className="text-success">Complited</option>
                //             <option value="failed" className="text-danger">Faild</option>
                //         </select>
                //     </div>
            },
            {
                item_name: 'Spinach',
                user_name: <div className="user-view" onClick={handleShow}> Pranesh Kumar Singh</div>,
                price: "₹200.00",
                order_date: "10/07/2022",
                // payment_status: 'Complited',
                payment_mode: 'Online',
                // action:
                //     <div className="active-status">
                //         <select className={`form-select ${color2}`} aria-label="select example" onChange={(e) => handlerChange(e, setColor2)}>
                //             <option selected>Select</option>
                //             <option value="pending" className="text-warning">Pending</option>
                //             <option value="completed" className="text-success">Complited</option>
                //             <option value="failed" className="text-danger">Faild</option>
                //         </select>
                //     </div>
            },

        ]
    };



    return (

        <>
            <Header />
            <Sidebar />
            <main id="main">
                <div className="pagetitle">
                    <nav>
                        <ol className="breadcrumb ps-2 pb-2 pt-2">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active">Order</li>
                        </ol>
                    </nav>
                </div>
                <div className="main main-bg">
                    <section className="py-5 order-table">
                        <div className="custom-table">
                            <MDBDataTable data={data} tableFoot={false} />
                        </div>
                    </section>
                </div>
            </main>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order #2483</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="fw-bold">Billing details</h5>
                            <p className="f-13">Ashish Bhatnagar<br />
                                C 2001/28 Indiranagar Lucknow 226016
                                Uttar Pradesh</p>
                        </div>
                        <div className="col-md-6">
                            <h5 className="fw-bold">Shipping details</h5>
                            <p className="f-13">Ashish Bhatnagar<br />
                                C 2001/28 Indiranagar Lucknow 226016
                                Uttar Pradesh</p>
                        </div>
                        <div className="col-md-6">
                            <h6 className="fw-bold">Email</h6>
                            <p className="f-13">drkrishnaagdc@gmail.com</p>
                        </div>
                        <div className="col-md-6">
                            <h6 className="fw-bold">Phone</h6>
                            <p className="f-13">+919335062000</p>
                        </div><div className="col-md-6">
                            <h6 className="fw-bold">Shipping method</h6>
                            <p className="f-13">Free shipping</p>
                        </div>
                        <div className="col-md-6">
                            <h6 className="fw-bold">Payment via</h6>
                            <p className="f-13">Cash on delivery</p>
                        </div>
                    </div>
                    <div className="row user-popup">
                        <div className="col-md-12">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

                                        <td>Baby Cucumbers</td>
                                        <td>1</td>
                                        <td>₹80.00</td>
                                    </tr>
                                    <tr>

                                        <td>Baby Cucumbers</td>
                                        <td>1</td>
                                        <td>₹80.00</td>
                                    </tr>

                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )

}
export default Order