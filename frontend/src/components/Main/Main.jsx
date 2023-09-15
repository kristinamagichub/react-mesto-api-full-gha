//функционалбный компонент для блока Main

import { memo, useContext } from "react"

import Card from "../Card/Card.jsx"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import Register from "../Register/Register.jsx"
import Login from "../Login/Login.jsx"
import Spinner from "../Spinner/Spinner.jsx"


const Main = memo(({ name, onCardClick, cards, handleLogin, handleRegister, onEditAvatar, onEditProfile, onAddPlace, onCardLike, onDelete, isLoading, isCheckToken }) => {
    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="main">


            {isCheckToken ?
                <Spinner check={isCheckToken} />
                :
                name === 'main' ?

                    <>

                        <section className="profile">
                            <button className="profile__avatar-overlay" type="button" onClick={onEditAvatar}>
                                <img className="profile__image" src={currentUser.avatar ? currentUser.avatar : "#"} alt="фотография профиля" />
                            </button>
                            <div className="profile__info">
                                <div className="profile__title-space">
                                    <h1 className="profile__name" >{currentUser.name ? currentUser.name : " "}</h1>
                                    <button className="profile__edit-button" type="button" onClick={onEditProfile} />
                                </div>
                                <p className="profile__job">{currentUser.about ? currentUser.about : " "}</p>
                            </div>
                            <button className="profile__add-button" type="button" onClick={onAddPlace} />
                        </section>
                        <section aria-label="Картинки из коробки">
                            <ul className="group" >
                                {isLoading ? <Spinner /> : cards.map(data => {

                                    return (

                                        <li className="group__item" key={data._id} >
                                            <Card card={data} onCardClick={onCardClick} onCardLike={onCardLike} onDelete={onDelete} />
                                        </li>
                                    )
                                })}

                            </ul>
                        </section>
                    </>

                    :
                    name === "signup" ?
                        <Register name={name} handleRegister={handleRegister} />
                        :
                        <Login name={name} handleLogin={handleLogin} />
            }
        </main>


    )
})

export default Main