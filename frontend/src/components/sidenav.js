import React, { useState, useEffect } from 'react';
import './sidenav.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Sidenav() {
    const [resock, setresock] = useState(0);
    const [inventory, setinventory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/inventory/").then((res) => {
            if (res.data.length > 0) {
                setinventory(res.data);
                setresock (inventory.filter(stock => stock.quantity <= stock.restock_level))
             
            }
        }).catch((e) => {
            console.log(e);
        })

            if (resock.length ==0) {
                document.getElementById('icon-button__badge').style.display = "none ";
            }
            else if(resock.length !=0){
             
                document.getElementById('icon-button__badge').style.display = "block ";
            }
    },[inventory] )

    


    return (

        <div className="sidenav">

            <Link to="/inventory">Inventory</Link>
            <Link to="/addinventory">Add Inventory</Link>

            <div className="icon-button">
                <span id="icon-button__badge" className="icon-button__badge " style={{display:'none',textAlign:'center', paddingTop:'5px' }} >{resock.length}</span>
                <Link to="/restock">Re-Stock Now</Link>
            </div>

            <Link to="/suppliers">Suppliers</Link>
            <Link to="/checkout">Checkout</Link>


        </div>


    );
}