
import SectionLogin from "../SectionLogin/SectionLogin"
import useFormValidation from "../../utils/useFormValidation"
import Input from "../Input/Input"

export default function Login({ name, handleLogin }) {
    const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

    function onLogin(evt) {
        evt.preventDefault()
        handleLogin(values.password, values.email)
    }
    return (
        <SectionLogin name={name} onSubmit={onLogin} isValid={isValid}>
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