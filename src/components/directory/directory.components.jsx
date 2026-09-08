import "react";
import { Link } from "react-router-dom";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return (
    <div className="home-background">
      <div className="directory-container">
        {categories.map(({ id, title, imageUrl }) => (
          <Link
            key={id}
            to={`/shop/${title.toLowerCase()}`}
            className="category-container"
          >
            <div
              className="background-image"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="category-body-container">
              <h2>{title}</h2>
              <p>Shop Now</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Directory;
