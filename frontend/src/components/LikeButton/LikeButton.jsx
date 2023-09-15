
import { useEffect, useState } from "react"

export default function LikeButton({ myid, card, onCardLike }) {
    const [isLike, setIsLike] = useState(false)
    useEffect(() => {
        setIsLike(card.likes.some(element => myid === element))
    }, [card, myid])

    return (
        <>
            <button onClick={() => onCardLike(card)} className={`group__like ${isLike ? "group__like_active" : " "}`} type="button" />
            <div className="group__likes-counter">{card.likes.length}</div>
        </>
    )
}