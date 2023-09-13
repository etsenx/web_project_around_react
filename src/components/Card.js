import trashImg from "../images/trash-solid.svg";
import likeImg from "../images/like.svg";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <article className="element">
      <form>
        <div style={{ position: "relative" }}>
          <img className="element__image" alt="card" src={props.card.link} onClick={handleClick} />
          <button type="button" className="element__delete-button">
            <img
              src={trashImg}
              alt="trash icon"
              className="element__trash-image"
            />
          </button>
        </div>
        <div className="element__description">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-container">
            <button type="button" className="element__like-button">
              <img
                src={likeImg}
                alt="Tombol Like"
                className="element__like-img"
              />
            </button>
            <span className="element__like-counter">{props.card.likes.length}</span>
          </div>
        </div>
      </form>
    </article>
  );
}

export default Card;
