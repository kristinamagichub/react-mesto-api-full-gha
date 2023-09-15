
import { useContext } from "react"
import SendContext from '../../contexts/SendContext'


export default function Form({ name, titleButton, isValid, onSubmit, children }) {
    const isSend = useContext(SendContext)


    return (
        <form noValidate name={name} onSubmit={onSubmit}>
            {children}

            {name === 'signin' || name === 'signup' ?
                <button className={`login__button ${isSend ? 'login__button_loading' : ''} ${isValid ? '' : 'login__button_disable'}`}>
                    {isSend ? '' : titleButton || 'Сохранить'}
                </button>
                :


                <button disabled={!isValid} className={`popup__button-save ${isSend ? 'popup__button-save_loading' : ''} ${isValid ? '' : 'popup__button-save_disable'}`}>
                    {isSend ? '' : titleButton || 'Сохранить'}
                </button>
            }

        </form>
    )
}




