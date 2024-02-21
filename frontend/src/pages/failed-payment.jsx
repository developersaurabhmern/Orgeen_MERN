import React, { useState } from "react";
import { MDBDataTable } from 'mdbreact';
import { BiEdit } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import Sidebar from "../navbar/sidebar";
import Header from "../navbar/header";

const Payment_Failed = () => {

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
                user_name: "Pranesh Kumar Singh",
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
                user_name: "Pranesh Kumar Singh",
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
                user_name: "Pranesh Kumar Singh",
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
                            <li className="breadcrumb-item active">All Failed Payment</li>
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

        </>
    )

}
export default Payment_Failed