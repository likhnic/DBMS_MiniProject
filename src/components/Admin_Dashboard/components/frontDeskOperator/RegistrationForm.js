import React from "react";
const RegistrationForm = ({ onSubmit, onChange }) => {
  return (
    <div style={{ padding: "0px 300px" }}>
      <form
        className="container-sm form-control shadow bg-body p-3 mb-5"
        onSubmit={onSubmit}
      >
        <h1 style={{ textAlign: "center" }} className="mt-3">
          Add a Front Desk Operator
        </h1>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="text"
            name="Name"
            required="required"
            placeholder="Enter a name..."
            onChange={onChange}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="text"
            name="Aadhar"
            required="required"
            placeholder="Enter aadhar number..."
            onChange={onChange}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="text"
            name="Phone"
            required="required"
            placeholder="Enter a phone number..."
            onChange={onChange}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="text"
            name="Address"
            required="required"
            placeholder="Enter an address..."
            onChange={onChange}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="password"
            name="Password"
            required="required"
            placeholder="Enter a password..."
            onChange={onChange}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="password"
            name="rePassword"
            required="required"
            placeholder="Confirm password..."
            onChange={onChange}
          />
        </div>
        <button className="btn btn-primary row col-sm-12 m-1" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};
export default RegistrationForm;
