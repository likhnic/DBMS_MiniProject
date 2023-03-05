import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import backImage from './back.png'
import axios from 'axios';
import Alert from "../Alert";

const Updateresult = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const patientID = queryParameters.get("patientID")
    const [credentials, setCredentials] = useState({ testId: "" });
    const [data, setData] = useState([]);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        console.log('file name is changed')
    };
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
      setAlert({
        message,
        type
      })
      setTimeout(() => {
        setAlert(null)
      }, 4000);
    }

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        let json

        if (!credentials || credentials.testId === "") {
            // alert('Please select a Test');
            showAlert('Please select a Test', 'danger')
            return;
        }
        if (!file) {
            return;
        }
        const { testId } = credentials;
        try {
            const res = await axios.put(
                `http://localhost:5000/api/dataentryop/test/${testId}`,
                formData
            );
            console.log('got data', res);
            json = res.data;
        } catch (ex) {
            console.log(ex);
        }
        console.log('Response : ', json)
        if (json.success) {

            // alert("Result Updated Successfully")
            showAlert("Result Updated Successfully", "success")
        }
        if (json.error)
            // alert(json.error)
            showAlert(json.error, "danger")
    };

    let navigate = useNavigate()
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        console.log("credentials : ", credentials);

    };
    const goBack = () => {
        // window.location.replace('http://localhost:3000/dataentryop/addtest');
        navigate(`/dataentryop/options?patientID=${patientID}`, { replace: true })
    }
    const handleOnClick = async (e) => {
        console.log("cred: ", credentials)
        const { testId } = credentials;
        console.log(testId);
        if (!testId || testId === "") {
            // alert('Please Select a Test !!!')
            showAlert('Please Select a Test !!!', 'danger')
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
                body: JSON.stringify({ testId: testId })
            }
        );
        const json = await response.json();
        console.log('Response : ', json)
        if (json.success) {
            // onRender()
            // alert("Result Updated Successfully")
            showAlert("Result Updated Successfully", "success")
            // window.location.reload(true);
        }
        if (json.error)
            alert(json.error)
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
    const mystyle = {
        background: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer'
    }
    const header_style = { textAlign: "center" };
    return (
        <>

            <button style={mystyle} className="prev" onClick={() => goBack()} color="red" border="none"><img src={backImage} width='50rem'></img></button>
            <Alert alert={alert} />
            <div className="container mt-3">
                <form className="form-control" onSubmit={(event) => event.preventDefault()} >
                    <h1 style={header_style}>Update Result</h1>

                    <select
                        className="form-select mb-4"
                        aria-label="Default select example"
                        onChange={onChange}
                        defaultValue="Test"
                        name="testId"
                    >
                        <option disabled value="Test" >Test</option>
                        {data &&
                            data.map((row, i) => {
                                return (
                                    <option key={row.TestID} value={row.TestID}>
                                        {row.Name}
                                    </option>
                                );
                            })}
                    </select>
                    <div className="form-outline mb-4 form-group">
                        <input type="file" id="myFile" className="form-control" name="filename" padding-top="10rem" onChange={saveFile} required></input>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        onClick={() => uploadFile()}
                    >
                        Update Result
                    </button>
                </form>
            </div>
        </>
    );
};

export default Updateresult;