import React from "react";
import Card from "./Card";
import Header from "./Header";
import addButton from "../images/contacts-container-add-button.svg";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddStaffer,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  userEmail,
  onSignOut,
}) {

  return (
    <>
      <Header
        textButton="Выйти"
        nav="sign-in"
        userEmail={userEmail}
        onSignOut={onSignOut}
      />

      <section className="contacts-container">
    
        <button
          type="button"
          className="element__remove-button" 
          onClick={onAddStaffer}
        >
          <img src={addButton} alt="Добавить контакт" />
        </button>

        <ul className="elements">
          {cards.map((i) => {
            return (
              <Card
                key={i.tel}
                card={i}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default Main;
