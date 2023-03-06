import React from 'react'

const NewsCard = (props) => {
    return (
            <div className="card text-center text-white bg-dark shadow mb-3 rounded">
                <div className="card-body">
                    <p className="card-text">{props.body}</p>
                </div>
            </div>
    )
}

export default NewsCard;