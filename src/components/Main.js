import pencilImg from "../images/profile-edit.png";
import pencilImgLarge from "../images/pencil-large.png";
import addImg from "../images/addimg.png";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Card from "./Card";
import { useState, useEffect } from "react";
import { api } from "../utils/api";

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInformation()
    .then((data) => {
      setUserName(data.name);
      setUserDescription(data.about);
      setUserAvatar(data.avatar)
    });

    api.getCards()
    .then((data) => {
      setCards(data);
    })
  }, [])
  return (
    <main className="main">
      <section className="profile">
        <div className="profile-pic" onClick={props.onEditAvatarClick}>
          <img src={userAvatar} alt="Profile" className="profile__picture" />
          <div className="profile-pic__content">
            <img
              src={pencilImgLarge}
              alt="edit profile pencil"
              className="profile-pic__pencil-img"
            />
          </div>
        </div>
        <div className="profile-info">
          <div className="profile-info__name-edit-container">
            <h1 className="profile-info__name">{userName}</h1>
            <button
              className="profile-info__edit-button"
              type="button"
              onClick={props.onEditProfileClick}
            >
              <img
                src={pencilImg}
                alt="edit profile pencil"
                className="profile-info__pencil-img"
              />
            </button>
          </div>
          <p className="profile-info__about">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlaceClick}
        >
          <img src={addImg} alt="add" className="profile__add-img" />
        </button>
      </section>
      <section className="elements">
        {cards.map((cardData) => (
          <Card card={cardData} key={cardData._id} onCardClick={props.onCardClick}/>
        ))}
        {/* <!-- Element template -->
        <template id="element-template">
          <article className="element">
            <form>
              <div style={{ position: "relative" }}>
                <img className="element__image" alt="card" />
                <button type="button" className="element__delete-button">
                  <img
                    src={trashImg}
                    alt="trash icon"
                    className="element__trash-image"
                  />
                </button>
              </div>
              <div className="element__description">
                <h2 className="element__title">Title</h2>
                <div className="element__like-container">
                  <button type="button" className="element__like-button">
                    <img
                      src={likeImg}
                      alt="Tombol Like"
                      className="element__like-img"
                    />
                  </button>
                  <span className="element__like-counter">1</span>
                </div>
              </div>
            </form>
          </article>
        </template>
        <!-- Element template --> */}
      </section>

      {/* Popup for Edit Profile */}
      <PopupWithForm
        name="edit-profile"
        title="Edit Profil"
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.onClose}
      >
        <label className="popup__field">
          <input
            name="input-name"
            id="name-input"
            type="text"
            className="popup__input popup__input-name"
            placeholder="Nama"
            required
            minLength="2"
            maxLength="400"
          />
          <span className="name-input-error"></span>
        </label>
        <label className="popup__field">
          <input
            name="input-about"
            id="about-input"
            type="text"
            className="popup__input popup__input-about"
            placeholder="Tentang Diriku"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="about-input-error"></span>
        </label>
      </PopupWithForm>

      {/* Popup for Profile Picture */}
      <PopupWithForm
        name="edit-avatar"
        title="Ubah foto profil"
        isOpen={props.isEditAvatarPopupOpen}
        onClose={props.onClose}
      >
        <label className="popup__field">
          <input
            type="url"
            className="popup__input popup-prof-pic__input"
            id="profpic-input-url"
          />
          <span className="profpic-input-url-error"></span>
        </label>
      </PopupWithForm>

      {/* Popup for Add Place */}
      <PopupWithForm
        name="add-place"
        title="Tempat Baru"
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.onClose}
      >
        <label className="popup__field">
          <input
            name="input-title"
            id="title-input"
            type="text"
            className="popup__input popup__input-title"
            placeholder="Judul:"
            required
            aria-invalid="true"
            minLength="2"
            maxLength="30"
          />
          <span className="title-input-error"></span>
        </label>
        <label className="popup__field">
          <input
            name="input-url"
            id="url-input"
            type="url"
            className="popup__input popup__input-url"
            placeholder="URL Gambar"
            required
          />
          <span className="url-input-error"></span>
        </label>
      </PopupWithForm>

      {/* Image Popup */}
      <ImagePopup selectedCard={props.selectedCard} isOpen={props.isImagePopupOpen} onClose={props.onClose}/>

      {/* <!-- Popup box for Edit Profile -->
      <div className={`popup popup-edit ${isEditProfileOpened ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <h2 className="popup__title">Edit profil</h2>
          <form className="popup__form" name="popup__edit-profile-form">
            <fieldset className="popup__set">
              <label className="popup__field">
                <input
                  name="input-name"
                  id="name-input"
                  type="text"
                  className="popup__input popup__input-name"
                  placeholder="Nama"
                  required
                  minLength="2"
                  maxLength="400"
                />
                <span className="name-input-error"></span>
              </label>
              <label className="popup__field">
                <input
                  name="input-about"
                  id="about-input"
                  type="text"
                  className="popup__input popup__input-about"
                  placeholder="Tentang Diriku"
                  required
                  minLength="2"
                  maxLength="200"
                />
                <span className="about-input-error"></span>
              </label>
              <button
                name="simpan-button"
                className="popup__save popup__save_disabled"
                type="submit"
              >
                Simpan
              </button>
              <button className="popup__close" type="button" onClick={handleEditProfileClick}>
                <img
                  src={closeImg}
                  alt="icon tutup"
                  className="popup__close-img"
                />
              </button>
            </fieldset>
          </form>
        </div>
      </div>

      <!-- Popup to add new Place -->
      <div className={`popup popup-add ${isAddPlaceOpened ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <h2 className="popup__title">Tempat Baru</h2>
          <form className="popup__form" name="popup__add-card-form">
            <fieldset className="popup__set">
              <label className="popup__field">
                <input
                  name="input-title"
                  id="title-input"
                  type="text"
                  className="popup__input popup__input-title"
                  placeholder="Judul:"
                  required
                  aria-invalid="true"
                  minLength="2"
                  maxLength="30"
                />
                <span className="title-input-error"></span>
              </label>
              <label className="popup__field">
                <input
                  name="input-url"
                  id="url-input"
                  type="url"
                  className="popup__input popup__input-url"
                  placeholder="URL Gambar"
                  required
                />
                <span className="url-input-error"></span>
              </label>
              <button
                name="simpan-button"
                className="popup__save popup__save_disabled"
                type="submit"
              >
                Simpan
              </button>
              <button className="popup__close" type="button" onClick={handleAddPlaceClick}>
                <img
                  src={closeImg}
                  alt="icon tutup"
                  className="popup__close-img"
                />
              </button>
            </fieldset>
          </form>
        </div>
      </div>

      <!-- Confirm Delete Card Popup -->
      <div className="popup popup-delete">
        <div className="popup__container">
          <h2 className="popup__title popup-delete__title">
            Apakah Anda Yakin?
          </h2>
          <button className="popup__save">Ya</button>
          <button className="popup__close" type="button">
            <img src={closeImg} alt="icon tutup" className="popup__close-img" />
          </button>
        </div>
      </div>

      <!-- Edit Profile Picture Popup -->
      <div
        className={`popup popup-prof-pic ${
          isEditAvatarOpened ? "popup_opened" : ""
        }`}
      >
        <div className="popup__container">
          <h2 className="popup__title">Ubah foto profil</h2>
          <form className="popup__form">
            <fieldset className="popup__set">
              <label className="popup__field">
                <input
                  type="url"
                  className="popup__input popup-prof-pic__input"
                  id="profpic-input-url"
                />
                <span className="profpic-input-url-error"></span>
              </label>
              <button className="popup__save popup__save_disabled">
                Simpan
              </button>
              <button className="popup__close" type="button" onClick={handleEditAvatarClick}>
                <img
                  src={closeImg}
                  alt="icon tutup"
                  className="popup__close-img"
                />
              </button>
            </fieldset>
          </form>
        </div>
      </div> */}
    </main>
  );
}

export default Main;
