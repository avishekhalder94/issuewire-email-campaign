import React, { useState } from "react"
import { Link } from "react-router-dom"

const Common = () => {

  return (
    <>
      {/* <!-- Left navbar links --> */}
      <nav classNameName="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="index3.html" className="nav-link">Home</a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">Contact</a>
          </li>
        </ul>
      </nav>

    </>
  )
}


export default Common;