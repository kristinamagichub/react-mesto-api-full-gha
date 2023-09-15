import { useContext, useEffect } from "react";

import useFormValidation from "../../utils/useFormValidation.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSend }) {
    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext)

    const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

    // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах
    useEffect(() => {
        setValue("username", currentUser.name)
        setValue("job", currentUser.about)
    }, [currentUser, setValue])




    function resetForClose() {
        onClose()
        reset({ username: currentUser.name, job: currentUser.about })
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateUser({ username: values.username, job: values.job }, reset)
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={resetForClose}
            isValid={isValid}
            onSubmit={handleSubmit}
            isSend={isSend}
        >
            <fieldset className="popup__info">
                <input
                    className={`popup__input popup__input_type_name ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_invalid'}`}
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Введите имя"
                    minLength={2}
                    maxLength={40}
                    required={true}
                    value={values.username ? values.username : ''}
                    onChange={handleChange}
                    disabled={isSend}

                />
                <span
                    className="popup__error popup__error_type_username"
                    id="name-error"
                >{errors.username}</span>
                <input
                    className={`popup__input popup__input_type_job ${isInputValid.job === undefined || isInputValid.job ? '' : 'popup__input_invalid'}`}
                    id="job"
                    name="job"
                    type="text"
                    placeholder="Введите область деятельности"
                    minLength={2}
                    maxLength={200}
                    required={true}
                    value={values.job ? values.job : ''}
                    onChange={handleChange}
                    disabled={isSend}
                />
                <span className="popup__error popup__error_type_job" id="job-error">{errors.job}</span>
            </fieldset>
        </PopupWithForm>
    )
}