import React, { useState, useEffect } from 'react';
import '../fonts/icomoon/style.css';
import '../css/bootstrap.min.css';
import '../css/jquery.fancybox.min.css';
import '../css/bootstrap-datepicker.css';
import '../fonts/flaticon/font/flaticon.css';
import '../css/aos.css';
import '../css/style.css';
import '../css/styles.css';


export const NoticeSlider = ({ images }) => {
    //Create Notice slider with images
    const [current, setCurrent] = useState(0);
    const length = images.length;
    const nextSlide = () => {
        setCurrent(current === length - 1? 0 : current + 1);
    };
    const prevSlide = () => {
        setCurrent(current === 0? length - 1 : current - 1);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [current]);
    if (!Array.isArray(images) || images.length <= 0) {
        return null;
    }
    return (
        <section className="notice-slider">
            <i className="fas fa-chevron-left" onClick={prevSlide}></i>
            <i className="fas fa-chevron-right" onClick={nextSlide}></i>
            {images.map((image, index) => {
                return (
                    <div className={index === current ? 'slide active' : 'slide'} key={index}>
                        {index === current && (
                            <img src={image} alt="Notice" className="image"/>
                        )}
                    </div>
                );
            })}
        </section>
    );
    //End of Notice slider with images
    
};
