import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {

    let navigate = useNavigate()
    const handleOnClick = (e)=>{
        e.preventDefault();
        navigate(props.url)
    }
    const style_card = { width: "300px" };
    return (
        <>
        <div className="card shadow bg-body p-3 mb-5 rounded" style={style_card}>
            <img className="card-img-top" src={props.img_url} style={{height:"300px"}} alt="Card image"/>
            <div className="card-body">
            <p className="card-text">{props.card_text}</p>
            <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleOnClick}>{props.name}</button>
            </div>
        </div>
        </>
    )
}
export default Card;