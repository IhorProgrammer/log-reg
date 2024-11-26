import { query, collection, getDocs, where } from "firebase/firestore";
import { database } from "../../firebase";  
import UserDTO from "../DTO/UserDTO";
import getAllRoles from "./getAllRoles";


/**
 * Get all users from Firestore with filtering, excluding the user with the provided ID.
 * If no ID is provided, fetch all users.
 * @param excludeUserId - ID of the user to exclude from the result (optional).
 * @returns {Promise<UserDTO[]>} Array of UserDTO objects excluding the user with the given ID, or all users if no ID is provided.
 */
const getUsers = async (excludeUserId?: string): Promise<UserDTO[]> => {
  const users: UserDTO[] = [];

  const roles = await getAllRoles();

  let usersQuery = query(collection(database, "users"));

  // Apply filtering if an ID is provided
  if (excludeUserId) {
    usersQuery = query(usersQuery, where("__name__", "!=", excludeUserId));
  }

  const snapshot = await getDocs(usersQuery);

  if (snapshot.empty) {
    console.error("No users found");
    return users;  
  }

  for (const docSnapshot of snapshot.docs) {
    const userData = docSnapshot.data();

    const userRole = roles.find(role => role.id === userData.role?.id); 

    const userReturn: UserDTO = {
      id: docSnapshot.id,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      role: userRole || undefined,  
    };


    users.push(userReturn);
  }

  return users;  
};

export default getUsers;
