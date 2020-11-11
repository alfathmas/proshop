import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_ADD_SUCCESS,
    CART_UPDATE_ITEM,
} from "../constants/cartConstants";

export const successAddedToCart = () => {
    return {
        type: CART_ADD_SUCCESS,
    };
};

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty: Number(qty),
            },
        });

        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );

        dispatch(successAddedToCart());
    } catch (error) {
        console.log(error);
    }
};

export const updatedCartItem = (id, qty) => async (dispatch, getState) => {
    dispatch({
        type: CART_UPDATE_ITEM,
        payload: {
            product: id,
            qty: Number(qty),
        },
    });
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    // NOTE: when we removed items in the cart, the last item will still in the cart because CartScreen will read the url for add cart
    try {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id,
        });
        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );
    } catch (error) {
        console.log(error);
    }
};
