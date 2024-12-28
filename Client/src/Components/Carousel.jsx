import { useEffect, useState } from "react";

const Carousel = () => {
  const items = [
    {
      title: "Unique Question Sets",
      description: "Tailored questions for authenticity",
      icon: "https://s3-alpha-sig.figma.com/img/0ada/0b19/29f4e3cd9705c3665842a066214dad2c?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SAvxfHBRT6u9bY-ZLDoaa2vbhMFBqzymKHxcKwBZNVnQ-CmXp5GkqyHg~CHtGeMO~-thHK6FvzIrA7FX1IBReW9t7cBN791SsXGKXqCQc-IRdV7NU3RXMxZDzl7bgHh5uvT1jshn6BFeZ3huKDmAwHgD1a-0i44n6xueWoQmG~1a3gOGCrn9LMwJ4In4hb9V-8TqqjWONWZoJOPUKdvl9kP0AeLJHyfhQOnQm~v-CEZUnr8fwbYKLZvUTJn0Tc7QycOy2IOuc-p4zMAk4zs-NWawMZuwMtEZFiO0uDFB9M4z~KBmaiTF8Xu0UZmtkmIIDIHeb6~YUTS1S9M-HO02ag__",
    },
    {
      title: "Multilingual Interviews",
      description: "Assess in any language",
      icon: "https://s3-alpha-sig.figma.com/img/9c7b/c700/7f7ea02700f5dacd86d8ae0cb3f8d7c2?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kl3L3xAXYlUQlIFDKIwKhoW99mQLByYSWT7iml4u0aGsQ2HapgWb9uK9~7I6R9h4JL~SaYMLsh8ryXrpCWgwR88lBHs29txugvWbqJA0T8QF-VhzAYFpklf6PxE8kVmwszo4fRWQiURfS1Sq8nBzM5C-k17EAj1e1hBVDU8C5aeCfJ0U2pheYuaAEN~nwIeuPOI5X5gkyCJruvsfF~7iK6BvSrxkEWmxvFAk-EyIcNag9Sn~9l6Qx6e72oIvmt~hBHB6Qlw9qj64HvIz28xAtp6NFOpHOJZypQfhnObP~qdIPP7GKYOoGElqAxm6d84Qt0ooRJ1vQnAk0tGnd1R4ng__",
    },
    {
      title: "Bulk Invitations",
      description: "Invite multiple candidates",
      icon: "https://s3-alpha-sig.figma.com/img/566b/7ce5/9af10d3068323170cfcefd4a38402623?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YxT8gz66PQqznCmH-y-geinV4Dgjq8RZRkmuoIY9BcdKy71VUibA2UOx23YjN9UyIrTTCusY2JWVzCUa5uH-FMaGdgYzehIQTi3innqHSuy1Txe4dVZ2BPbvMGLKTtF~WM8dt47tGqRERHTf2RIH8B9TZKx~kNWjWuJy3f5kDVlA4NzBGkrdUEOlsN~Mx-zVfXkg2xag71CBBbK8hwY0UYIUkXKXnF6Eeg6vsr2V5K5JdTP4Mb~SwiMIjY6J9ry9lOlZaUh3uuGKPUljVBsZdxY3R2YVf2yqB-6kV0xrgkmFFyum~vVDZS5PDlSwy9mz4KMN0eKXn92bv6HDpKEuZQ__",
    },
    {
      title: "Advanced Analytics",
      description: "Insights into performance",
      icon: "https://s3-alpha-sig.figma.com/img/0ada/0b19/29f4e3cd9705c3665842a066214dad2c?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SAvxfHBRT6u9bY-ZLDoaa2vbhMFBqzymKHxcKwBZNVnQ-CmXp5GkqyHg~CHtGeMO~-thHK6FvzIrA7FX1IBReW9t7cBN791SsXGKXqCQc-IRdV7NU3RXMxZDzl7bgHh5uvT1jshn6BFeZ3huKDmAwHgD1a-0i44n6xueWoQmG~1a3gOGCrn9LMwJ4In4hb9V-8TqqjWONWZoJOPUKdvl9kP0AeLJHyfhQOnQm~v-CEZUnr8fwbYKLZvUTJn0Tc7QycOy2IOuc-p4zMAk4zs-NWawMZuwMtEZFiO0uDFB9M4z~KBmaiTF8Xu0UZmtkmIIDIHeb6~YUTS1S9M-HO02ag__",
    },
    {
      title: "Custom Questions",
      description: "Fully customizable interviews",
      icon: "https://s3-alpha-sig.figma.com/img/9c7b/c700/7f7ea02700f5dacd86d8ae0cb3f8d7c2?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kl3L3xAXYlUQlIFDKIwKhoW99mQLByYSWT7iml4u0aGsQ2HapgWb9uK9~7I6R9h4JL~SaYMLsh8ryXrpCWgwR88lBHs29txugvWbqJA0T8QF-VhzAYFpklf6PxE8kVmwszo4fRWQiURfS1Sq8nBzM5C-k17EAj1e1hBVDU8C5aeCfJ0U2pheYuaAEN~nwIeuPOI5X5gkyCJruvsfF~7iK6BvSrxkEWmxvFAk-EyIcNag9Sn~9l6Qx6e72oIvmt~hBHB6Qlw9qj64HvIz28xAtp6NFOpHOJZypQfhnObP~qdIPP7GKYOoGElqAxm6d84Qt0ooRJ1vQnAk0tGnd1R4ng__",
    },
    {
      title: "Secure Data",
      description: "Built with privacy in mind",
      icon: "https://s3-alpha-sig.figma.com/img/566b/7ce5/9af10d3068323170cfcefd4a38402623?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YxT8gz66PQqznCmH-y-geinV4Dgjq8RZRkmuoIY9BcdKy71VUibA2UOx23YjN9UyIrTTCusY2JWVzCUa5uH-FMaGdgYzehIQTi3innqHSuy1Txe4dVZ2BPbvMGLKTtF~WM8dt47tGqRERHTf2RIH8B9TZKx~kNWjWuJy3f5kDVlA4NzBGkrdUEOlsN~Mx-zVfXkg2xag71CBBbK8hwY0UYIUkXKXnF6Eeg6vsr2V5K5JdTP4Mb~SwiMIjY6J9ry9lOlZaUh3uuGKPUljVBsZdxY3R2YVf2yqB-6kV0xrgkmFFyum~vVDZS5PDlSwy9mz4KMN0eKXn92bv6HDpKEuZQ__",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth <= 640) {
        setCardsPerSlide(1);
      } else if (window.innerWidth <= 768) {
        setCardsPerSlide(2);
      } else {
        setCardsPerSlide(3);
      }
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);

    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsPerSlide >= items.length ? 0 : prevIndex + cardsPerSlide
    );
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:w-5/6 bg-none h-[30vh]">
      <div className="relative w-5/6 mx-auto overflow-hidden">
        {/* AfterSelection Items */}
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${(currentIndex / cardsPerSlide) * 100}%)`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 px-4"
              style={{ minWidth: `${100 / cardsPerSlide}%` }}
            >
              <div className="flex flex-col items-center justify-center bg-white border-[1px] border-[#B9B9B9]  shadow-[0px_0px_8px_#C9FFFC] rounded-[30px] h-[25vh]">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-[15vh] h-[15vh] pb-[2vh]"
                />
                <p className=" text-gray-600 text-center text-[1.8vh] leading-[2vh]">{item.title}</p>
                <h3 className="text-center text-gray-600 mt-[1vh] font-bold text-[1.8vh] max-w-[65%] leading-[2vh]">{item.description}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex space-x-2 mt-4">
        {Array(Math.ceil(items.length / cardsPerSlide))
          .fill()
          .map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * cardsPerSlide)}
              className={`p-[1vh] rounded-full ${currentIndex / cardsPerSlide === index
                ? "bg-black"
                : "bg-gray-300"
                }`}
            ></button>
          ))}
      </div>
    </div>
  );
};

export default Carousel;