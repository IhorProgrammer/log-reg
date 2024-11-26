import { FC } from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import UserDTO from "../../firebase/User/DTO/UserDTO";

interface HomePageProps
{ 

}

const HomePage: FC<HomePageProps> = ( props ) => {
    const user = useAuth();
    const userData: UserDTO | null = user.currentUser;

    return (
        <main>
            {
                userData === null
                ?
                <Link to={"/auth"}>
                    <h1>Sing In</h1>
                </Link>
                :
                <>
                    <h1>ID: {userData.id}</h1>
                    <h1>DisplayName: {`${userData.firstname} ${userData.lastname}`  }</h1>
                    <h1>Email: {userData.email}</h1>
                    
                    <h1>CanRead: {userData.role?.read ? "Yes": "No"}</h1>
                    <h1>CanEdit: {userData.role?.edit ? "Yes": "No"}</h1>
                    <h1>CanDelete: {userData.role?.delete ? "Yes": "No"}</h1>
                    <h1>CanAdd: {userData.role?.add ? "Yes": "No"}</h1>

                    <Button variant="outlined" color="error" onClick={user.signOut}>
                        SignOut
                    </Button>
                </>
            }
        </main>
    );
}

export default HomePage;