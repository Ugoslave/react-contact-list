import closeButton from "../images/popup-closeButton.svg";

function StafferDataPopup({ card, onClose }) {
  return (
    <div className={`popup popup_place_image-popup ${card && "popup_active"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        >
          <img
            src={closeButton}
            alt="Закрыть"
            className="popup__button-image"
          />
        </button>
        <div className="card">
          <div className="card__image-box">
            <img
              src={card ? card.avatar : ""}
              alt={card ? card.name : ""}
              className="card__image"
            />
          </div>
          <h3 className="card__title">{card ? card.name : ""} {card ? card.surname : ""}</h3>
          <p className="card__subtitle">{card ? card.tel : ""}</p>
          <p className="card__caption">{card ? card.email : ""}</p>
          <p className="card__caption">{card ? card.spec : ""}</p>
        </div>
      </div>
    </div>
  );
}

export default StafferDataPopup;
