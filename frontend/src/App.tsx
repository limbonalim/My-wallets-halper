import { Route, Routes, useNavigate } from 'react-router-dom';
import NotFound from './components/ui/NotFound/NotFound';
import Register from './feachers/Users/Register';
import Login from './feachers/Users/Login';
import Home from './feachers/Home/Home';
import Wallets from './feachers/Wallets/Wallets';
import { useAppSelector } from './app/hooks';
import { selectUser } from './feachers/Users/usersSlice';
import { useEffect } from 'react';
import Layout from './components/ui/Layout/Layout';
import UserProfile from './feachers/Users/UserProfile';
import Transactions from './feachers/Transactions/Transactions';

const App = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wallets" element={<Home />} />
          <Route path="/wallets/:type" element={<Wallets />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/:type/:id" element={<Transactions />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
