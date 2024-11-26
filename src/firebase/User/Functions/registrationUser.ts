import { addDoc, collection, doc } from "firebase/firestore";
import { database } from "../../firebase";
import UserDAO from "../DAO/UserDAO";
import generateSalt from "../../../Services/Salt/generateSalt";
import SHA256Hash from "../../../Services/Hash/SHA256Hash";

/**
 * User registration function.
 * Registration of a new user in the system, including creation of an account with a password.
 *
 * @param firstname - Username.
 * @param lastname - Last name of the user.
 * @param email - User's email used for login.
 * @param password - The user's password for accessing the account.
 *
 * @returns {Promise<void>} Returns a promise that resolves when registration is complete.
 *
 * @throws {Error} In case of errors during registration, for example, if a user with such email already exists.
 */
async function registrationUser(firstname: string, lastname: string, email: string, password: string ) {
    try {
        const roleRef = doc(database, "roles", "default");
        const salt = generateSalt();
        const hash = SHA256Hash( salt + password );
        const newUser: UserDAO = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            dk: hash,
            salt: salt,
            role: roleRef,
        };

        const usersCollectionRef = collection(database, "users");
    
        const docRef = await addDoc(usersCollectionRef, newUser); 
        console.log("Document written with ID: ", docRef.id);
    
        return docRef.id; 
      } catch (error) {
        console.error("Error adding user: ", error);
      }
}


export default registrationUser;