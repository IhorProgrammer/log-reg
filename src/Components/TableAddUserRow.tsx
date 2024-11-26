import { IconButton, TableCell, TableRow, TextField } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { MouseEvent, useState } from "react";

interface TableAddUserRowProps {
    view: boolean;
    onSubmit: (firstName: string, lastName: string, email: string, password: string) => void;
}
const TableAddUserRow: React.FC<TableAddUserRowProps> = ( { view, onSubmit } ) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleAddUser = (e: MouseEvent) => {
        e.preventDefault();
        onSubmit(firstName, lastName, email, password); 
    };
    
    if (!view) {
        return null;
    }
    return (
        <TableRow>
           <TableCell>
                <TextField
                label="First Name"
                variant="outlined"
                size="small"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            /></TableCell>
            <TableCell>
                <TextField
                label="Last Name"
                variant="outlined"
                size="small"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            /></TableCell>
            <TableCell>
                <TextField
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /></TableCell>
             <TableCell>
                <TextField
                label="Password"
                variant="outlined"
                size="small"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell onClick={handleAddUser}>
                <IconButton >
                    <CheckIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default TableAddUserRow;