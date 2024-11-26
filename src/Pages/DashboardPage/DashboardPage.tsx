import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, TableFooter, Container, Theme, useTheme, Button, Box } from '@mui/material';
import UserDTO from '../../firebase/User/DTO/UserDTO';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TableAddUserRow from '../../Components/TableAddUserRow';

const DashboardPage = () => {
    const { currentUser, updateUsers, users, loading, addUserAsync, deleteUser  } = useAuth();
    const userData: UserDTO | null = currentUser;
    const theme = useTheme<Theme>(); 
    const [ isAddUser, setIsAddUser ] = useState(false);

    useEffect(() => {
        if( users === null && loading === false) {
            updateUsers();
        }
    },[])

    const handleAddUser = (firstName: string, lastName: string, email: string, password: string) => {
        addUserAsync(firstName, lastName, email, password).then( (userId) => {
            if( userId ) {
                alert("User added");
                updateUsers();
                setIsAddUser(false);
            }
            else {
                alert( "User not added" );
            }
        })
    }



  return (
    <Container  sx={{
        backgroundColor: theme.palette.mode === "dark" ? "grey.900" : "grey.100",
        color: theme.palette.mode === "dark" ? "white" : "black",
        padding: 2,
        marginTop: 10,
    }}>
        { userData !== null && userData.role?.read !== true &&  (<Navigate to={'/home'} replace={true} />)}
        <TableContainer>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>Firstname</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>Email</TableCell>
                {
                    isAddUser 
                    &&
                    <TableCell>Password</TableCell>
                }
                {userData?.role?.edit && <TableCell>Add</TableCell>}
                {userData?.role?.edit && <TableCell>Edit</TableCell>}
                {userData?.role?.edit && <TableCell>Delete</TableCell>}
                {userData?.role?.delete && <TableCell>Remove</TableCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                { users !== null && users.map((user: UserDTO) => (
                <TableRow key={user.id}>
                    <TableCell>{user.firstname}</TableCell>
                    <TableCell>{user.lastname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    {
                        isAddUser 
                        &&
                        <TableCell>********</TableCell>
                    }
                    {userData?.role?.edit && (
                        <>
                        <TableCell>
                            <Checkbox disabled={true} checked={user.role?.add}  />
                        </TableCell>
                        <TableCell>
                            <Checkbox disabled={true} checked={user.role?.edit}  />
                        </TableCell>
                        <TableCell>
                            <Checkbox disabled={true} checked={user.role?.delete}  />
                        </TableCell>
                        </>
                    )}
                    {userData?.role?.delete && (
                        <TableCell>
                            <IconButton onClick={() => deleteUser(user.id)} >
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    )}
                </TableRow>
                ))}
                <TableAddUserRow view={isAddUser} onSubmit={handleAddUser}/>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>
                        {
                            (userData?.role?.add !== undefined && userData?.role?.add && !isAddUser) && (
                                <Button 
                                    variant="contained"
                                    color="secondary"
                                    sx={{ margin: '16px 0' }}
                                    onClick={() => setIsAddUser(true)}
                                    startIcon={<AddIcon />} // Directly add the icon here
                                >
                                    Add User
                                </Button>
                            )
                        }
                    </TableCell>
                </TableRow>
            </TableFooter>
            </Table>
        </TableContainer>
    </Container>
  );
};

export default React.memo(DashboardPage);
