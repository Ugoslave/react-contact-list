import removeButton from "../images/element-removeButton.svg";
import editButton from "../images/element-editButton.svg";
import likeButton from "../images/element-like.svg";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <div className="element__image-box">
        <img
          src={card.avatar}
          alt={card.name}
          className="element__image"
          onClick={handleClick}
        /> 
      </div>
      <div className="element__text-box" onClick={handleClick}>
        <p className="element__title">{card.name} {card.surname}</p>
        <p className="element__title">{card.tel}</p>
      </div>
      <button
        type="button"
        className="element__remove-button" 
      >
        <img src={editButton} alt="Редактировать" />
      </button>
      <button
        type="button"
        className="element__remove-button" 
        onClick={handleDeleteClick}
      >
        <img src={removeButton} alt="Удалить" />
      </button>
    </li>
  );
}

export default Card;
