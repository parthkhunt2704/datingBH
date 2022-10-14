import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Sign_up_card = () => {
  const selected = localStorage.getItem("i18nextLng") || "en";
  const { t } = useTranslation();
    const [data, setData] = useState({
        name: "",
        number: "",
        gender: ""
      })
      const [errors, setError] = useState({});
      const validateForm = () => {
        console.log("valid");
        let errors = {};
        let formIsValid = true;
        if (!data?.name) {
          formIsValid = false;
          errors["name"] = `${t("form.signup_modal.name_error")}`;
        }
        if (!data?.number) {
          formIsValid = false;
          errors["number"] = `${t("form.signup_modal.number_error")}`;
        }else if(data?.number?.length !== 10){
          formIsValid = false;
          errors["numbers"] = `${t("form.signup_modal.number_error2")}`;
        }
        if (!data?.gender) {
          formIsValid = false;
          errors["gender"] = `${t("form.signup_modal.gender_error")}`;
        }
        setError(errors);
    
        return formIsValid;
      };
      const submitData = () => {
        if (validateForm()) {
          alert("succes")
        }
      }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
    return (
        <div className='sinu-up-card'>
            <Card >
                <CardContent>
                    <Typography className='Banner_card' gutterBottom variant="h5" component="div">
                    {t("form.signup_modal.title")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <TextField dir={`${selected === "ar" && "rtl"}`} label={`${t("form.signup_modal.name")}`} name="name"
                          id="name" value={data?.name} onChange={handleChange} variant="standard" />
                        <span className="errorInput">
                          {data?.name?.length > 0 ? "" : errors["name"]}
                        </span>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">{t("form.signup_modal.gender")}</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"name="gender"
                                id="gender" value={data?.gender} onChange={handleChange}
                                
                            >
                                <FormControlLabel value="female" control={<Radio />} label={`${t("form.signup_modal.female")}`} />
                                <FormControlLabel value="male" control={<Radio />} label={`${t("form.signup_modal.male")}`} />
                            </RadioGroup>
                        </FormControl>
                            <span className="errorInput">
                          {data?.gender?.length > 0 ? "" : errors["gender"]}
                        </span>
                        <TextField dir={`${selected === "ar" && "rtl"}`} label={`${t("form.signup_modal.number")}`} name="number" type="number"
                          id="number" value={data?.number} onChange={handleChange} variant="standard" />
                        <span className="errorInput">
                          {data?.number?.length > 0 ? "" : errors["number"]}
                        </span>
                      <span className="errorInput">
                          {data?.number?.length === 10 ? "" : errors["numbers"]}
                        </span>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button className='Custom_Btn w-100 mt-4 me-3' onClick={submitData}>{t("form.signup_modal.button")}</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Sign_up_card