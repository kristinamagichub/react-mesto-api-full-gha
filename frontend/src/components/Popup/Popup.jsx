
export default function Popup({ name, children, isOpen, onClose }) {
    return (
        <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`} onClick={onClose} >

            <div className={`${name === 'image' ? 'popup_type_image' : 'popup__container'}  ${name === 'result' ? 'popup__container_result' : ''}`}
                onClick={(evt) => evt.stopPropagation()}>
                <button className="popup__close" type="button" onClick={onClose} />
                {children}
            </div>
        </section>


    )
}