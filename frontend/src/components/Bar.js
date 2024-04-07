import React from 'react'
import { Link } from 'react-router-dom';

function Bar() {
    return (
        <div className="bar-container d-flex justify-content-between align-items-center mt-5 ms-5 me-5">
            <Link to={'/locations'}><button className="btn btn-primary rounded-pill shadow-sm ms-3">LOCATIONS</button></Link>
            <nav className="navbar bg-transparent border-0 shadow-sm">
                {/*  */}
            </nav>
            <Link to={'/'}><button className="btn btn-primary border rounded-pill shadow-sm me-3">&nbsp; DEVICES &nbsp;</button></Link>
        </div>
    )
}

export default Bar;