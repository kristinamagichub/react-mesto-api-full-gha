import { memo, useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import LikeButton from "../LikeButton/LikeButton.jsx"

const Card = memo(({ card, onCardClick, onDelete, onCardLike }) => {
    const currentUser = useContext(CurrentUserContext)
    return (

        <article className="group__element">
            {currentUser._id === card.owner && <button className="group__trash" type="button" onClick={() => onDelete(card._id)} />}

            <div className="group__rectangle">

                <img className="group__mask"
                    src={card.link}
                    alt={`Фотография ${card.name}`}
                    onClick={() => onCardClick({ link: card.link, name: card.name })} />
                <div className="group__description">
                    <h2 className="group__picture-name">{card.name}</h2>
                    <div>
                        <LikeButton myid={currentUser._id} card={card} onCardLike={onCardLike} />

                    </div>
                </div>
            </div>
        </article>

    )
})

export default Card