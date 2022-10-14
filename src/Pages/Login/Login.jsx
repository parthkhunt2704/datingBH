import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ApiPost, ApiPostNoAuth } from '../../Api/Api';
import Loader from '../../Componets/Loader/Loader';

const Login = () => {
  const selected = localStorage.getItem("i18nextLng") || "en";
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [errors, setError] = useState({});
  const [massage, setmassage] = useState("");
  const [loading, setLoading] = useState(false)
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [data, setData] = useState({
    number: "",
    password: "",
    remember_me: false,
  })
  console.log("values", values);
  useEffect(() => {
    window.scroll(0, 0)
  }, [])


  const handleChange2 = (e) => {
    const { name, value } = e.target;
    if (name === "remember_me") {
      setData({ ...data, remember_me: e.target.checked })
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };
  console.log("data", data);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validateForm = () => {
    console.log("valid");
    let errors = {};
    let formIsValid = true;
    if (!data?.number) {
      console.log("a");
      formIsValid = false;
      errors["number"] = `${t("form.signup_modal.number_error")}`;
    } else if (data?.number?.length !== 10) {
      formIsValid = false;
      errors["numbers"] =`${t("form.signup_modal.number_error2")}`;
    }
    if (!data?.password) {
      console.log("a");
      formIsValid = false;
      errors["password"] = `${t("form.signup_modal.password_error")}`;
    } else if (data?.password?.length < 6) {
      formIsValid = false;
      errors["passwords"] = `${t("form.signup_modal.password_error2")}`;
    }
    setError(errors);

    return formIsValid;
  };
  const submitData = () => {
    if (validateForm()) {
      setLoading(true)
      var body = {
        params: {
          mobile: data?.number,
          password: data?.password,
          remember_me: data?.remember_me
        },
      };
      console.log("body", body);
      ApiPostNoAuth("login", body)
        .then((res) => {
          console.log("--------------------------------------------", res);
          setmassage(res?.data?.user?.is_mobile_verified !== "Y" && "unverify")
          {res?.data?.user?.is_mobile_verified === "Y" && localStorage.setItem("access_tocken", JSON.stringify(res?.data?.access_token))}
          {res?.data?.user?.is_mobile_verified === "Y" && localStorage.setItem("userinfo", JSON.stringify(res?.data?.user))}
          {res?.data?.user?.is_mobile_verified === "Y" && localStorage.setItem("interest", JSON.stringify(res?.data?.interest))}
          {res?.data?.user?.is_mobile_verified === "Y" && localStorage.setItem("language", JSON.stringify(res?.data?.language))}
          {res?.data?.user?.is_mobile_verified === "Y" && localStorage.setItem("picture", JSON.stringify(res?.data?.picture))}
          navigate(res?.data?.user?.is_mobile_verified === "Y" && (res?.data?.user?.gender === "F" ? "/profile-info" : "/boy-profile"))
          setLoading(false)
        })
        .catch(async (err) => {
          console.log("a", err);
          setmassage(err?.error)
          setLoading(false)
        });
    }
  }
  const OtpScreen = () => {
    navigate( "/otp",{
      state:{number:data?.number}
    })
  }
  return (
    <div className='Sign_up'>
      
      <Grid container>
        <Grid xs={12} md={5} >
          <div className='sinu-up-card2 '>
            <Card >
              <CardContent>
                <Typography className='Banner_card' gutterBottom variant="h5" component="div">
                {t("form.login_title")}
                </Typography>
                {<span className="errorBox">
                  {massage === "unverify" ? "" : massage}
                </span>}
                {massage === "unverify" && <div className='unverify'>{t("form.login_verify1")} <span onClick={OtpScreen}>{t("form.login_verify2")}</span></div>
                }
                <Typography variant="body2" color="text.secondary">
                  <Grid container>
                    <Grid xs={12} className="mb-3">
                      <TextField dir={`${selected === "ar" && "rtl"}`} type="number" name='number' value={data?.number} onChange={handleChange2} id="number" label={`${t("form.signup_modal.number")}`} variant="standard" />
                      <span className="errorInput">
                        {data?.number?.length > 0 ? "" : errors["number"]}
                      </span>
                      <span className="errorInput">
                        {data?.number?.length === 10 ? "" : errors["numbers"]}
                      </span>
                    </Grid>
                    <Grid xs={12} className="">
                      <FormControl sx={{ width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="password">{t("form.signup_modal.password")}</InputLabel>
                        <Input
                        dir={`${selected === "ar" && "rtl"}`}
                          id="password"
                          type={values.showPassword ? 'text' : 'password'}
                          value={data.password}
                          name="password"
                          onChange={handleChange2}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {!values.showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <span className="errorInput">
                          {data?.password?.length > 0 ? "" : errors["password"]}
                        </span>
                        <span className="errorInput">
                          {data?.password?.length > 6 ? "" : errors["passwords"]}
                        </span>
                      </FormControl>
                    </Grid>
                    <Grid xs={12}>
                      <FormGroup>
                        {/* <FormControlLabel control={<Checkbox  />} label={<span className='agree'>Remember Me</span>} /> */}
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" name='remember_me' id="defaultCheck1" value={data?.remember_me} onChange={handleChange2} />
                          <label class="form-check-label" for="defaultCheck1" className='agree'>
                            {t("form.signup_modal.remember")}
                          </label>
                        </div>
                        <Typography className='forgot_pass_lable' gutterBottom variant="p" component="div">
                          {t("form.signup_modal.forgot")}
                        </Typography>
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Typography>
                <Button className='Custom_Btn w-100 mb-2 mt-4' onClick={submitData}>{t("form.signup_modal.Login_btn")}</Button>
              </CardContent>
              <span className='agree d-flex justify-content-center '>{t("form.signup_modal.not")} &nbsp;<span className='com_color cursor_pointer' onClick={() => navigate("/signup")}> {t("form.signup_modal.sign")}</span></span>
            </Card>
          </div>
        </Grid>
        <Grid xs={12} md={7} className="fixed_img">
          <img src={process.env.PUBLIC_URL + "/assest/Images/image 3.png"} alt="" />
        </Grid>
      </Grid>
    </div>
  )
}

export default Login