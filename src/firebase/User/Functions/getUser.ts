import { query, collection, where, getDocs, doc, getDoc, DocumentData } from "firebase/firestore";
import { database } from "../../firebase";  
import UserDTO from "../DTO/UserDTO";
import RoleDTO from "../DTO/RoleDTO";
import getRoleByDocumentData from "./getRoleByDocumentData";

/**
    * Get user by id from Firestore with filtering
    * @returns {Promise<User | null>} User or null if not found
*/
const getUser = async (userId: string): Promise<UserDTO | null> => {
  if (!userId) {
    console.error("User ID not found in localStorage");
    return null; // Возвращаем null, если id нет в localStorage
  }

  // Find user by id
  const userQuery = query(collection(database, "users"), where("__name__", "==", userId));
  const snapshot = await getDocs(userQuery);

  if (snapshot.empty) {
    console.error("User not found");
    return null; 
  }

  // Get user info
  const docSnapshot = snapshot.docs[0]; 
  const userData = docSnapshot.data();

  //Result
  const userReturn = {
    id: docSnapshot.id,
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    role: await getRoleByDocumentData( userData ),
  } as UserDTO;

  return userReturn; 
};


export default getUser;
