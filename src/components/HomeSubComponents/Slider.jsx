import { useState, useEffect } from 'react';
import './style/TopSlider.css';

const imageSources = [
  'images/2.jpg',
  'images/3.jpg',
];

function ImageSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
  };


  useEffect(() => {
    const interval = setInterval(handleNextClick, 3000); // Change image every 3 seconds

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <div className="slider-container">
      <div className="Slider">
        <img
          className="ImgSlider"
          src={imageSources[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
        />
      </div>
    </div>
  );
}

export default ImageSlider;
