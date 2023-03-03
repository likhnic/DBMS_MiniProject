import React, { useState } from 'react';


const useFetch = (url, options) => {
    const [response, setResponse] = useState({});
    const [error, setError] = useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                console.log(res)
                console.log('++++++')
                console.log(json)

                setResponse(json);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    console.log(response)
    console.log('--------')
    return { response, error };
};

export default useFetch;