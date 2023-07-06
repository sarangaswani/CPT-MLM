import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CoreValuesSlider = () => {
  const coreValues = [
    {
      index: 1,
      title: 'Innovation',
      description:
        'We embrace technological advancements and continually explore new frontiers to deliver cutting-edge solutions that drive transformative change.',
    },
    {
      index: 2,
      title: 'Integrity',
      description:
        'We prioritize transparency, ethics, and security in all our endeavors, fostering trust among stakeholders and ensuring the responsible deployment of decentralized technologies.',
    },
    {
      index: 3,
      title: 'Collaboration',
      description:
        'We believe in the power of collaboration and actively seek partnerships to foster synergies, drive adoption, and co-create solutions that benefit the broader web3 ecosystem.',
    },
    {
      index: 4,
      title: 'Empowerment',
      description:
        'We strive to empower individuals and organizations by providing them with the tools, knowledge, and resources necessary to thrive in the decentralized future.',
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-customPurple via-MiddlePurple to-customPurple py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white text-center">
        Core Values
      </h1>
      <div className="bg-transparent rounded-lg p-8 sm:p-10 text-white items-center">
        <Slider {...sliderSettings}>
          {coreValues.map((coreValue, index) => (
            <div key={index} className="p-4">
              <div className="bg-transparent rounded-lg shadow-2xl p-6">
                <div className="ml-4 h-auto sm:h-48">
                  <h2 className="text-2xl font-bold mb-4">{coreValue.title}</h2>
                  <p className="text-lg mb-8">{coreValue.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CoreValuesSlider;
