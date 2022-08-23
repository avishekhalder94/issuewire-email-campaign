import React from "react"
import { Link } from "react-router-dom"
import {  useQuery } from 'react-query';

import Breadcrumb from "../../common/Breadcum.js";
import Navbar from '../../navbar/Navbar.js';
import Sidebar from '../../sidebar/Sidebar.js';

import axios from 'axios';
import swal from 'sweetalert';


const ListCampaign = () => {


    // const fetchProjects = (page) => fetch('https://swapi.dev/api/planets/?page='+page).then((res) => res.json());
    // const fetchPlanets = async (key, page) => {
    //     // console.log(page);
    //     const res = await fetch('https://swapi.dev/api/planets/?page='+page);
    //     return res.json();
    // }

    // const [page, setPage] = useState(1);
    // console.log(data);
    // console.log(status);

    // const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    //         fetch(
    //         "https://swapi.dev/api/planets/?page=1"
    //         ).then((res) => res.json())
    //     );
    const homeUrl = process.env.PUBLIC_URL;
    const [page, setPage] = React.useState(1);

    const fetchProjects = (page = 0) => fetch('http://emailcampaign.frontpews.com/emailcampaign/public/api/campaign/page/' + page)
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
    } = useQuery(['results', page], () => fetchProjects(page), { keepPreviousData: true, staleTime: 5000, refetchInterval: 3500 })

    //useQuery('Planets', fetchPlanets)
    // console.log(data);
    const campDelete = (campId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Campaign !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios({
                        method: 'delete',
                        url: 'http://emailcampaign.frontpews.com/emailcampaign/public/api/campaign/' + campId
                    }).then(function (response) {
                        console.log(response);

                        swal("Poof! Your Campaign has been deleted!", {
                            icon: "success",
                        });

                    }).catch(function (error) {
                        console.log(error)
                    });

                } else {
                    swal("Your Campaign is safe!");
                }
            });
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="content-wrapper" style={{ minHeight: "1345.31px" }}>
                <Breadcrumb heading={'Campaign List'} breadcum={['Home', 'Campaign List']} />
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
                                                <th>Campaign Name</th>
                                                <th>Campaign Subject</th>
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
                                            <tbody>
                                                {console.log(data)}
                                                {data.results && data.results.map((camp, i) => (
                                                    <tr key={i}>
                                                        <td key={i}><p>{i + 1}</p></td>
                                                        <td>{camp.camp_name}</td>
                                                        <td>{camp.camp_subj}</td>
                                                        <td>
                                                            {(camp.email_queue_status == "NotRunning" || camp.email_queue_status == "Complete") ? <Link className="btn btn-primary" to={homeUrl + "/list-campaign/" + camp.id} >Edit</Link> : null}
                                                            {(camp.email_queue_status == "NotRunning" || camp.email_queue_status == "Complete") ? <button type="button" className="btn btn-danger m-2" onClick={() => campDelete(camp.id)} >Delete</button> : null}
                                                            {(camp.email_queue_status == "NotRunning" || camp.email_queue_status == "Complete") ? null  : <button type="button" className="btn btn-success m-2"  >Running</button>}
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        ):" "}
                                    </table>
                                    { isIdle ? (
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

                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}


export default ListCampaign;