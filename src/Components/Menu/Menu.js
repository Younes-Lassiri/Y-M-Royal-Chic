import React from 'react'

import './Menu.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/index.esm'
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


export default function Menu(props) {
  const quantite = useSelector((state) => state.wishProductQuantite)
  const cartQuantite = useSelector((state) => state.cartProductQuantite)
  function isMobileDevice() {
    if(window.innerWidth <= 767){
      return 'true'
    }else{
      return 'false'
    }
  }

  function menu() {
    let hiddenMenu = document.querySelector('.hidden-menu');
    let hiddenSideMenu = document.querySelector('.side-menu');
  
    if (isMobileDevice() === 'false' && getComputedStyle(hiddenMenu).display === 'none') {
      hiddenSideMenu.style.display = 'block';
    } else if (isMobileDevice() === 'true' && getComputedStyle(hiddenMenu).display === 'none') {
      hiddenMenu.style.display = 'block';
    } else if (isMobileDevice() === 'false') {
      hiddenMenu.style.display = 'none';
    } else {
      hiddenMenu.style.display = 'none';
    }
  }


  
  function hideSideMenu(){
    document.querySelector('.side-menu').style.display = 'none'
  }



  useEffect(() => {
    window.addEventListener('scroll', hideSideMenu);
    return () => {
      window.removeEventListener('scroll', hideSideMenu);
    };
  }, []); 

  function hideSideMenu() {
    const sideMenu = document.querySelector('.side-menu');
    if (sideMenu && sideMenu.style.display !== 'none') {
      sideMenu.style.display = 'none';
    }
  }


  return (
    <div id={props.profile === true? "menuP": "menu"} className="head-menu">
      
<div className={props.profile === true? "admin-section adminHide": "admin-section"}><span>y&mroyal-chic@contact.com</span>
<ul>
  <li style={{listStyleType:'none'}}><Link to='/y&m-admin' style={{textDecoration:'none'}}>My account</Link></li>
  <li style={{listStyleType:'none'}}><Link to='/wishlist' style={{textDecoration:'none'}}>Wishlist</Link></li>
</ul>
</div>
    <nav className={props.profile === true? "navbar navbar-expand-lg yayaP": "navbar navbar-expand-lg yaya"}>
      <div className="container-fluid" style={{overflow: 'hidden'}}>
        <a className="navbar-brand menu-logo" href="#">
        Y&M Royal Chic
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className={props.profile === true? "navbar-nav me-auto mb-2 mb-lg-0 menu menuPp": "navbar-nav me-auto mb-2 mb-lg-0 menu"}>
            <li className="nav-item">
                <Link className={props.profile === true? 'span activeeP': 'span activee'} to="/"  style={{textDecoration:'none'}}>
          HOME
        </Link>


            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/">
            Pages
                </Link>
            </li>
            <li  className="nav-item"><Link to={'/elements/product-carousel'} className="nav-link">SHOP</Link></li>
            <li className="nav-item">
            <Link className="nav-link" aria-current="page" href="#" to={'/elements/product-carousel'}>
                ELEMENTS
              </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/cart">
            Cart({cartQuantite})
                </Link>
            </li>
          </ul>
          
        </div>
        <div className="hamburger-toggle" onClick={menu}>
                <span className="line top"></span>
                <span className="line middle"></span>
                <span className="line bottom"></span>
            </div>
      </div>
    </nav>












    <div className='hidden-menu'>
      <ul className='navbar-nav'>
        <li><Link className="activee" to="/">
                  HOME
                </Link></li>
        <li><a href="#">PAGES</a></li>
        <li><Link to='/shop'>SHOP</Link></li>
        <li><a href="v">ELEMENTS</a></li>
        <li className="nav-item">
            <Link className="nav-link" to="/cart">
            Cart({cartQuantite})
                </Link>
            </li>
        <li className="nav-item">
            <Link className="nav-link" to="/wishList">
                  WishList({quantite})
                </Link>
            </li>
      </ul>
    </div>
    <div className="side-menu">
    <h6 className="navbar-brand side-menu-title" href="#">
        Y&M Royal Chic
        </h6>
        <p>Y&M Royal Chic is a destination for mo
          dern women seeking a blend of timeless 
          elegance and contemporary fashion. Our curated collection celebrates indi
          viduality with chic dresses and versatile pieces, offering a seamless fusion of grace and sophisticat
          ion. Step into Y&M Royal Chic, where style mee
          ts simplicity, and discover a curated selection that empowers your unique expression of fashion.</p>
            <h3>FOLLOW US</h3>
            <button className='side-menu-btn' onClick={hideSideMenu}></button>
<div className="social">
  <span>Ig.</span>
  <span>Fb.</span>
  <span>Tw.</span>
</div>
    </div>
    </div>
  )
}

