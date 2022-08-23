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

const TemplateAdd = () => {

    const [data, setData] = useState({
        temp_name: "",
        template: "",
        template_field: ""
    });
    const editorRef = useRef(null);
    const { register, formState: { errors }, handleSubmit } = useForm();
    
    const onSubmit = (data) => {
        console.log(data)
        if (editorRef.current && editorRef.current.getContent().length > 20) {
            console.log(editorRef.current.getContent());

            setTimeout(() => {

                axios({
                    method: 'post',
                    url: 'http://emailcampaign.frontpews.com/public/api/template',
                    data: { "temp_name": data.temp_name, "template": editorRef.current.getContent() }
                }).then(function (response) {

                    if (response.data.status === 201) {
                        swal("Form Added Sucessfully.");
                    } else {
                        console.log(response);
                        swal("Error !", "", "error");
                    }

                });

            }, 2000);
        } else {
            alert("awqwr");
        }


    };

    // const [formValues, setFormValues] = useState(data);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [formValues, setFormValues] = useState([
        { keyname: "", keyvalue: "" }
    ])


    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    // let addFormFields = () => {
    //     setFormValues([...formValues, { keyname: "", keyvalue: "" }])
    // }

    // let removeFormFields = (i) => {
    //     let newFormValues = [...formValues];
    //     newFormValues.splice(i, 1);
    //     setFormValues(newFormValues)
    // }

    // let handleChange = (i, e) => {


    //     let newFormValues = [...formValues];
    //     newFormValues[i][e.target.name] = e.target.value;
    //     setFormValues(newFormValues);

    //     // setFormErrors(validate(newFormValues));

    //     const newdata = { ...data };
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     newdata[name] = value;
    //     // newdata["template_field"] = JSON.stringify(formValues);

    //     setData(newdata);

    //     setFormErrors(validate(newdata));
    // }

    // const handelInput = (e) => {
    //     const newdata = { ...data };
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     newdata[name] = value;
    //     // newdata["template_field"] = JSON.stringify(formValues);
    //     setData(newdata);
    //     setFormErrors(validate(newdata));
    //     // console.log(data.smtp_name);
    // }

    // const validate = (value) => {

    //     const error = {};
    //     if (!value.temp_name) {
    //         error.temp_name = "Template name is required.";
    //     }
    //     if (value.temp_name.length < 3) {
    //         error.temp_name = "Template name min length is 3.";
    //     }

    //     if (value.template.length < 20 ) {
    //         error.template = "Template field min length is 20.";
    //     }
    //     if (!value.template) {
    //         error.template = "Template field is required.";
    //     }
    //     return error;
    // }


    // useEffect(() => {

    //     console.log(formErrors)

    // }, [formErrors])



    return (
        <>
            <Navbar />
            <Sidebar />
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
                                        <h3 className="card-title"></h3>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    {/* <!-- form start --> */}
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className="card-body">

                                            {/* <Htmlinput nameid={'smtpname'} label={'SMTP Name'} placeholder={'SMTP Name'} value={data.smtpname} onsumt={handelInput}/> */}
                                            <div className="form-group">
                                                <label htmlFor="temp_name">Template Name
                                                 <code>
                                                    {errors.temp_name?.type === 'required' && "First name is required"}
                                                    {errors.temp_name?.type === 'minLength' && "Min length 4 is require."}
                                                </code>
                                                </label>
                                                {/* <input type="text"
                                                    className="form-control"
                                                    name="temp_name"
                                                    id="temp_name"
                                                    placeholder="Template Name"
                                                    value={data.temp_name}
                                                    onChange={handelInput}
                                                /> */}
                                                <input className="form-control" placeholder="Template Name" {...register("temp_name", { required: true, maxLength: 20, minLength: 4 })} />
                                                <p>

                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="template">Template HTML <code>{formErrors.template}</code></label>


                                                <Editor
                                                    tinymceScriptSrc="http://emailcampaign.frontpews.com/fview/dist/tinymce/tinymce.min.js"
                                                    onInit={(evt, editor) => editorRef.current = editor}
                                                    initialValue="<p>This is the initial content of the editor.</p>"
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
                                            {/* <button onClick={log}>Log editor content</button> */}

                                        </div>

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