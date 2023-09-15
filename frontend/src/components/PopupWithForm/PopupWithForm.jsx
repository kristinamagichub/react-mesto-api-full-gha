import Popup from "../Popup/Popup";
import Form from "../Form/Form";

export default function PopupWithForm({ name, isOpen, onClose, title, titleButton, isValid = true, onSubmit, isSend, children }) {

    return (
        <Popup
            name={name}
            isOpen={isOpen}
            onClose={onClose}
        >
            <h2 className={` popup__title ${name === 'delete' ? 'popup__title_type_delete' : ''}`}>{title}</h2>
            <Form
                name={name}
                titleButton={titleButton}
                isValid={isValid}
                onSubmit={onSubmit}
                children={children}
                isSend={isSend}
            />
        </Popup>

    )
}