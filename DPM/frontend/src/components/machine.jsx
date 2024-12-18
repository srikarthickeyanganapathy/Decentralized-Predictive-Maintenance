import React, { useEffect, useState } from 'react';
import axios from "axios";
import './css/machine.css';

function ProductList() {
    const [products,setProduct] = useState([{MachineID: "",TransactionHash: "",Blockno: "",UnixTimestamp: "",DateTime: "",From: "",To: "",TxnFee: ""}]);
    
    useEffect(()=>{
      const getProducts = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v3/getall");
          setProduct(response.data.data);
        } catch(err) {
          console.log(err);
        }
      }
      getProducts();
    },[])

    return (
      <div className="product-grid-container">
        <h2>Manufacturing Companies Products</h2>
        <div className="product-grid">
          <table>
            <thead>
              <tr>
                <td>MachineID</td>
                <td>TransactionHash</td>
                <td>Blockno</td>
                <td>UnixTimestamp</td>
                <td>DateTime</td>
                <td>From</td>
                <td>To</td>
                <td>TxnFee</td>
              </tr>
            </thead>
            <tbody>
                {products.map(product => (
                  <tr key={product.TransactionHash} className="product-tile">
                    <td>{product.MachineID}</td>
                    <td>{product.TransactionHash}</td>
                    <td>{product.Blockno}</td>
                    <td>{product.UnixTimestamp}</td>
                    <td>{product.DateTime}</td>
                    <td>{product.From}</td>
                    <td>{product.To}</td>
                    <td>{product.TxnFee}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  

export default ProductList;