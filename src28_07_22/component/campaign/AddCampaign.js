import React, { useState, useEffect } from "react"
// import { setDatasets } from "react-chartjs-2/dist/utils";
// import { Link } from "react-router-dom"
import Breadcrumb from "../../common/Breadcum.js"
import Navbar from '../../navbar/Navbar.js';
import Sidebar from '../../sidebar/Sidebar.js';

import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from 'react-select';
import axios from 'axios';
import swal from "sweetalert";

const AddCampaign = () => {

    const [data, setData] = useState({
        camp_name: "",
        camp_subj: "",
        temp_id: "",
        smtp_id: "",
        email_queue_id: "",
        camp_set_date: "",
        no_of_count: "",
        time_difference: ""
    });
    const [startDate, setStartDate] = useState(new Date());
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [formValues, setFormValues] = useState(data);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [template, setTemplate] = useState([]);
    const [smtp, setSmtp] = useState([]);
    const [emailqueue, setEmailqueue] = useState([]);


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const handelInput = (e) => {

        const newdata = { ...formValues };
        const name = e.target.name;
        const value = e.target.value;
        newdata[name] = value;
        setFormValues(newdata);
        setFormErrors(validate(newdata));

    }

    const validate = (value) => {
        const error = {};

        if (value.camp_name.length < 3 || value.camp_name.length > 100) {
            error.camp_name = "Campaign name min length is 3";
        }

        if (!value.camp_name) {
            error.camp_name = "Campaign name is required.";
        }

        // ##########################

        if (value.camp_subj.length < 4 || value.camp_subj.length > 100) {
            error.camp_subj = "Campaign subject min length is 4";
        }

        if (!value.camp_subj) {
            error.camp_subj = "Campaign subject is required.";
        }

        // ################################

        if (!value.temp_id) {
            error.temp_id = "Campaign Template id is required.";
        }

        // ###########################

        if (!value.smtp_id) {
            error.smtp_id = "Campaign SMTP id is required.";
        }

        // ###########################

        if (!value.email_queue_id) {
            error.email_queue_id = "Campaign Email queue id is required.";
        }

        // ##############################

        if (!value.camp_set_date) {
            error.camp_set_date = "Campaign campaign date is required.";
        }

        // ########################

        if (!value.no_of_count) {
            error.no_of_count = "Campaign run count is required.";
        }

        // ###########################

        if (!value.time_difference) {
            error.time_difference = "Campaign time difference is required.";
        }




        return error;
    }


    // useEffect(() => {
    //     //if (Object.keys(formErrors) === 0) {
    //     console.log(formErrors)
    //     // setFormErrors(validate(formValues))
    //     //}
    // }, [formErrors])

    // const template_options = template.map((number) =>
    //     <option key={number.id} value={number.id}>{number.temp_name}</option>
    // );
    // const smtp_options = smtp.map((number) =>
    //     <option key={number.id} value={number.id}>{number.smtp_name}</option>
    // );
    // const campaign_options = emailqueue.map((number, i) =>
    //     <option key={i} value={number.email_queue_id}>{number.user_group}</option>
    // );

    // const campaign_options_test = emailqueue.map((number, i) => {
    //     console.log(number[i]);
    // });

    useEffect(() => {
        getData();

        // we will use async/await to fetch this data
        async function getData() {
            
            await axios({
                method: 'get',
                url: 'http://emailcampaign.frontpews.com/public/api/template'
            }).then(function (response) {
                // console.log(response.data);  
                return response.data.results;
            }).then(function (data) {
                const options = [];
                data.forEach(element => {
                    options.push({ value: element.id, label: element.temp_name })
                });
                // console.log(options);
                setTemplate(options);

            }).catch(function (err) {
                console.log(err)
            });
            // ######################################

            await axios({
                method: 'get',
                url: 'http://emailcampaign.frontpews.com/public/api/smtp'
            }).then(function (response) {
                // console.log(response.data);  
                return response.data.results;
            }).then(function (data) {
                const options = [];
                data.forEach(element => {
                    options.push({ value: element.id, label: element.smtp_name })
                });
                // console.log(options);
                setSmtp(options);

            }).catch(function (err) {
                console.log(err)
            });

            // ###############################################
            await axios({
                method: 'get',
                url: 'http://emailcampaign.frontpews.com/public/api/emailqueue'
            }).then(function (response) {

                // console.log(response.data);  
                return response.data.results;

            }).then(function (data) {

                const options = [];
                data.forEach(element => {
                    options.push({ value: element.email_queue_id, label: element.user_group })
                });
                // console.log(options);
                setEmailqueue(options);

            }).catch(function (err) {
                console.log(err)
            });


            // const response1 = await fetch("http://emailcampaign.frontpews.com/public/api/template")
            // let template = await response1.json();
            // setTemplate(template.results);

            //   let template = await response1.json();
            //   setTemplate(template.results);
            // const response2 = await fetch("http://emailcampaign.frontpews.com/public/api/smtp");
            // let smtp = await response2.json();
            // setSmtp(smtp.results);
            // const response3 = await fetch("http://emailcampaign.frontpews.com/public/api/emailqueue");
            // let emailqueue = await response3.json();
            // setEmailqueue(emailqueue.results);
        }

    }, [1000]);

    async function smtpsubmit(e) {
        e.preventDefault();
        // alert(data);
        // console.log(data);
        await setFormErrors(validate(formValues));
        await setIsSubmit(true)
        // alert(Object.keys(formErrors).length)
        if (Object.keys(formErrors).length === 0) {
            alert("form submited.")
            axios({
                method: 'post',
                url: 'http://emailcampaign.frontpews.com/public/api/campaign',
                data: formValues
            }).then(function (response) {
                console.log(response);
                if (response.data.status === 201) {
                    // setData({ camp_name: "", camp_subj: "", temp_id: "", smtp_id: "", camp_set_date: "", no_of_count: "", time_difference: "" })
                    swal("Form submited.");
                    setFormValues({ camp_name: "", camp_subj: "", temp_id: null, smtp_id: null, camp_set_date: "", no_of_count: "", time_difference: "" });
                } else {
                    console.log(response)
                    swal("Error!", "", "error");
                }
                // alert(response.status);
            }).catch(function (error) {
                console.log(error)
            });

        }

    }
    const [selectTemplate, setSelectTemplate] = useState([]);
    const [selectSmtp, setSelectSmtp] = useState([]);
    const [selectEmailGrp, setSelectEmailGrp] = useState([]);
    const [selectCampDate, setSelectCampDate] = useState([]);
    const [error, setError] = useState([]);

    const onSubmit = (data) => {
        // console.log(data);
        var i = 0;
        const error = [];
        if (selectTemplate.length === 0) {
            i++;
            error.template = "Template filed id required."
        }
        if (selectSmtp.length === 0) {
            i++;
            error.smtp = "SMTP filed id required."
        }
        if (selectEmailGrp.length === 0) {
            i++;
            error.emailgrp = "Email Group filed id required.";
        }
        setFormErrors(error);

        // console.log(selectTemplate)
        // console.log(typeof selectSmtp)
        // console.log(selectEmailGrp)
        // console.log(selectCampDate)
        const camp_date = new Date(selectCampDate).toISOString();
        // const camp_date = new Date(selectCampDate).toString();
        
        console.log(camp_date);

        if (i === 0) {


            axios({
                method: 'post',
                url: 'http://emailcampaign.frontpews.com/public/api/campaign',
                data: {
                    "camp_name": data.camp_name,
                    "camp_subj": data.camp_subj,
                    "temp_id": parseInt(selectTemplate.value),
                    "smtp_id": JSON.stringify(selectSmtp),
                    "email_queue_id": selectEmailGrp.value,
                    "camp_set_date": camp_date,
                    "no_of_count": data.no_of_count,
                    "time_difference": data.time_difference
                }
            }).then(function (response) {
                // console.log(response);

                if (response.data.status === 201) {

                    swal("Form submited.");

                } else {

                    console.log(response);
                    swal("Error!", "", "error");

                }

            }).catch(function (error) {

                console.log(error)

            });


        }else{
            alert("Error! ");
        }

    }
    // const testchange = (data) =>{
    //     // console.log(data)
    // }
    // const testdate = (data) =>{
    //     // console.log("trst data");
    //     // console.log(data);
    // }
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="content-wrapper" style={{ minHeight: "1345.31px" }}>
                <Breadcrumb heading={'Add Campaign'} breadcum={['Home', 'Add Campaign']} />
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
                                        <h3 className="card-title">
                                            {/* {JSON.stringify(formErrors, undefined, 2)} */}
                                        </h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className="card-body">

                                            {/* <Htmlinput nameid={'smtpname'} label={'SMTP Name'} placeholder={'SMTP Name'} value={data.smtpname} onsumt={handelInput}/> */}
                                            <div className="form-group">
                                                <label htmlFor="smtp_name">Campaign Name 
                                                <code>
                                                        {errors.camp_name?.type === 'required' && "Campaign Name is required"}
                                                        {errors.camp_name?.type === 'minLength' && " Campaign Name Min length 4 is require."}
                                                        {errors.camp_name?.type === 'maxLength' && " Campaign Name Max length is 100."}
                                                    </code>
                                                    </label>
                                                {/* <input type="text"
                                                    className="form-control"
                                                    name="camp_name"
                                                    id="camp_name"
                                                    placeholder="Campaign Name"
                                                    value={formValues.camp_name}
                                                    onChange={handelInput}
                                                /> */}
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Campaing Name"
                                                    {...register("camp_name", { required: true, maxLength: 100, minLength: 3 })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="smtp_host">Campaign Subject <code>
                                                        {errors.camp_subj?.type === 'required' && "Campaign Subject is required"}
                                                        {errors.camp_subj?.type === 'minLength' && " Campaign Subject Min length 3 is require."}
                                                        {errors.camp_subj?.type === 'maxLength' && " Campaign Subject Max length is 100."}
                                                    </code></label>
                                                {/* <input type="text"
                                                    className="form-control"
                                                    id="camp_subj"
                                                    name="camp_subj"
                                                    placeholder="Campaign Subject"
                                                    value={formValues.camp_subj}
                                                    onChange={handelInput}
                                                /> */}
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Campaing Subject"
                                                    {...register("camp_subj", { required: true, maxLength: 100, minLength: 3 })}
                                                />
                                            </div>
                                            {/* <div className="form-group">
                                                <label htmlFor="temp_id">Select Template <code>{formErrors.temp_id}</code></label>
                                                <select className="custom-select rounded-0" name="temp_id" id="temp_id" onChange={handelInput}>
                                                    <option value={null}>Select Template</option>
                                                    {template_options}
                                                </select>
                                            </div> */}

                                            <div className="form-group">
                                                <label htmlFor="temp_id">Select Template <code>{formErrors.template}</code></label>
                                                {/* <Select options={template}
                                                    {...register("temp_id", { required: true })}
                                                /> */}
                                                <Select
                                                    name="temp_id"
                                                    options={template}
                                                    onChange={(e) => setSelectTemplate(e)}
                                                // {...register("temp_id", { required: true })}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="smtp_id">Select SMTP <code>{formErrors.smtp}</code></label>
                                                {/* <select className="custom-select rounded-0" name="smtp_id" id="smtp_id" onChange={handelInput}> */}
                                                {/* <option value={null}>Select Smtp</option> */}
                                                {/* {smtp_options} */}
                                                {/* <Select name="smtp_id" options={smtp} /> */}
                                                {/* </select> */}
                                                <Select
                                                    className=""
                                                    name="smtp_id"
                                                    options={smtp}
                                                    isMulti
                                                    onChange={(e) => setSelectSmtp(e)}
                                                // {...register("smtp_id", { required: true })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email_queue_id">Select Email Group <code>{formErrors.emailgrp}</code></label>
                                                {/* <select className="custom-select rounded-0" name="email_queue_id" id="email_queue_id" onChange={handelInput}>
                                                    <option value={null}>Select Group</option>
                                                    {campaign_options}
                                                </select> */}
                                                <Select
                                                    className=""
                                                    name="email_queue_id"
                                                    options={emailqueue}
                                                    onChange={(e) => setSelectEmailGrp(e)}
                                                //  {...register("email_queue_id", { required: true })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="camp_set_date">Campaign Date <code>{formErrors.camp_set_date}</code></label>
                                                {/* <input type="text"
                                                    className="form-control"
                                                    id="camp_set_date"
                                                    name="camp_set_date"
                                                    placeholder="Campaign Date dd-mm-yyyy"
                                                    value={formValues.camp_set_date}
                                                    onChange={handelInput}
                                                /> */}
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => { setStartDate(date); setSelectCampDate(date) }}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={30}
                                                    timeCaption="time"
                                                    dateFormat="dd-m-yyyy h:mm aa"
                                                    className="form-control"

                                                // name="camp_set_date"
                                                // {...register("camp_set_date", { required: true })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="no_of_count">Number of Count <code>
                                                {errors.no_of_count?.type === 'required' && " Campaign count is required."}
                                                    </code></label>
                                                {/* <input type="number"
                                                    className="form-control"
                                                    id="no_of_count"
                                                    name="no_of_count"
                                                    placeholder="Campaign Count"
                                                    value={formValues.no_of_count}
                                                    onChange={handelInput}
                                                /> */}
                                                <input type="number"
                                                    className="form-control"
                                                    placeholder="Campaign Count"
                                                    {...register("no_of_count", { required: true })}
                                                />

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="time_difference">Time Difference (Minute)  <code>
                                                {errors.time_difference?.type === 'required' && " Campaign time difference is required."}
                                                    </code></label>
                                                {/* <input type="number"
                                                    className="form-control"
                                                    id="time_difference"
                                                    name="time_difference"
                                                    placeholder="Time Difference in Minute"
                                                    value={formValues.time_difference}
                                                    onChange={handelInput}
                                                /> */}

                                                <input type="number"
                                                    className="form-control"
                                                    placeholder="Time Difference in Minute"
                                                    {...register("time_difference", { required: true })}
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



export default AddCampaign;