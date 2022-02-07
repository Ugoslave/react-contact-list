import React from "react";
import Contact from "./Contact";
import Header from "./Header";
import addButton from "../images/contacts-container-add-button.svg";

function Main({
  onAddStaffer,
  onCardClick,
  elements,
  onCardDelete,
  userEmail,
  onSignOut,
  onEditCard
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
          className="element__button element__button_section-place" 
          onClick={onAddStaffer}
        >
          <img src={addButton} alt="Добавить контакт" />
        </button>
        <ul className="elements">
          {elements.map((i) => {
            return (
              <Contact
                key={i.id}
                card={i}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                onEditCard={onEditCard}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default Main;
