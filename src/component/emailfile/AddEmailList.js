import React, { useState, useEffect } from "react"
// import { setDatasets } from "react-chartjs-2/dist/utils";
// import { Link } from "react-router-dom"
import Breadcrumb from "../../common/Breadcum.js";
import Navbar from '../../navbar/Navbar.js';
import Sidebar from '../../sidebar/Sidebar.js';

import axios from 'axios';
import swal from 'sweetalert';

const AddEmailList = () => {

    const [selectedFile, setselectedFile] = useState(null);
    const [user_grp_name, setuser_grp_name] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [uploadPercentage, setUploadPercentage] = useState(0);
    
    const [datalist, setdataList] = useState([]);

    const onFileChange = (e) => {
        // this.setState({ selectedFile: event.target.files[0] });
        // alert("sdfs");
        setselectedFile(e.target.files[0]);
        // setFormErrors(validate(formValues))
    };
    useEffect(() => {
        // if (Object.keys(formErrors) === 0) {
        //     console.log(formErrors)
        // }
        console.log(uploadPercentage);
    }, [uploadPercentage]);
    useEffect(() => {
        // if (Object.keys(formErrors) === 0) {
        //     console.log(formErrors)
        // }
        getAllGrpName();
        // console.log(uploadPercentage);
    }, [1000]);
    
    const handelInput = (e) => {
        // const name = e.target.name;
        const value = e.target.value;
        setuser_grp_name(value);
        // setFormErrors(validate(formValues))
        //    alert(value);
        // console.log(data.smtp_name);
    }
    const validate = (value) => {
        const error = {};
        if (value.user_grp.length < 3 || value.user_grp.length > 100) {
            error.user_grp = "user Group min length is 3";
        }

        if (!value.user_grp) {
            error.user_grp = "User group is required.";
        }
        return error;
    }

    // const http://emailcampaign.frontpews.com/public/api/emailqueue
    const getAllGrpName = () => {
        axios({
            method: 'GET',
            url: 'http://emailcampaign.frontpews.com/emailcampaign/public/api/emailqueue'
        }).then(function (response) {
            // console.log(response);
            return response.data.results;
        }).then(function (data) {
            // console.log(data);
            if (data.length > 0) {
                setdataList(data);    
            }else{
                setdataList([]);    
            }
            
            
        })
            
    }

    const formsubmit = (e) => {
        e.preventDefault();
        console.log(e);
        if (selectedFile != null && user_grp_name.length != null) {

            const formData = new FormData();
            formData.append(
                "upload_email_list",
                selectedFile,
                selectedFile.name
            );
            formData.append(
                "user_group",
                user_grp_name
            );
            //   alert(user_grp_name);
            // console.log(user_grp_name);
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            axios({
                method: 'post',
                url: 'http://emailcampaign.frontpews.com/emailcampaign/public/api/emailqueue',
                data: formData,
                config: config,
                onUploadProgress: preogressEvent => {

                    setUploadPercentage(
                        parseInt(
                            Math.round(
                                preogressEvent.loaded * 100) / preogressEvent.total
                        )
                    );


                }
            }).then(function (response) {
                console.log(response);
                // alert(response);
                // var frm = document.getElementById("addemailfrm");
                // frm.reset();
                if (response.data.status === 201) {
                    swal("Form Submited.")                    
                }else{
                    console.log(response);
                }

                setuser_grp_name("");
            }).then(function (response) {
                
                setTimeout(() => {
                    setUploadPercentage(0);
                }, 1000);

            }).catch(function (err) {
                // swal(err,"","error");
                console.log(err)
                setTimeout(() => {
                    setUploadPercentage(0);
                }, 1000);
            });


        } else {
            const error = {};
            error.user_grp = "Group name or File cant be null.";
            setFormErrors(error);
        }
    }


    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="content-wrapper" style={{ minHeight: "1345.31px" }}>
                <Breadcrumb heading={'Upload Email File'} breadcum={['Home', 'Upload Email File']} />
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
                                    <form id="addemailfrm" onSubmit={(e) => formsubmit(e)} >
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="user_grp">User Group <code>{formErrors.user_grp}</code></label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="user_grp"
                                                    id="user_grp"
                                                    placeholder="User Group"
                                                    onChange={handelInput}
                                                    value={user_grp_name}
                                                    list="data"
                                                />
                                            <datalist id="data">
                                                {datalist.map((data,key) => (
                                                    <option key={key} value={data.user_group} />
                                                ))}
                                            </datalist>
                                            
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="txtfile">File input</label>
                                                <div className="input-group">
                                                    <div className="custom-file">
                                                        <input type="file"
                                                            className="custom-file-input"
                                                            name="txtfile" id="txtfile"
                                                            onChange={onFileChange}
                                                        />
                                                        <label className="custom-file-label" htmlFor="txtfile">Choose file</label>
                                                    </div>
                                                    {/* <div className="input-group-append">
                                                    <span className="input-group-text">Upload</span>
                                                </div> */}
                                                </div>
                                            </div>
                                            <div className="progress-group">
                                                Upload Percentage
                                                <span className="float-right"><b>{uploadPercentage}</b>/100</span>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar progress-bar-striped bg-info" style={{width : `${uploadPercentage}%`}}></div>
                                                </div>
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



export default AddEmailList;