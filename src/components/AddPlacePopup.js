import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({ isOpen, onClose, onAddStaffer }) {
  
  const [newAvatarLink, setNewAvatarLink] = React.useState("");
  const [newStafferName, setNewStafferName] = React.useState("");
  const [newStafferSurname, setNewStafferSurname] = React.useState("");
  const [newPhoneNumber, setNewPhoneNumber] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [newStafferSpec, setNewStafferSpec] = React.useState("");
  

  function handleAvatarInputChange(evt) {
    setNewAvatarLink(evt.target.value);
  }

  function handleNameInputChange(evt) {
    setNewStafferName(evt.target.value);
  }

  function handleSurnameInputChange(evt) {
    setNewStafferSurname(evt.target.value);
  }

  function handlePhoneInputChange(evt) {
    setNewPhoneNumber(evt.target.value);
  }

  function handleEmailInputChange(evt) {
    setNewEmail(evt.target.value);
  }

  function handleSpecialityInputChange(evt) {
    setNewStafferSpec(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddStaffer({
      avatar: newAvatarLink,
      name: newStafferName, 
      surname: newStafferSurname, 
      tel: newPhoneNumber, 
      email: newEmail, 
      spec: newStafferSpec,
    });
  }

  React.useEffect(() => {
    if (isOpen === false) {
      setNewAvatarLink("");
      setNewStafferName("");
      setNewStafferSurname("");
      setNewPhoneNumber("");
      setNewEmail("");
      setNewStafferSpec("");
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

        value={newAvatarLink}
        onChange={handleAvatarInputChange}
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

        value={newStafferName}
        onChange={handleNameInputChange}
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
        value={newStafferSurname}
        onChange={handleSurnameInputChange}
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
        value={newPhoneNumber}
        onChange={handlePhoneInputChange}
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
        value={newEmail}
        onChange={handleEmailInputChange}
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
        value={newStafferSpec}
        onChange={handleSpecialityInputChange}
      />
      <span id="user-speciality-error" className="popup__input-error" />

    </PopupWithForm>
  );
}

export default AddPlacePopup;
