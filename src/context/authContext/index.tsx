import React, { ReactNode, useContext, useEffect, useState } from "react";
import UserFacade from "../../firebase/User/UserFacade";
import UserDTO from "../../firebase/User/DTO/UserDTO";


interface UseAuthReturn {
  currentUser: UserDTO | null;
  userLoggedIn: boolean;
  loading: boolean;
  signOut: () => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<null | UserDTO>>;
  registrationUser: (firstname: string, lastname: string, email: string, password: string) => void;
  authenticationUser: (email: string, password: string) => void;
  users: UserDTO[] | null;
  addUserAsync: (firstname: string, lastname: string, email: string, password: string) => Promise<string | undefined>;
  updateUsers: () => void;
  deleteUser: (id: string) => void;
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
  children: ReactNode; 
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<UserDTO | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers ] = useState<UserDTO[] | null >(null);

 
  const fetchUser = async () => { 
    const user = await UserFacade.User();
    await initializeUser(user);
  }

  useEffect(() => {
    fetchUser();
  }, []);

 

  async function initializeUser(user: UserDTO | null ) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  function registrationUser(firstname: string, lastname: string, email: string, password: string) {
    setLoading(true);
    UserFacade.Registration(firstname, lastname, email, password).then( userid => {
      if(userid === null) {
        setCurrentUser(null);   
      }
      fetchUser();
    })
  }

  async function addUserAsync(firstname: string, lastname: string, email: string, password: string) {
    setLoading(true);
    const userId = UserFacade.AddNew(firstname, lastname, email, password)
    setLoading(false);
    return userId;      
  }

  function authenticationUser(email: string, password: string) {
    setLoading(true);
    UserFacade.Authentication(email, password).then( userid => {
      if(userid === null) {
        setCurrentUser(null);   
      }
      fetchUser();
    })
  }

  function signOut() {
    UserFacade.SignOut();  // Call the SignOut method from UserFacade
    setCurrentUser(null);   // Reset current user
    setUserLoggedIn(false); // Update logged-in status
  }


  async function updateUsers() {
    setLoading(true);
    UserFacade.Users()
      .then(us => setUsers(us))
      .finally(() => setLoading(false));
  }

  function deleteUser(id: string) {
    setLoading(true);
    UserFacade.Delete(id).then(() => {
      updateUsers();
    }).finally(() => {
      setLoading(false)
    });
  }
  

  const value: UseAuthReturn = {
    userLoggedIn,
    currentUser,
    loading,
    setCurrentUser,
    registrationUser,
    authenticationUser,
    users,
    updateUsers,
    signOut,
    deleteUser,
    addUserAsync
  };

  

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}