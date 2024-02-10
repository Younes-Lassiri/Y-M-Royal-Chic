import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './addProduct.css'

export default function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [promoPercentage, setPromoPercentage] = useState(0)
  const [oldPrice, setOldPrice] = useState(0)
  const [promo, setPromo] = useState(null)
  const [neww, setNeww] = useState(null);
  const [soldee, setSoldee] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();


    const newProduct = {
      name: productName,
      thumbnail: productImage,
      price: productPrice,
      isNew: neww === "true"? true: false,
      sold: soldee === "true"? true: false,
      promo: promo === "true"? true: false,
      oldPrice: promo === "true"? Math.floor(parseInt(productPrice) / (1 - promoPercentage / 100)) : 0,
      promoValue: promo === "true"? promoPercentage : 0,
      wish: false,
      quantite: 0
    };

    try {
      const response = await fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (response.ok) {
        console.log('Product added successfully');
        toast.success(`${productName} added succesfully`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => window.location.reload(), 2000);
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className='addProduct-section'>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="addPro-form">

      <div className='row'>
        
        <div className='col-6'>
            <label htmlFor="" className='label' style={{color:'#000009'}}>Product Name</label><br />
            <input
              type='text'
              placeholder='Product Name'
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              style={{background:'white'}}
              className="admin-add-inp"
            />

        </div>

        <div className='col-6'>
        <label htmlFor="" className='label' style={{color:'#000009'}}>Product Price</label><br />
            <input
              type='text'
              placeholder='Product Price'
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
              style={{background:'white'}}
            />
        </div>

      </div>



      <div className='row'>

        <div className='col-12'>
        <label className='label' style={{color:'#000009'}}>Product Image</label><br />
        <input
          type='text'
          placeholder='Product Image Link'
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
          required
          style={{background:'white'}}
        />
        </div>
        
      </div>

      <div className='row'>
          <div className='col-6'>
            <label htmlFor="productNew" style={{color:'#000009'}}>New?</label><br />
            <div className='all-new' style={{display:'flex', gap:'20px', alignItems:'center'}}>
              <div className='newTrue' style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <label className="radio">
                  <input name="new" type="radio" value={true} onChange={(e) => setNeww(e.target.value)}/>
                  <span style={{color:'#000009'}}>Yes</span>
                </label>
              </div>
              <div className='newFalse' style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <label className="radio">
                  <input name="new" type="radio" value={false} onChange={(e) => setNeww(e.target.value)}/>
                  <span style={{color:'#000009'}}>No</span>
                </label>
              </div>
            </div>
          </div>



          <div className='col-6'>
            <label htmlFor="productSolde" style={{color:'#000009'}}>Solde?</label><br />
            <div className='all-solde' style={{display:'flex', gap:'20px', alignItems:'center'}}>
              <div className='soldeTrue' style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <label className="radio">
                  <input name="sold" type="radio" value={true} onChange={(e) => setSoldee(e.target.value)}/>
                  <span style={{color:'#000009'}}>Yes</span>
                </label>
              </div>
              <div className='soldeFalse' style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <label className="radio">
                  <input name="sold" type="radio" value={false} onChange={(e) => setSoldee(e.target.value)}/>
                  <span style={{color:'#000009'}}>No</span>
                </label>
              </div>
            </div>
          </div>
          </div>


          <div className='row'>
          <div className='col-6'>
            <label htmlFor="productPromo" style={{color:'#000009'}}>Promo?</label><br />
            <div className='all-promo' style={{display:'flex', gap:'20px', alignItems:'center'}}>
              <div className='promoTrue' style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <label className="radio">
                  <input name="radio" type="radio" value={true} onChange={(e) => setPromo(e.target.value)}/>
                  <span style={{color:'#000009'}}>Yes</span>
                </label>
              </div>
              <div className='promoFalse' style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <label className="radio">
                  <input name="radio" type="radio" value={false} onChange={(e) => setPromo(e.target.value)}/>
                  <span style={{color:'#000009'}}>No</span>
                </label>
              </div>
            </div>
          </div>
          <div className='col-6'>
            {promo === "true" &&
              <div className='row'>
                <div className='col-6'>
                  <label style={{color:'#000009'}}>Promo percentage</label>
                  <input type="number" min={1} max={100} placeholder='Promo percentage %' value={promoPercentage} onChange={(e) => setPromoPercentage(parseInt(e.target.value))} style={{background:'white'}}/>
                </div>
                <div className='col-6'>
                  <label style={{color:'#000009'}}>Origine Price</label>
                  <input 
    type="number" 
    placeholder='Origine Price' 
    value={Math.floor(parseInt(productPrice) / (1 - promoPercentage / 100))} 
    readOnly
    
    style={{background:'white'}}
  />
                </div>
              </div>
            }
          </div>
        </div>
        <div className='row'>
        <button type="submit" className='btn btn-primary add-pro-admin-btn'>Add Product</button>
        </div>

      
        </form>
    </div>
  );
}
