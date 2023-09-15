import Popup from "../Popup/Popup"

export default function InfoTooltip({ name, isSuccessful, isOpen, onClose }) {

    return (
        <Popup name={name} isOpen={isOpen} onClose={onClose}>

            <div className={`popup__registration-sign ${!isSuccessful ? 'popup__registration-sign_error' : ' '}`} />

            <h2 className="popup__registration-message">  {isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'} </h2>
        </Popup>
    )
}