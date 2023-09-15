import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { registration, authorization, getUserData } from "../utils/auth.js";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import ProtectedRouteMarkup from "./ProtectedRouteMarkup/ProtectedRouteMarkup.jsx";
import SendContext from "../contexts/SendContext.js";
import DeletePopup from "./DeletePopup/DeletePopup.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";




function App() {
  const navigate = useNavigate();

  // states for popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false)
  const [isDeleteImagePopupOpen, setIsDeleteImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [isSend, setIsSend] = useState(false)

  //states for registration and login
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isCheckToken, setIsCheckToken] = useState(true)

  // state for context
  const [currentUser, setCurrentUser] = useState({})
  const [userEmail, setUserEmail] = useState('')

  // states for card
  const [cards, setCards] = useState([]) //cards -массив карточек
  const [deleteCardId, setDeleteCardId] = useState(' ')
  const [isLoadingCards, setIsLoadingCards] = useState(true)

  //const of state of popups /перем состояния попапов
  const isOpen = isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || isDeleteImagePopupOpen || isImagePopupOpen || isResultPopupOpen || isDeletePopupOpen



  const handleCardLike = useCallback((card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLike = card.likes.some(element => { console.log('element:', element); return currentUser._id === element });

    if (isLike) {
      api.deleteLike(card._id, localStorage.jwt)
        .then(res => {
          setCards(cards => cards.map((item) => item._id === card._id ? res : item));
        })
        .catch((err) => console.error(`Ошибка при снятии лайка ${err}`))
    } else {
      api.addLike(card._id, localStorage.jwt)
        .then(res => {
          setCards(cards => cards.map((item) => item._id === card._id ? res : item));
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    }
  }, [currentUser._id])


  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsDeleteImagePopupOpen(false)
    setIsImagePopupOpen(false)
    setIsResultPopupOpen(false)
    setIsDeletePopupOpen(false)
  }, [])

  useEffect(() => {
    function closePopupByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closePopupByEsc)
      return () => {
        document.removeEventListener('keydown', closePopupByEsc)
      }
    }
  }, [isOpen, closeAllPopups])

  function authorize() {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then(res => {
          console.log('response: ', res)
          setUserEmail(res.email);
          setIsLoggedIn(true);
          setIsCheckToken(false);
          navigate('/');
        })
        .catch((err) => console.error(`Ошибка авторизации при входе ${err}`));
    } else {
      setIsLoggedIn(false);
      setIsCheckToken(false);
    }
  }

  useEffect(() => {
    authorize();
    // eslint-disable-next-line
  }, [])

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail('');
  }

  const handleEditProfileClick = useCallback(() => {
    setIsEditProfilePopupOpen(true)
  }, [])


  const handleAddPlaceClick = useCallback(() => {
    setIsAddPlacePopupOpen(true)
  }, [])


  const handleEditAvatarClick = useCallback(() => {
    setIsEditAvatarPopupOpen(true)
  }, [])


  const handleCardClick = useCallback((card) => {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }, [])


  const handleDeleteImagePopupClick = useCallback((cardId) => {
    setDeleteCardId(cardId)
    setIsDeleteImagePopupOpen(true)
  }, [])


  useEffect(() => {
    if (isLoggedIn) {
      setIsLoadingCards(true)
      Promise.all([api.getInfo(localStorage.jwt), api.getCards(localStorage.jwt)]) //получает на вход масив из асихронных методов, выполняет их параллельно  
        .then(([userEmail, dataCards]) => {
          setCurrentUser(userEmail)
          setCards(dataCards)
          setIsLoadingCards(false)
        })
        .catch((error) => console.error(`Ошибка при создании начальных данных страницы ${error}`))
    }
  }, [isLoggedIn])


  const handleSubmit = useCallback((request, textError) => {
    setIsSend(true)
    request()
      .then(closeAllPopups)
      .catch((error) => console.error(`${textError} ${error}`))
      .finally(() => setIsSend(false))
  }, [closeAllPopups])


  const handleDeleteSubmit = useCallback(() => {
    function makeRequest() {
      return (api.deleteCard(deleteCardId, localStorage.jwt)
        .then(() => {
          setCards(cards.filter(card => {
            return card._id !== deleteCardId
          }))
        })
      )
    }
    handleSubmit(makeRequest, 'Ошибка при удалении картинки')
  }, [cards, deleteCardId, handleSubmit])


  const handleUpdateUser = useCallback((userEmail) => {
    function makeRequest() {
      return (api.setUserInfo(userEmail, localStorage.jwt)
        .then(res => {
          setCurrentUser(res)
        }))
    }
    handleSubmit(makeRequest, 'Ошибка при редактировании профиля ')
  }, [handleSubmit])


  const handleUpdateAvatar = useCallback((userEmail) => {
    function makeRequest() {
      return (api.setNewAvatar(userEmail, localStorage.jwt)
        .then((res) => {
          setCurrentUser(res)
        }))
    }
    handleSubmit(makeRequest, 'Ошибка при обновлении аватара')
  }, [handleSubmit])


  const handleAddPlaceSubmit = useCallback((dataCard) => {
    function makeRequest() {
      return (api.addCard(dataCard, localStorage.jwt)
        .then((res) => {
          setCards([res, ...cards])
        }))
    }
    handleSubmit(makeRequest, 'Ошибка при добавлении картинки')
  }, [handleSubmit, cards])


  function handleLogin(password, email) {
    setIsSend(true);
    authorization(password, email)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true)
        setUserEmail(email)
        navigate('/')
        window.scrollTo(0, 0)
      })
      .catch((error) => {
        setIsResultPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при авторизации ${error}`)
      })
      .finally(() => setIsSend(false))
  }


  function handleRegister(password, email) {
    setIsSend(true)
    registration(password, email)
      .then(() => {
        setIsResultPopupOpen(true)
        setIsSuccessful(true)
        navigate('/sign-in')
        window.scrollTo(0, 0)
      })
      .catch((error) => {
        setIsResultPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при регистрации ${error}`)
      })
      .finally(() => setIsSend(false))
  }




  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">

        <SendContext.Provider value={isSend}>
          <Routes>
            <Route path='/' element={<ProtectedRoute
              element={ProtectedRouteMarkup}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onDelete={handleDeleteImagePopupClick}
              cards={cards}
              isLoading={isLoadingCards}
              userEmail={userEmail}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              isCheckToken={isCheckToken}
              isLoggedIn={isLoggedIn}

              onLogout={handleLogout}
            />
            } />



            <Route path='/sign-up' element={
              <>
                <Header name='signup' />
                <Main name='signup' isCheckToken={isCheckToken} handleRegister={handleRegister} />
              </>
            } />

            <Route path='/sign-in' element={
              <>
                <Header name='signin' />
                <Main name='signin' isCheckToken={isCheckToken} handleLogin={handleLogin} />
              </>
            } />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </SendContext.Provider>


        <Footer />


        <SendContext.Provider value={isSend} >

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            isSend={isSend}
          />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            isSend={isSend}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            isSend={isSend}
          />

          <DeletePopup
            isOpen={isDeleteImagePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeleteSubmit}
          />
        </SendContext.Provider>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          name="result"
          isSuccessful={isSuccessful}
          isOpen={isResultPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
