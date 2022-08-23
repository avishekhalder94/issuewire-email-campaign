import React, { useState, useEffect } from "react"
// import { setDatasets } from "react-chartjs-2/dist/utils";
// import { Link } from "react-router-dom"
import Breadcrumb from "../../common/Breadcum.js"
import Navbar from '../../navbar/Navbar.js';
import Sidebar from '../../sidebar/Sidebar.js';

import { useQuery } from 'react-query';
import axios from 'axios';
import swal from 'sweetalert';

const AddImage = () => {

    const [selectedFile, setselectedFile] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [isCopy, setIsCopy] = useState([]);

    const [page, setPage] = React.useState(1);
    const fetchProjects = (page = 0) => fetch('http://emailcampaign.frontpews.com/emailcampaign/public/api/imageupload/page/' + page)
        .then((res) => res.json());
    const {
        isIdle,
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
        status,
    } = useQuery(['results', page], () => fetchProjects(page), { keepPreviousData: true, staleTime: 5000, refetchInterval: 3500 })

    useEffect(() => {
        console.log(uploadPercentage);
    }, [uploadPercentage]);

    const imageLinkCopy = (i, text) => {
        navigator.clipboard.writeText(text)
        // isCopy.push(i);
        setIsCopy([...isCopy, i])
        // alert(i)
        console.log(i)
        console.log(isCopy)
    }


    const formsubmit = (e) => {
        e.preventDefault();
        // setFormErrors(validate())
        if (selectedFile != null) {

            const formData = new FormData();
            formData.append(
                "image",
                selectedFile,
                selectedFile.name
            );
            //   alert(user_grp_name);
            // console.log(user_grp_name);
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            axios({
                method: 'post',
                url: 'http://emailcampaign.frontpews.com/emailcampaign/public/api/imageupload',
                data: formData,
                config: config,
                onUploadProgress: preogressEvent => {

                    setUploadPercentage(
                        parseInt(
                            Math.round(
                                preogressEvent.loaded * 100) / preogressEvent.total
                        )
                    );

                    // setTimeout(() => {
                    //     setUploadPercentage(0);
                    // }, 10000);
                }
            }).then(function (response) {
                console.log(response);
                // alert(response);
                // var frm = document.getElementById("addemailfrm");
                // frm.reset();
                if (response.data.status === 201) {
                    swal("Form Submited.")
                } else {
                    console.log(response);
                    swal("Error!!", "", "error");
                }
            }).then(function () {

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

            setFormErrors(error);
        }
    }
    var token = localStorage.getItem('token');
    token = JSON.parse(token);
    // console.log(token.isAdmin)
    if (token.isAdmin) {



        return (
            <>
                <Navbar />
                <Sidebar />
                <div className="content-wrapper" style={{ minHeight: "1345.31px" }}>
                    <Breadcrumb heading={'Upload Image'} breadcum={['Home', 'Upload Image']} />
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
                                        <form onSubmit={(e) => formsubmit(e)}>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="txtfile">File input</label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input type="file"
                                                                className="custom-file-input"
                                                                name="txtfile" id="txtfile"
                                                                onChange={(e) => setselectedFile(e.target.files[0])}
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
                                                        <div className="progress-bar progress-bar-striped bg-info" style={{ width: `${uploadPercentage}%` }}></div>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-primary">Submit</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card card-warning">
                                        <div className="card-header">
                                            <h3 className="card-title"></h3>
                                            {/* <h3 className="card-title">{JSON.stringify(formErrors, undefined, 2)}</h3> */}
                                        </div>

                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Image Link</th>
                                                    <th>Copy</th>
                                                </tr>
                                            </thead>
                                            {status === "idle" ? (
                                                <tbody key={'1234'}><tr key={'1234'}><td key={'1234'}><p>Not Ready...</p></td> </tr></tbody>
                                            ) : status === "loading" ? (
                                                <tbody key={'1234'}><tr key={'4321'}><td key={'1234'}><p>Loading...</p></td> </tr></tbody>
                                            ) : status === "error" ? (
                                                <tbody key={'1234'}><tr key={'4321'}><td key={'1234'}><p>Error...</p></td> </tr></tbody>
                                            ) : status === "success" ? (
                                                <tbody>
                                                    {console.log(data)}
                                                    {data.results && data.results.map((img, i) => (
                                                        //imgage_path
                                                        <tr key={i}>
                                                            <th scope="row">{i+1}</th>
                                                            <td>
                                                                <picture>
                                                                    {/* <source srcset="https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg" type="image/svg+xml" /> */}
                                                                    <img src={img.image_path} className="img-fluid img-thumbnail" height={"50px"} width={"50px"} />
                                                                </picture>
                                                            </td>
                                                            <td><p>{img.image_path}</p></td>
                                                            <td><button type="button" className="btn btn-outline-success btn-sm" onClick={() => imageLinkCopy(i, img.image_path)} >{(isCopy.includes(i)) ? "copied!" : "copy"}</button></td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            ) : " "}
                                        </table>
                                        {isIdle ? (
                                            <tbody key={'1234'}><tr key={'1234'}><td key={'1234'}><p>Not Ready...</p></td> </tr></tbody>
                                        ) : isLoading ? (
                                            <tbody key={'1234'}><tr key={'4321'}><td key={'1234'}><p>Loading...</p></td> </tr></tbody>
                                        ) : isError ? (
                                            <tbody key={'1234'}><tr key={'4321'}><td key={'1234'}><p>Error...</p></td> </tr></tbody>
                                        ) : (
                                            < nav >
                                                <ul className="pagination justify-content-center" >
                                                    <li className={data.previous == null ? "page-item disabled" : "page-item"}>
                                                        <a className="page-link" href="#" tabIndex="-1" onClick={() => setPage(old => Math.max(old - 1, 0))}> Previous </a>
                                                    </li>

                                                    < li className="page-item" >
                                                        <a className="page-link" href="#" > {page} </a>
                                                    </li >
                                                    <li className={(data.next != null) ? "page-item" : "page-item disabled"}>
                                                        <a className="page-link" href="#" onClick={() => {
                                                            if (data.next != null) {
                                                                setPage(old => old + 1)
                                                            }
                                                        }}> Next </a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        )}
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

    } else {

        return (
            <>
                <Navbar />
                <Sidebar />

                <div className="content-wrapper" style={{ minHeight: "1345.31px" }}>
                    <Breadcrumb heading={'Upload Image'} breadcum={['Home', 'Upload Image']} />
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1>You have not permission for access this page.</h1>
                                </div>

                            </div>
                        </div>
                    </section>

                </div>
            </>
        )
    }

}

export default AddImage;