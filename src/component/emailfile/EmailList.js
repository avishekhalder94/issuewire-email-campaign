import React from "react"
// import { Link } from "react-router-dom"
import { QueryClient, QueryClientProvider, useQuery, usePaginatedQuery } from 'react-query';
import Breadcrumb from "../../common/Breadcum.js";
import Navbar from '../../navbar/Navbar.js';
import Sidebar from '../../sidebar/Sidebar.js';
import { useParams } from "react-router-dom";
// import axios from 'axios';
// import swal from 'sweetalert';

const EmailList = () => {

    const homeUrl = process.env.PUBLIC_URL;
    let params = useParams();
    const [page, setPage] = React.useState(1);

    const fetchProjects = (page = 0) => fetch(`http://emailcampaign.frontpews.com/public/api/emailqueue/page/${params.id}/` + page)
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
    console.log(data);

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="content-wrapper" style={{ minHeight: "1345.31px" }}>
                <Breadcrumb heading={'Email List'} breadcum={['Home', 'Email List']} />
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
                                                <th>Email Queue ID</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>

                                        {status === "idle" ? (
                                            <tbody key={'1234'}><tr key={'1234'}><td key={'1234'}><p>Not Ready...</p></td> </tr></tbody>
                                        ) : status === "loading" ? (
                                            <tbody key={'1234'}><tr key={'4321'}><td key={'1234'}><p>Loading...</p></td> </tr></tbody>
                                        ) : status === "error" ? (
                                            <tbody key={'1234'}><tr key={'4321'}><td key={'1234'}><p>Error...</p></td> </tr></tbody>
                                        ) : status === "success" ? (
                                            <tbody key={'54asd5'}>
                                                {data.results && data.results.map((grp, i) => (

                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{grp.email_queue_id}</td>
                                                        <td>{grp.user_email}</td>
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
                                    ) :  (

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



export default EmailList;