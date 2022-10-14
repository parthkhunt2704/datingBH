import React from 'react'
import Sign_up_card from './Sign_up_card'
import { Box, Container, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next';

const Banner = () => {
  const { t } = useTranslation();
  return (
    <div className='Home_Banner'>
      <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7} className="Banner_Content">
          <h1>{t("home.banner.banner_title_1")}<span className='com_color'> {t("home.banner.banner_title_2")}</span></h1>
          <p>{t("home.banner.banner_text")}</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <Sign_up_card />
        </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Banner