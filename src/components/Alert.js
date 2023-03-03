import React from 'react'

// Props : alert{success/error,message}

export default function Alert(props) {
    return (
        <div style={{ height: '50px' }}>
            {props.alert && <div className='container'>
                <div className={`alert alert-${props.alert.type==="success"?"success":"danger"} alert-dismissible fade show`} role="alert">
                    <strong>{props.alert.message}</strong>
                </div>
            </div>}
        </div>
    )
}