import { Card, Container, Grid } from '@mui/material'
import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const About = () => {
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);
    console.log("value", value);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className='faq_main about_main'>
                <h1>{t("about.title")}</h1>
                <p>{t("about.bredcumb1")}   <RiArrowRightSLine />    {t("about.bredcumb2")}</p>
            </div>
            <Container>
                <Card className='faq_card about_info'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6}><img className='h-100 w-100' src={process.env.PUBLIC_URL + "/assest/Images/about-info.png"} /></Grid>
                        <Grid item xs={12} sm={12} md={6} className="">
                            <h3>{t("about.main_text")}</h3>
                            <p>{t("about.text1")}</p>
                            <p>{t("about.text2")}</p>
                        </Grid>
                    </Grid>
                    <div className="Card_color">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} md={4} lg={4} >
                            <div className="card_content">
                                <img src={process.env.PUBLIC_URL + "/assest/Images/Mask group (8).svg"} alt="" />
                                <span className='ms-3'>{t("home.card.text")}</span>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <div className="card_content ">
                                <img src={process.env.PUBLIC_URL + "/assest/Images/Mask group (9).svg"} alt="" />
                                <span className='ms-3'>{t("home.card.text")}</span>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4}>
                            <div className="card_content">
                                <img src={process.env.PUBLIC_URL + "/assest/Images/Mask group (10).svg"} alt="" />
                                <span className='ms-3'>{t("home.card.text")}</span>
                            </div>
                        </Grid>
                    </Grid>
                    </div>
                    <Grid container spacing={2} className="Card_about">
                        <Grid item sx={12} sm={12} md={6}>
                            <Card>
                                <h2>{t("about.box1")}</h2>
                                <div className="red_bor"></div>
                                <hr />
                                <p>{t("about.box_text")}</p>
                            </Card>
                        </Grid>
                        <Grid item sx={12} sm={12} md={6}>
                            <Card>
                                <h2>{t("about.box2")}</h2>
                                <div className="red_bor"></div>
                                <hr />
                                <p>{t("about.box_text")}</p>
                            </Card>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    )
}

export default About