import getUser from "./Functions/getUser";
import getUsers from "./Functions/getUsers";

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: Role;
}
  
export interface Role {
    id: string;
    read: boolean;
    edit: boolean;
    delete: boolean;
    add: boolean;
}
/**
 * Facade for interacting with the user management system
 * This class simplifies access to user-related operations.
 */
export default class UserFacade {

    private static _localStorageName: string = "iduser";

    /**
     * Fetch the currently authenticated user.
     * @returns {Promise<User | null>} The authenticated user's data or null if no user is signed in.
    */
    public static async User() { 
        const userId = localStorage.getItem(this._localStorageName);
        if( userId !== null ) return await getUser(userId) 
        else return null;
    }
    /**
     * Get all users from the users collection
     * @returns {Promise<User[]>} Returns an array of users
    */
    public static async Users() { 
        return await getUsers()
    }

    /**
     * Sign out the current user
     * @returns {void}
    */
    public static SignOut() {
        localStorage.removeItem(this._localStorageName);
    }
}