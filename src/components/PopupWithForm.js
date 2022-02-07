import closeButton from "../images/popup-closeButton.svg";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_place_${props.name} ${
        props.isOpen && "popup_active"
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__button-close"
          onClick={props.onClose}
        >
          <img
            src={closeButton}
            alt="Закрыть"
            className="popup__button-image"
          />
        </button>
        <div className="popup__content-box">
          <h2 className="popup__title">
            {props.title}
          </h2>
          <form
            name={props.name}
            className= "contact-form" 
            noValidate
            onSubmit={props.onSubmit}
          >
            {props.children}
            <button
              type="submit"
              className="contact-form__button"
            >
              {props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
