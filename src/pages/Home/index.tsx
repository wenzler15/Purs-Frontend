import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import NavBar from "../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import Modal from "react-modal";
import TextButton from "../../Components/Button";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px",
    padding: "20px",
    textAlign: "center",
    borderRadius: 15,
  },
};

const Home: React.FC = () => {
  const { userData } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkTemporaryPassword();
  }, []);

  const checkTemporaryPassword = () => {
    const isTemporary = userData?.tempPassword;
    if (isTemporary === 1) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const redirectToProfile = () => {
    navigate("/profile");
    closeModal();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/6">
        <NavBar path="Home" />
      </div>
      <div className="w-full">
        <Header text="Início" />
        <div className="w-full bg-gradient-to-b from-[#8B95CE] to-[#DBF4FA] h-full pt-10 pl-4 pr-4 box-border">
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={customModalStyles}
            contentLabel="Alterar senha"
          >
            <p>Sua senha é temporária. Por favor, atualize ela no perfil.</p>
            <TextButton
              text="Ir para perfil"
              onClick={redirectToProfile}
              style={{ marginTop: "40px" }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Home;
