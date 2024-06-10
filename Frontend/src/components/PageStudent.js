import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const PageStudent = () => {
    const [view, setView] = useState(null)
    const { courses, token } = useSelector((state) => state.auth);
    return (
        <>
            {token !== null ?
                <div className="container-lg mt-5">
                    <div className="row">
                        {courses && courses.map((row) => {
                            return < div className='col-md-4 mb-2' key={row.id}>
                                <div className="card text-center">
                                    <div className="card-header">
                                        {row.name}
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">{`${row && row.description}`.slice(0, 80)}..</p>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            onClick={() => setView(row)}
                                        >
                                            View
                                        </button>
                                    </div>
                                    <div className="card-footer text-body-secondary">
                                        Start Date to {new Date(`${row.start_date}`).toLocaleDateString()} To End Date {new Date(`${row.end_date}`).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    {/*  <!-- modal --> */}

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">{view && view.name}</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {view && view.description}
                                </div>
                                <div className="modal-body">
                                    Start Date to {new Date(`${view && view.start_date}`).toLocaleDateString()} To End Date {new Date(`${view && view.end_date}`).toLocaleDateString()}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div > : <div class="col-md-12 text-center mt-4">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <p>
                        Sorry, the page you are looking
                        for does not exist.
                    </p>
                </div>}
        </>
    );
}

