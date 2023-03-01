import React from "react";
const Card = (props) => {
    const style_card = { width: "300px" };
    return (
        <>
        <div className="card" style={style_card}>
            <img className="card-img-top" src={props.img_url} alt="Card image"/>
            <div className="card-body">
            <h4 className="card-title">{props.name}</h4>
            <p className="card-text">{props.card_text}</p>
            <a href={props.url} className="btn btn-primary">See Profile</a>
            </div>
        </div>
        </>
    )
}
export default Card