import React from "react";
import { Link } from "react-router-dom";
import("./productcard.css");

const ProductCard = ({ product }) => {
  return (
    <Link className="productCard" to={`/book/${product._id}`}>
    
        <div className="box1">
          <img src={product.images[0].url} alt={product.name} />
        </div>
        <div className="box2">
          <div className="box3">
          {product.name}
          </div>
          <div className="box4">
           {product.branch}
          </div>
        </div>
    
    </Link>
  );
};

export default ProductCard;
