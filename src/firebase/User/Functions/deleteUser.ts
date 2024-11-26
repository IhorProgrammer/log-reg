import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../../firebase";

/**
 * User deletion function.
 * This function deletes a user from the Firestore database by their ID.
 *
 * @param userId - The ID of the user to be deleted.
 *
 * @returns {Promise<void>} Returns a promise that resolves when the deletion is complete.
 *
 * @throws {Error} In case of errors during deletion, for example, if the user with such ID does not exist.
 */
async function deleteUser(userId: string): Promise<void> {
    try {
        const userRef = doc(database, "users", userId);
        await deleteDoc(userRef);
    } catch (error) {
        throw new Error("Failed to delete user.");
    }
}

export default deleteUser;