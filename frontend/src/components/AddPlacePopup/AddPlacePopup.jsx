import { memo, useEffect } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import Input from "../Input/Input"


const AddPlacePopup = memo(({ isOpen, onClose, onAddPlace }) => {
    const { values, errors, isInputValid, handleChange, isValid, reset } = useFormValidation()

    useEffect(() => {
        if (isOpen) {
            reset()
        }
        // eslint-disable-next-line
    }, [isOpen])

    function handleSubmit(evt) {
        evt.preventDefault()
        onAddPlace({ title: values.title, link: values.link })
    }

    return (
        <PopupWithForm
            name="cards"
            title="Новое место"
            titleButton="Создать"
            isOpen={isOpen}
            isValid={isValid}
            onClose={onClose}
            onSubmit={handleSubmit}
        >

            <fieldset className="popup__info">
                <Input
                    name="title"
                    type="text"
                    placeholder="Название"
                    minLength={2}
                    maxLength={30}
                    required={true}
                    value={values.title}
                    onChange={handleChange}
                    isInputValid={isInputValid.title}
                    error={errors.title}
                />

                <Input
                    name="link"
                    type="url"
                    placeholder="Ссылка на картинку"
                    minLength={5}
                    required={true}
                    value={values.link}
                    onChange={handleChange}
                    isInputValid={isInputValid.link}
                    error={errors.link}
                />


            </fieldset>


        </PopupWithForm>
    )
})


export default AddPlacePopup