import React from "react";
// import logo from './logo.svg';

import './plugins/fontawesome-free/css/all.min.css';
// <!-- Ionicons -->

// <!-- Tempusdominus Bootstrap 4 -->
import './plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css';
// <!-- iCheck -->
import './plugins/icheck-bootstrap/icheck-bootstrap.min.css';
//JQVMap
import './plugins/jqvmap/jqvmap.min.css';
//Theme style
import './dist/css/adminlte.min.css';
//  overlayScrollbars
import './plugins/overlayScrollbars/css/OverlayScrollbars.min.css';
// Daterange picker
import './plugins/daterangepicker/daterangepicker.css';
// summernote 
import './plugins/summernote/summernote-bs4.min.css';
// import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";


// import Navbar from './navbar/Navbar.js';
// import Sidebar from './sidebar/Sidebar.js';

import SmtpAdd from './component/smtp/SmtpAdd.js';
import SmtpList from './component/smtp/SmtpList.js';
import SmtpUpdate from './component/smtp/SmtpUpdate.js';

import TemplateAdd from './component/template/TemplateAdd.js';
import TemplateList from './component/template/TemplateList.js';
import TemplateUpdate from './component/template/TemplateUpdate.js';

import AddEmailList from './component/emailfile/AddEmailList.js';
import EmailQueueList from './component/emailfile/EmailQueueList.js';
import EmailList from './component/emailfile/EmailList.js';


import AddCampaign from './component/campaign/AddCampaign.js';
import ListCampaign from './component/campaign/ListCampaign.js';
import UpdateCampaign from './component/campaign/UpdateCampaign.js';
import AddImage from './component/imageupload/AddImage.js';

import LoginPage from './component/login/LoginPage.js';

import Footer from './common/Footer.js';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.


export default function App() {

    const homeUrl = process.env.PUBLIC_URL;
    console.log(homeUrl);
    const [loginDetails, setLoginDetails] = React.useState({
        loginStatus: true,
        username: null,
        password:null,
        token:null
    });
    const token = localStorage.getItem('token');
    const tkn = JSON.parse(token);

    // useEffect( async () => {

    //     console.log(tkn)
    //     // async () =>{

    //        if ( tkn != null) {

    //             console.log("its login..");

    //             setLoginDetails({
    //                 loginStatus: true,
    //                 username: "avishek",
    //                 password:"password",
    //                 token:tkn.token
    //             })
    //             console.log(tkn.token)

    //         }else{

    //             setLoginDetails({
    //                 loginStatus: false,
    //                 username: null,
    //                 password:null,
    //                 token:null
    //             })
    
    //         }
    //     // }
        
    // },[1000])

    console.log(loginDetails.username);
    
    return (
        <>
        <Router>
            {/* <Navbar/>
            <Sidebar/> */}

            <Routes>
                <Route path={homeUrl+"/"} exact element={
                <>
                {(tkn != null) ?
                 <Navigate replace to={homeUrl+"/smtp-add"}  /> : <LoginPage loginDetails={loginDetails} setLoginDetails={setLoginDetails}/> }
                </>
                
                } />

                <Route path={homeUrl+"/login"} element={
                    <>
                       {
                        (tkn != null) ? 
                                <Navigate replace to={homeUrl+"/smtp-add"}  /> :
                                <LoginPage loginDetails={loginDetails} setLoginDetails={setLoginDetails}/>
                        }             
                    </>    
                } />
                {/* <Route path='/smtp' element={<SmtpAdd/>} /> */}
                <Route path={homeUrl+"/smtp-add"} element={
                    <>
                    {(tkn != null) ? <SmtpAdd loginDetails={loginDetails} setLoginDetails={setLoginDetails} /> :
                        <Navigate replace to={homeUrl+"/login"} />
                    }
                    </>
                } />
                {/* <Route path={homeUrl+"/smtp-list"} element={<SmtpList/>} /> */}
                <Route path={homeUrl+"/smtp-list"} element={
                    <>
                    {(tkn != null) ? <SmtpList/> : <Navigate replace to={homeUrl+"/login"} /> }
                    </>
                } />
                
                <Route path={homeUrl+"/smtp-list/:id"} element={
                    <>
                    {(tkn != null) ? <SmtpUpdate/> : <Navigate replace to={homeUrl+"/login"} /> }
                    {/* {(tkn != null) ? <SmtpList/> : <Navigate replace to={homeUrl+"/login"} /> } */}
                    </>
                } />
                
                {/* ###################################################### */}
                <Route path={homeUrl+"/template-add"} element={
                    <>
                    {(tkn != null) ? <TemplateAdd/> : <Navigate replace to={homeUrl+"/login"} /> }
                    </>
                
                } />
                <Route path={homeUrl+"/template-list"} element={
                    <>
                    {(tkn != null) ? <TemplateList/> : <Navigate replace to={homeUrl+"/login"} /> }
                    </>
                } />
                <Route path={homeUrl+"/template-list/:id"} element={
                    <>
                    {(tkn != null) ? <TemplateUpdate/> : <Navigate replace to={homeUrl+"/login"} /> }
                    </>
                } />
                {/* ##################################################### */}

                <Route path={homeUrl+"/add-email-list"} element={
                    <>
                    {(tkn != null) ? <AddEmailList/> : <Navigate replace to={homeUrl+"/login"} /> }
                    </>
                } />

                <Route path={homeUrl+"/email-queue-list"} element={
                    <>
                        {(tkn != null) ? <EmailQueueList/> : <Navigate replace to={homeUrl+"/login"} /> }
                    </>
                } />

                <Route path={homeUrl+"/email-list/:id"} element={
                    <>
                        {(tkn != null) ? <EmailList/> : <Navigate replace to={homeUrl+"/login"} /> }
                    </>
                } />

                {/* ############################################################ */}

                <Route path={homeUrl+"/add-campaign"} element={
                    <>
                    {(tkn != null) ? <AddCampaign/> : <Navigate replace to={homeUrl+"/login"} /> }
                    </>
                } />
                <Route path={homeUrl+"/list-campaign"} element={
                    <>
                    {(tkn != null) ? <ListCampaign/> : <Navigate replace to={homeUrl+"/login"} /> }
                    </>
                } />
                <Route path={homeUrl+"/list-campaign/:id"} element={
                    <>
                    {(tkn != null) ? <UpdateCampaign/> : <Navigate replace to={homeUrl+"/login"} /> }
                    </>
                } />

                <Route path={homeUrl+"/add-image"} element={
                    <>
                    {(tkn != null) ? <AddImage/> : <Navigate replace to={homeUrl+"/login"} /> }
                    </>
                } />

                {/* ############################################################ */}
                {/* <Route path="*" element={<ListCampaign/>} /> */}

                <Route path={homeUrl+"/test"} element={<ListCampaign/>} />
                
            </Routes>

            <Footer/>
        </Router>
        </>
    );
}



// function Smtp() {
//     return (
//         <div>
//             <h2>About</h2>
//         </div>
//     );
// }


// function Dashboard() {
//     return (
//         <div>
//             <h2>Dashboard</h2>
//         </div>
//     );
// }
