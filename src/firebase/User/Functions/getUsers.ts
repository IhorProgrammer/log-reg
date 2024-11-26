import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase"; 

/**
 * Get all users from the users collection
 * @returns {Promise<User[]>} Returns an array of users
 */
const getUsers = async () => {
  const usersCollection = collection(database, "users");

  const snapshot = await getDocs(usersCollection);

  if (snapshot.empty) {
    console.warn("No users found");
    return [];
  }

  const users = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return users;
};

export default getUsers;