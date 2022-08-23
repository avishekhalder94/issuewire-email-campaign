import React, { useState, useEffect, useRef } from "react"
// import { setDatasets } from "react-chartjs-2/dist/utils";
// import { Link } from "react-router-dom"
// import Breadcrumb from ".././common/Breadcum.js"
import Breadcrumb from "../../common/Breadcum.js"
import Navbar from '../../navbar/Navbar.js';
import Sidebar from '../../sidebar/Sidebar.js';

import { Editor } from '@tinymce/tinymce-react';
import { useForm } from "react-hook-form";



import axios from 'axios';
import swal from 'sweetalert';

import { useParams } from "react-router-dom";

const TemplateUpdate = () => {

    let params = useParams();
    console.log(params.id);

    const editorRef = useRef(null);
    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
        fetch('http://emailcampaign.frontpews.com/public/api/template/' + params.id)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setData(data.results)
            setFormValues(data.results.template_field)
            // console.log(data.results)
        })
        .catch(err => {
            console.log(err)
        })

    }, [1000])

    const [data, setData] = useState({
        temp_name: "",
        template: "",
        template_field: ""
    });
    

    console.log(data.template_field);
    // const [formValues, setFormValues] = useState(data);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [formValues, setFormValues] = useState([
        { keyname: "", keyvalue: "" }
    ])

    let addFormFields = () => {
        setFormValues([...formValues, { keyname: "", keyvalue: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleChange = (i, e) => {


        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);

        // setFormErrors(validate(newFormValues));

        const newdata = { ...data };
        const name = e.target.name;
        const value = e.target.value;
        newdata[name] = value;
        newdata["template_field"] = JSON.stringify(formValues);

        setData(newdata);

        setFormErrors(validate(newdata));
    }

    const handelInput = (e) => {
        const newdata = { ...data };
        const name = e.target.name;
        const value = e.target.value;
        newdata[name] = value;
        newdata["template_field"] = JSON.stringify(formValues);
        setData(newdata);
        setFormErrors(validate(newdata));
        // console.log(data.smtp_name);
    }

    const validate = (value) => {
        
        const error = {};
        if (!value.temp_name) {
            error.temp_name = "Template name is required.";
        }
        if (value.temp_name.length < 3) {
            error.temp_name = "Template name min length is 3.";
        }

        if (editorRef.current && editorRef.current.getContent().length < 20) {
            error.template = "Template html field min length is 20.";
        }

        return error;
    }


    useEffect(() => {
        console.log(formErrors)
    }, [formErrors])

    function smtpsubmit (e) {

        e.preventDefault();
        setFormErrors(validate(data));
        console.log(data);
        setIsSubmit(true)

        // alert(Object.keys(formErrors).length)
        if (Object.keys(formErrors).length === 0) {
            alert("form submited")

            axios({
                method: 'put',
                url: 'http://emailcampaign.frontpews.com/public/api/template/' + params.id,
                data: data
            }).then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    swal("Form Updated Sucessfully.");
                }else{
                    swal("Error !","","error");
                }
                // alert(response);
                // setData({temp_name: "",template: "",template_field: ""});
                // setFormValues([{ keyname: "", keyvalue: "" }])
                
            });
        }
    }

    const onSubmit = (data) => {
        console.log(data)
        if (editorRef.current && editorRef.current.getContent().length > 20) {
            // console.log(editorRef.current.getContent());

            setTimeout(() => {

                axios({
                    method: 'post',
                    url: 'http://emailcampaign.frontpews.com/public/api/template',
                    data: { "temp_name": data.temp_name, "template": editorRef.current.getContent() }
                }).then(function (response) {

                    if (response.data.status === 200) {
                        swal("Form Added Sucessfully.");
                    } else {
                        console.log(response);
                        swal("Error !", "", "error");
                    }

                });

            }, 1500);
        } else {
            alert("awqwr");
        }


    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="content-wrapper" style={{ minHeight: "1345.31px" }}>
                <Breadcrumb heading={'Template Update Form'} breadcum={['Home', 'Template Update']} />
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
                                                <label htmlFor="temp_name">Template Name <code>{formErrors.temp_name}</code></label>
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
                                                <label htmlFor="template">Template HTML <code>{formErrors.template}</code></label>
                                                {/* <textarea
                                                    className="form-control"
                                                    id="template"
                                                    name="template"
                                                    placeholder="Template HTML"
                                                    value={data.template}
                                                    onChange={handelInput}
                                                    row="10"
                                                /> */}
                                                <Editor
                                                    tinymceScriptSrc="http://emailcampaign.frontpews.com/fview/dist/tinymce/tinymce.min.js"
                                                    onInit={(evt, editor) => editorRef.current = editor}
                                                    initialValue={data.template}
                                                    init={{
                                                        height: 500,
                                                        menubar: true,
                                                        plugins: [
                                                            'advlist autolink lists link image charmap print preview anchor',
                                                            'searchreplace visualblocks code fullscreen',
                                                            'insertdatetime media table paste code help wordcount'
                                                        ],
                                                        toolbar: 'undo redo | formatselect | code |' +
                                                            'bold italic backcolor | alignleft aligncenter ' +
                                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                                            'removeformat | help',
                                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                                        image_class_list: [
                                                            { title: 'Code Highlighted Class', value: 'codehighcls' },
                                                            { title: 'Dog', value: 'dog' },
                                                            { title: 'Cat', value: 'cat' }
                                                        ]
                                                    }}
                                                />
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



export default TemplateUpdate;