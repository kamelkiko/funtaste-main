import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import Test from './test/Test';

import MusicPlayer from './components/Musicplayer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AuthContext, { AuthContextProvider } from './auth/auth-context';
import MealsPlan from './pages/MealsPlan';
import Otp from './pages/Otp';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import Menu from './pages/Menu';
import PlanDetails from './pages/PlanDetails';
import { useEffect, useState } from 'react';
import PreLoader from './components/Preloader';
import { useContext } from 'react';

function App() {
  // const [isLoading, setisLoading] = useState(true);
  // useEffect(() => {
  //   const loadingTimeout = setTimeout(() => {
  //     setisLoading(false);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(loadingTimeout);
  //   };
  // }, []);
  const authCtx = useContext(AuthContext)
  const logged = authCtx.isLoggedIn;
  
  return (
    <div>
      <MusicPlayer />
      {/* {isLoading && <PreLoader></PreLoader>} */}
      <AuthContextProvider>
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signUp" element={<SignUp />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/profile" element={logged ? <Profile /> : <Login />} />
      <Route exact path="/offers" element={<Offers />} />
      <Route exact path="/plans" element={<MealsPlan />} />
      <Route exact path="/plans/:id" element={<PlanDetails />} />
      <Route exact path="/menu" element={<Menu />} />
      <Route exact path="/otp" element={<Otp />} />
      <Route exact path="/forgotPassword" element={<ForgetPassword />} />
      <Route exact path="/resetPassword" element={<ResetPassword />} />
      
      </Routes>
      </BrowserRouter>
      </AuthContextProvider>
      {/* <Login /> */}
    </div>
  );
}

export default App;
