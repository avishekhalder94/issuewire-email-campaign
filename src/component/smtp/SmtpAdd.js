import React, { useState, useEffect } from "react"
// import ReactDOM from 'react-dom';
// import { setDatasets } from "react-chartjs-2/dist/utils";
// import { Link } from "react-router-dom"
import Breadcrumb from "../../common/Breadcum.js";
import Navbar from '../../navbar/Navbar.js';
import Sidebar from '../../sidebar/Sidebar.js';

import { useForm } from "react-hook-form";
import axios from 'axios';
import swal from 'sweetalert';

const SmtpAdd = (props) => {

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
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const [formValues, setFormValues] = useState(data);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [submitBtn, setSubmitBtn] = useState(<button type="submit" className="btn btn-block btn-primary">Submit</button>);


    const handelInput = async (e) => {

        // const newdata = { ...data };
        // const name = e.target.name;
        // const value = e.target.value;
        // newdata[name] = value;
        // setData(newdata);
        // #######################

        // const { name, value } = e.target;
        // await setFormValues({ ...formValues, [name]: value });
        // await setFormErrors(validate(formValues))

        const newdata = { ...formValues };
        const name = e.target.name;
        const value = e.target.value;
        newdata[name] = value;

        setFormValues(newdata);

        setFormErrors(validate(newdata));

    }
    useEffect(() => {
        if (Object.keys(formErrors) === 0) {
            console.log(formValues)
        }
        // setFormErrors(validate(formValues))
    }, [formValues])

    
    useEffect(() => {
        // if (isSubmit) {
        //     setSubmitBtn(<p className="btn btn-primary btn-block disabled"><i class="3x fa-spinner fas"></i></p>); 
        // }else{
        //     setSubmitBtn(<button type="submit" className="btn btn-block btn-primary">Submit</button>); 
        // }
        
    }, [isSubmit])

    const validate = (value) => {
        const error = {};

        if (value.smtp_name.length < 3 || value.smtp_name.length > 100) {
            error.smtp_name = "SMTP name min length is 3";
        }

        if (!value.smtp_name) {
            error.smtp_name = "SMTP name is required.";
        }

        // #################

        if (value.smtp_host.length < 3 || value.smtp_host.length > 191) {
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

        // var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // if (!value.smtp_username.match(mailformat)) {
        //     error.smtp_username = "Please enter a valid email";
        // }

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

    const onSubmit = (data) => {
        console.log(data)


        setTimeout(() => {
        
            axios({
                method: 'post',
                url: 'http://emailcampaign.frontpews.com/emailcampaign/public/api/smtp',
                data: {
                    "bounce_email":data.bounce_email,
                    "bounce_port":data.bounce_port,
                    "bounce_username":data.bounce_username,
                    "from_email":data.from_email,
                    "from_name":data.from_name,
                    "smtp_encryption":data.smtp_encryption,
                    "smtp_host":data.smtp_host,
                    "smtp_max_limit": data.smtp_max_limit,
                    "smtp_name":data.smtp_name,
                    "smtp_password":data.smtp_password,
                    "smtp_port":data.smtp_port,
                    "smtp_username":data.smtp_username
                }
            }).then(function (response) {

                if (response.data.status === 201) {
                    swal("Form save sucessfully.");
                    reset();
                }else{
                    console.log(response)
                    swal("Error !!","","error");
                }
            })
            .catch(function (err) {
                console.log(err)
            });
            
        }, 1000);
        


    };


    async function smtpsubmit(e) {
        e.preventDefault();
        await setFormErrors(validate(formValues))
        console.log(formErrors);
        await setIsSubmit(true)

        await setTimeout(() => {
            
            // alert(Object.keys(formErrors).length)
            if (Object.keys(formErrors).length === 0) {
                alert("Form Submited.");
                axios({
                    method: 'post',
                    url: 'http://emailcampaign.frontpews.com/emailcampaign/public/api/smtp',
                    data: formValues
                }).then(function (response) {
                    
                    //if (response.data.status === 422) {
                    // alert(response.data.status)
                    console.log(response)
                    // setIsSubmit(false)
                    //}
                    if (response.data.status === 201) {
                        swal("Form save sucessfully.");
                        setFormValues({
                            smtp_name: " ",
                            smtp_host: " ",
                            smtp_port: " ",
                            smtp_username: " ",
                            smtp_password: " ",
                            smtp_encryption: " ",
                            from_name: " ",
                            from_email: " ",
                            bounce_email: " ",
                            bounce_username: " ",
                            bounce_port: " "
                        })
                    }
                })
                .catch(function (err) {
                    console.log(err)
                });
    
            }
            
        }, 1000);

    }
    return (
        <>
        <Navbar/>
        <Sidebar/>
            <div className="content-wrapper" style={{ minHeight: "1345.31px" }}>
                <Breadcrumb heading={'SMTP Add Form'} breadcum={['Home', 'SMTP ADD']} />
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
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className="card-body">

                                            {/* <Htmlinput nameid={'smtpname'} label={'SMTP Name'} placeholder={'SMTP Name'} value={data.smtpname} onsumt={handelInput}/> */}
                                            <div className="form-group">
                                                <label htmlFor="smtp_name">SMTP Name
                                                     <code>
                                                        {errors.smtp_name?.type === 'required' && "Smtp Name is required"}
                                                        {errors.smtp_name?.type === 'minLength' && " Smtp Name Min length 4 is require."}
                                                        {errors.smtp_name?.type === 'maxLength' && " Smtp Name Max length is 100."}
                                                     </code>
                                                </label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Smtp Name"
                                                    {...register("smtp_name", { required: true, maxLength: 100, minLength: 3 })}
                                                />

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="smtp_host">SMTP Host
                                                    <code>
                                                        {errors.smtp_host?.type === 'required' && "SMTP Host is required"}
                                                        {errors.smtp_host?.type === 'minLength' && " SMTP Host Min length 3 is require."}
                                                        {errors.smtp_host?.type === 'maxLength' && " SMTP Host Max length is 191."}
                                                     </code>
                                                </label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="SMTP Host"
                                                    {...register("smtp_host", { required: true, maxLength: 191, minLength: 3 })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="smtp_port">SMTP Port 
                                                    <code>
                                                        {errors.smtp_port?.type === 'required' && " SMTP Port is required"}
                                                        {errors.smtp_port?.type === 'maxLength' && " SMTP Port Max length is 191."}
                                                    </code>
                                                </label>
                                                <input type="number"
                                                    className="form-control"
                                                    placeholder="SMTP Port"
                                                    {...register("smtp_port", { required: true, maxLength: 50 })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                    <label htmlFor="smtp_username">SMTP Username
                                                 <code>
                                                        {errors.smtp_username?.type === 'required' && " SMTP Username is required."}
                                                        {errors.smtp_username?.type === 'pattern' && " Please enter a valid email."}
                                                </code>
                                                     </label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="SMTP Username"
                                                    {...register("smtp_username", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="smtp_password">SMTP Password 
                                                <code>
                                                    {errors.smtp_password?.type === 'required' && " SMTP Password is required."}
                                                    {errors.smtp_password?.type === 'minLength' && " SMTP Password in length is 8."}
                                                    </code>
                                                    </label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    {...register("smtp_password", { required: true, minLength: 8 })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="smtp_encryption">SMTP Encryption
                                                 <code>
                                                 {errors.smtp_encryption?.type === 'required' && " SMTP Encryption is required."}
                                                    {errors.smtp_encryption?.type === 'maxLength' && " SMTP Encryption Max length is 50."}
                                                     </code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="SMTP Encryption"
                                                    {...register("smtp_encryption", { required: true, maxLength: 50 })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="from_name">Email From Name 
                                                 <code>
                                                    {errors.from_name?.type === 'required' && " Email From Name is required."}
                                                    {errors.from_name?.type === 'maxLength' && " Email From Name Max length is 50."}
                                                    {errors.from_name?.type === 'maxLength' && " Email From Name Min length is 3."}
                                                     </code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Email From Name"
                                                    {...register("from_name", { required: true, maxLength: 50, minLength: 3 })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="from_email">From Email
                                                  <code>
                                                    {errors.from_email?.type === 'required' && " Email From Name is required."}
                                                    {errors.from_email?.type === 'pattern' && " Please Enater a valid Email."}
                                                    </code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Email From Email ID"
                                                    {...register("from_email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="from_email">SMTP Max Limit
                                                  <code>
                                                    {errors.smtp_max_limit?.type === 'required' && " SMTP Max Limit is required."}
                                                    {errors.smtp_max_limit?.type === 'maxLength' && " SMTP Max limti length is 50."}
                                                    </code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Max Limit"
                                                    {...register("smtp_max_limit", { required: true, maxLength:50 })}
                                                />
                                            </div>                                            
                                            <div className="form-group">
                                                <label htmlFor="bounce_email">Bounce Email  
                                                <code>
                                                    {errors.bounce_email?.type === 'required' && " Bounce Email is required."}
                                                    {errors.bounce_email?.type === 'pattern' &&  " Please Enter a valid Email."}
                                                    </code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Bounce Email"
                                                    {...register("bounce_email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="bounce_username">Bounce Username
                                                 <code>
                                                        {errors.bounce_username?.type === 'required' && " Bounce Username is required."}
                                                        {errors.bounce_username?.type === 'minLength' && " Bounce Username Min length is 3."}
                                                        {errors.bounce_username?.type === 'maxLength' && " Bounce Username Max length is 191."}
                                                     </code>
                                                     </label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Bounce Username"
                                                    {...register("bounce_username", { required: true, maxLength: 191, minLength: 3 })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="bounce_port">Bounce Port
                                                  <code>
                                                        {errors.bounce_port?.type === 'required' && " Bounce Port is required"}
                                                        {errors.bounce_port?.type === 'maxLength' && " Bounce Port Max length is 50."}
                                                      </code>
                                                      </label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Bounce Port"
                                                    {...register("bounce_port", { required: true, maxLength: 50 })}
                                                />
                                            </div>

                                            {/* <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                                            </div> */}
                                        </div>

                                        <div className="card-footer col-2">
                                            {submitBtn}
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



export default SmtpAdd;