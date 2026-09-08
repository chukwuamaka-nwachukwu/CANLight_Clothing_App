import "react";
import { Link,useNavigate } from "react-router-dom";
import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <div className="directory-item-container" onClick={onNavigateHandler}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="directory-item-body">
        <h2>{title.toUpperCase()}</h2>
        <p>
          <Link to={`/shop/${title.toLowerCase()}`} className="shop-link">
            Shop Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DirectoryItem;
