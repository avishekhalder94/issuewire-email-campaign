import React, { useState } from "react"
// import { setDatasets } from "react-chartjs-2/dist/utils";
// import { Link } from "react-router-dom"
// import Breadcrumb from ".././common/Breadcum.js"
import Breadcrumb from "../../common/Breadcum.js";
import axios from 'axios';

const TemplateAdd = () => {

    const [data, setData] = useState({
        temp_name: "",
        template: "",
        template_field:""
    });

    const [formValues, setFormValues] = useState([
        {keyname: "", keyvalue: "" }
    ])

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);



      }

    let addFormFields = () => {
        setFormValues([...formValues, { keyname: "", keyvalue: "" }])
    } 

    const handelInput = (e) => {
        const newdata = { ...data };
        const name = e.target.name;
        const value = e.target.value;
        newdata[name] = value;
        newdata["template_field"] = JSON.stringify(formValues);
        setData(newdata);
        // console.log(data.smtp_name);
    }

    function smtpsubmit(e) {
        e.preventDefault();
        
        console.log(data);

        axios({
            method: 'post',
            url: 'http://emailcampaign.frontpews.com/api/template',
            data: data
        }).then(function (response) {
            console.log(response);
            // alert(response);
        });

    }

    return (
        <>
            <div className="content-wrapper" style={{ minHeight: "1345.31px" }}>
                <Breadcrumb heading={'Template Add Form'} breadcum={['Home', 'Template ADD']} />
                {/* <!-- Main content --> */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            {/* <!-- left column --> */}
                            <div className="col-md-12">
                                {/* <!-- general form elements --> */}
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Quick Example</h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form onSubmit={(e) => smtpsubmit(e)}>

                                        <div className="card-body">

                                            {/* <Htmlinput nameid={'smtpname'} label={'SMTP Name'} placeholder={'SMTP Name'} value={data.smtpname} onsumt={handelInput}/> */}
                                            <div className="form-group">
                                                <label htmlFor="temp_name">Template Name</label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="temp_name"
                                                    id="temp_name"
                                                    placeholder="Template Name"
                                                    value={data.temp_name}
                                                    onChange={handelInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="template">Template HTML</label>
                                                <textarea
                                                    className="form-control"
                                                    id="template"
                                                    name="template"
                                                    placeholder="Template HTML"
                                                    value={data.template}
                                                    onChange={handelInput}
                                                    row="10"
                                                />
                                            </div>
                                            {formValues.map((element, index) => (
                                                <div className="row" key={index}>
                                                    <div className="col-md-5">
                                                        <div className="form-group">
                                                            <label htmlFor="keyname">Template Key</label>
                                                            <input type="text"
                                                                className="form-control"
                                                                name="keyname"
                                                                id="keyname"
                                                                value={element.keyname || ""}
                                                                placeholder="Key Name"
                                                                onChange={e => handleChange(index, e)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="form-group">
                                                            <label htmlFor="keyvalue">Template Value</label>
                                                            <input type="text"
                                                                className="form-control"
                                                                name="keyvalue"
                                                                id="keyvalue"
                                                                value={element.keyvalue || ""}
                                                                placeholder="Key Value"
                                                                onChange={e => handleChange(index, e)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2  mt-4">
                                                        <div className="form-group">
                                                            <button type="button" 
                                                            className="btn btn-primary"
                                                            onClick={() => removeFormFields(index)}
                                                            >-</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="card-footer">
                                                <button type="submit" 
                                                className="btn btn-primary"
                                                onClick={() => addFormFields()}
                                                >Add</button>
                                            </div>
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



export default TemplateAdd;