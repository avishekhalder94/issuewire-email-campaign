import React from 'react';

const Breadcum = (props) => {
    return (
        <>
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{props.heading}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="">{props.breadcum[0]}</a></li>
                                <li className="breadcrumb-item active">{props.breadcum[1]}</li>
                            </ol>
                        </div>
                    </div>
                </div>
                {/* <!-- /.container-fluid --> */}
            </section>

        </>
    )
}


export default Breadcum;