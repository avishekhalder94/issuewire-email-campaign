import React, { useState } from "react";

import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

// import { QueryClient, QueryClientProvider, useQuery, usePaginatedQuery } from 'react-query';


const LoginPage = (props) => {

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [formValues, setFormValues] = useState(data);
    const [loginError, setLoginError] = useState("");

    // console.log(props.loginDetails.loginStatus)

    const handelInput = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        // props.setLoginDetails({ loginStatus: true });
        // console.log(formValues);
        axios({
            method: 'post',
            url: 'http://emailcampaign.frontpews.com/public/api/auth/login',
            data: formValues
        }).then(function (response) {
            // response.data.token_details.original.token
            if (response.data.status === 200) {
            const isAdmin = (response.data.user_details[0].is_admin == "yes")? true : false;    
            localStorage.setItem('token',JSON.stringify({
               loginStattus: true,
               token: response.data.token_details.original.token,
               token_validity: response.data.token_details.original.token_validity,
               isAdmin: isAdmin 
            }));
            // console.log(response.data.user_details[0].is_admin );
            props.setLoginDetails({loginStatus:true})

            }else{
                swal(response.data.message);
                setLoginError(response.data.message);
            }

            // if (response.data.status === 401) {
            //     setLoginError(response.data.message);
            // }

            // localStorage.setItem('token',JSON.stringify({
            //    loginStattus: true,
            //    token: response.data.token_details.original.token,
            //    token_validity: response.data.token_details.original.token_validity
            // }));
            // console.log(response.data);
            // props.setLoginDetails({loginStatus:true})
           
        })
        .catch(function (error) {
            console.log(error)
        });
    }

    return (
        <>
            <div className="hold-transition login-page">
                <div className="login-box">
                    {/* <!-- /.login-logo --> */}
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <a href="#" className="h1"><b>EmailCampaign</b></a>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">Sign in to start your session</p>

                            <form onSubmit={(e) => loginSubmit(e)}>
                                <div className="input-group mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        id="email"
                                        name="email"
                                        value={formValues.admin_username}
                                        onChange={handelInput}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        id="password"
                                        name="password"
                                        value={formValues.admin_password}
                                        onChange={handelInput}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary">
                                            <input type="checkbox" id="remember" />
                                            <label htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                    {/* <!-- /.col --> */}
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                    </div>
                                    {/* <!-- /.col --> */}
                                </div>
                            </form>

                            {/* <!-- /.social-auth-links --> */}
                            
                            <p className="mb-1">
                                {loginError}    
                            </p>
                        </div>
                        {/* <!-- /.card-body --> */}
                    </div>
                    {/* <!-- /.card --> */}
                </div>
            </div>
        </>
    )
}


export default LoginPage;