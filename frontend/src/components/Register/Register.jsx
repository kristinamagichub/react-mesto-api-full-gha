import Input from "../Input/Input"
import useFormValidation from "../../utils/useFormValidation";
import SectionLogin from "../SectionLogin/SectionLogin"



export default function Register({ name, handleRegister }) {
    const { values, isValid, errors, isInputValid, handleChange } = useFormValidation()

    function onRegister(evt) {
        evt.preventDefault()
        handleRegister(values.password, values.email)
    }
    return (
        <SectionLogin name={name} onSubmit={onRegister} isValid={isValid}>
            <Input
                name='email'
                type='email'
                placeholder={'Email'}
                value={values.email}
                error={errors.email}
                isInputValid={isInputValid.email}
                onChange={handleChange}
            />
            <Input
                name='password'
                type='password'
                placeholder={'Пароль'}
                minLength={4}
                value={values.password}
                error={errors.password}
                isInputValid={isInputValid.password}
                onChange={handleChange}
            />
        </SectionLogin>
    )
}