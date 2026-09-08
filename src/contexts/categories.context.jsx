import { createContext, useState, useEffect } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

// eslint-disable-next-line react-refresh/only-export-components
export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryMap = await getCategoriesAndDocuments();

      // Normalize keys to lowercase
      const normalizedMap = {};
      for (const key in categoryMap) {
        normalizedMap[key.toLowerCase()] = categoryMap[key];
      }

      setCategoriesMap(normalizedMap);
    };

    fetchCategories();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
