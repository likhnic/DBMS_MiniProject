// export default Addtest;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import useFetch from "../useFetch";
import backImage from './back.png'
const Addtest = (props) => {

	const queryParameters = new URLSearchParams(window.location.search)
	const patientID = queryParameters.get("patientID")
	console.log('patient ID is here: ', patientID)
	const [credentials, setCredentials] = useState({ Name: "" });
	let navigate = useNavigate();

	const [loading, setLoading] = useState(true);
    const onRender = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:5000/checkUser/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        }
        )
        const json = await response.json();
        if (json.error) {
            navigate("/", { replace: true })
        }
        setLoading(false);
    }

    useEffect(() => {
        onRender();
    }, [])

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
		console.log("credentials : ", credentials);
	};
    
	console.log("Hemlo");

	const handleOnClick = async (e) => {
		// e.preventDefault();
		console.log("cred: ", credentials)
		const { Name } = credentials;
		console.log(Name);

		if (Name === null || Name === undefined || Name === "") {

			// alert("Please select a Test!!!")
            props.alert("Please select a Test!!!", "danger")
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
		const json = await response.json();
		console.log('Response : ', json)
		if (json.success) {
			// alert("Test Added Successfully")
            props.alert("Test Added Successfully", "success")
		}
		if (json.error)
			// alert(json.error)
            props.alert(json.error, "danger")
	};


	const res = useFetch("http://localhost:5000/api/dataentryop/test/names", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			'token': localStorage.getItem('token')
		},
	});
	console.log("Recieved  : ", res.response);

	let data = res.response.test;
	console.log("DATA : ", data);
	const goBack = () => {
		navigate(`/dataentryop/options?patientID=${patientID}`, { replace: true })
	}
	const mystyle = {
		background: 'transparent',
		border: 'none',
		outline: 'none',
		cursor: 'pointer'
	}
	const header_style = { textAlign: "center" };
	return (
		<>
			{!loading && <>
			<button style={mystyle} className="prev" onClick={() => goBack()} color="red" border="none"><img src={backImage} width='50rem' alt=""></img></button>
			<div className="container mt-3">
				<form className="form-control" onSubmit={(event) => event.preventDefault()} >
					<h1 style={header_style}>Add test</h1>
					{/* <!-- 2 column grid layout with text inputs for the first and last names --> */}

					<select
						className="form-select mb-3"
						aria-label="Default select example"
						onChange={onChange}
						defaultValue="--- select test ---"
						name="Name"
					>
						<option disabled selected >Test</option>
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
						onClick={() => handleOnClick()}
					>
						Add Test
					</button>
				</form>
			</div>
			</>}
		</>
	);
};

export default Addtest;