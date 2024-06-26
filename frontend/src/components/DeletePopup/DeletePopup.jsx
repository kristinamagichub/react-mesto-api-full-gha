

import { memo } from "react"
import PopupWithForm from "../PopupWithForm/PopupWithForm"



const DeletePopup = memo(({ onSubmit, isOpen, onClose }) => {

    function handleSubmit(evt) {
        evt.preventDefault()
        onSubmit()
    }


    return (

        <PopupWithForm
            name="delete"
            title="Вы уверены?"
            titleButton="Да"

            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    )
})

export default DeletePopup
