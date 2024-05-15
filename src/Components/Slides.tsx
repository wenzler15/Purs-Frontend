import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const SlideShow = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Avançar para a próxima imagem
  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Retroceder para a imagem anterior
  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full">
      <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l cursor-pointer z-10 ml-5" onClick={prevSlide}><FaArrowLeft color='#eee' size={30} />
      </button>

      <div className='w-full flex justify-center'>
        <img className="w-full" src={images[currentImageIndex]} alt={`Slide ${currentImageIndex}`} />
      </div>

      <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r cursor-pointer z-10 mr-5" onClick={nextSlide}><FaArrowRight color='#eee' size={30} />
      </button>

      <div className='w-full flex justify-center'>
      <button onClick={() => window.open(`https://wa.me//${import.meta.env.VITE_WHATSAPP_NUMBR}?text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20a%20Purs`, '_blank')} className='bg-[#331A71] text-[#fff] p-2 md:p-3 lg:p-3 rounded-lg absolute mt-[-40px] text-sm'>Falar com um especialista</button>
      </div>

    </div>
  );
};

export default SlideShow;
