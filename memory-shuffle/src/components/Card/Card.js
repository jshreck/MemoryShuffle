import React from "react";
import "./Card.css";

const Card = props => (

    <div className="col-xs-6 col-md-3">
      <a className="thumbnail">
        <img className="card-img" src={props.image} alt="" id={props.id} onClick={props.onClick} data-clicked={props.clicked}/>
      </a>
    </div>

);

export default Card;