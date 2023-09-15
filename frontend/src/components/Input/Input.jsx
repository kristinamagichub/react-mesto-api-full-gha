import { useContext } from "react"
import SendContext from "../../contexts/SendContext"



export default function Input({ name, type, placeholder, minLength, maxLength, value, onChange, isInputValid, error }) {
    const isSend = useContext(SendContext)

    return (
        <>
            {name === "password" || name === "email" ?
                <>
                    <input
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        minLength={minLength ? minLength : ''}
                        maxLength={maxLength ? maxLength : ''}
                        required
                        value={value ? value : ''}
                        onChange={onChange}
                        disabled={isSend}
                        className={`login__input ${isInputValid === undefined || isInputValid ? '' : "login__input_invalid"}`}
                    />

                    <span className={"login__error"}>{error}</span>
                </>
                :
                <>
                    <input
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        minLength={minLength ? minLength : ''}
                        maxLength={maxLength ? maxLength : ''}
                        required
                        value={value ? value : ''}
                        onChange={onChange}
                        disabled={isSend}
                        className={`popup__input ${isInputValid === undefined || isInputValid ? '' : "popup__input_invalid"}`}
                    />

                    <span className={"popup__error"}>{error}</span>
                </>
            }
        </>

    )
}