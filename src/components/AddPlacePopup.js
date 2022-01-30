import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [newCardTitle, setNewCardTitle] = React.useState("");
  const [newCardLink, setNewCardLink] = React.useState("");

  function handleTitleInputChange(evt) {
    setNewCardTitle(evt.target.value);
  }

  function handleLinkInputChange(evt) {
    setNewCardLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: newCardTitle,
      link: newCardLink,
    });
  }

  React.useEffect(() => {
    if (isOpen === false) {
      setNewCardTitle("");
      setNewCardLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-element"
      title="Новый сотрудник"
      buttonText="Добавить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input 
        type = "url" 
        name = "avatar" 
        id = "user-avatar" 
        placeholder="Ссылка на аватар" 
        minLength="10" 
        className = "contact-form__input contact-form__input_data_avatar" 

        value={newCardTitle}
        onChange={handleTitleInputChange}
      />
      <span id="user-avatar-error" className="popup__input-error" />

      <input
        required 
        type = "text" 
        name = "username" 
        id = "user-name" 
        placeholder="Имя сотрудника" 
        minLength="1" maxLength="30" 
        className = "contact-form__input contact-form__input_data_name" 

        value={newCardLink}
        onChange={handleLinkInputChange}
      />
      <span id="user-name-error" className="popup__input-error" />

      <input 
        required 
        type = "text" 
        name = "surname" 
        id = "user-surname" 
        placeholder="Фамилия сотрудника" 
        minLength="1" 
        maxLength="40" 
        className = "contact-form__input contact-form__input_data_surname" 
      />
      <span id="user-surname-error" className="popup__input-error" />

      <input 
        required 
        type = "tel" 
        name = "phone" 
        id = "user-phone" 
        placeholder="Номер телефона" 
        minLength="5" 
        maxLength="15" 
        className = "contact-form__input contact-form__input_data_phone" 
      />
      <span id="user-phone-error" className="popup__input-error" />

      <input 
        required 
        type = "email" 
        name = "email" 
        id = "user-email" 
        placeholder="Адрес электронной почты" 
        minLength="6" 
        maxLength="20" 
        className = "contact-form__input contact-form__input_data_email" 
      />
      <span id="user-email-error" className="popup__input-error" />

      <input 
        required 
        type = "text" 
        name = "speciality" 
        id = "user-speciality" 
        placeholder="Специальность" 
        minLength="5" 
        maxLength="50" 
        className = "contact-form__input contact-form__input_data_speciality" 
      />
      <span id="user-speciality-error" className="popup__input-error" />

    </PopupWithForm>
  );
}

export default AddPlacePopup;
