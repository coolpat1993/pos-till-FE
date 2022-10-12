import "./App.css";
import { Route, Routes } from "react-router-dom";
import Items from "./items";
import Users from "./components/CreateUsers";
import HomePage from "./components/HomePage/HomePage";
import Header from "./components/Header-Nav/Header";
import Nav from "./components/Header-Nav/Nav";
import StaffLoginPage from "./components/StaffLogin/StaffLoginPage";
import TablePlan from "./components/Tables/TablePlan";
import SettingsPage from "./components/Settings/SettingsPage";
import CheckoutPage from "./components/Checkout/CheckoutPage";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<Items />} />
          <Route path="/users" element={<Users />} />
          <Route path="/staffLogin" element={<StaffLoginPage />} />
          <Route path="/tables" element={<TablePlan />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
