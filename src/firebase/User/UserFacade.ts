import authenticationUser from "./Functions/authenticationUser";
import deleteUser from "./Functions/deleteUser";
import getUser from "./Functions/getUser";
import getUsers from "./Functions/getUsers";
import registrationUser from "./Functions/registrationUser";



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
        return null;
    }
    /**
     * Get all users from the users collection
     * @returns {Promise<User[]>} Returns an array of users
    */
    public static async Users() { 
        const userId = localStorage.getItem(this._localStorageName);
        if( userId !== null ) return await getUsers(userId) 
        return await getUsers()
    }

    /**
     * Sign out the current user
     * @returns {void}
    */
    public static SignOut() {
        localStorage.removeItem(this._localStorageName);
    }

    /**
     * User registration function.
     * Registration of a new user in the system, including creation of an account with a password.
     */
    public static async Registration(firstname: string, lastname: string, email: string, password: string ) { 
        const iduser = await registrationUser(firstname, lastname, email, password);
        if( iduser != null )
            localStorage.setItem(this._localStorageName, iduser);
        return iduser;
    }
    /**
     * Add a new user to the system.
     * This function is similar to Registration but does not store the user ID 
     * in localStorage, it only returns the user ID.
    */ 
    public static async AddNew(firstname: string, lastname: string, email: string, password: string ) { 
        const iduser = await registrationUser(firstname, lastname, email, password);
        return iduser;
    }
    /**
     * User authentication function.
     * This function checks if the user exists in the system and validates their 
     * credentials. If successful, it stores the user's ID in the localStorage 
     * for future use.
    */ 
    public static async Authentication(email: string, password: string) {
        const iduser = await authenticationUser(email, password);
        if( iduser != null )
            localStorage.setItem(this._localStorageName, iduser);
        return iduser;
    }

    public static async Delete(id: string) {
        try {
            await deleteUser(id);
            return true;
        } catch {
            return false;
        }
    }
}