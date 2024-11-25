import { FC, FormEvent, useState } from 'react';
import Container from '@mui/material/Container';
import Background from '../../Components/Background/Background';
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import "./RegistrationPage.scss"

import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'; 
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth'; 

interface RegistrationPageProps {}

const RegistrationPage: FC<RegistrationPageProps> = () => {
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
         await doCreateUserWithEmailAndPassword(email, password)
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
            
            <form className="modal-container" onSubmit={onSubmit}>
               <h1>Sign Up</h1>
               
               {/* Email Field */}
               <FormControl className="input-container" error={!!errorMessage}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                     id="email"
                     value={email}
                     onChange={handleInputChange(setEmail)}
                     aria-describedby="email-helper-text"
                     type="email"
                     required
                  />
                  <FormHelperText id="email-helper-text">{errorMessage}</FormHelperText>
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
                     required
                  />
                  <FormHelperText id="password-helper-text">Password should be at least 6 characters</FormHelperText>
               </FormControl>

               {/* Confirm Password Field */}
               <FormControl className="input-container" error={!!errorMessage}>
                  <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                  <Input
                     id="confirmPassword"
                     value={confirmPassword}
                     onChange={handleInputChange(setConfirmPassword)}
                     aria-describedby="confirmPassword-helper-text"
                     type="password"
                     required
                  />
                  <FormHelperText id="confirmPassword-helper-text">{errorMessage}</FormHelperText>
               </FormControl>

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
