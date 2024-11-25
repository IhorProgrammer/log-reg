import { FC, FormEvent, useState } from 'react';
import Container from '@mui/material/Container';
import Background from '../../Components/Background/Background';
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import "./RegistrationPage.scss"

import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'; 
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth'; 
import { updateProfile } from "firebase/auth";

interface RegistrationPageProps {}

const RegistrationPage: FC<RegistrationPageProps> = () => {
   const [firstname, setFirstname] = useState('')
   const [lastname, setLastname] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [isRegistering, setIsRegistering] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   
   const { userLoggedIn } = useAuth() 

   const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
       setter(e.target.value)
   }

   const onSubmit = async (e: FormEvent) => {
      e.preventDefault()

      if(!isRegistering) {
         setIsRegistering(true)
         try {
            const userCredential = await doCreateUserWithEmailAndPassword(email, password);

            // Оновлюємо профіль користувача (firstname та lastname)
            await updateProfile(userCredential.user, {
              displayName: `${firstname} ${lastname}`,
            });
         }
         catch( e: any ) {
            setErrorMessage(e.message);
         }
      }
      else {

         // Reg filed check
         if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.')
            return
         }
      }
   }

   return (
      <>
         <Background />

         <Container fixed className="RegistrationPage">
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            
            <form className="modal-container" onSubmit={onSubmit} autoComplete="on">
               <h1>Sign Up</h1>
               
               {/* First name */}
               <FormControl className="input-container" error={!!errorMessage}>
                  <InputLabel htmlFor="email">Firstname</InputLabel>
                  <Input
                     id="firstname"
                     value={firstname}
                     onChange={handleInputChange(setFirstname)}
                     aria-describedby="email-helper-text"
                     type="firstname"
                     className="input"
                     required
                  />
               </FormControl>

               {/* Last name */}
               <FormControl className="input-container" error={!!errorMessage}>
                  <InputLabel htmlFor="lastname">Lastname</InputLabel>
                  <Input
                     id="lastname"
                     value={lastname}
                     onChange={handleInputChange(setLastname)}
                     aria-describedby="Lastname-helper-text"
                     type="text"
                     className="input"
                     required
                  />
               </FormControl>

               {/* Email Field */}
               <FormControl className="input-container" error={!!errorMessage}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                     id="email"
                     value={email}
                     onChange={handleInputChange(setEmail)}
                     aria-describedby="email-helper-text"
                     type="email"
                     className="input"
                     required
                  />
               </FormControl>

               {/* Password Field */}
               <FormControl className="input-container" error={!!errorMessage}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                     id="password"
                     value={password}
                     onChange={handleInputChange(setPassword)}
                     aria-describedby="password-helper-text"
                     type="password"
                     className="input"
                     required
                  />
               </FormControl>

               {/* Confirm Password Field */}
               <FormControl className="input-container" error={!!errorMessage}>
                  <InputLabel htmlFor="confirmPassword ">Confirm Password</InputLabel>
                  <Input
                     id="confirmPassword"
                     value={confirmPassword}
                     onChange={handleInputChange(setConfirmPassword)}
                     aria-describedby="confirmPassword-helper-text"
                     type="password"
                     className="input"
                     required
                  />
               </FormControl>
               <Link
                  to={"/auth"}
                  className="link-sign"
               >
                  Sing in
               </Link>
               <FormHelperText className="error-message">{errorMessage}</FormHelperText>
               
               {/* Submit Button */}
               <Button type="submit" disabled={isRegistering}>
                  {isRegistering ? 'Registering...' : 'Register'}
               </Button>
            </form>
         </Container>
      </>
   )
}


export default RegistrationPage;
