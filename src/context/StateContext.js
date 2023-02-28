import React, {createContext, useContext, useState, useEffect} from "react";
import {toast} from "react-hot-toast";


const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    const onAdd = (product, quantity) => {
        const checkProductAlreadyInCart = cartItems?.find((item) => item._id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevQuantity) => prevQuantity + quantity);
        if (checkProductAlreadyInCart) {

            const updateCartItems = cartItems.map((item) => {
                if (item._id === product._id) return {
                    ...item,
                    quantity: item.quantity + quantity
                }
            })
            setCartItems(updateCartItems);
        } else {

            product.quantity = quantity;
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (id) => {
        foundProduct = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter(item => item._id !== id);

        setTotalPrice((prevState) => prevState - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevState) => prevState - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemsQuantities = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((item) => item._id === id);

        const newCartItems = cartItems.filter(item => item._id !== id);
        if (value === 'inc') {
            //get existing item
            // update specific cart item quantity
            setCartItems([{...foundProduct, quantity: foundProduct.quantity + 1},...newCartItems]);
            //set total price
            setTotalPrice((prevState) => prevState + foundProduct.price);
            //update total quantities
            setTotalQuantities(prevState => prevState + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                // update specific cart item quantity
                setCartItems([{...foundProduct, quantity: foundProduct.quantity - 1},...newCartItems]);
                //set total price
                setTotalPrice((prevState) => prevState - foundProduct.price);
                //update total quantities
                setTotalQuantities(prevState => prevState - 1)
            }
        }
    }

    return (
        <Context.Provider value={{
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            showCart,
            incQty,
            decQty,
            onAdd,
            setShowCart,
            toggleCartItemsQuantities,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);