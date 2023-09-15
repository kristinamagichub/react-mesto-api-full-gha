
import Header from "../Header/Header";
import Main from "../Main/Main";


export default function ProtectedRouteMarkup({ userEmail, ...props }) {
    return (
        <>
            <Header dataUser={userEmail} onLogout={props.onLogout} />
            <Main
                name='main'
                {...props}
            />
        </>
    )
}