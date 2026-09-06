import "react";
import { useContext } from "react";
import { ProductsContext } from "../../../contexts/products.context";
import ProductCard from "../../product-card/product-card.component";
import "./shop.styles.scss";


const Shop = () => {
    const {products} = useContext(ProductsContext);
    return(
        <div className="shop-page">
            <h2 className="shop-title">Featured Collection</h2>
            <p className="shop-subtitle">Curated styles for modern elegance</p>
                <div className="products-container">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
        </div>
    );
}

export default Shop;