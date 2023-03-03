import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Addtreatment = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const patientID = queryParameters.get("patientID");
    const [credentials, setCredentials] = useState({ Name: "", DocID: "" });
    const [datatest, setDatatest] = useState([]);
    const [datadoc, setDatadoc] = useState([]);
    let navigate = useNavigate()
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const goBack = () => {
        navigate(`/dataentryop/options?patientID=${patientID}`, { replace: true })
    }
    const handleOnClick = async (e) => {
        // e.preventDefault();
        const { Name, DocID } = credentials;
        console.log(Name, DocID);

        if (!Name || !DocID || Name === "" || DocID === "") {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
            console.log("Please select a value!!!");
            return;
        }

        const response = await fetch(
            `http://localhost:5000/api/dataentryop/treatment/${patientID}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    Name: Name,
                    DocID: DocID
                })
            }
        );
        console.log(response)
    };

    const onRender = async () => {
        const res_test = await fetch("http://localhost:5000/api/dataentryop/treatment/names",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'token': localStorage.getItem('token')
                },
            });
        const json_test = await res_test.json();
        setDatatest(json_test.test);
        console.log("DATA : ", datatest);

        const res_doc = await fetch("http://localhost:5000/api/doctor/names",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        const json_doc = await res_doc.json();
        setDatadoc(json_doc.test);
    }

    useEffect(() => {
        onRender();
    }, []);

    const header_style = { textAlign: "center" };
    return (
        <>
        <button className='btn btn-outline-primary m-2 text-center' onClick={()=>goBack()}>Go Back</button>
            <div className="container mt-3">
                <form
                    className="form-control"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <h1 style={header_style}>Add Treatment</h1>


                    <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                        defaultValue={"Treatment"}
                        onChange={onChange}
                        name="Name"
                    >
                        <option disabled>Treatment</option>
                        {datatest &&
                            datatest.map((row, i) => {
                                return <option key={i} value={row.Name}>{row.Name}</option>;
                            })}
                    </select>

                    <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                        onChange={onChange}
                        defaultValue={"Doctor"}
                        name="DocID"
                    >
                        <option disabled>Doctor</option>
                        {datadoc &&
                            datadoc.map((row,i) => {
                                return <option key={i} value={row.DocID}>{row.Name}</option>;
                            })}
                    </select>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block mb-3"
                        onClick={handleOnClick}
                    >
                        Add Treatment
                    </button>
                </form>
            </div>
        </>
    );
};

export default Addtreatment;
