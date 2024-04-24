import { Route, Routes } from 'react-router-dom';
import NotFound from './components/ui/NotFound/NotFound';
import Register from './feachers/Users/Register';
import Login from './feachers/Users/Login';
import Home from './feachers/Home/Home';
import Wallets from './feachers/Wallets/Wallets';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wallets/:category" element={<Wallets/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
