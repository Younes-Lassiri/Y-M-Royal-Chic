import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Menu from '../Menu/Menu';
import FirstSec from '../FirstSec/FirstSec';
import SecondSec from '../SecondSec/SecondSec';
import Collection from '../Collection/Collection';
import FiveSec from '../FiveSec/FiveSec';
import Footer from '../Footer/Footer';
import WishList from '../wishList/WishList';
import Cart from '../Cart/Cart';
import Shop from '../Shop/Shop';
import Sliderr from '../Slider/Slider';
import Login from '../Login/Login';
import SignUp from '../Admin/SignUp';
import Profile from '../Connexion/Profile';
import Checkout from '../Checkout/Checkout';
import Notification from '../Notification/Notification';
import NotFound from '../NotFound/NotFound';
import Loader from '../Loader/Loader';

export default function Navigation() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Landing/>
              <div>
                <Menu/>
                <FirstSec/>
                <SecondSec/>
              </div>
              <div className='issue'></div>
              <div><Collection/></div>
              <div><FiveSec/></div>
              <div><Notification/></div>
              <Footer/>
            </div>
          }
        />
        <Route path="/landing" element={<Landing/>} />
        <Route path='/wishList' element={<WishList/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/product/:name' element={<Shop/>}/>
        <Route path='/y&m-admin' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/checkout" element={<Checkout/>} />



        <Route path='/elements/product-carousel' element={<Sliderr/>}/>
        <Route path='*' element={<NotFound/>}/> {/* Catch-all route */}
      </Routes>
    </Router>
  )
}
