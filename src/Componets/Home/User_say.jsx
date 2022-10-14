import { Container } from '@material-ui/core'
import { Avatar, Grid } from '@mui/material'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { RiChatQuoteFill } from 'react-icons/ri';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import { useTranslation } from 'react-i18next';

const User_say = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className='user_back'>
      </div>
      <div className="back_black">
        <Container>
          <Grid container spacing={2}>
            <Grid xs={12} md={4} className="User_say">
              <h1 className='mt-3'>
              {t("home.user_say.title_1")}
                <span>{t("home.user_say.title_2")}</span>
              </h1>
              <p>
              {t("home.user_say.text_1")}
              </p>
            </Grid>
            <Grid xs={12} md={8} className="position-relative">
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                navigation={true}
                navigation={{
                  prevEl: '.prev',
                  nextEl: '.next',
                }}
                modules={[Navigation]}
                breakpoints={{
                  850: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
                className="mySwiper review_swiper"
              >
                <SwiperSlide>
                  <div className="card review_card">
                    <RiChatQuoteFill className="card_icon" />
                    <span className="color_gray color_black p-4 pb-0 text-center">{t("home.user_say.swiper_title")}</span>
                    <span className='span_none'>{t("home.user_say.swiper_title2")}</span>
                    <hr className="mb-0" />
                    <div className="text-center p-2">
                      <span className="color_red color_black">{t("home.user_say.swiper_name")}, <span className="color_gray color_black1">{t("home.user_say.swiper_bottom")}</span></span>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card review_card">
                    <RiChatQuoteFill className="card_icon" />
                    <span className="color_gray color_black p-4 pb-0 text-center">{t("home.user_say.swiper_title")}</span>
                    <span className='span_none'>{t("home.user_say.swiper_title2")}</span>
                    <hr className="mb-0" />
                    <div className="text-center p-2">
                      <span className="color_red color_black">{t("home.user_say.swiper_name")}, <span className="color_gray color_black1">{t("home.user_say.swiper_bottom")}</span></span>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="card review_card">
                    <RiChatQuoteFill className="card_icon" />
                    <span className="color_gray color_black p-4 pb-0 text-center">{t("home.user_say.swiper_title")}</span>
                    <span className='span_none'>{t("home.user_say.swiper_title2")}</span>
                    <hr className="mb-0" />
                    <div className="text-center p-2">
                      <span className="color_red color_black">{t("home.user_say.swiper_name")}, <span className="color_gray color_black1">{t("home.user_say.swiper_bottom")}</span></span>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="d-flex arrow">
                <div className="prev"><RiArrowLeftSLine /></div>
                <div className="next ms-4"><RiArrowRightSLine /></div>
              </div>
            </Grid>
          </Grid>
        </Container>

      </div></>
  )
}

export default User_say