import React from "react";

const Card = ({id, question, answer, color, handleClick, currState}) => {

    return (
        <div className="flip-card">
            <div 
                className={"flip-card-inner" + (currState ? "" : " answer")} onClick={handleClick}
                style={{backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`}}
            >
                <div className="flip-card-front">
                    <p>{question}</p>
                </div>
                <div className="flip-card-back">
                   <p>{answer}</p>
                </div>
            </div>
        </div>
        // <div className="card-container" onClick={() => setShowQuestion(!showQuestion)}>
        //     <h4>{showQuestion ? question : answer}</h4>
        // </div>
    )
}

export default Card;