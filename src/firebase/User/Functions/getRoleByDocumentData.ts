import { doc, DocumentData, getDoc } from "firebase/firestore";
import RoleDTO from "../DTO/RoleDTO";
import { database } from "../../firebase";

async function getRoleByDocumentData(documentData: DocumentData): Promise<RoleDTO> {
    const roleRefPath = documentData.role?._key?.path?.segments.slice(5).join("/");  // Получение пути к роли

    // Получение данных о роли
    let roleData: RoleDTO = { id: "", read: false, edit: false, delete: false, add: false };
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

export default getRoleByDocumentData;