
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import Home from './components/home/Home.jsx';
import Login from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import Create from './components/create/Create.jsx';
import FoodDetails from './components/foodDetails/FoodDetails.jsx';
import FoodCatalog from './components/foodCatalog/FoodCatalog.jsx';
import Cart from './components/cart/Cart.jsx';
import Checkout from './components/checkout/Checkout.jsx';
import {useLocation} from 'react-router-dom'
import { useEffect } from 'react';

function App() {
 const location = useLocation()
 
 useEffect(() => {
   window.scrollTo(0, 0)
 }, [location.pathname])


  return (
    <div>
       <Navbar />
       <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/login' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
         <Route path='/create' element={<Create />} />
         <Route path='/food/:id' element={<FoodDetails />} />
         <Route path='/foods/:id' element={<FoodCatalog />} />
         <Route path='/cart' element={<Cart />} />
         <Route path='/checkout' element={<Checkout />} />
       </Routes>
       <Footer />
    </div>
  );
}

export default App;

