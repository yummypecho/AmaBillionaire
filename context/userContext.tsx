import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  showName: boolean;
  billions: string;
  showBillions: boolean;
  currency: string;
};

type UserContextType = {
  user: User;
  setUser: (u: User) => void;
  loading: boolean; // optional loading state
};

const STORAGE_KEY = "user_data";

const defaultUser: User = {
  id: -1,
  name: "",
  showName: false,
  billions: "0",
  showBillions: false,
  currency: "USD",
};

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
  loading: true,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User>(defaultUser);
  const [loading, setLoading] = useState(true);

  // Load user from AsyncStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed: User = JSON.parse(saved);
          setUserState(parsed);
        } else {
          // First time user: assign random ID between 1-67
          const randId = Math.floor(Math.random() * 67) + 1;
          const initialUser: User = { ...defaultUser, id: randId };
          setUserState(initialUser);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialUser));
        }
      } catch (err) {
        console.error("Failed to load user from storage:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Save user to AsyncStorage whenever it changes
  useEffect(() => {
    if (user.id === -1) return; // don't save default placeholder
    const saveUser = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch (err) {
        console.error("Failed to save user to storage:", err);
      }
    };
    saveUser();
  }, [user]);

  const setUser = (u: User) => {
    setUserState(u);
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
