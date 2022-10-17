import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Items from './items';
import CreateUsers from './components/CreateUsers';
import Header from './components/Header-Nav/Header';
import StaffLoginPage from './components/StaffLogin/StaffLoginPage';
import SettingsPage from './components/Settings/SettingsPage';
import CheckoutPage from './components/Checkout/CheckoutPage';
import { AuthContextProvider } from './components/context/AuthContext';
import ProtectedRoute from './components/AccountLogin/ProtectedRoute';
import SignUp from './components/AccountLogin/SignUp';
import SignIn from './components/AccountLogin/SignIn';
import Account from './components/AccountLogin/Account';
import Menu from './components/ProductMenu/Menu';
import TablePlan from './components/Tables/TablePlan';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthContextProvider>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <StaffLoginPage />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route path="/items" element={<Items />} />
            <Route path="/CreateUsers" element={<CreateUsers />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/staffLogin"
              element={
                <ProtectedRoute>
                  <StaffLoginPage />
                </ProtectedRoute>
              }
            />
            <Route path="/tablePlan" element={<TablePlan />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </AuthContextProvider>
      </header>
    </div>
  );
}

export default App;
