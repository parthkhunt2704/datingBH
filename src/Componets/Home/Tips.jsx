import { Container, Grid } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Tips = () => {
  const { t } = useTranslation();
  return (
    <div className='sixe mt-5'>
        <Container>
        <Grid container className="Dating_tips">
                  <Grid xs={12}>
                  <h1>
                  {t("home.tips.title_1")} <span> {t("home.tips.title_2")}</span>
                    </h1>
                    <p> {t("home.tips.title")}</p>

                    <ul>
                        <li className='d-flex'><span><img src={process.env.PUBLIC_URL + "/assest/Images/point.svg"} className='me-4' alt="" /></span><h6>
                        {t("home.tips.text_1")}
                        </h6> </li>
                        <li className='d-flex'><span><img src={process.env.PUBLIC_URL + "/assest/Images/point.svg"} className='me-4' alt="" /></span><h6>{t("home.tips.text_2")}</h6></li>
                        <li className='d-flex'><span><img src={process.env.PUBLIC_URL + "/assest/Images/point.svg"} className='me-4' alt="" /></span><h6>{t("home.tips.text_3")}</h6> </li>
                        <li className='d-flex'><span><img src={process.env.PUBLIC_URL + "/assest/Images/point.svg"} className='me-4' alt="" /></span><h6>{t("home.tips.text_4")}</h6></li>
                    </ul>
                  </Grid>
                </Grid>
        </Container>
    </div>
  )
}

export default Tips