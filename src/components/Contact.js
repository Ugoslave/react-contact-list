import React from "react";
import removeButton from "../images/element-removeButton.svg";
import editButton from "../images/element-editButton.svg";

function Contact({ card, onCardClick, onCardDelete, onEditCard }) {

  function handleClick() {
    onCardClick(card);
  }

  function handleEditClick() {
    onEditCard(card);
  }

  function handleDeleteClick(evt) {
    onCardDelete(evt);
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
        className="element__button" 
        onClick ={handleEditClick} 
      >
        <img src={editButton} alt="Редактировать" />
      </button>
      <button
        type="button"
        className="element__button" 
        onClick={handleDeleteClick}
      >
        <img src={removeButton} alt="Удалить" />
      </button>
    </li>
  );
}

export default Contact;
