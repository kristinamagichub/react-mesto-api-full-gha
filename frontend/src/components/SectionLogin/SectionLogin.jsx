import { Link } from 'react-router-dom';
import Form from '../Form/Form';


export default function SectionLogin({ name, isValid, onSubmit, children }) {

    return (
        <section className='login page__login'>
            <h2 className='login__title'>{name === 'signup' ? 'Регистрация' : 'Вход'}</h2>
            <Form
                name={name}
                titleButton={name === 'signup' ? 'Регистрация' : 'Войти'}
                isValid={isValid}
                onSubmit={onSubmit}
                children={children}
            />
            {name === 'signup' && <p className='login__subtitle'>Уже зарегистрированы? <Link to={'/sign-in'} className='login__subtitle-link'>Войти</Link> </p>}
        </section>
    )
}








