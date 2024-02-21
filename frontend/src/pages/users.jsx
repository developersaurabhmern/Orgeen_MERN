import React from "react";
import { MDBDataTable } from 'mdbreact';
import { BiEdit } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import Sidebar from "../navbar/sidebar";
import Header from "../navbar/header";

const Users = () => {

    const data = {

        columns: [
            {
                label: 'Full Name',
                field: 'user_name',
                sort: 'disabled',
                width: 150
            },
            {
                label: 'Email',
                field: 'user_email',
                sort: 'disabled',
                width: 150
            },
            {
                label: 'Phone No.',
                field: 'user_number',
                sort: 'disabled',
                width: 270
            },
            {
                label: 'Address',
                field: 'user_address',
                sort: 'disabled',
                width: 270
            },
        ],

        rows: [
            {
                user_name: "Pranesh Kumar Singh",
                user_email: "pranesh@gmail.com",
                user_number: "8457235423",
                user_address: 'Gomti Nagar',
            },
            {

                user_name: "Pranesh Kumar Singh",
                user_email: "pranesh@gmail.com",
                user_number: "8457235423",
                user_address: 'Gomti Nagar',
            },
            {

                user_name: "Pranesh Kumar Singh",
                user_email: "pranesh@gmail.com",
                user_number: "8457235423",
                user_address: 'Gomti Nagar',
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
                            <li className="breadcrumb-item active">All User</li>
                        </ol>
                    </nav>
                </div>
                <div className="main main-bg">
                    <section className="py-5 user-table">
                        <div className="custom-table">
                            <MDBDataTable data={data} tableFoot={false} responsive />
                        </div>
                    </section>
                </div>
            </main>

        </>
    )

}
export default Users