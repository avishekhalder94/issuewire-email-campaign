import React, {useEffect} from "react"
import { Link, useLocation } from "react-router-dom"
import { QueryClient, QueryClientProvider, useQuery, usePaginatedQuery } from 'react-query';

import Breadcrumb from "../../common/Breadcum.js";

import Navbar from '../../navbar/Navbar.js';
import Sidebar from '../../sidebar/Sidebar.js';

import axios from 'axios';
import swal from 'sweetalert';


const SmtpList = () => {


    // const fetchProjects = (page) => fetch('https://swapi.dev/api/planets/?page='+page).then((res) => res.json());
    // const fetchPlanets = async (key, page) => {
    //     // console.log(page);
    //     const res = await fetch('https://swapi.dev/api/planets/?page='+page);
    //     return res.json();
    // }
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    console.log(splitLocation.at(-1))

    const homeUrl = process.env.PUBLIC_URL;
    const [page, setPage] = React.useState(1);




    useEffect(() => {
        setpagenumber();
        async function setpagenumber() {

            if (Number.isInteger(parseInt(splitLocation.at(-1)))) {
                setPage(splitLocation.at(-1))
                // alert("ad")
                console.log("ad")
            }else{
                // alert("ty")
                console.log("rt")
            }
        }


    }, []);

    const fetchProjects = (page = 0) => fetch('http://emailcampaign.frontpews.com/emailcampaign/public/api/smtp/page/' + page)
        .then((res) => res.json())


    const {
        isIdle,
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
        status,
    } = useQuery(['results', page], () => fetchProjects(page), { keepPreviousData: true, staleTime: 5000,refetchInterval: 3500 })
    // ,refetchInterval: 2000
    //useQuery('Planets', fetchPlanets)
    // console.log(data);

    const smtpDelete = (smtpId) => {
        console.log("asd")
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this SMTP !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    axios({
                        url: 'http://emailcampaign.frontpews.com/emailcampaign/public/api/smtp/' + smtpId,
                        method: 'delete'
                    }).then(function (response) {

                        console.log(response);
                        swal("Poof! Your SMTP file has been deleted!", {
                            icon: "success",
                        });

                        if (response.data.status === 409) {
                            swal(response.data.message, {
                                icon: "success",
                            }); 
                        }

                    }).catch(function (error) {
                        console.log(error)
                    });

                } else {
                    swal("Your SMTP is safe!");
                }
            });

    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="content-wrapper" style={{ minHeight: "1345.31px" }}>
                <Breadcrumb heading={'SMTP List'} breadcum={['Home', 'SMTP List']} />
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"></h3>

                                    <div className="card-tools">
                                        <div className="input-group input-group-sm" style={{ width: "150px" }}>
                                            <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-default">
                                                    <i className="fas fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>SMTP Name</th>
                                                <th>SMTP Host</th>
                                                <th>SMTP Port</th>
                                                <th>SMTP Username</th>
                                                <th>SMTP Password</th>
                                                <th>SMTP Encryption</th>
                                                <th>From Name</th>
                                                <th>From Email</th>
                                                <th>Status</th>
                                                <th>Bounce Email</th>
                                                <th>Bounce Username</th>
                                                <th>Bounce Port</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        { status === "idle" ? (
                                            <tbody key={'1234'}><tr key={'1234'}><td key={'1234'}><p>Not Ready...</p></td> </tr></tbody>
                                        ) : status === "loading" ? (
                                            <tbody key={'1234'}><tr key={'4321'}><td key={'1234'}><p>Loading...</p></td> </tr></tbody>
                                        ) : status === "error" ? (
                                            <tbody key={'1234'}><tr key={'4321'}><td key={'1234'}><p>Error...</p></td> </tr></tbody>
                                        ) : status === "success" ? (

                                            <tbody key={'54asd5'}>
                                                {data.results && data.results.map((smtp, i) => (
                                                    <tr key={i}>
                                                        <td key={i}><p>{i + 1}</p></td>
                                                        <td>{smtp.smtp_name}</td>
                                                        <td>{smtp.smtp_host}</td>
                                                        <td>{smtp.smtp_port}</td>
                                                        <td>{smtp.smtp_username}</td>
                                                        <td>{smtp.smtp_password}</td>
                                                        <td>{smtp.smtp_encryption}</td>
                                                        <td>{smtp.from_name}</td>
                                                        <td>{smtp.from_email}</td>
                                                        <td>{smtp.smtp_status}</td>
                                                        <td>{smtp.bounce_email}</td>
                                                        <td>{smtp.bounce_username}</td>
                                                        <td>{smtp.bounce_port}</td>
                                                        <td>
                                                            <Link className="btn btn-primary" to={homeUrl + "/smtp-list/" + smtp.id} >
                                                                Edit
                                                            </Link>
                                                            <button type="button" className="btn btn-danger m-2" onClick={() => smtpDelete(smtp.id)} >Delete</button>

                                                        </td>
                                                    </tr>
                                                ))}

                                                {(!data.results) ? (
                                                   <tr className="text-center">
                                                       <td colSpan={"5"}>
                                                           <h3>Data Not Found !</h3>
                                                        </td>
                                                   </tr>                                                 
                                                ) : ""}
                                            </tbody>
                                        ) : " "}
                                    </table>
                                    { isIdle ? (
                                            <tbody key={'1234'}><tr key={'1234'}><td key={'1234'}><p>Not Ready...</p></td> </tr></tbody>
                                        ) : isLoading ? (
                                            <tbody key={'1234'}><tr key={'4321'}><td key={'1234'}><p>Loading...</p></td> </tr></tbody>
                                        ) : isError ? (
                                            <tbody key={'1234'}><tr key={'4321'}><td key={'1234'}><p>Error...</p></td> </tr></tbody>
                                        ) : (
    
                                            <nav>
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

                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}


export default SmtpList;