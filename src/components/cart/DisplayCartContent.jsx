// http://localhost:3000/cart/get/1 Content of the cart

import axios from "axios";
import { useParams } from "react-router-dom";
import ItemStructure from "../item/ItemStructure";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import background from "../../pictures/formbackground.png"
function DisplayCartContent() {
  const params = useParams(""); // Get parameters from the URL (e.g., cart ID)
  const itemList = [];
  const [items, setItems] = useState([]);
  const [buyer, setBuyer] = useState("");
  const style = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover', // Cover the entire space of the div
    backgroundRepeat: 'no-repeat', // Do not repeat the image
    backgroundPosition: 'center', // Center the background image
  };
  let cartTotal = 0; // Total cost of items in the cart
  const navigate = useNavigate(); // Navigation function from React Router

  function getCartItems() {
    // Fetch cart items based on the cart ID
    axios
      .get("http://localhost:8080/cart/get/" + 1)
      .then((response) => {
        setItems(response.data.items); // Set the cart items in the state
        setBuyer(response.data.buyer); // Set the buyer's name in the state
        console.log("response.data.items:", response.data.items);
      })
      .catch(console.log());

    console.log("items:", items); // Log the items (for debugging)
  }

  // Create an item component for each item in the cart
  for (const item of items) {
    itemList.push(
      <ItemStructure
        id={item.id}
        name={item.itemName}
        price={item.itemPrice}
        quantity={item.itemQuantity}
        image={item.image}
      />
    );
  }
  // Calculate the total cost of items in the cart
  for (const item of items) {
    cartTotal = cartTotal + item.itemPrice * item.itemQuantity;
  }

  // Run the getCartItems function when the component mounts
  useEffect(() => {
    getCartItems();
  }, []);
  

  return (
    <div style={style }>
      <div>
        <div >
          <h3>
            <span
              style={{
                backgroundColor: "whitesmoke",
                marginTop: "10vh",
                padding: "20px",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "50px",
              }}
            >
              <div
                style={{ flexGrow: 1, display: "flex", alignItems: "center" }}
                className="roboto"
              >
                <IoBagCheckOutline size={30} /> &nbsp; {buyer}'s Cart
              </div>

              <Button
                variant="dark"
                onClick={() => {
                  navigate("/checkout");
                }}
                style={{
                  marginRight: "10px",
                  fontFamily: "Roboto, sans-serif",
                }} // Add right margin to the "Checkout" button
              >
                <strong>CHECKOUT</strong>
              </Button>
              <Button
                variant="dark"
                onClick={() => {
                  navigate("/save-for-later");
                }}
                style={{ fontFamily: "Roboto" }}
              >
                <strong>SAVE FOR LATER</strong>
              </Button>
            </span>
          </h3>
        </div>

        <div
          className="card"
          style={{
            Width: "10%",
            backgroundColor: "whitesmoke",
            float: "right",
            marginRight: "5px",
            padding: "10px",
          }}
        >
          <h4>Total to pay: £{cartTotal.toFixed(2)}</h4>
        </div>
        <Table>
          <div>{itemList}</div>
        </Table>
      </div>
    </div>
  );
}

export default DisplayCartContent;
