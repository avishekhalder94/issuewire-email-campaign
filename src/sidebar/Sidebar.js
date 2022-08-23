import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
//import homepage from "../../package.json";
import axios from 'axios';



const Sidebar = (props) => {

  const homeUrl = process.env.PUBLIC_URL;
  // console.log(homeUrl);

  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  // const [SmtpAddMenuOpen, setSmtpAddMenuOpen] = useState(false);
  // const [SmtpListMenuOpen, setSmtpListMenuOpen] = useState(false);

  // const [TemplatAddMenuOpen, setTemplateAddMenuOpen] = useState(false);
  // const [TemplatListMenuOpen, setTemplatListMenuOpen] = useState(false);

  // const [TemplateFiledListMenuOpen, setTemplateFiledListMenuOpen] = useState(false);
  // const [AddeMaillist, setAddeMaillist] = useState(false);

  // console.log("this is sidebar");
  // console.log(props);

  // const navigate = useNavigate();
  
  const logout = async () => {
    const token = localStorage.getItem('token');
    const tkn = JSON.parse(token);

    await axios({
      method: 'get',
      url: 'http://emailcampaign.frontpews.com/emailcampaign/public/api/auth/logout?token=' + tkn.token
    }).then(function (response) {
      console.log(response);
      localStorage.removeItem('token');
      window.location.replace(homeUrl + "/");

    })
      .then(function (response) {
        // navigate(homeUrl + "/");
      });

  }

  useEffect(()=>{
    if (localStorage.getItem('token') !== null) {
      console.log(`Email address exists`);
  } else {
      console.log(`Email address not found`);
      localStorage.removeItem('token');
      window.location.replace("/");
  }
  },[]);

  var token = localStorage.getItem('token');
  token = JSON.parse(token);
  const login_owner = (token.isAdmin) ? "Admin" : "User";
  // console.log(token.isAdmin)
  return (
    <>
      {/* <!-- Main Sidebar Container --> */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{position:"fixed"}}>
        {/* <!-- Brand Logo --> */}
        <Link className="brand-link" to={homeUrl + "/"} >
          <img src={homeUrl + "/dist/img/AdminLTELogo.png"} alt={`AdminLTE Logo`} className="brand-image img-circle elevation-3" style={{ opacity: ".8" }} />
          <span className="brand-text font-weight-light">Email Campaign</span>
        </Link>

        {/* <!-- Sidebar --> */}
        <div className="sidebar">
          {/* <!-- Sidebar user panel (optional) --> */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src={homeUrl + "/dist/img/user2-160x160.jpg"} className="img-circle elevation-2" alt={`${login_owner} Image`} />
            </div>
            <div className="info">
              <a href="#" className="d-block">{login_owner}</a>
            </div>
          </div>

          {/* <!-- SidebarSearch Form --> */}
          {/* <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div> */}

          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* <!-- Add icons to the links using the .nav-icon className */}
              {/* with font-awesome or any other icon font library --> */}

              {/* ############--SMTP Section--#################### */}
              <li className={(splitLocation[2] === "smtp-add") ? "nav-item" : "nav-item menu-is-opening menu-open"} >
                <Link className={splitLocation[2] === "smtp-add" ? 'nav-link active' : 'nav-link'} to={homeUrl + "/smtp-add"} >
                  <i className="nav-icon far fa-envelope-open"></i>
                  <p>
                    SMTP Add
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
              </li>
              <li className={(splitLocation[2] === "smtp-list") ? "nav-item" : "nav-item menu-is-opening menu-open"} >
                <Link className={splitLocation[2] === "smtp-list" ? 'nav-link active' : 'nav-link'} to={homeUrl + "/smtp-list"} >
                <i className="nav-icon far fa-envelope-open"></i>
                  <p>
                    SMTP List
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
              </li>

              {/* ################################ */}

              {/* ############--TEMPLATE Section--#################### */}
              <li className={(splitLocation[2] === "template-add") ? "nav-item" : "nav-item menu-is-opening menu-open"}>
                <Link className={splitLocation[2] === "template-add" ? 'nav-link active' : 'nav-link'} to={homeUrl + "/template-add"} >
                  <i className="nav-icon fab fa-html5"></i>
                  <p>
                    Template Add
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
              </li>

              <li className={(splitLocation[2] === "template-list") ? "nav-item" : "nav-item menu-is-opening menu-open"}>
                <Link className={splitLocation[2] === "template-list" ? 'nav-link active' : 'nav-link'} to={homeUrl + "/template-list"} >
                <i className="nav-icon fab fa-html5"></i>
                  <p>
                    Template List
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
              </li>
              {/* ################################ */}

              {/* ############--Add Email File Section--#################### */}
              <li className={(splitLocation[2] === "add-email-list") ? "nav-item" : "nav-item menu-is-opening menu-open"}>
                <Link className={splitLocation[2] === "add-email-list" ? 'nav-link active' : 'nav-link'} to={homeUrl + "/add-email-list"} >
                  <i className="nav-icon fas fa-mail-bulk"></i>
                  <p>
                    Email List Add
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
              </li>

              <li className={(splitLocation[2] === "email-queue-list") ? "nav-item" : "nav-item menu-is-opening menu-open"}>
                <Link className={splitLocation[2] === "email-queue-list" ? 'nav-link active' : 'nav-link'} to={homeUrl + "/email-queue-list"} >
                <i className="nav-icon fas fa-mail-bulk"></i>
                  <p>
                    Email Queue List
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
              </li>
              {/* ################################ */}


              {/* ############--Add Campaing Section--#################### */}
              <li className={(splitLocation[2] === "add-campaign") ? "nav-item" : "nav-item menu-is-opening menu-open"}>
                <Link className={splitLocation[2] === "add-campaign" ? 'nav-link active' : 'nav-link'} to={homeUrl + "/add-campaign"} >
                  <i className="nav-icon fab fa-bitbucket"></i>
                  <p>
                    Campaign Add
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
              </li>
              {/* ################################ */}

              {/* ############--List Campaing Section--#################### */}
              <li className={(splitLocation[2] === "list-campaign") ? "nav-item" : "nav-item menu-is-opening menu-open"}>
                <Link className={splitLocation[2] === "list-campaign" ? 'nav-link active' : 'nav-link'} to={homeUrl + "/list-campaign"} >
                <i className="nav-icon fab fa-bitbucket"></i>
                  <p>
                    Campaign List
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
              </li>
              {/* ################################ */}
              <li className={(splitLocation[2] === "add-image") ? "nav-item" : "nav-item menu-is-opening menu-open"}>
                <Link className={splitLocation[2] === "add-image" ? 'nav-link active' : 'nav-link'} to={homeUrl + "/add-image"} >
                <i className="nav-icon fab fa-bitbucket"></i>
                  <p>
                    Upload Image
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
              </li>
              {/* ################################ */}
              <li className="nav-header">----------------------------------</li>
              {/* <li className="nav-item menu-is-opening menu-open" onClick={logout}>
                <span className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Logout
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </span>

              </li> */}
              <li className="nav-item" onClick={logout} style={{ cursor: "pointer" }}>
                <span className="nav-link">
                  <i className="nav-icon fas fa-sign-out-alt text-danger"></i>
                  <p className="text">Logout</p>
                </span>
              </li>
              {/* <li className="nav-header">EXAMPLES</li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon far fa-envelope"></i>
                  <p>
                    SMTP
                    <i className="fas fa-angle-left right"></i>
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon far fa-circle text-info"></i>
                  <p>Informational</p>
                </a>
              </li> */}
            </ul>
          </nav>
          {/* <!-- /.sidebar-menu --> */}
        </div>
        {/* <!-- /.sidebar --> */}
      </aside>
    </>
  )
}


export default Sidebar;