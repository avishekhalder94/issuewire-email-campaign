import React, { useState, useEffect } from "react"
// import { setDatasets } from "react-chartjs-2/dist/utils";
// import { Link } from "react-router-dom"
import Breadcrumb from "../../common/Breadcum.js"
import Navbar from '../../navbar/Navbar.js';
import Sidebar from '../../sidebar/Sidebar.js';

import axios from 'axios';
import swal from 'sweetalert';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useParams } from "react-router-dom";

const UpdateCampaign = () => {

    let params = useParams();
    // console.log(params.id);
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

    const [temp_id, setTemp_id] = useState(0);
    const [smtp_id, setSmtp_id] = useState([]);
    const [email_queue_id, setEmail_queue_id] = useState("");
    const [selectSmtp, setSelectSmtp] = useState([]);

    const [formValues, setFormValues] = useState(data);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [template, setTemplate] = useState([]);
    const [smtp, setSmtp] = useState([]);
    const [emailqueue, setEmailqueue] = useState([]);
    const [startDate, setStartDate] = useState(new Date("2022-02-10 08:30:00"));
    const [emailQueueId, setEmailQueueId] = useState([]);

    useEffect(() => {
        fetch('http://emailcampaign.frontpews.com/public/api/campaign/' + params.id)
            .then(res => {
                return res.json();
            })
            .then(data => {
                // console.log(data)
                setFormValues(data.results)
                
                const temp_id = (data.results.temp_id) ? data.results.temp_id : null ;
                setTemp_id(temp_id)
                const smtp_id = (data.results.smtp_id) ? data.results.smtp_id : null ;
                setSmtp_id(smtp_id)
                const email_queue_id = (data.results.camp_uniq_id) ? data.results.camp_uniq_id : null ;
                // console.log(email_queue_id)
                // var eqid = { label:data.results.camp_uniq_id,value:"620cd283a0e01" };
                // console.log(email_queue_id);
                setEmail_queue_id(email_queue_id);

                console.log(data.results)
            })
            .then(data => {
                getData();
            })
            .catch(err => {
                console.log(err)
            })

    }, [])





    
    const handelInput = (e) => {

        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value });
        // setFormErrors(validate(formValues));
        // const newdata = { ...data };
        // const name = e.target.name;
        // const value = e.target.value;
        // newdata[name] = value;
        // setData(newdata);
        // console.log(data);
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

        // if (!value.smtp_id) {
        //     error.smtp_id = "Campaign SMTP id is required.";
        // }

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


    const template_options = template.map((number) =>
        <option key={number.id} value={number.id} selected={(number.id == temp_id) ? true : false} >{number.temp_name}</option>
    );
    const smtp_options = smtp.map((number) =>
        <option key={number.id} value={number.id} selected={(number.id == smtp_id) ? true : false}>{number.smtp_name}</option>
    );
    const campaign_options = emailqueue.map((number, i) =>
        <option key={i} value={number.email_queue_id} selected={(number.email_queue_id === email_queue_id) ? true : false}>{number.user_group}</option>
    );
