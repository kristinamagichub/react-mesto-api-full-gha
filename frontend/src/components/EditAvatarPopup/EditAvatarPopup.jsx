import { memo, useEffect } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import Input from "../Input/Input"


const EditAvatarPopup = memo(({ isOpen, onClose, onUpdateAvatar }) => {

    const { values, isValid, isInputValid, errors, handleChange, reset } = useFormValidation()


    useEffect(() => {
        if (isOpen) {
            reset()
        }
        // eslint-disable-next-line
    }, [isOpen])



    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateAvatar({ avatar: values.avatar })
    }



    return (
        <PopupWithForm
            name="editAvatar"
            title="Обновить аватар"
            isOpen={isOpen}
            isValid={isValid}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__info">
                <Input
                    name="avatar"
                    type="url"
                    placeholder="Ссылка на картинку"
                    requered
                    value={values.avatar}
                    onChange={handleChange}
                    isInputValid={isInputValid.avatar}
                    error={errors.avatar}
                />

            </fieldset>

        </PopupWithForm>
    )
})

export default EditAvatarPopup