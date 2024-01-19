import { Link } from "@reach/router";
import React from "react";

const OrganizationPicker = () => {

    const organizations = [{ name: "Organization 1" }, { name: "Organization 2" }, { name: "Organization 3" }, { name: "Personal Account" }]


    const renderOrganizationsList = () => {
        return organizations.map((organization) => {
            return <li className="my-1" key={organization.name}>
                <Link
                    to="/organizations"
                    className="dropdown-item hover-success text-dark"
                >
                    <div className="d-flex">
                        <div className="col-2 me-2">
                            <i className="fas fa-building"></i>
                        </div>
                        <div className="col-10">{organization.name}</div>
                    </div>
                </Link>
            </li>
        })
    }

    return (
        <div>
            <button
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="btn small my-2 w-100 text-left text-dark px-3"
            >
                <div className='row'>
                    <div className='col-2'>
                        <i className="fas fa-building"></i>
                    </div>
                    <div className='col-10 d-flex justify-content-between'>
                        Organizations
                        <span className='dropdown-toggle' style={{ marginInlineEnd: "10%" }}></span>
                    </div>
                </div>
            </button>
            <ul
                className="dropdown-menu bg-white border"
                aria-labelledby="navbarDropdown"
            >
                {renderOrganizationsList()}
            </ul>
        </div>
    );
}

export default OrganizationPicker;