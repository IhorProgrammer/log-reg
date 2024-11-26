import RoleDTO from "./RoleDTO";

export default interface UserDTO {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    role?: RoleDTO;
}
  