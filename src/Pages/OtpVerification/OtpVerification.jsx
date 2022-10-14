import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import OtpInput from 'react-otp-input';
import { ApiPost } from '../../Api/Api';
import {toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const OtpVerification = () => {
    const { t } = useTranslation();
    const location = useLocation();
    console.log("number",location);
    const [errors, setError] = useState({});
    const [massage, setmassage] = useState("");
    const navigate = useNavigate()
    const [otp, setOtp] = useState({ otp: '' })
    const [saveotp, setsaveOtp] = useState(123456)
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });
    console.log("values", values);
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    const handleChange = (otp) => setOtp({ otp });


    const handleChange2 = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
console.log("otp?.otp.length",otp?.otp.length);
    const validateForm = () => {
        console.log("valid");
        let errors = {};
        let formIsValid = true;
        if (otp?.otp.length !== 6) {
            formIsValid = false;
            errors["otp"] = `${t("form.signup_modal.otp_error")}`;
        }
        setError(errors);

        return formIsValid;
    };
    const submitData = () => {
        if (validateForm()) {
            var body = {
                params: {
                  mobile: location?.state?.number, 
                  mobile_vcode:otp?.otp
                },
              };
              console.log("body",body);
              ApiPost("verify", body)
              .then((res) => {
                console.log("--------------------------------------------", res);
                // setsaveOtp(res?.data?.result?.otp)
                setmassage(res?.data?.success)
                navigate("/login")
              })
              .catch(async (err) => {
                console.log("a",err);
                {err?.error === 'Please Cheack Your Otp.' && setmassage("Please enter correct OTP.")}
              });
        }
    }
    const resend_otp = () => {
        var body = {
            params: {
              mobile: location?.state?.number, 
            },
          };
          console.log("body",body);
          ApiPost("resend_otp", body)
          .then((res) => {
            console.log("--------------------------------------------", res);
            setsaveOtp(res?.data?.result?.otp)
          })
          .catch(async (err) => {
            console.log("a",err);
          });
    }
    useEffect(() => {
        resend_otp()
    }, [])
    
    return (

        <div className='Sign_up'>
            <Grid container>
                <Grid xs={12} md={5} >
                    <div className='sinu-up-card2 Otp_card'>
                        <Card >
                            <CardContent>
                                <Typography className='Banner_card' gutterBottom variant="h5" component="div">
                                {t("form.otp_title")}
                                </Typography>
                                {<span className="errorBox">
                          {massage}
                        </span>}
                                <Typography className='number_details' gutterBottom variant="h5" component="div">
                                {t("form.otp_text")}
                                    {" " + location?.state?.number}
                                </Typography>
                                <Typography className='OTP_Details' gutterBottom variant="h5" component="div">
                                {t("form.otp_enter")}: {saveotp}
                                </Typography>
                                <Typography className='OTP' variant="body2" color="text.secondary">
                                    <OtpInput
                                        id="otp"
                                        name="otp"
                                        value={otp.otp}
                                        onChange={handleChange}
                                        numInputs={6}
                                        focusStyle={false}
                                    />
                                    <span className="errorInput">
                                        {otp?.otp?.length === 6 ? "" : errors["otp"]}
                                    </span>
                                </Typography>
                                <Button className='Custom_Btn w-100 mb-2 mt-5' onClick={submitData}>{t("form.otp_button")}</Button>
                            </CardContent>
                            <span className='agree d-flex justify-content-center '> {t("form.otp_bottom_text1")} &nbsp;<span className='com_color cursor_pointer' onClick={resend_otp} > {t("form.otp_bottom_text2")}</span></span>
                        </Card>
                    </div>
                </Grid>
                <Grid xs={12} md={7}>
                    <img src={process.env.PUBLIC_URL + "/assest/Images/otp.png"} alt="" />
                </Grid>
            </Grid>
        </div>
    )
}

export default OtpVerification