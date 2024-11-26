import { collection, getDocs, query } from "firebase/firestore";
import RoleDTO from "../DTO/RoleDTO";
import { database } from "../../firebase";

/**
 * Get all roles from Firestore.
 * @returns {Promise<RoleDTO[]>} Array of RoleDTO objects.
 */
const getAllRoles = async (): Promise<RoleDTO[]> => {
    const roles: RoleDTO[] = [];
    const rolesQuery = query(collection(database, "roles"));
    const snapshot = await getDocs(rolesQuery);
  
    if (snapshot.empty) {
      console.error("No roles found");
      return roles;
    }
  
    snapshot.docs.forEach(docSnapshot => {
      const roleData = docSnapshot.data();
      const role: RoleDTO = {
        id: docSnapshot.id,
        read: roleData.read || false,
        edit: roleData.edit || false,
        delete: roleData.delete || false,
        add: roleData.add || false,
      };
      roles.push(role);
    });
  
    return roles;
};
  
export default getAllRoles;