import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();

  useEffect(() => {
    api.getUserInformation().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className="App">
      <div className="page">
        <Header />
        <CurrentUserContext.Provider value={currentUser}>
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            selectedCard={selectedCard}
            onClose={closeAllPopups}
          />
          {/* Popup for Edit Profile */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />

          {/* Popup for Profile Picture */}
          <PopupWithForm
            name="edit-avatar"
            title="Ubah foto profil"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
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
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
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
          <ImagePopup
            selectedCard={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
        <Footer />
      </div>
    </div>
  );
}

export default App;
