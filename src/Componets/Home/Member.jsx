import { Container } from '@mui/material'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import { useTranslation } from 'react-i18next';

const Member = () => {
  const { t } = useTranslation();
  return (
    <div className='mb-5'>
        <Container className='Member_content'>
            <h1>
            {t("home.member.title_1")}
            <span>
            {t("home.member.title_2")}
            </span>
            </h1>
            <p className='mt-3'> {t("home.member.text_1")}</p>
            <p>  {t("home.member.text_2")}</p>
            <h5 className='com_color mb-4'> {t("home.member.swiper_title")}</h5>
            <Swiper
          slidesPerView={3}
          // spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true
          }}
          navigation={true}
          
          modules={[Navigation]}
          breakpoints={{
            430: {
              slidesPerView: 4,
              // spaceBetween: 20,
            },
            480: {
              slidesPerView: 5,
              // spaceBetween: 20,
            },
            768: {
              slidesPerView: 7,
              // spaceBetween: 20,
            },
            1024: {
              slidesPerView: 8,
              // spaceBetween: 0,
            },
          }}
          className="mySwiper"
        >
          <SwiperSlide><img className='img' src="http://placeimg.com/90/90/beby" alt="" /></SwiperSlide>
          <SwiperSlide><img className='img' src="http://placeimg.com/90/90/dog" alt="" /></SwiperSlide>
          <SwiperSlide><img className='img' src="http://placeimg.com/90/90/any" alt="" /></SwiperSlide>
          <SwiperSlide><img className='img' src="http://placeimg.com/90/90/car" alt="" /></SwiperSlide>
          <SwiperSlide><img className='img' src="http://placeimg.com/90/90/bus" alt="" /></SwiperSlide>
          <SwiperSlide><img className='img' src="http://placeimg.com/90/90/apple" alt="" /></SwiperSlide>
          <SwiperSlide><img className='img' src="http://placeimg.com/90/90/banana" alt="" /></SwiperSlide>
          <SwiperSlide><img className='img' src="http://placeimg.com/90/90/broken" alt="" /></SwiperSlide>
          <SwiperSlide><img className='img' src="http://placeimg.com/90/90/love" alt="" /></SwiperSlide>
        </Swiper>
        </Container>
    </div>
  )
}

export default Member