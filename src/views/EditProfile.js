import { Link } from "@reach/router";
import React, { useContext } from "react";
import ImageInput from "../components/common/ImageInput";
import { AuthContext } from "../context/AuthContext";

const EditProfile = () => {
  const { user, updateUser, setPropertyUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user);
  };

  return (
    <form onSubmit={handleSubmit} className="container-fluid pt-4">
      <h1 className="h2">Edit Profile</h1>
      <div className="row align-items-center mb-3">
        <div className="col-2">
          <div className="icon-wrapper bg-light border">
            <i className="fa fa-image"></i>
          </div>
        </div>
        <div className="col-10">
          <ImageInput
            value={user && user !== null ? user.file : ""}
            modifier={setPropertyUser}
            hideImage
          />
        </div>
      </div>
      <label className="d-block mb-2">Full Name</label>
      <div className="input-group mb-3">
        <span className="input-group-text" id="name-addon">
          <i className="fa fa-user text-primary"></i>
        </span>
        <input
          type="text"
          placeholder="Full Name"
          className="form-control"
          alia-aria-describedby="name-addon"
          onChange={(e) => setPropertyUser("name", e.target.value)}
        />
      </div>
      <div className="btn btn-primary w-100 mb-4">Save</div>
      <Link to="/profile" className="text-accent h6 text-center d-block w-100">
        Cancel
      </Link>
    </form>
  );
};

export default EditProfile;
