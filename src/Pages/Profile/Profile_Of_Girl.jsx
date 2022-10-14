import { Button, Card, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlineEye,AiOutlineCopy } from 'react-icons/ai';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Navigation, Pagination } from "swiper";
import { useLocation, useNavigate, useParams } from 'react-router';
import { ApiPost, getFileImage } from '../../Api/Api';
import moment from 'moment';
import Loader from '../../Componets/Loader/Loader';
import No_Data_Found from '../../Componets/noDataFound/No_Data_Found';

const Profile_Of_Girl = () => {
    const [showNumber, setShowNumber] = useState(false)
    const [msg, setMsg] = useState("")
    const { id } = useParams()
    console.log("id",id);
  const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const userData = JSON.parse(localStorage.getItem("userinfo"))
    const [data, setData] = useState()
    const [similarProfile, setSimilarProfile] = useState([])
    const age = moment(Date.now()).format("YYYY") - moment(data?.dob).format("YYYY")
    console.log("data", data);
    useEffect(() => {
        window.scroll(0, 0)
        setLoading(true)
        var formData = new FormData();
        formData.append("id", userData?.id);
        ApiPost(`show-profile/${id}`, formData)
            .then((res) => {
                setData(res?.data?.result?.users)
                setLoading(false)
            })
            .catch(async (err) => {
                console.log("a", err);
                setLoading(false)
            });
        var formData = new FormData();
        formData.append("id", id);
        ApiPost("similar-profile", formData)
            .then((res) => {
                setSimilarProfile(res?.data?.result?.users)
            })
            .catch(async (err) => {
                console.log("a", err);
            });
    }, [id])
    console.log("similar", similarProfile);

    const view_info = () => {
        const body = {
            params: {
                female_user_id: JSON.parse(id)
            }
          }
        ApiPost("show-contact", body)
            .then((res) => {
                console.log("res",res);
                setShowNumber(true)
            })
            .catch(async (err) => {
                console.log("a", err);
                navigate("/buy-plans")
            });
    }
    const copy_number = () => {
        console.log("000000000");
        navigator.clipboard.writeText(data?.mobile)
        setMsg("copied to clipboard!")
    }
   useEffect(() => {
    setTimeout(() => {
        setMsg("")
    }, 5000);
   }, [msg])
   

    return (
        <div className='Profile_page'>
            {loading && <Loader />}
            <div className="extra_part"></div>
            <Container className='profilecard'>
                <Card>
                    <Grid container>
                        <Grid xs={12} sm={12} md={6}>
                            <div className="profile_swiper">
                                <Swiper
                                    slidesPerView={2}
                                    spaceBetween={30}
                                    loop={true}
                                    navigation={true}
                                    modules={[Navigation]}
                                    className="mySwiper"
                                >
                                    {data?.user_picture.map((e) => {
                                        return (
                                            <SwiperSlide><img src={getFileImage(
                                                "storage/app/public/images/profile_images/" +
                                                e?.picture_name
                                            )} alt="" /></SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={6}>
                            <div className="profile_swiper pe-5 pb-5">
                                <h1>{data?._fname} {data?.l_name} - {age}</h1>
                                <h6>{data?.headline}</h6>
                                <div className="w_100"></div>
                                <div className="w_43"></div>
                                <ul>
                                    <li><img src={process.env.PUBLIC_URL + '/assest/Images/Profile/1.png'} className='img_profile' />{data?.user_nationalite?.nationality}</li>
                                    <li><img src={process.env.PUBLIC_URL + '/assest/Images/Profile/5.png'} className='img_profile' />{data?.user_language?.map(e => e?.language[0]?.languages + ",")}</li>
                                    <li><img src={process.env.PUBLIC_URL + '/assest/Images/Profile/4.png'} className='img_profile' />Body type : {data?.user_body_type?.body_types}</li>
                                    <li><img src={process.env.PUBLIC_URL + '/assest/Images/Profile/3.png'} className='img_profile' />Weight: {data?.weight} kg</li>
                                    <li><img src={process.env.PUBLIC_URL + '/assest/Images/Profile/2.png'} className='img_profile' />Height : {data?.height} cm</li>
                                    {showNumber && <li><img src={process.env.PUBLIC_URL + '/assest/Images/call.svg'} className='img_profile' /> {data?.mobile} <AiOutlineCopy title='Copy this number' className='mx-2 cursor_pointer' size={25} onClick={() =>  copy_number()} /> {msg}</li>}
                                </ul>
                                {!showNumber && <Button className='Custom_Btn profile_btn mt-2 w-100 mb-2 me-3' onClick={view_info}><img src={process.env.PUBLIC_URL + '/assest/Images/Profile/btn.svg'} className='btn_img' /> View Contact Info</Button>}
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
            <Container>
                <div className="about_me pb-4">
                    <h1>About me</h1>
                    <Card className='profile_about'>
                        <p>{data?.about_me}</p>
                        <h6>Interests</h6>
                        <div className="d-flex flex-wrap">
                            {data?.user_interest.map((e) => {
                                return (
                                    <div className="hobbies">
                                        {e?.interest[0]?.interest}
                                    </div>
                                )
                            })}
                        </div>
                    </Card>
                    <h1 className='mt-5'>Similar profile</h1>
                    <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunT.</h5>
                    {similarProfile.length === 0 && <No_Data_Found />}
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={similarProfile.length > 2 && true}
                        pagination={{
                            clickable: true
                        }}
                        modules={[Pagination]}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                        className="mySwiper"
                    >
                        {similarProfile.map((e) => {
                            return (
                                <SwiperSlide>
                                    <div className="card">
                                        <div className="eye_icon" onClick={() => navigate(`/profile/${e?.id}`, {
                                            state: { id: e?.id }
                                        })}>
                                            <AiOutlineEye />
                                        </div>
                                        {e?.user_picture.map((e) => {
                                            return (
                                                <>
                                                    {e?.defult === "Y" && <img className="ser_img" src={getFileImage(
                                                        "storage/app/public/images/profile_images/" +
                                                        e?.picture_name
                                                    )} alt="" />}
                                                </>
                                            )
                                        })}
                                        <h5>{e?.f_name} - {moment(Date.now()).format("YYYY") - moment(e?.dob).format("YYYY")}</h5>
                                        <p>Height : {e?.height} cm   |   Weight : {e?.weight} kg</p>
                                        <hr />
                                        <div className="d-flex flex-wrap">
                                            {e?.user_interest.map?.((e) => {
                                                return (
                                                    <div className="hobbies">
                                                        {e?.interest[0]?.interest}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </Container>
        </div>

    )
}

export default Profile_Of_Girl