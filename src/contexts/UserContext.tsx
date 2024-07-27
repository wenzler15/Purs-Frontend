import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface UserData {
  name: string;
  companyLogo: string;
  responsible: number;
  tempPassword: number;
  cpf: string;
  email: string;
  city: string;
  phone: string;
  state: string;
  street: string;
  zipCode: string;
  neighborhood: string;
  houseNumber: number;
  password?: string;
  complement: string;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  updateUser: (newUserData: UserData) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem('pursToken');
        const resp = await api.get('/users/getOne', {
          headers: {
            Authorization: token,
          },
        });
        setUserData(resp.data);
      } catch (error) {
      }
    };

    getUserData();
  }, []);

  const updateUser = async (newUserData: UserData) => {
    try {
      const token = localStorage.getItem('pursToken');

      if(newUserData.password  === "") {
        delete newUserData.password;
      } else {  
        newUserData.tempPassword = 0;
      }
      
      const resp = await api.patch('/users', newUserData, {
        headers: {
          Authorization: token,
        },
      });

      setUserData(resp.data);
    } catch (error) {
      throw new Error('Erro ao atualizar dados do usuário. Tente novamente.');
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext deve ser usado dentro de um UserProvider');
  }
  return context;
};
