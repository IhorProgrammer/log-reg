import React, { FC } from 'react';
import Container from '@mui/material/Container';
import Background from '../../Components/Background/Background';

interface RegistrationPageProps {}

const RegistrationPage: FC<RegistrationPageProps> = () => {

   return (
      <>
         <Background />
         <Container fixed>
            <h1>Hello</h1>
         </Container>
      </>
   )
}


export default RegistrationPage;
