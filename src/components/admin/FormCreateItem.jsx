import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";


function FormCreateItem() {
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [image, setImage] = useState("");
    
    const navigate = useNavigate();


    function getItems() {
        axios
          .get("http://localhost:8080/item/get")
          .then((response) => {
            console.log("http://localhost:8080/item/get", response);
          })
          .catch((err) => console.error(err));
      }

      useEffect(() => getItems());

  const handleSubmit = (event) => {
    event.preventDefault();

    // update

    axios
      .post("http://localhost:8080/item/create", {
        itemName,
        itemPrice,
        itemQuantity,
        image,
      
    }
      )
      
      .then((response) => {
        setItemName("");
        setItemPrice("");
        setItemQuantity("");
        setImage("");
        window.location.reload();

      })
      .catch((error) => console.error(error));
  };

  return ( 
    <Form style={{backgroundColor:"#FEFEFA", width:400, border: '1px solid #000',  fontFamily:"roboto",  paddingLeft: '2em' }}onSubmit={handleSubmit}>
      <h3           style={{ fontFamily: "roboto, sans-serif" }}
>CREATE YOUR ITEMS</h3>
      <div           style={{ fontFamily: "roboto, sans-serif" }}
>ITEM NAME: </div>
      <input
        type="text"
        className="form-control"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
       <br />
      <div           style={{ fontFamily: "roboto, sans-serif" }}
>PRICE: </div>
      <input
        type="number"
        className="form-control"
        placeholder="£"
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
        value={itemQuantity}
        onChange={(e) => setItemQuantity(e.target.value)}
      />
        <br />
        <div           style={{ fontFamily: "roboto, sans-serif" }}
> IMAGE:</div>
        <input
          id="propertyUploadImages"
          name="uploadimages"
          className="form-control"
          type="text"
          placeholder="Paste your URL here"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      <br />
      <Button
        variant="dark"
        style={{ fontFamily: "roboto, sans-serif" }}
        id="itemSubmit"
        type="submit"
      >
        Submit
      </Button>
      
    </Form>
   );
}
export default FormCreateItem;