import "react";
import "../../../categories.styles.scss";
import Directory from "../../directory/directory.components";
import {Outlet} from 'react-router-dom';

const HomePage = () => {
  const categories = [
    { id: 1, title: "Hats", imageUrl: "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=600&auto=format&fit=crop&q=60" },
    { id: 2, title: "Jackets", imageUrl: "https://i.ibb.co/px2tCc3/jackets.png" },
    { id: 3, title: "Sneakers", imageUrl: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=600&auto=format&fit=crop&q=60" },
    { id: 4, title: "Womens", imageUrl: "https://images.pexels.com/photos/4834142/pexels-photo-4834142.jpeg" },
    { id: 5, title: "Mens", imageUrl: "https://media.istockphoto.com/id/2094528663/photo/group-of-happy-men-enjoying-outdoors.jpg?b=1&s=612x612&w=0&k=20&c=dyqFOm6z3jeBYOU_tVc27S9HHMJgRgpqilWCsQOnGRw=" }
  ];

  return(
    <div>
    <Outlet />
     <Directory categories={categories} />
    </div>
    );
};

export default HomePage;
