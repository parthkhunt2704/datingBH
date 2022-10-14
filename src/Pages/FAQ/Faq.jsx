import { Card, Container } from '@mui/material'
import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';

import Accrodions from '../../Componets/Faq_accrodion/Accrodion';
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

const Faq = () => {
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);
    console.log("value", value);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className='faq_main'>
                <h1>{t("faq.title")}</h1>
                <p>{t("faq.bredcumb1")}   <RiArrowRightSLine />    {t("faq.bredcumb2")}</p>
            </div>
            <Container>
                <Card className='faq_card'>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label={<div className='d-flex'><img className='me-3' src={value === 0 ? process.env.PUBLIC_URL + "/assest/Images/boys.svg" : process.env.PUBLIC_URL + "/assest/Images/boys-red.png"} alt="" />{t("faq.boy")}</div>} {...a11yProps(0)} />
                                <Tab label={<div className='d-flex'><img className='me-3' src={value === 1 ? process.env.PUBLIC_URL + "/assest/Images/girl-white.png" : process.env.PUBLIC_URL + "/assest/Images/girl.svg"} alt="" /> {t("faq.girl")}</div>} {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Accrodions />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Accrodions />
                        </TabPanel>
                    </Box>
                </Card>
            </Container>
        </>
    )
}

export default Faq