import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slidesData = [
  {
    id: 1,
    image: "/images/slide-01.jpg",
    subtitle: "Women Collection 2018",
    title: "NEW SEASON",
    link: "/product",
  },
  {
    id: 2,
    image: "/images/slide-02.jpg",
    subtitle: "Men New-Season",
    title: "Jackets & Coats",
    link: "/product",
  },
  {
    id: 3,
    image: "/images/slide-03.jpg",
    subtitle: "Men Collection 2018",
    title: "New arrivals",
    link: "/product",
  },
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []); // Remove slidesData.length dependency (it's constant)

  return (
    <section className="section-slide">
      <div className="wrap-slick1">
        <div className="slick1 position-relative">
          {slidesData.map((slide, index) => (
            <div
              key={slide.id}
              className="item-slick1"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                display: index === currentSlide ? "block" : "none",
                transition: "all 0.8s ease-in-out",
              }}
            >
              <div className="container h-full">
                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                  <div className="layer-slick1">
                    <span className="ltext-101 cl2 respon2">
                      {slide.subtitle}
                    </span>
                  </div>

                  <div className="layer-slick1">
                    <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                      {slide.title}
                    </h2>
                  </div>

                  <div className="layer-slick1">
                    <Link
                      to={slide.link}
                      className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Dots Navigation */}
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "10px",
              zIndex: 10,
            }}
          >
            {slidesData.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: index === currentSlide ? "#fff" : "#999",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Slider;