// console.log(campaign_options)
    // const campaign_options_test = emailqueue.map((number, i) => {
    //     console.log(number[i]);
    // });

    // useEffect(() => {
    //     getData();

        // we will use async/await to fetch this data
        async function getData() {
            const response1 = await fetch("http://emailcampaign.frontpews.com/public/api/template")
            let template = await response1.json();
            setTemplate(template.results);
            // const response2 = await fetch("http://emailcampaign.frontpews.com/public/api/smtp");
            // let smtp = await response2.json();
            // setSmtp(smtp.results);
            const response3 = await fetch("http://emailcampaign.frontpews.com/public/api/emailqueue");
            let emailqueue = await response3.json();
            setEmailqueue(emailqueue.results);

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
            // ##############################################################
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
                // setEmailqueue(options);

            }).catch(function (err) {
                console.log(err)
            });
        }

    // }, []);

    function smtpsubmit(e) {
        e.preventDefault();
        // alert(data);
        // console.log(data);
        setFormErrors(validate(formValues));
        console.log(formValues)
        const camp_date = new Date(startDate).toISOString();
        // setIsSubmit(true)
        // alert(Object.keys(formErrors).length)
        if (Object.keys(formErrors).length === 0) {
            alert("Form Submited.");
            axios({
                method: 'put',
                url: 'http://emailcampaign.frontpews.com/public/api/campaign/' + params.id,
                data: {
                    "camp_name": formValues.camp_name,
                    "camp_subj": formValues.camp_subj,
                    "temp_id": formValues.temp_id,
                    "smtp_id": JSON.stringify(selectSmtp),
                    "email_queue_id": formValues.email_queue_id,
                    "camp_set_date": camp_date,
                    "no_of_count": formValues.no_of_count,
                    "time_difference": formValues.time_difference
                }
            }).then(function (response) {
                
                if (response.data.status === 201) {
                    swal("Form Updated Sucessfully.");
                    
                }else{

                    console.log(response);
                    swal("Error !!","","error");
                }
                // alert(response.status);
            });

        }

    }
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="content-wrapper" style={{ minHeight: "1345.31px" }}>
                <Breadcrumb heading={'Update Campaign'} breadcum={['Home', 'Update Campaign']} />
                {/* <!-- Main content --> */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* <!-- left column --> */}
                            <div className="col-md-12">
                                {/* <!-- general form elements --> */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title"></h3>
                                        {/* <h3 className="card-title">{JSON.stringify(formErrors, undefined, 2)}</h3> */}
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form onSubmit={(e) => smtpsubmit(e)}>

                                        <div className="card-body">

                                            {/* <Htmlinput nameid={'smtpname'} label={'SMTP Name'} placeholder={'SMTP Name'} value={data.smtpname} onsumt={handelInput}/> */}
                                            <div className="form-group">
                                                <label htmlFor="smtp_name">Campaign Name <code>{formErrors.camp_name}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="camp_name"
                                                    id="camp_name"
                                                    placeholder="Campaign Name"
                                                    value={formValues.camp_name}
                                                    onChange={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="smtp_host">Campaign Subject <code>{formErrors.camp_subj}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="camp_subj"
                                                    name="camp_subj"
                                                    placeholder="Campaign Subject"
                                                    value={formValues.camp_subj}
                                                    onChange={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="temp_id">Select Template <code>{formErrors.temp_id}</code></label>
                                                <select className="custom-select rounded-0" name="temp_id" id="temp_id" onChange={handelInput} defaultValue={temp_id} value={formValues.temp_id}>
                                                    <option value={null}>Select Template</option>
                                                    {template_options}
                                                    {/* <option>Value 1</option>
                                                    <option>Value 2</option>
                                                    <option>Value 3</option> */}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="smtp_id">Select SMTP <code>{formErrors.smtp_id}</code></label>
                                                {/* <select className="custom-select rounded-0" name="smtp_id" id="smtp_id" onChange={handelInput} defaultValue={smtp_id} value={formValues.smtp_id}>
                                                    <option value={null}>Select Smtp</option>
                                                    {smtp_options}
                                                </select> */}
                                                <Select
                                                    className=""
                                                    name="smtp_id"
                                                    options={smtp}
                                                    isMulti
                                                    onChange={(e) => setSelectSmtp(e)}
                                                    defaultValue={{ label: "smtp name1212", value: 0 }}
                                                // {...register("smtp_id", { required: true })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email_queue_id">Select Email Group <code>{formErrors.email_queue_id}</code></label>
                                                <select className="custom-select rounded-0" name="email_queue_id" id="email_queue_id" onChange={handelInput} value={email_queue_id}>
                                                    <option value={null}>Select Group</option>
                                                     {campaign_options}
                                                </select>
                                                {/* <Select
                                                    className=""
                                                    name="email_queue_id"
                                                    options={emailqueue}
                                                    onChange={(e) => setEmailQueueId(e)}
                                                    defaultValue={{ label:"grp-check-228899",value:"620cd283a0e01" }}
                                                /> */}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="camp_set_date">Campaign Date <code>{formErrors.camp_set_date}</code></label>
                                                {/* <input type="text"
                                                    className="form-control"
                                                    id="camp_set_date"
                                                    name="camp_set_date"
                                                    placeholder="Campaign Date dd-mm-yyyy"
                                                    value={new Date(formValues.camp_set_date).toLocaleDateString() }
                                                    onChange={handelInput}
                                                /> */}

                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => { setStartDate(date);}}
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
                                                <label htmlFor="no_of_count">Number of Count <code>{formErrors.no_of_count}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="no_of_count"
                                                    name="no_of_count"
                                                    placeholder="Campaign Date"
                                                    value={formValues.no_of_count}
                                                    onChange={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="time_difference">Time Difference (Minute)  <code>{formErrors.time_difference}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="time_difference"
                                                    name="time_difference"
                                                    placeholder="Time Difference in Minute"
                                                    value={formValues.time_difference}
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

                        </div>

                    </div>

                </section>

            </div>
        </>
    )
}



export default UpdateCampaign;