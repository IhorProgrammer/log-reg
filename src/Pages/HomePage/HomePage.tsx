import { FC } from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { Button } from "@mui/material";

interface HomePageProps
{ 

}

const HomePage: FC<HomePageProps> = ( props ) => {
    const user = useAuth();
    const userData = user != null ? user.currentUser : null;

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
                    <h1>UID: {userData.uid}</h1>
                    <h1>Email: {userData.email}</h1>
                    <h1>Email verified: {userData.emailVerified}</h1>
                    <Button variant="outlined" color="error" onClick={doSignOut}>
                        SignOut
                    </Button>
                </>
            }
        </main>
    );
}

export default HomePage;