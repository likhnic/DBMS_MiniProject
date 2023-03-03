import React from 'react';

const RegisterPatient = () => {
    const header_style = { textAlign: 'center' }
    return (
        <>
            <h1 style={header_style}>Registration form</h1>
            <div className='container mt-3'>
                <form className='form-control'>
                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <input type="text" id="form6Example1" className="form-control" placeholder="Name" />
                                {/* <label className="form-label" for="form6Example1">First name</label> */}
                            </div>
                        </div>
                        {/* <div className="col">
                        <div className="form-outline">
                        <input type="text" id="form6Example2" className="form-control" />
                        <label className="form-label" for="form6Example2">Last name</label>
                        </div>
                    </div> */}
                    </div>

                    {/* <!-- Number input --> */}
                    <div className="form-outline mb-4">
                        <input type="number" id="form6Example3" className="form-control" placeholder='Aadhar' maxLength={12} minLength={12} />
                        {/* <label className="form-label" for="form6Example3">Company name</label> */}
                    </div>

                    {/* <!-- Text input --> */}
                    <div className="form-outline mb-4">
                        <input type="text" id="form6Example4" className="form-control" placeholder='Address' />
                        {/* <label className="form-label" for="form6Example4">Address</label> */}
                    </div>

                    <div className="form-outline mb-4">
                        <input type="number" id="form6Example5" className="form-control" maxLength={12} minLength={10} placeholder="Phone Number" />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="number" id="form6Example6" className="form-control" placeholder="InsuranceID" />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="number" id="form6Example7" className="form-control" placeholder="PCPDocID" />
                    </div>

                    {/* <!-- Checkbox --> */}
                    {/* <div className="form-check d-flex justify-content-center mb-4">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form6Example8" checked />
                    <label className="form-check-label" for="form6Example8"> Create an account? </label>
                    </div> */}

                    {/* <!-- Submit button --> */}
                    <button type="submit" className="btn btn-primary btn-block mb-4">Register Patient</button>
                </form>
            </div>
        </>
    );
}

export default RegisterPatient;