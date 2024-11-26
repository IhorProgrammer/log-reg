import { query, collection, where, getDocs } from "firebase/firestore";
import { database } from "../../firebase";  // Путь к вашей конфигурации Firebase
import SHA256Hash from "../../../Services/Hash/SHA256Hash";

/**
 * User login function.
 * Verifies user credentials (email and password).
 *
 * @param email - The email provided by the user.
 * @param password - The password provided by the user.
 *
 * @returns {Promise< null | number >} Returns a promise that resolves to `number` if login is successful, `null` if credentials are invalid.
 *
 * @throws {Error} If an error occurs during the login process, e.g., if the user does not exist.
 */
async function authenticationUser(email: string, password: string): Promise<null | string> {
    try {
        const userQuery = query(collection(database, "users"), where("email", "==", email));
        const snapshot = await getDocs(userQuery);

        if (snapshot.empty) {
            console.error("User not found.");
            return null;
        }

        const docSnapshot = snapshot.docs[0];
        const userData = docSnapshot.data();

        const hashedPassword = SHA256Hash(userData.salt + password);

        if (hashedPassword === userData.dk) {
            return docSnapshot.id; 
        } else {
            return null;
        }

    } catch (error) {
        console.error("Error authentication: ", error);
        return null;
    }
}

export default authenticationUser;
