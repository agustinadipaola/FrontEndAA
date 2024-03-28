// update item quantity http://localhost:3000/item/update/2
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";

function UpdateCartItem(props) {
  const [itemName, setItemName] = useState(""); // Name of the item
  const [itemPrice, setItemPrice] = useState(""); // Price of the item
  const [itemQuantity, setItemQuantity] = useState(""); // Quantity of the item
  const params = useParams(""); // Extract URL parameters
  const navigate = useNavigate(); // Set up navigation using the useNavigate hook
  const [items, setItems] = useState([]); // Initialize an empty array for items
  const [id, setId] = useState(); // Initialize a state variable for item ID

  // Function to handle updating the cart item
  function handleClick() {
    axios
      .patch("http://localhost:8080/item/update/" + params.id, {
        itemName,
        itemPrice,
        itemQuantity, // Include the updated item quantity in the request

        cart: { id: params.id }, // Include the cart ID
      })

      .then((response) => {
        setItemName("");
        setItemPrice("");
        setItemQuantity(""); // Clear the item quantity state after successful update
        navigate(-1); // Navigate back (e.g., to the previous page)
      })

      .catch((err) => console.error(err)); // Log any errors to the console
  }

  return (
    <Form style={{backgroundColor:"#FEFEFA", width:400, border: '1px solid #000', fontFamily:"roboto",  paddingLeft: '2em' }}>
      <h3           style={{ fontFamily: "roboto" }}
>UPDATE YOUR ITEMS</h3>
      

<div           style={{ fontFamily: "roboto, sans-serif" }}
>ITEM NAME: </div>
          <input
            type="text"
            className="form-control"
            placeholder="Update name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <br />
          <div           style={{ fontFamily: "roboto, sans-serif" }}
>PRICE: </div>
          <input
            type="number"
            className="form-control"
            placeholder="Update price"
            defaultValue="0.00"
            min="0"
            step="0.01"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <br />
          <div           style={{ fontFamily: "roboto, sans-serif" }}
> QUANTITY:</div>
          <input
            type="number"
            className="form-control"
            min="0"
            placeholder="Update quantity"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
          />
          <br />
          <Button
            variant="dark"
            style={{ fontFamily: "roboto, sans-serif" }}
            id="itemSubmit"
            onClick={handleClick}
            type="submit"
          >
            Submit
          </Button>

          <br></br>
          <br></br>
          <div>
     
          </div>
    </Form>
  );
}

export default UpdateCartItem;
