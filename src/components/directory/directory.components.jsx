import "react";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return (
  <div className="home-background">
    <div className="directory-container">
      {categories.map(({ id, title, imageUrl }) => (
        <div key={id} className="category-container">
          <div
            className="background-image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};
//all thw ehile while mincheol and ari were fooling around, na haesu and taeha were confessing their love for each other
//mincheol even started getting involved with some new naive office girl as well and people started to bad mouth and keep beef
export default Directory;
