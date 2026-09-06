import "react";
import { Routes, Route} from "react-router-dom";
import HomePage from "./components/routes/home/home.component.jsx";
import Navigation from "./components/routes/navigation/navigation.component.jsx";
import Authentication from "../src/components/routes/authentication/authentication.component.jsx";
import Shop from "./components/routes/shop/shop.component.jsx";
import "./App.css";



const App = () => (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route index element={<HomePage />} />
      <Route path="shop" element={<Shop />} />
      <Route path='auth' element={<Authentication />} />
    </Route>
   
  </Routes>
);

export default App;
