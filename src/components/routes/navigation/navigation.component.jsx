import "react";
import {Fragment} from 'react';
import {Outlet, Link} from 'react-router-dom';
import Lightlogo from "../../../assets/logo.svg";
import "./navigation.styles.scss";


const Navigation = () => {
  return(
    <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <img src={Lightlogo} alt="Logo" className="logo" />
                <h1>CANLight Clothing</h1>
            </Link>
            <div className="nav-links-container">

                <Link className="nav-link" to="/auth"> 
                    SIGN IN
                </Link>            
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>

            </div>

        </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;