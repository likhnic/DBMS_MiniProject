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
        <div className="card shadow bg-body p-1 rounded" style={style_card}>
            <img className="card-img-top" src={props.img_url} style={{height:"300px"}} alt="Card"/>
            <div className="card-body">
            <p className="card-text">{props.card_text}</p>
            <div className="text-center">
                <button type="submit" className="btn btn-primary btn-block" onClick={handleOnClick}>{props.name}</button>
            </div>
            </div>
        </div>
        </>
    )
}
export default Card;