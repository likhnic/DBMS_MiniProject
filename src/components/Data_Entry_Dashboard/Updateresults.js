import React, { useEffect, useState } from "react";

const Updateresult = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const patientID = queryParameters.get("patientID")
    const [credentials, setCredentials] = useState({ Result: "", testId: "" });
    const [data, setData] = useState([]);

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        console.log("credentials : ", credentials);

    };

    const handleOnClick = async (e) => {
        console.log("cred: ", credentials)
        const { Result, testId } = credentials;
        console.log(Result, testId);
        if (!Result || !testId || Result === '' || testId === '') {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
            console.log('Please select a value!!!')
            return;
        }


        const response = await fetch(
            `http://localhost:5000/api/dataentryop/test/${testId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({ Result: Result, testId: testId })
            }
        );
        console.log(response)
    };

    const onRender = async () => {
        const res = await fetch(`http://localhost:5000/api/dataentryop/test/names/${patientID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'token': localStorage.getItem('token')
            },

        });

        const json = await res.json();
        console.log("json: ", json)
        setData(json.test);
    }

    useEffect(() => {
        onRender();
    }, []);

    const header_style = { textAlign: "center" };
    return (
        <>
            <div className="container mt-3">
                <form className="form-control" onSubmit={(event) => event.preventDefault()} >
                    <h1 style={header_style}>Add test</h1>

                    <select
                        className="form-select mb-4"
                        aria-label="Default select example"
                        onChange={onChange}
                        defaultValue="Test"

                        name="testId"
                    >
                        <option disabled >Test</option>
                        {data &&
                            data.map((row, i) => {
                                return (
                                    <option key={i} value={row.TestID}>
                                        {row.Name}
                                    </option>
                                );
                            })}
                    </select>
                    <div className="form-outline mb-4">
                        <input type="text" name="Result" className="form-control" placeholder="Result" onChange={onChange} />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        onClick={() => handleOnClick()}
                    >
                        Update Result
                    </button>
                </form>
            </div>
        </>
    );
};

export default Updateresult;
