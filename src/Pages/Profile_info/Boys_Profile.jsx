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
    const userpicture = JSON.parse(localStorage.getItem("picture"))
    const [image, setImage] = useState([])
    const [data, setData] = useState({
        f_name: "",
        l_name: ""
    })
    const [massage, setmassage] = useState("")
    const [loading, setLoading] = useState(false)
    const [sendImage, setSendImage] = useState([])
    const [errors, setError] = useState({});
    const onImageChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
        setSendImage([e.target.files[0]])
    };
    const handleChange = (e) => {
        const { name, value } = e.target
            setData({
                ...data,
                [name]: value,
            });
    };
    const validateForm = () => {
        console.log("valid");
        let errors = {};
        let formIsValid = true;
        if (!data?.f_name) {
            formIsValid = false;
            errors["f_name"] = `${t("form.signup_modal.firstname_error")}`;
        }
        if (!data?.l_name) {
            formIsValid = false;
            errors["l_name"] = `${t("form.signup_modal.lastname_error")}`;
        }
        if (image.length < 2) {
            formIsValid = false;
            errors["image"] = `${t("form.signup_modal.image_error")}`;
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
            formData.append("f_name", data?.f_name);
            formData.append("l_name", data?.l_name);
            for (const key in sendImage) {
                formData.append(
                    "p_picture[" + key + "]",
                    sendImage[key]
                );
            }
            await ApiPost("boys-profile-update", formData)
                .then((res) => {
                    console.log("---------body-----------------------------------", res);
                    toast.success(res?.data?.success)
                    setLoading(false)
                    localStorage.setItem("userinfo", JSON.stringify(res?.data?.result?.user))
                    localStorage.setItem("picture", JSON.stringify(res?.data?.picture))
                    dataSave()
                    // window.location.reload()
                })
                .catch(async (err) => {
                    console.log("body", err);
                    toast.error(err?.error)
                    setLoading(false)
                });
        }
    }

    const dataSave = () => {
        setData({
            ...data,
            f_name: userData?.f_name,
            l_name: userData?.l_name
        })
        setImage(userpicture[0])
    }
    useEffect(() => {
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
                                <Grid item xs={12} sm={12} md={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <div className="name">
                                                <h6>{userData?.f_name} {userData?.l_name}</h6>
                                                <div className="d-flex flex-wrap align-items-center">
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
                                                <label>{t("form.signup_modal.first_name")}:</label>
                                                <TextField dir={`${selected === "ar" && "rtl"}`} id="f_name" name='f_name' value={data?.f_name} onChange={handleChange} hiddenLabel variant="outlined" />
                                                <span className="errorInput">
                                                    {data?.f_name?.length > 0 ? "" : errors["f_name"]}
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="d-flex input_lable flex-column">
                                                <label>{t("form.signup_modal.last_name")}:</label>
                                                <TextField dir={`${selected === "ar" && "rtl"}`} id="l_name" name='l_name' value={data?.l_name} onChange={handleChange} hiddenLabel variant="outlined" />
                                                <span className="errorInput">
                                                    {data?.l_name?.length > 0 ? "" : errors["l_name"]}
                                                </span>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <div className="Img_Upload">
                                        <label className="Upload_box" for="inputTag">
                                            <img src={process.env.PUBLIC_URL + '/assest/Images/Profile/upload-cloud.svg'} alt="" />
                                            <span className='com_color'>{t("form.uploade_text1")}</span>
                                            <p> {t("form.uploade_text2")}</p>
                                            <input type="file" id='inputTag' className='display_none' accept="image/*" onChange={onImageChange} />
                                        </label>
                                        <p className='note'>
                                        <span className="errorInput">
                                                    {data?.image?.length > 0 ? "" : errors["image"]}
                                                </span>
                                        </p>
                                    </div>
                                    <Grid container spacing={2}>
                                                <Grid item xs={6} sm={6} md={4} className="uploade_img">
                                                    <img src={image?.preview ? image?.preview : getFileImage(
                                                        "storage/app/public/images/profile_images/" +
                                                        image.picture_name
                                                    )} alt="" />
                                                </Grid>
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