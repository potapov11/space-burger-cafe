import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import { clearModalIngredient } from "../../services/actions/modal-ingredient-action";
import HomePage from "../../pages/Home/Home";
import LoginPage from "../../pages/Login/Login";
import RegisterPage from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import ProfilePage from "../../pages/Profile/ProfilePage";
import AppHeader from "../AppHeader/AppHeader";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { fetchUserData, fetchServerData } from "../../services/actions/data-action";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isModalOrderOpen, setModalOrderOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchServerData());
  }, [dispatch]);

  const closeModal = () => {
    navigate(-1);
    dispatch(clearModalIngredient());
    setModalOrderOpen(false);
    setModalOpen(false);
  };

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage closeModal={closeModal} isModalOpen={isModalOpen} isModalOrderOpen={isModalOrderOpen} setModalOrderOpen={setModalOrderOpen} />} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
        <Route path="/ingredients/:id" element={<IngredientDetails styleCenter={true} />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
