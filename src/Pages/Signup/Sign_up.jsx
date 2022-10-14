import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { ApiPost, ApiPostNoAuth } from '../../Api/Api';
import {toast } from 'react-toastify';
import Loader from '../../Componets/Loader/Loader';
import { useTranslation } from 'react-i18next';


const Sign_up = () => {
  const selected = localStorage.getItem("i18nextLng") || "en";
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [age, setAge] = React.useState('');
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    Confirmpassword: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  console.log("values", values);

  const handleChange2 = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "agree"){
      setData({...data,agree:e.target.checked})
    }else{
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    number: "",
    nationality: "",
    password: "",
    Confirmpass: "",
    gender: "female",
    agree:false
  })
  const [errors, setError] = useState({});
  const [country, setCountry] = useState([]);
  const [massage,setmassage] =useState("")
  const validateForm = () => {
    console.log("valid");
    let errors = {};
    let formIsValid = true;
    if (!data?.firstname) {
      formIsValid = false;
      errors["firstname"] = `${t("form.signup_modal.firstname_error")}`;
    }
    if (!data?.lastname) {
      formIsValid = false;
      errors["lastname"] = `${t("form.signup_modal.lastname_error")}`;
    }
    if (!data?.number) {
      formIsValid = false;
      errors["number"] = `${t("form.signup_modal.number_error")}`;
    }else if(data?.number?.length !== 10){
      formIsValid = false;
      errors["numbers"] = `${t("form.signup_modal.number_error2")}`;
    }
    if (!data?.nationality && data?.gender === "female") {
      formIsValid = false;
      errors["nationality"] = `${t("form.signup_modal.nationality_error")}`;
    }
    if (!data?.password) {
      formIsValid = false;
      errors["password"] = `${t("form.signup_modal.password_error")}`;
    }else if (data?.password?.length < 5) {
      formIsValid = false;
      errors["passwords"] = `${t("form.signup_modal.password_error2")}`;
    }
    if (!data?.Confirmpass) {
      formIsValid = false;
      errors["Confirmpass"] = `${t("form.signup_modal.con_password_error")}`;
    }else if(data?.password !== data?.Confirmpass){
      formIsValid = false;
      errors["Confirmpassmatch"] = `${t("form.signup_modal.con_password_error2")}`;
    }
    if (!data?.gender) {
      formIsValid = false;
      errors["gender"] = `${t("form.signup_modal.gender_error")}`;
    }
    if (!data?.agree) {
      formIsValid = false;
      errors["agree"] = `${t("form.signup_modal.agree_error")}`;
    }
    setError(errors);

    return formIsValid;
  };
  console.log("data?.nationality",data?.nationality);
  const submitData = () => {
    if (validateForm()) {
      setLoading(true)
      var body = {
        params: {
          f_name: data?.firstname,
          l_name: data?.lastname,
          mobile: data?.number,
          gender: data?.gender === "male" ? "M" : "F",
          nationality_id: data?.nationality,
          password: data?.password,
          password_confirmation: data?.Confirmpass
        },
      };
      console.log("body",body);
      ApiPostNoAuth("girl-register", body)
      .then((res) => {
        console.log("--------------------------------------------", res);
        setmassage(res?.data?.success)
        setData({
          firstname: "",
          lastname: "",
          number: "",
          nationality: "",
          password: "",
          Confirmpass: "",
          gender: ""
        })
        navigate("/otp",{
          state:{number:data?.number}
        })
        setLoading(false)
      })
      .catch(async (err) => {
        console.log("aaaaaa",err);
        setmassage(err?.data?.mobile && err?.data?.mobile[0])
        setLoading(false)
      });
    }
  }
  useEffect(() => {
    window.scroll(0, 0)
    ApiPost("nationalities", {})
      .then((res) => {
        console.log("-------------country-------------------------------", res);
        setCountry(res?.data?.result?.nationalities)
      })
      .catch(async (err) => {
        console.log("a",err);
      });
  }, [])

  console.log("data",data);
  return (
    <div className='Sign_up'>
      {loading && <Loader />}
      <Grid container>
        <Grid xs={12} md={5} >
          <div className='sinu-up-card2 '>
            <Card >
              <CardContent>
                <Typography className='Banner_card' gutterBottom variant="h5" component="div">
                {t("form.signup_modal.title")}
                </Typography>
                {<span className="errorBox">
                          {massage}
                        </span>}
                <Typography variant="body2" color="text.secondary">
                  <Grid container>
                    <Grid xs={12} sm={6} className="pe-2">
                      <TextField dir={`${selected === "ar" && "rtl"}`} id="firstname" name='firstname' value={data?.firstname} onChange={handleChange} label={`${t("form.signup_modal.first_name")}`} variant="standard" />
                      <span className="errorInput">
                          {data?.firstname?.length > 0 ? "" : errors["firstname"]}
                        </span>
                    </Grid>
                    <Grid xs={12} sm={6}>
                      <TextField dir={`${selected === "ar" && "rtl"}`} id="lastname" name='lastname' value={data?.lastname} onChange={handleChange} label={`${t("form.signup_modal.last_name")}`} variant="standard" />
                      <span className="errorInput">
                          {data?.lastname?.length > 0 ? "" : errors["lastname"]}
                        </span>
                    </Grid>
                    <Grid xs={12}>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">{t("form.signup_modal.gender")}</FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="gender"
                          id="gender" value={data?.gender} onChange={handleChange}
                        >
                          <FormControlLabel value="female" control={<Radio />} label={`${t("form.signup_modal.female")}`} />
                          <FormControlLabel value="male" control={<Radio />} label={`${t("form.signup_modal.male")}`} />
                        </RadioGroup>
                      </FormControl>
                        <span className="errorInput">
                          {data?.gender?.length > 0 ? "" : errors["gender"]}
                        </span>
                    </Grid>
                    <Grid xs={12} className="mb-3">
                      <TextField dir={`${selected === "ar" && "rtl"}`} id="number" name='number' value={data?.number} onChange={handleChange} label={`${t("form.signup_modal.number")}`} variant="standard" />
                      <span className="errorInput">
                          {data?.number?.length > 0 ? "" : errors["number"]}
                        </span>
                      <span className="errorInput">
                          {data?.number?.length === 10 ? "" : errors["numbers"]}
                        </span>
                    </Grid>
                    {data?.gender === "female" && <Grid xs={12} className="mb-3">
                      <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">{t("form.signup_modal.nationality")}</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="nationality" name='nationality' value={data?.nationality} onChange={handleChange}
                          // label="Age"
                        >
                          {country?.map((e) => {
                            return <MenuItem value={e?.id}>{e?.en_short_name}</MenuItem>
                          })}
                        </Select>
                        <span className="errorInput">
                          {data?.nationality?.length > 0 && data?.gender !== "female" ? "" : errors["nationality"]}
                        </span>
                      </FormControl>
                    </Grid>}
                    <Grid xs={12} className="mb-3">
                      <FormControl sx={{ width: '25ch' }} variant="standard">
                        <InputLabel dir={`${selected === "ar" && "rtl"}`} htmlFor="standard-adornment-password">{t("form.signup_modal.password")}</InputLabel>
                        <Input
                        dir={`${selected === "ar" && "rtl"}`}
                          type={values.showPassword ? 'text' : 'password'}
                          id="password" name='password' value={data?.password} onChange={handleChange}
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
                          {data?.password?.length > 5 ? "" : errors["passwords"]}
                        </span>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} className="mb-4">
                      <FormControl sx={{ width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">{t("form.signup_modal.con_password")}</InputLabel>
                        <Input
                        dir={`${selected === "ar" && "rtl"}`}
                          type={values.showConfirmPassword ? 'text' : 'password'}
                          id="Confirmpass" name='Confirmpass' value={data?.Confirmpass} onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownConfirmPassword}
                              >
                                {!values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <span className="errorInput">
                          {data?.Confirmpass?.length > 0 ? "" : errors["Confirmpass"]}
                        </span>
                        <span className="errorInput">
                          {data?.Confirmpass && (data?.Confirmpass === data?.password) ? "" : errors["Confirmpassmatch"]}
                        </span>
                      </FormControl>
                    </Grid>
                    <Grid xs={12}>
                      <div class="form-check d-flex">
                        <input class="form-check-input check_box" type="checkbox"  id="agree" name='agree' value={data?.agree} onChange={handleChange} />
                        <label class="form-check-label" for="agree" className='agree'>
                        {t("form.signup_modal.agree1")} <a href="#" className='com_color'>{t("form.signup_modal.agree2")}</a> {t("form.signup_modal.agree3")}
                          <a href="#" className='com_color'> {t("form.signup_modal.agree4")} </a>
                        </label>
                      </div>
                        <span className="errorInput">
                          {data?.agree ? "" : errors["agree"]}
                        </span>
                    </Grid>
                  </Grid>
                </Typography>
                <Button className='Custom_Btn mt-2 w-100 mb-2 mt-4' onClick={submitData}>{t("form.signup_modal.sign")}</Button>
              </CardContent>
              <span className='agree d-flex justify-content-center '>{t("form.signup_modal.already")}&nbsp; <span className='com_color cursor_pointer' onClick={() => navigate("/login")}> {t("form.signup_modal.Login_btn")}</span></span>
            </Card>
          </div>
        </Grid>
        <Grid xs={12} md={7} className="fixed_img">
          <img src={process.env.PUBLIC_URL + "/assest/Images/image 2.png"} alt="" />
        </Grid>
      </Grid>
    </div>
  )
}

export default Sign_up