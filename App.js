
import { useState } from 'react';
import Appnav from './app/screens/Appnav';
import { AuthProvider } from './app/context/authcontext';

export default function App() {

const [isLogged, setislogged]=useState(true)


  return (
      <AuthProvider>
      <Appnav/>
      </AuthProvider>

  );
}


