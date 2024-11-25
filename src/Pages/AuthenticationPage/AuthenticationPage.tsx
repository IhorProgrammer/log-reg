import { FC, FormEvent, useState } from 'react';
import Container from '@mui/material/Container';
import Background from '../../Components/Background/Background';
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import "./AuthenticationPage.scss"

import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'; 
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword } from '../../firebase/auth'; 

interface AuthenticationPageProps {}

const AuthenticationPage: FC<AuthenticationPageProps> = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isSigningIn, setIsSigningIn] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   
   const { userLoggedIn } = useAuth() 

   const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
       setter(e.target.value)
   }

   const onSubmit = async (e: FormEvent) => {
      e.preventDefault()
      if(!isSigningIn) {
         setIsSigningIn(true)
         try {
            await doSignInWithEmailAndPassword(email, password)
         }
         catch( e: any ) {
            setErrorMessage(e.message);
         }
      }
   }

   return (
      <>
         <Background />

         <Container fixed className="RegistrationPage">
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            
            <form className="modal-container" onSubmit={onSubmit} autoComplete="on">
               <h1>Sign in</h1>
               
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
               </FormControl>

               {/* Password Field */}
               <FormControl className="input-container" error={!!errorMessage}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                     id="password"
                     value={password}
                     onChange={handleInputChange(setPassword)}
                     type="password"
                     required
                  />
               </FormControl>
               <Link
                  to={"/reg"}
                  className="link-sign"
               >
                  Sing up
               </Link>
               <FormHelperText>{errorMessage}</FormHelperText>


               {/* Submit Button */}
               <Button type="submit" disabled={isSigningIn}>
                  {isSigningIn ? 'Sing in...' : 'Sing in'}
               </Button>
            </form>
         </Container>
      </>
   )
}


export default AuthenticationPage;
