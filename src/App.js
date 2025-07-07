import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import MusicPlayer from './components/Musicplayer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { AuthContextProvider } from './auth/auth-context';
import MealsPlan from './pages/MealsPlan';
import Otp from './pages/Otp';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import Menu from './pages/Menu';
import PlanDetails from './pages/PlanDetails';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <MusicPlayer />
          <AuthContextProvider>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signUp" element={<SignUp />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/profile" element={<Profile />} />
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
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;