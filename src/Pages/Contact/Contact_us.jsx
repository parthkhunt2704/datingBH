import { Button, Card, Container, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { BsInstagram,BsYoutube,BsTwitter,BsFacebook } from 'react-icons/bs';
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

const Contact_us = () => {
  const selected = localStorage.getItem("i18nextLng") || "en";
  const { t } = useTranslation();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    number: "",
    email: "",
    massage: ""
  })
  const [errors, setError] = useState({});

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


  const validateForm = () => {
    console.log("valid");
    let errors = {};
    let formIsValid = true;
    if (!data?.firstname) {
      formIsValid = false;
      errors["firstname"] = `${t("contact.error.f_name")}`
    }
    if (!data?.lastname) {
      formIsValid = false;
      errors["lastname"] = `${t("contact.error.l_name")}`
    }
    if (!data?.number) {
      formIsValid = false;
      errors["number"] =`${t("contact.error.number")}`
    }else if(data?.number?.length !== 10){
      formIsValid = false;
      errors["numbers"] = `${t("contact.error.number_2")}`
    }
    if (!data?.massage) {
      formIsValid = false;
      errors["massage"] = `${t("contact.error.massage")}`
    }
    if (!data?.email) {
      formIsValid = false;
      errors["email"] = `${t("contact.error.email")}`
    }else if(!data?.email.match(validRegex)){
      formIsValid = false;
      errors["emails"] = `${t("contact.error.email_2")}`
    }
    setError(errors);

    return formIsValid;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const submitData = () => {
    if (validateForm()) {
      alert("succes")
    }
  }
  return (
    <>
      <div className='faq_main Conatct_main'>
        <h1>{t("contact.title")}</h1>
        <p>{t("contact.bredcumb1")}   <RiArrowRightSLine />    {t("contact.bredcumb2")}</p>
      </div>
      <Container>
        <Card className='faq_card about_info '>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={12} md={6}>
              <Grid container spacing={2} className="profile_card">
                <Grid item xs={12} sm={6} md={6}>
                  <div className="d-flex input_lable flex-column">
                    <label>{t("contact.f_name")}</label>
                    <TextField dir={`${selected === "ar" && "rtl"}`} hiddenLabel id="firstname" name="firstname" value={data?.firstname} onChange={handleChange} placeholder={`${t("contact.placeholder.name")}`} variant="outlined" />
                    <span className="errorInput">
                          {data?.firstname?.length > 0 ? "" : errors["firstname"]}
                        </span>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="d-flex input_lable flex-column">
                    <label>{t("contact.l_name")}</label>
                    <TextField dir={`${selected === "ar" && "rtl"}`} hiddenLabel id="lastname" name='lastname' value={data?.lastname} onChange={handleChange} placeholder={`${t("contact.placeholder.name")}`} variant="outlined" />
                    <span className="errorInput">
                          {data?.lastname?.length > 0 ? "" : errors["lastname"]}
                        </span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="d-flex input_lable flex-column">
                    <label>{t("contact.email")}</label>
                    <TextField dir={`${selected === "ar" && "rtl"}`} hiddenLabel id="email" name='email' value={data?.email} onChange={handleChange} placeholder={`${t("contact.placeholder.email")}`} variant="outlined" />
                    <span className="errorInput">
                          {data?.email?.length > 0 ? "" : errors["email"]}
                        </span>
                    <span className="errorInput">
                          {data?.email.match(validRegex) ? "" : errors["emails"]}
                        </span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="d-flex input_lable flex-column">
                    <label>{t("contact.number")}</label>
                    <TextField dir={`${selected === "ar" && "rtl"}`} hiddenLabel id="number" name='number' value={data?.number} onChange={handleChange} placeholder={`${t("contact.placeholder.number")}`} variant="outlined" />
                    <span className="errorInput">
                          {data?.number?.length > 0 ? "" : errors["number"]}
                        </span>
                      <span className="errorInput">
                          {data?.number?.length === 10 ? "" : errors["numbers"]}
                        </span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="d-flex input_lable flex-column">
                    <label>{t("contact.massage")}</label>
                    <TextField dir={`${selected === "ar" && "rtl"}`} multiline
                      rows={3}
                      maxRows={4}
                      hiddenLabel id="massage" name='massage' value={data?.massage} onChange={handleChange} placeholder={`${t("contact.placeholder.massage")}`} variant="outlined" />
                      <span className="errorInput">
                          {data?.massage?.length > 0 ? "" : errors["massage"]}
                        </span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Button className='Custom_Btn w-100 mb-2 mt-2 me-3' onClick={submitData}>{t("contact.button")}</Button>
                </Grid>

              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Card className='card_contact'>
                <div>
                  <p className='Footer_add align-items-center d-flex'><img className='me-2' src={process.env.PUBLIC_URL + "/assest/Images/map-pin.png"} alt="" srcset="" /> {t("contact.reach")}</p>
                  <h6 className='mt-sm-3 mb-sm-4 ms-3 mt-1 mb-2'>{t("contact.reach_text")}</h6>      </div>
                <div>
                  <p className='Footer_add align-items-center d-flex'><img className='me-2' src={process.env.PUBLIC_URL + "/assest/Images/phone.png"} alt="" srcset="" />
                  {t("contact.call")}</p>
                  <h6 className='mt-sm-3 mb-sm-4 ms-3 mt-1 mb-2'>{t("contact.call_text")}</h6>
                </div>
                <div>
                  <p className='Footer_add align-items-center d-flex'><img className='me-2' src={process.env.PUBLIC_URL + "/assest/Images/mail.png"} alt="" srcset="" />
                  {t("contact.e_mail")}</p>
                  <h6 className='mt-sm-3 mb-sm-4 ms-3 mt-1 mb-2'>{t("contact.E_mail_text")}</h6>
                </div>
                <hr />
                <p className='mt-4'>{t("contact.social")}</p>
                <div className="footer_end">
        <ul>
            <li><BsFacebook size={25} /></li>
            <li><BsTwitter size={25} /></li>
            <li><BsYoutube size={25} /></li>
            <li><BsInstagram size={25} /></li>
        </ul>
    </div>

              </Card>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

export default Contact_us