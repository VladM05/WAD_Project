import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import Navbar from "../Components/Navbar";
import { userRequest } from "../requestMethods";

const Success = () => {

    const location=useLocation();
    const data = location.state.stripeData;
    const products = location.state.products;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
      const createOrder = async () => {
        try {
          const res = await userRequest.post("/orders", {
            userId: currentUser._id,
            products: products.products.map((item) => ({
              productId: item._id,
              quantity: item._quantity,
            })),
            amount: (data.amount/100),
            address: data.billing_details.address,
          });
          setOrderId(res.data._id);
        } catch(err) {console.log(err)}
        // console.log(orderId);
      };
      data && createOrder();
    }, [products, data, currentUser]);

    return (
        <div>
            <Navbar></Navbar>
            <div
                style={{
                    height: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
            {orderId
            ? `Order has been created successfully. Your order number is ${orderId}`
            : `Success! Your order is being prepared...`}
            </div>
        </div>
    );
};

export default Success;
