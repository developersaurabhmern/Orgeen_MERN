import React from 'react';
import { NavLink} from "react-router-dom";
import { SlSpeedometer } from "react-icons/sl";
import { FiUser } from "react-icons/fi";
import { IoPricetagsOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { TfiPackage } from "react-icons/tfi";




const Sidebar = () => {

  const [toggle, setToggle] = React.useState(false);

  return (
    <>
      <aside id="sidebar" className="sidebar">
        <div className="logo">
          <img src="assets/img/sidebar/logo.png" alt="" className="img-fluid" />
        </div>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink activeClassName="active" to="/" className="nav-link ">
              <SlSpeedometer className="nav-icon" />
              <span className='pl-2'>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/users" className="nav-link ">
              <FiUser className="nav-icon" />
              <span className='pl-2'>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/tag" className="nav-link ">
            <IoPricetagsOutline className="nav-icon" />
              <span className='pl-2'>Tag</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/product-category" className="nav-link ">
            <BiCategory className="nav-icon" />
              <span className='pl-2'>Category</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/product" className="nav-link ">
            <TfiPackage className="nav-icon" />
              <span className='pl-2'>Product</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/order" className="nav-link ">
            <BsCartCheck className="nav-icon" />
              <span className='pl-2'>Order</span>
            </NavLink>
          </li>
           <li>
            <NavLink activeClassName="active" to="/failed-payment" className="nav-link ">
            <BsCartCheck className="nav-icon" />
              <span className='pl-2'>Failed Payment</span>
            </NavLink>
          </li>
          {/* <li className="nav-item" >
            <Link className="nav-link collapsed navc" onClick={() => { setToggle(!toggle) }}>
              <FaUniversalAccess className="nav-icon" /><span className='pl-2'>HR Module</span>
              <FontAwesomeIcon icon={faChevronDown} className={toggle ? "ml-5  dshow d-none" : "ml-5  dshow "} />
              <FontAwesomeIcon icon={faChevronUp} className={toggle ? "ml-5  ddshow collapseshow " : "ml-5  ddshow collapseshow d-none"} />
            </Link>
            <ul id="components-nav" className={toggle ? `nav-content collapse show` : `nav-content collapse`} data-bs-parent="#sidebar-nav">
            </ul>
          </li> */}

        </ul>

      </aside>

    </>
  );
}

export default Sidebar;