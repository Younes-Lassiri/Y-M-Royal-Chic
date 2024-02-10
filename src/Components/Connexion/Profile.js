import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../../helpers/authContext";
import { BrowserRouter, Route, Link, Routes, useParams } from "react-router-dom";
import "./Profile.css";
import { Navigate, useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";
import profileImg from './myImages/profile-svgrepo-com.png'
import Login from "../Login/Login";
import AddProduct from "../addProduct/AddProduct";
import Settings from "../settings/Settings";
import Orders from "../Orders/Orders";
import Messages from "../Messages/Messages";
import Loader from "../Loader/Loader";
import 'bootstrap/dist/css/bootstrap.min.css'















export default function Profil() {
  const [totalNoti, setTotalNoti] = useState(0)
  const [profileHovered, setProfileHovered] = useState(false)



  const [dark, setDark] = useState("off")


  function switchDark() {
    if (dark === "off") {
      setDark("on")
      
    }
    else{
      setDark("off")
    }
  }
  

  const [activeLink, setActiveLink] = useState('dashbord');
  const [selectedContent, setSelectedContent] = useState('dashbord');

  const handleLinkClick = (content) => {
    setSelectedContent(content);
    setActiveLink(content);
  };

  // Render content based on selectedContent state
  const renderContent = () => {
    switch (selectedContent) {
      case 'store':
        return <AddProduct/>;
        case 'settings':
          return <Settings user={user} setSelectedContent={setSelectedContent}/>;
        case 'orders':
          return <Orders user={user} setSelectedContent={setSelectedContent}/>;
        case 'messages':
          return <Messages/>; 
      default:
        return null;
    }
  };
  const { logged, setLogged, user, setUser } = useContext(authContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    checkLogin();
    userInfo();
  }, []);

  const checkLogin = () => {
    if (!localStorage.getItem("userToken")) {
      setLogged(false);
      console.log("You are not connected");
      navigate("/login");
    }
  };

  const userInfo = async () => {
    try {
      const response = await axios.get("https://royalchicapi-cc1c56c683bf.herokuapp.com/api/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });

      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user info:", error.message);
      // Handle error if needed
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

useEffect(() => {
  fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/messages')
  .then((res) => res.json())
  .then((data) => {
    setTotalNoti(data.length)
  })
}, [])

  




  

  const renderView = loading ? (
    <div>Loading...</div>
  ) : (


    <div className="admin-profile">
      
      <div className="admin-navbar">

      <div style={{position:'absolute', left:'40px', display:'flex', gap:'10px', alignItems:'center'}}>
      
      <Link to='/'><h1 className="admin-logo">Y&M-Admin</h1></Link>
      
      </div>

      

      <div className="admin-noti">

      <label class="switch">
  <input type="checkbox" onClick={() => switchDark()}/>
  <span class="slider round"></span>
</label>


        <div style={{position:'relative'}}>
      <img style={{cursor:'pointer'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz3
      4AAAAAXNSR0IArs4c6QAAAb1JREFUSEvd1U+ITlEYx/HPsBh/shFZ+DcWIwsLWcifjfJno5QwNaU
      sZ2GJaHYWUv7NxkLKRknNJFkTSamxYaPJQthp3iQlQpj7vJ07Xbf39l737d04q3uf85zf93nO85xzB
      vR5DPRZXxmwHMcx0QE8glvJPop7HXxO4SY+5XNFwCAeYSfGcCM5LUn/57As2T4j/q/jW7KdwDU8wR78
      CnsREJPh9AHb8R57cSdbuKJiK2dxJBN8iiE8x0pcxukiYG22NW+xAFvxEocwhYVd6vQTB/AA2zCNsK3O
      Am7lGZzHOG7jGFbhDZbWbILIehhfcB8Hs++ox5Uc8AJbsDvt4aXkUFO/7XYSV3EUkymj/TkgCrUoFTGiiP1f
      9y/qeJaJ7sImzOAdNuSAP/ieIKH7u9QAdVjRmtHm0RAtfIzvKkAAm4zQW4yvWU1/YLDqJPcC+Cuw/xOwPnVAkxr
      EaY4OnB/lLVpTOPZNANGaO9J1015fBrzGxibKhTWvsLnTbRq2pt1Tjmk+8HIGj9N10UsSD7GvKoNehDuurftkns1O5YWS
      whlc7BZRXUD4xQ17OAneTQ9K15rVBXQLtHK+74A5oc5OGf/GpNQAAAAASUVORK5CYII="/>
      <span style={{position:'absolute', top:0, right:'-5px', zIndex:'2', color:'white', fontSize:'15px', fontWeight:600,
       background:'red', borderRadius:'50%',
       width:'15px', height:'15px', display:'flex', justifyContent:'center', alignItems:'center'
       ,cursor:'pointer'}}>{totalNoti}</span>
</div>

<img src="https://ih1.redbubble.net/image.4770862630.8484/st,small,507x507-pad,600x600,f8f8f8.jpg" 
style={{borderRadius:'50%', width:'50px', height:'50px', cursor:'pointer'}} className="nani" onMouseEnter={() => setProfileHovered(true)} onMouseOut={() => setProfileHovered(false)}/>

{
  profileHovered? <div className="admin-toggle">

  <ul>
    <li><i class='bx bxs-user'></i><span>{user[0].name}</span></li>
    <li><i class='bx bxs-envelope'></i><span>{user[0].email}</span></li>
  </ul>
  
  </div> : null
}
  
      </div>

      </div>
      <div className="admin-sidebar">
        <ul className="admin-sidebar-ul">
          <li onClick={() => handleLinkClick('dashbord')} className={activeLink === 'dashbord' ? 'admin-visited' : ''}><i class='bx bxs-dashboard' style={{fontSize:'1.2rem'}}></i><Link href="">Dashboard</Link></li>
          <li onClick={() => handleLinkClick('orders')} className={activeLink === 'orders' ? 'admin-visited' : ''}><i class='bx bxs-cart-alt' style={{fontSize:'1.2rem'}}></i><Link href="">Orders</Link></li>
          <li onClick={() => handleLinkClick('messages')} className={activeLink === 'messages' ? 'admin-visited' : ''}><i class='bx bx-message-rounded-dots' style={{fontSize:'1.2rem'}}></i><Link href="">Messages</Link></li>
          <li onClick={() => handleLinkClick('store')} className={activeLink === 'store' ? 'admin-visited' : ''}><i class='bx bxs-store' style={{fontSize:'1.2rem'}}></i><Link href="">My Store</Link></li>

          
          <li onClick={() => handleLinkClick('team')} className={activeLink === 'team' ? 'admin-visited' : ''}><i class='bx bxs-user' style={{fontSize:'1.2rem'}}></i><Link href="">Team</Link></li>
        </ul>

        <ul className="admin-settings">
        <li onClick={() => handleLinkClick('settings')}><i class='bx bx-cog' style={{fontSize:'1.2rem'}}></i><Link href="">Settings</Link></li>

          
<li onClick={() => handleLogout()} style={{color:'red'}}><i class='bx bx-log-out-circle' style={{fontSize:'1.2rem'}}></i><Link href="" style={{color:'red'}}>Log out</Link></li>
        </ul>
      </div>
      
      

      <div className={dark === "off"? "admin-content col-10" : "admin-content col-10 admin-content-dark"}>
        <div className="admin-news" style={{padding:'10px 30px'}}>
          <h1 style={{fontWeight:600, color:'#000009'}}>Dashboard</h1>
          <div className="bread" style={{display:'flex', gap:'30px', alignItems:'center'}}>
          <h6 style={{color:'gray', fontWeight:500}}>Dashboard</h6>
          <span style={{fontWeight:800, fontSize:'1.8rem', marginTop:'-10px'}}>›</span>
          <h6 style={{color:'lightblue'}}>{selectedContent.charAt(0).toUpperCase() + selectedContent.slice(1)}</h6>
          </div>
        </div>

      {renderContent()}
    </div>
      
    </div>



  );

  return <>{renderView}</>;
}
