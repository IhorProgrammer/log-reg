import { query, collection, where, getDocs, doc, getDoc, DocumentData } from "firebase/firestore";
import { database } from "../../firebase";  // Путь к вашей конфигурации Firebase
import { Role, User } from "../UserFacade";  // Импорт ваших интерфейсов

/**
    * Get user by id from Firestore with filtering
    * @returns {Promise<User | null>} User or null if not found
*/
const getUser = async (userId: string): Promise<User | null> => {
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
  } as User;

  return userReturn; 
};

async function getRoleByDocumentData (documentData: DocumentData): Promise<Role> {
    const roleRefPath = documentData.role?._key?.path?.segments.slice(5).join("/"); // Получение пути к роли

    // Get role info
    let roleData: Role = { id: "", read: false, edit: false, delete: false, add: false };
    if (roleRefPath) {
      const roleRef = doc(database, roleRefPath);
      const roleSnap = await getDoc(roleRef);
      if (roleSnap.exists()) {
        const roleDoc = roleSnap.data();
        roleData = {
          id: roleSnap.id,
          read: roleDoc.read || false,
          edit: roleDoc.edit || false,
          delete: roleDoc.delete || false,
          add: roleDoc.add || false,
        };
      }
    }
    return roleData;
}

export default getUser;
