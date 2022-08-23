import React, { useState, useEffect } from "react"
// import ReactDOM from 'react-dom';
// import { Link } from "react-router-dom"
import Breadcrumb from "../../common/Breadcum.js";
import Navbar from '../../navbar/Navbar.js';
import Sidebar from '../../sidebar/Sidebar.js';

import axios from 'axios';
import swal from 'sweetalert';

import { useParams } from "react-router-dom";

const SmtpUpdate = () => {

    let params = useParams();
    // console.log(params.id);

    useEffect(() => {
        fetch('http://emailcampaign.frontpews.com/emailcampaign/public/api/smtp/' + params.id)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setFormValues(data.results)
                console.log(data.results)
            })
            .catch(err => {
                console.log(err)
            })

    }, [1000])


    const [data, setData] = useState({
        smtp_name: "",
        smtp_host: "",
        smtp_port: "",
        smtp_username: "",
        smtp_password: "",
        smtp_encryption: "",
        from_name: "",
        from_email: "",
        bounce_email: "",
        bounce_username: "",
        bounce_port: ""

    });
    const [formValues, setFormValues] = useState(data);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handelInput = async (e) => {
        // const newdata = { ...data };
        // const name = e.target.name;
        // const value = e.target.value;
        // newdata[name] = value;
        // setData(newdata);
        // #######################

        const { name, value } = e.target;
        await setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);
        await setFormErrors(validate(formValues))
    }
    useEffect(() => {
        // if (Object.keys(formErrors) === 0) {
            console.log(formValues)
        // }
    }, [formErrors])

    const validate = (value) => {
        const error = {};

        if (value.smtp_name.length < 3 || value.smtp_name.length > 100) {
            error.smtp_name = "SMTP name min length is 3";
        }

        if (!value.smtp_name) {
            error.smtp_name = "SMTP name is required.";
        }

        // #################

        if (value.smtp_host.length < 3 || value.smtp_host.length > 100) {
            error.smtp_host = "SMTP host min length is 3";
        }

        if (!value.smtp_host) {
            error.smtp_host = "SMTP host is required.";
        }

        // ###################

        if (value.smtp_port.length > 50) {
            error.smtp_port = "SMTP port max length is 50";
        }

        if (!value.smtp_port) {
            error.smtp_port = "SMTP port is required.";
        }

        // ######################

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!value.smtp_username.match(mailformat)) {
            error.smtp_username = "Please enter a valid email";
        }

        if (!value.smtp_username) {
            error.smtp_username = "SMTP username is required.";
        }

        // ###########################
        if (value.smtp_password.length < 8) {
            error.smtp_password = "SMTP password min length is 8";
        }

        if (!value.smtp_password) {
            error.smtp_password = "SMTP password is required.";
        }

        // #############################

        if (value.smtp_encryption.length > 50) {
            error.smtp_encryption = "SMTP Encryption max length is 50";
        }

        if (!value.smtp_encryption) {
            error.smtp_encryption = "SMTP Encryption is required.";
        }
        // ###############################

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!value.from_email.match(mailformat)) {
            error.from_email = "Please enter a valid email";
        }

        if (!value.from_email) {
            error.from_email = "Email is required.";
        }

        // ###################################

        if (value.from_name.length < 3 || value.from_name.length > 50) {
            error.from_name = "Email Heading min length is 3";
        }

        if (!value.from_name) {
            error.from_name = "Email Heading is required.";
        }
        // #######################################

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!value.bounce_email.match(mailformat)) {
            error.bounce_email = "Please enter a valid email";
        }

        if (!value.bounce_email) {
            error.bounce_email = "Bounce Email is required.";
        }
        // ##################################


        if (value.bounce_username.length < 3 || value.bounce_username.length > 191) {
            error.bounce_username = "Bounce username min length is 3 and max length is 191";
        }

        if (!value.bounce_username) {
            error.bounce_username = "Bounce username is required.";
        }

        // ##################################

        if (value.bounce_port.length > 50) {
            error.bounce_port = "Bounce port max length is 50";
        }

        if (!value.bounce_port) {
            error.bounce_port = "Bounce port is required.";
        }




        return error;
    }

    async function smtpsubmit(e) {
        e.preventDefault();
        await setFormErrors(validate(formValues))
        console.log(formErrors);
        setIsSubmit(true)
        // alert(Object.keys(formErrors).length)
        // if (Object.keys(formErrors).length === 0) {
        //     alert("form submited.");
        // }
        await setTimeout(() => {
            if (Object.keys(formErrors).length === 0) {
                alert("Form Submited.");
                axios({
                    method: 'put',
                    url: 'http://emailcampaign.frontpews.com/emailcampaign/public/api/smtp/' + params.id,
                    data: formValues
                }).then(function (response) {
                    
                    // alert(response.data.status)
                    if (response.data.status === 200) {
                        swal("Form Updated Sucessfully.");
                    }
                })
                .catch(function(err) {
                    console.log(err)
                });            
            
            }


        },1000)
        


    }
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="content-wrapper" style={{ minHeight: "1345.31px" }}>
                <Breadcrumb heading={'SMTP Update Form'} breadcum={['Home', 'SMTP Update']} />
                {/* <!-- Main content --> */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* <!-- left column --> */}
                            <div className="col-md-12">
                                {/* <!-- general form elements --> */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        {/* <h3 className="card-title">Quick Example</h3> */}
                                        {/* {JSON.stringify(formValues, undefined, 2)} */}
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form onSubmit={(e) => smtpsubmit(e)}>

                                        <div className="card-body">

                                            {/* <Htmlinput nameid={'smtpname'} label={'SMTP Name'} placeholder={'SMTP Name'} value={data.smtpname} onsumt={handelInput}/> */}
                                            <div className="form-group">
                                                <label htmlFor="smtp_name">SMTP Name <code>{formErrors.smtp_name}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="smtp_name"
                                                    id="smtp_name"
                                                    placeholder="Smtp Name"
                                                    value={formValues.smtp_name}
                                                    onChange={handelInput}
                                                    onKeyUp={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="smtp_host">SMTP Host <code>{formErrors.smtp_host}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="smtp_host"
                                                    name="smtp_host"
                                                    placeholder="SMTP Host"
                                                    value={formValues.smtp_host}
                                                    onChange={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="smtp_port">SMTP Port <code>{formErrors.smtp_port}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="smtp_port"
                                                    name="smtp_port"
                                                    placeholder="SMTP Port"
                                                    value={formValues.smtp_port}
                                                    onChange={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="smtp_username">SMTP Username <code>{formErrors.smtp_username}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="smtp_username"
                                                    name="smtp_username"
                                                    placeholder="SMTP Username"
                                                    value={formValues.smtp_username}
                                                    onChange={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="smtp_password">SMTP Password <code>{formErrors.smtp_password}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="smtp_password"
                                                    name="smtp_password"
                                                    placeholder="Password"
                                                    value={formValues.smtp_password}
                                                    onChange={handelInput}
                                                    onKeyUp={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="smtp_encryption">SMTP Encryption  <code>{formErrors.smtp_encryption}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="smtp_encryption"
                                                    id="smtp_encryption"
                                                    placeholder="SMTP Encryption"
                                                    value={formValues.smtp_encryption}
                                                    onChange={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="from_name">Email From Name  <code>{formErrors.from_name}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="from_name"
                                                    id="from_name"
                                                    placeholder="Email From Name"
                                                    value={formValues.from_name}
                                                    onChange={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="from_email">From Email  <code>{formErrors.from_email}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="from_email"
                                                    id="from_email"
                                                    value={formValues.from_email}
                                                    placeholder="Email From Email ID"
                                                    onChange={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="smtp_max_limit">SMTP max limit  <code>{formErrors.smtp_max_limit}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="smtp_max_limit"
                                                    id="smtp_max_limit"
                                                    value={formValues.smtp_max_limit}
                                                    placeholder="Email From Email ID"
                                                    onChange={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="bounce_email">Bounce Email  <code>{formErrors.bounce_email}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="bounce_email"
                                                    id="bounce_email"
                                                    value={formValues.bounce_email}
                                                    placeholder="Bounce Email"
                                                    onChange={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="bounce_username">Bounce Username  <code>{formErrors.bounce_username}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="bounce_username"
                                                    id="bounce_username"
                                                    value={formValues.bounce_username}
                                                    placeholder="Bounce Username"
                                                    onChange={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="bounce_port">Bounce Port  <code>{formErrors.bounce_port}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="bounce_port"
                                                    id="bounce_port"
                                                    value={formValues.bounce_port}
                                                    placeholder="Bounce Port"
                                                    onChange={handelInput}
                                                />
                                            </div>

                                            {/* <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                                            </div> */}
                                        </div>
                                        {/* <!-- /.card-body --> */}

                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/* <!--/.col (left) --> */}
                            {/* <!-- right column --> */}

                            {/* <!--/.col (right) --> */}
                        </div>
                        {/* <!-- /.row --> */}
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </section>
                {/* <!-- /.content --> */}
            </div>
        </>
    )
}



export default SmtpUpdate;