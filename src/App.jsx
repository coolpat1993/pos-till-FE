import './App.scss';
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
import TablePlan from './components/CreateTables/TablePlan';
import Tables from './components/ProductMenu/Tables';
import ProductMenu from './components/ProductMenu/Menu';
import { QueryClient, QueryClientProvider } from 'react-query';
import Testing from './components/testingGrounds/testing';

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/testing" element={<Testing />} />
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
          <Route path="/tables" element={<Tables />} />
          <Route path="/menu" element={<ProductMenu />} />
        </Routes>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
