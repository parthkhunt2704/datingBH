import { Container } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { BsInstagram,BsYoutube,BsTwitter,BsFacebook } from 'react-icons/bs';
import { useNavigate } from 'react-router';

const Footer = () => {
    const navigate = useNavigate()
    const { t } = useTranslation();
  return (
    <>
    <div className='Footer py-4'>
    <img src={process.env.PUBLIC_URL + '/assest/Images/logo-2.svg'} />
        <ul>
            <li><a href="#">{t("navbar.about")}</a></li>
            <li><a href="#">{t("navbar.contact")}</a></li>
            <li><a href="#">{t("navbar.faq")}</a></li>
            <li><a href="#">{t("navbar.Privacy_Policy")}</a></li>
            <li><a href="#">{t("navbar.Terms")}</a></li>
        </ul>
        <div className='d-flex align-items-center justify-content-center flex-wrap'>
            {/* <span className='me-4'>
                <p className='Footer_add'><img className='me-2' src={process.env.PUBLIC_URL + "/assest/Images/Home.svg"} alt="" srcset="" /> 29 New Preston Drive, Oskaloosa,ia, 52533  United States</p>
            </span> */}
            <span className='d-flex align-items-center me-4'>
                <img src={process.env.PUBLIC_URL + "/assest/Images/Mail.svg"} alt="" srcset="" />
                <p className='Footer_add'>{t("navbar.email")}</p>
            </span>
            {/* <span className='d-flex align-items-center me-4'>
                <img src={process.env.PUBLIC_URL + "/assest/Images/phone.svg"} alt="" srcset="" />
                <p className='Footer_add'>+91 9876541321 , 033 32145 256</p>
            </span> */}
        </div>
    </div>
    <div className="footer_end">
        <Container>
        <div className='d-flex justify-content-between'>
        <p>{t("navbar.footer1")} <span className='com_color text-underline'>{t("navbar.footer2")}</span></p>
        <ul>
            <li><BsFacebook size={25} /></li>
            <li><BsTwitter size={25} /></li>
            <li><BsYoutube size={25} /></li>
            <li><BsInstagram size={25} /></li>
        </ul>
        </div>
        </Container>
    </div>
    </>
  )
}

export default Footer