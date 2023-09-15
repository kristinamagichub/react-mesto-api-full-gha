
export default function ImagePopup({ card, isOpen, onClose }) {
    return (

        <section className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`} onClick={onClose} >

            <div className="popup__frame" onClick={(evt => evt.stopPropagation())}>
                <button className="popup__close" type="button" onClick={onClose} />
                <figure className="popup__figure">
                    <img className="popup__picture" src={card.link ? card.link : '#'} alt={card.name ? `Фотография ${card.name}` : '#'} />
                    <figcaption className="popup__caption">{card.name}</figcaption>
                </figure>
            </div>
        </section >
    )
}