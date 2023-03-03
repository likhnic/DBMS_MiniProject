import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const Addtest = () => {

    const queryParameters = new URLSearchParams(window.location.search)
    const patientID = queryParameters.get("patientID")
    const [credentials, setCredentials] = useState({ Name: "" });
    const [data, setData] = useState([]);
    let navigate = useNavigate()
    const onChange = (e) => {
        console.log("Hello");
        setCredentials({"Name":[e.target.value]})
        console.log("credentials : ", credentials);
    };
    const goBack = () => {
        // window.location.replace('http://localhost:3000/dataentryop/addtest');
        navigate(`/dataentryop/options?patientID=${patientID}`, { replace: true })
    }
    const handleOnClick = async (e) => {
        const { Name } = credentials;
        console.log(Name);
        if (!Name || Name === "") {
            setCredentials({ ...credentials, "Name": e.target.value });
            console.log('Please select a value!!!')
            return;
        }

        const response = await fetch(
            `http://localhost:5000/api/dataentryop/test/${patientID}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({ Name: Name })
            }
        );
        console.log(response)
    };

    const onRender = async()=>{

        const response = await fetch('http://localhost:5000/api/dataentryop/test/names', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        setData(json.test);
    }

    useEffect(()=>{
        onRender();
    }, [])

    const header_style = { textAlign: "center" };
    return (
        <>
        <button onClick={()=>goBack()}>Go Back</button>
            <div className="container mt-3">
                <form className="form-control" onSubmit={(event) => event.preventDefault()} >
                    <h1 style={header_style}>Add test</h1>
                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}

                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={onChange}
                        defaultValue="Test"
                        name="Name"
                    >
                        <option disabled >Test</option>
                        {data &&
                            data.map((row, i) => {
                                return (
                                    <option key={i} value={row.Name}>
                                        {row.Name}
                                    </option>
                                );
                            })}
                    </select>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        onClick={handleOnClick}
                    >
                        Add Test
                    </button>
                </form>
            </div>
        </>
    );
};

export default Addtest;
