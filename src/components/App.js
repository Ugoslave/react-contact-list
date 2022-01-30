import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import api from "../utils/api";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import avatarLoader from "../images/profile-avatar-loader.gif";
import InfoTooltip from "./InfoTooltip";
import successImage from "../images/register-popup-success.svg";
import failImage from "../images/register-popup-fail.svg";
import * as authorization from "../utils/authorization.js";
import ProtectedRoute from "./ProtectedRoute";
import contacts from "../constants/contacts";

function App() {

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const historyLogin = useHistory();

  const [userEmail, setUserEmail] = React.useState("");
  const [successRegister, setSuccessRegister] = React.useState(false);

  React.useEffect(() => {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      authorization
        .handleCheckToken(jwt)
        .then((res) => {
          if (res) {
            handleLogin();
            historyLogin.push("/");
            setUserEmail(res.data.email);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function signOut() {
    if (loggedIn) {
      localStorage.removeItem("token");
      historyLogin.push("/sign-in");
    }
  }

  function handleLoginSubmit(evt) {
    authorization
      .handleAuthorization(evt.password, evt.email)
      .then((res) => {
        if (res) {
          handleLogin();
          historyLogin.push("/");
          localStorage.setItem("token", res.token);
          setUserEmail(evt.email);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleRegisterSubmit(evt) {
    authorization
      .handleRegistration(evt.password, evt.email)
      .then((res) => {
        if (res) {
          historyLogin.push("/sign-in");
          handleInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltipOpen(false);
      });
  }

  

  function handleCardDelete(card) {
    api
      .removeElement(card._id)
      .then(setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log(err));
  }

  function getAllContacts() {
    setCards(contacts);
  }

  React.useEffect(() => {
    getAllContacts();
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltipOpen(mean) {
    setIsInfoTooltipOpen(true);
    setSuccessRegister(mean);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }


  

  function handleAddPlaceSubmit(evt) {
    api
      .addCard(evt)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  return (
    <>
      <div className="page">
        <Switch>
          <Route exact path="/sign-in">
            <Header textButton="Регистрация" nav="sign-up" />
            <Login onLogin={handleLoginSubmit} />
          </Route>

          <Route exact path="/sign-up">
            <Header textButton="Войти" nav="sign-in" />
            <Register onRegister={handleRegisterSubmit} />
          </Route>

          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            userEmail={userEmail}
            onSignOut={signOut}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        <Footer />
      </div>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        name="remove-confirmation"
        title="Вы уверены?"
        buttonText="Да"
      />
      <InfoTooltip
        text={
          successRegister
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
        }
        imageLink={successRegister ? successImage : failImage}
        onClose={closeAllPopups}
        isOpen={isInfoTooltipOpen}
      />
    </>
  );
}

export default App;
