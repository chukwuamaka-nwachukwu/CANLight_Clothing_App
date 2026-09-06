import { createContext, useState } from 'react';

import PRODUCTS from '../shopdata.json';

// eslint-disable-next-line react-refresh/only-export-components
export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};