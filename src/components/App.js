import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import ProtectedRoute from "./ProtectedRoute";
import contacts from "../constants/contacts";
import Footer from "./Footer";
import AddStafferPopup from "./AddStafferPopup";
import StafferDataPopup from "./StafferDataPopup";
import InfoTooltip from "./InfoTooltip";
import successImage from "../images/register-popup-success.svg";
import failImage from "../images/register-popup-fail.svg";
import * as authorization from "../utils/authorization.js";

function App() {

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isEditStafferData, setIsEditStafferData] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [selectedContact, setSelectedContact] = React.useState(null);
  const [elements, setElements] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [successRegister, setSuccessRegister] = React.useState(false);
  const[indexElement, setIndexElement] = React.useState(null);
  const historyLogin = useHistory();
  
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

  function getAllContacts() {
    setElements(contacts);
  }

  React.useEffect(() => {
    getAllContacts();
  }, []);

  function handleAddStafferClick() {
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

  function handleCardDelete(evt) {
    const targetElement = evt.target.closest(".element");
    targetElement.remove();
  }
  
  function handleAddStafferSubmit(evt) {
    setElements([evt, ...contacts]);
    closeAllPopups();
  }

  function handleEditStafferData(evt) {
    handleAddStafferClick();
    setIsEditStafferData(true);
    setSelectedContact(evt);
    setIndexElement(contacts.findIndex(n => n.id === evt.id));
  }

  function handleChangeStafferData(evt) {
    contacts.splice(indexElement, 1, evt);
    setElements(contacts);
    closeAllPopups();
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsEditStafferData(false);
    setIsInfoTooltipOpen(false);
    setIndexElement(null);
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
            onAddStaffer={handleAddStafferClick}
            onCardClick={handleCardClick}
            elements={elements}
            onCardDelete={handleCardDelete}
            onEditCard={handleEditStafferData}
          />
        </Switch>
        <Footer />
      </div>
      <AddStafferPopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddStaffer={isEditStafferData ? handleChangeStafferData : handleAddStafferSubmit}
        isEdit={isEditStafferData}
        card={selectedContact}
      />
      <StafferDataPopup card={selectedCard} onClose={closeAllPopups} />
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
