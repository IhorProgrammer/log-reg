import React, { ReactNode, useContext, useEffect, useState } from "react";
import UserFacade, { User } from "../../firebase/User/UserFacade";


interface UseAuthReturn {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
  signOut: () => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<null | User>>;
}

const AuthContext = React.createContext<UseAuthReturn | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context as UseAuthReturn;
}



interface AuthProviderProps {
  children: ReactNode; // Children can be any valid React element
}

  export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => { 
      const user = await UserFacade.User();
      await initializeUser(user);
    }
    fetchUser();
  }, []);

  async function initializeUser(user: User | null ) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }

  function signOut() {
    UserFacade.SignOut();  // Call the SignOut method from UserFacade
    setCurrentUser(null);   // Reset current user
    setUserLoggedIn(false); // Update logged-in status
  }

  const value: UseAuthReturn = {
    userLoggedIn,
    currentUser,
    loading,
    setCurrentUser,
    signOut,
  };

  

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}