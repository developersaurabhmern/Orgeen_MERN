import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/user.context";

const Header = () => {
  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    if (toggle) {
      document.body.classList.add("toggle-sidebar");
    } else {
      document.body.classList.remove("toggle-sidebar");
    }
  }, [toggle]);

  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const logOutUser = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header id="header" class="header fixed-top d-flex align-items-center">
        <div class="d-flex align-items-center justify-content-between">
          <Link
            to="/"
            class="logo d-flex align-items-center text-decoration-none"
          >
            <img src="assets/img/header/logo.png" alt="" />
          </Link>
          <HiOutlineBars3
            className="toggle-sidebar-btn"
            onClick={() => setToggle(!toggle)}
          />
        </div>

        {/* <div class="search-bar mx-auto">
          <form class="search-form d-flex align-items-center" method="POST" action="#">
            <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
            <button type="submit" title="Search"> <FontAwesomeIcon icon={faSearch} /></button>

          </form>
        </div> */}

        <nav class="header-nav ms-auto">
          <ul class="d-flex align-items-center">
            <li class="nav-item d-block d-lg-none">
              <Link class="nav-link nav-icon search-bar-toggle " to="#">
                <i class="bi bi-search"></i>
              </Link>
            </li>
            <li class="nav-item dropdown">
              <Link class="nav-link nav-icon" to="#" data-bs-toggle="dropdown">
                <IoNotificationsOutline className="2x" />
                <span class="badge bg-primary badge-number text-white">4</span>
              </Link>

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li class="dropdown-header">
                  You have 4 new notifications
                  <Link to="#">
                    <span class="badge rounded-pill bg-primary p-2 ms-2 text-white">
                      View all
                    </span>
                  </Link>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li class="notification-item">
                  <i class="bi bi-x-circle text-danger"></i>
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>

                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li class="dropdown-footer">
                  <Link to="#">Show all notifications</Link>
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown pe-3">
              <Link
                class="nav-link nav-profile d-flex align-items-center pe-0"
                to="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src="assets/img/businessman.png"
                  alt="Profile"
                  class="rounded-circle"
                />
                <span class="d-none d-md-block  ps-2"></span>
              </Link>

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li class="dropdown-header">
                  <h6>Pranesh Singh</h6>
                  <span>Web Designer</span>
                </li>
                {/* <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <Link class="dropdown-item d-flex align-items-center" to="/user-profile">
                    <i class="bi bi-person"></i>
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <Link class="dropdown-item d-flex align-items-center" to="/user-profile">
                    <i class="bi bi-gear"></i>
                    <span>Account Settings</span>
                  </Link>
                </li> */}
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a
                    class="dropdown-item d-flex align-items-center"
                    href="javascript:viod(0);"
                    onClick={logOutUser}
                  >
                    <AiOutlinePoweroff />
                    <span className="ps-2">Sign Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
