import { Box } from "@mui/material";
import Product from "components/Product";
import GamerLoading from "components/gamerLoading/GamerLoading";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Products = ({onClick}) => {

    const url = process.env.REACT_APP_HOST_NOTIFICATIONS;
    const token = useSelector((state) => state.token);
    const [isLoading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);


    const fetchProducts = async () => {
        setLoading(true);
    
    try{
      const response = await fetch(
        url+`/products`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if(response.ok){      
      const data = await response.json();
      setProducts(data.content);
    } else {
      console.log(response);
    }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    }

    useEffect(() => {
        fetchProducts();   
    }, []);

    return <>{isLoading ? <GamerLoading /> :
     <Box display={'flex'} justifyContent={"space-between"} flex={"column"}>
        {products.map((produto) => {
            produto.onClick = onClick;
            return  <Product {...produto}  />
        })}
    </Box>}</>
}

export default Products;