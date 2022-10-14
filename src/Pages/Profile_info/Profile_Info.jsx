import { Card, Container, FormControl, Grid, InputLabel, MenuItem, TextField, Select as Selected, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import 'antd/dist/antd.css';
import { DatePicker, Select } from 'antd';
import { ApiPost, getFileImage } from '../../Api/Api';
import { toast } from 'react-toastify';
import Loader from '../../Componets/Loader/Loader';
import moment from 'moment';
import { useTranslation } from 'react-i18next';


const { Option } = Select;
const Profile_Info = () => {
    const selected = localStorage.getItem("i18nextLng") || "en";
    const { t } = useTranslation();
    const userData = JSON.parse(localStorage.getItem("userinfo"))
    const userinterest = JSON.parse(localStorage.getItem("interest"))
    const userlanguage = JSON.parse(localStorage.getItem("language"))
    const userpicture = JSON.parse(localStorage.getItem("picture"))
    const [image, setImage] = useState([])
    const [heights, setheights] = useState([
        110,
        111,
        112,
        113,
        114,
        115,
        116,
        117,
        118,
        119,
        120,
        121,
        122,
        123,
        124,
        125,
        126,
        127,
        128,
        129,
        130,
        131,
        132,
        133,
        134,
        135,
        136,
        137,
        138,
        139,
        140,
        141,
        142,
        143,
        144,
        145,
        146,
        147,
        148,
        149,
        150,
        151,
        152,
        153,
        154,
        155,
        156,
        157,
        158,
        159,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        174,
        175,
        176,
        177,
        178,
        179,
        180,
        181,
        182,
        183,
        184,
        185,
        186,
        187,
        188,
        189,
        190,
        191,
        192,
        193,
        194,
        195,
        196,
        197,
        198,
        199,
        200])
    const [data, setData] = useState({
        headline: "",
        month: "",
        date: "",
        year: "",
        weight: "",
        height: "",
        bodytype: [],
        about: ""
    })
    const [massage, setmassage] = useState("")
    const [loading, setLoading] = useState(false)
    const [language, setlanguage] = useState([])
    const [languages, setlanguages] = useState(userlanguage ? userlanguage.map(e => e?.language[0]?.id) : [])
    const [interest, setinterest] = useState(userinterest ? userinterest.map(e => e?.interest[0]?.id) : [])
    const [interests, setinterests] = useState([])
    const [bodytypes, setBodytypes] = useState([])
    const [sendImage, setSendImage] = useState([])
    const [errors, setError] = useState({});
    console.log("data", data);
    const onImageChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage([...image, img])

        setSendImage([...sendImage, e.target.files[0]])
    };
    const deleteImage = (e) => {
        var body = {
            params: {
                user_id: userData?.id,
                picture_id: e?.id,
            },
        };
        ApiPost("delete-picture", body)
            .then((res) => {
                localStorage.setItem("picture", JSON.stringify(res?.data?.picture))
                console.log("---------------delete-----------------------------", res);
                dataSave()
            })
            .catch(async (err) => {
                console.log("delete", err);
            });
        console.log("e", e);
        setImage(image.filter(y => y != e))
        setSendImage(sendImage.filter(y => y != e?.data))
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "bodytype") {
            setData({
                ...data,
                [name]: [value],
            });
        } else {

            setData({
                ...data,
                [name]: value,
            });
        }
    };

    const handleChange2 = (e) => {
        console.log(e);
        setlanguages(e)
    }
    const handleInterest = (e, v) => {
        console.log("vvvv", v.target.checked);
        if (v.target.checked) {
            setinterest([...interest, e])
        } else {
            let dummy = interest.filter(y => y !== e)
            console.log("dummy", dummy);
            setinterest(dummy)
        }
    }
    const validateForm = () => {
        console.log("valid");
        let errors = {};
        let formIsValid = true;
        if (!data?.headline) {
            formIsValid = false;
            errors["headline"] = `${t("Girl_Profile.headline_error")}`;
        }
        if (data?.month === "Invalid date" && data?.date === "Invalid date"  && data?.year === "Invalid date" ) {
            formIsValid = false;
            errors["birthday"] = `${t("Girl_Profile.birth_error")}`
        } else if (!data?.month) {
            formIsValid = false;
            errors["month"] = `${t("Girl_Profile.month_error")}`
        } else if (!data?.date) {
            formIsValid = false;
            errors["date"] = `${t("Girl_Profile.date_error")}`
        } else if (!data?.year) {
            formIsValid = false;
            errors["year"] = `${t("Girl_Profile.year_error")}`
        }else if (data.month && JSON.parse(data?.month) > 12) {
            formIsValid = false;
            errors["months"] = `${t("Girl_Profile.month_error2")}`
        }else if (data.date && JSON.parse(data?.date) > 31) {
            formIsValid = false;
            errors["dates"] = `${t("Girl_Profile.date_error2")}`
        }
        if (languages?.length === 0) {
            formIsValid = false;
            errors["language"] = `${t("Girl_Profile.language_error")}`
        }
        if (!data?.weight) {
            formIsValid = false;
            errors["weight"] = `${t("Girl_Profile.weight_error")}`
        }
        if (JSON.parse(data?.weight) > 100) {
            formIsValid = false;
            errors["weights"] = `${t("Girl_Profile.weight_error2")}`
        }
        if (!data?.height) {
            formIsValid = false;
            errors["height"] = `${t("Girl_Profile.height_error")}`
        }
        if (data?.bodytype[0] === null) {
            formIsValid = false;
            errors["bodytype"] = `${t("Girl_Profile.body_error")}`
        }
        if (!data?.about) {
            formIsValid = false;
            errors["about"] = `${t("Girl_Profile.about_error")}`
        }
        if (interest.length === 0) {
            formIsValid = false;
            errors["interest"] = `${t("Girl_Profile.interests_error")}`
        }
        if (image.length < 2) {
            formIsValid = false;
            errors["image"] = `${t("Girl_Profile.upload_error")}`
        }
        setError(errors);

        return formIsValid;
    };
    const submitData = async () => {
        if (validateForm()) {
            window.scroll(0, 0)
            setLoading(true)
            const date = data?.year + "-" + data?.month + "-" + data?.date
            var formData = new FormData();
            formData.append("dob", date);
            formData.append("headline", data?.headline);
            formData.append("weight", data?.weight);
            formData.append("body_type_id", data.bodytype[0]);
            for (const key in languages) {
                formData.append(
                    "language_id[" + key + "]",
                    languages[key]
                );
            }
            for (const key in interest) {
                formData.append(
                    "interest_id[" + key + "]",
                    interest[key]
                );
            }
            for (const key in sendImage) {
                formData.append(
                    "p_picture[" + key + "]",
                    sendImage[key]
                );
            }
            formData.append("about_me", data?.about);
            formData.append("height", data?.height);
            await ApiPost("create-profile", formData)
                .then((res) => {
                    console.log("---------body-----------------------------------", res);
                    toast.success(res?.data?.success)
                    setLoading(false)
                    localStorage.setItem("userinfo", JSON.stringify(res?.data?.result?.user))
                    localStorage.setItem("interest", JSON.stringify(res?.data?.result?.interest))
                    localStorage.setItem("language", JSON.stringify(res?.data?.result?.language))
                    localStorage.setItem("picture", JSON.stringify(res?.data?.result?.picture))
                    dataSave()
                    window.location.reload()
                })
                .catch(async (err) => {
                    console.log("body", err);
                    toast.error(err?.error)
                    setmassage(err?.response?.data?.dob[0])
                    setLoading(false)
                });
        }
    }

    const dataSave = () => {
        setData({
            ...data,
            headline: userData?.headline,
            month: moment(userData?.dob).format("MM"),
            date: moment(userData?.dob).format("DD"),
            year: moment(userData?.dob).format("YYYY"),
            weight: userData?.weight,
            height: userData?.height,
            bodytype: [userData?.body_type_id],
            about: userData?.about_me
        })
        setImage(userpicture)
    }
    useEffect(() => {
        ApiPost("interest", {})
            .then((res) => {
                console.log("----------interest----------------------------------", res);
                setinterests(res?.data?.result?.interest)
            })
            .catch(async (err) => {
                console.log("interest", err);
            });
        ApiPost("language", {})
            .then((res) => {
                console.log("---------------language-----------------------------", res);
                setlanguage(res?.data?.result?.language)

            })
            .catch(async (err) => {
                console.log("language", err);
            });
        ApiPost("body_type", {})
            .then((res) => {
                console.log("---------------body_type-----------------------------", res);
                setBodytypes(res?.data?.result?.bodyType)
            })
            .catch(async (err) => {
                console.log("body_type", err);
            });
        dataSave()
    }, [])

    return (
        <div>
            {loading && <Loader />}

            <div className="profile_Header">
            <h1>{t("profile.title")}</h1>
                <p>{t("profile.text")}</p>

                <Container>
                    <div className="profile_card">
                        <Card>
                            {<span className="errorBox">
                                {massage}
                            </span>}
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={12} md={7}>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <div className="name">
                                                <h6>{userData?.f_name} {userData?.l_name}</h6>
                                                <div className="d-flex flex-wrap align-items-center">
                                                    <div className="div d-flex align-items-center">
                                                        <img src={process.env.PUBLIC_URL + '/assest/Images/loction.svg'} alt="" />
                                                        <span className='ms-1'>{userData?.user_nationalite?.en_short_name}</span>
                                                    </div>
                                                    <div className="div d-flex align-items-center ms-3">
                                                        <img src={process.env.PUBLIC_URL + '/assest/Images/user.svg'} alt="" />
                                                        <span className='ms-1'>{userData?.gender === "F" ? "Female" : "Male"}</span>
                                                    </div>
                                                    <div className="div d-flex align-items-center ms-sm-3">
                                                        <img src={process.env.PUBLIC_URL + '/assest/Images/call.svg'} alt="" />
                                                        <span className='ms-1'>{userData?.mobile}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="d-flex input_lable flex-column">
                                                <label>{t("Girl_Profile.headline")}</label>
                                                <TextField dir={`${selected === "ar" && "rtl"}`} id="headline" name='headline' value={data?.headline} onChange={handleChange} hiddenLabel variant="outlined" />
                                                <span className="errorInput">
                                                    {data?.headline?.length > 0 ? "" : errors["headline"]}
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="d-flex input_lable flex-column">
                                                <label>{t("Girl_Profile.birth")}</label>
                                                <div className="birthday">
                                                    <TextField dir={`${selected === "ar" && "rtl"}`} type="number" hiddenLabel id="month" name='month' value={data?.month} onChange={handleChange} placeholder='MM' variant="outlined" />

                                                    <TextField dir={`${selected === "ar" && "rtl"}`} type="number" hiddenLabel id="date" name='date' value={data?.date} onChange={handleChange} placeholder='DD' variant="outlined" />
                                                    <TextField dir={`${selected === "ar" && "rtl"}`} type="number" hiddenLabel id="year" name='year' value={data?.year} onChange={handleChange} placeholder='YYYY' variant="outlined" />
                                                    <span className="errorInput">
                                                        {data?.date !== "Invalid date"  && data?.year !== "Invalid date"  && data?.month !== "Invalid date"  ? "" : errors["birthday"]}
                                                    </span>
                                                    {data?.year?.length < 0 ? "" : <span className="errorInput">
                                                        {errors["year"]}
                                                    </span>}
                                                    {data?.month?.length < 0 ? "" : <span className="errorInput">
                                                        {errors["month"]}
                                                    </span>}
                                                    {data?.date?.length < 0 ? "" : <span className="errorInput">
                                                        {errors["date"]}
                                                    </span>}
                                                    <span className="errorInput">
                                                        {data?.month?.length < 0 ?  "" : errors["months"]}
                                                    </span>
                                                    <span className="errorInput">
                                                        {data?.date.length < 0 ? "" : errors["dates"]}
                                                    </span>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="d-flex input_lable flex-column language_margin">
                                                <label>{t("Girl_Profile.language")}</label>
                                                <Select
                                                dir={`${selected === "ar" && "rtl"}`}
                                                    mode="multiple"
                                                    size="large"
                                                    placeholder="Please select"
                                                    id="language"
                                                    defaultValue={userlanguage && userlanguage.map(e => e?.language[0]?.id)}
                                                    value={language?.languages} onChange={(e) => handleChange2(e)}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    {language.map((e) => {
                                                        return <Option value={e?.id}>{e?.languages}</Option>
                                                    })}
                                                </Select>
                                                <span className="errorInput">
                                                    {languages?.length !== 0 ? "" : errors["language"]}
                                                </span>
                                                <span className="errorInput">
                                                    {(languages?.length !== 0 && userlanguage?.length !== 0) ? "" : errors["userlanguage"]}
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={6}>
                                            <div className="d-flex input_lable flex-column">
                                                <label>{t("Girl_Profile.weight")}</label>
                                                <TextField id="weight" name='weight' value={data?.weight} onChange={handleChange} dir={`${selected === "ar" && "rtl"}`} type="number" hiddenLabel variant="outlined" />
                                                <span className="errorInput">
                                                    {data?.weight?.length > 0 ? "" : errors["weight"]}
                                                </span>
                                                <span className="errorInput">
                                                    {data?.weight && JSON.parse(data?.weight) < 100 ? "" : errors["weights"]}
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={6}>
                                            <div className="d-flex input_lable flex-column">
                                                <label>{t("Girl_Profile.height")}</label>
                                                <FormControl fullWidth>
                                                    <Selected
                                                    dir={`${selected === "ar" && "rtl"}`}
                                                        labelId="demo-simple-select-label"
                                                        id="height" name='height' value={data?.height} onChange={handleChange}
                                                        label="Age"
                                                    >
                                                        {heights.map((e) => {
                                                            return <MenuItem value={e}>{e}</MenuItem>
                                                        })}
                                                    </Selected>
                                                    <span className="errorInput">
                                                        {data?.height?.length > 0 ? "" : errors["height"]}
                                                    </span>
                                                </FormControl>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={6}>
                                            <div className="d-flex input_lable flex-column">
                                                <label>{t("Girl_Profile.body")}</label>
                                                <FormControl fullWidth>
                                                    <Selected
                                                    dir={`${selected === "ar" && "rtl"}`}
                                                        labelId="demo-simple-select-label"
                                                        id="bodytype" name='bodytype' value={data?.bodytype} onChange={handleChange}
                                                        label="Age"
                                                    >
                                                        {bodytypes.map((e) => {
                                                            return <MenuItem value={e?.id}>{e?.body_types}</MenuItem>
                                                        })}
                                                    </Selected>
                                                    <span className="errorInput">
                                                        {data?.bodytype[0] !== null ? "" : errors["bodytype"]}
                                                    </span>
                                                </FormControl>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="d-flex input_lable flex-column">
                                                <label>{t("Girl_Profile.about")}</label>
                                                <TextField dir={`${selected === "ar" && "rtl"}`} multiline
                                                    rows={2}
                                                    maxRows={4} hiddenLabel id="about" name='about' value={data?.about} onChange={handleChange} variant="outlined" />
                                                <span className="errorInput">
                                                    {data?.about?.length > 0 ? "" : errors["about"]}
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="d-flex input_lable flex-column">
                                                <label className='mb-2'>{t("Girl_Profile.interests")}</label>
                                                <Grid container spacing={1}>
                                                    {interests.map((e, i) => {
                                                        return (
                                                            <Grid item xs={6} sm={3} md={4} lg={3}>
                                                                <div class="form-check">
                                                                    <input class="form-check-input" type="checkbox" value={e?.interest} id={interest.map(y => y)} onChange={(v) => handleInterest(e?.id, v)} checked={interest.includes(e?.id) && true} />
                                                                    <label class="form-check-label" for={e?.id} className='agree'>
                                                                        {e?.interest}
                                                                    </label>
                                                                </div>
                                                            </Grid>
                                                        )
                                                    })}
                                                </Grid>
                                                <span className="errorInput">
                                                    {interest?.length !== 0 ? "" : errors["interest"]}
                                                </span>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            <Grid item xs={12} sm={12} md={5}>
                                    <div className="Img_Upload">
                                        <h6>{t("Girl_Profile.upload")}</h6>
                                        <p><span className='com_color'>{t("Girl_Profile.upload_text")}</span> {t("Girl_Profile.upload_text1")}</p>
                                        <label className="Upload_box" for="inputTag">
                                            <img src={process.env.PUBLIC_URL + '/assest/Images/Profile/upload-cloud.svg'} alt="" />
                                            <span className='com_color'>{t("form.uploade_text1")}</span>
                                            <p> {t("form.uploade_text2")}</p>
                                            <input type="file" id='inputTag' className='display_none' accept="image/*" onChange={onImageChange} />
                                        </label>
                                        
                                        <p className='note'>
                                        <span className="errorInput">
                                                    {data?.image?.length > 2 ? "" : errors["image"]}
                                                </span>
                                        </p>
                                    </div>
                                    <Grid container spacing={2}>
                                        {image && image.map((e) => {
                                            return (
                                                <Grid item xs={6} sm={3} md={6} lg={4} className="uploade_img">
                                                    <img src={e?.preview ? e?.preview : getFileImage(
                                                        "storage/app/public/images/profile_images/" +
                                                        e.picture_name
                                                    )} alt="" />
                                                    <div className="close_icon cursor_pointer"><IoClose onClick={() => deleteImage(e)} /></div>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <hr />
                            <div className="text-center">
                                <Button className='Custom_Btn mb-2 me-3' onClick={submitData}>{t("profile.button")}</Button>
                            </div>
                        </Card>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Profile_Info