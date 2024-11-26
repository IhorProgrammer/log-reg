import { DocumentReference } from "firebase/firestore";

export default interface UserDAO {
    firstname: string;
    lastname: string;
    email: string;
    dk: string;
    salt: string;
    role: DocumentReference; // Ссылка на документ роли
}