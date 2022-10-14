import { Container, Grid } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import Sign_up_card from './Sign_up_card'

const Cards = () => {
    const { t } = useTranslation();
  return (
    <div className='Card_color mb-4'>
        <Container>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={4 }md={4} lg={4} >
            <div className="card_content py-4 border-bottom">
        <img src={process.env.PUBLIC_URL + "/assest/Images/Mask group.svg"} alt="" />
        <span className='ms-3'>{t("home.card.text")}</span>
            </div>
        </Grid>
        <Grid item xs={12} sm={4 }md={4} lg={4}>
            <div className="card_content border py-sm-4 py-1 border-bottom-0 border-top-0">
        <img src={process.env.PUBLIC_URL + "/assest/Images/Mask group (1).svg"} alt="" />
        <span className='ms-3'>{t("home.card.text")}</span>
            </div>
        </Grid>
        <Grid item xs={12} sm={4 }md={4} lg={4}>
            <div className="card_content py-4 border-top">
        <img src={process.env.PUBLIC_URL + "/assest/Images/Mask group (2).svg"} alt="" />
        <span className='ms-3'>{t("home.card.text")}</span>
            </div>
        </Grid>
        </Grid>
        </Container>
    </div>
  )
}

export default Cards