import { Container, Pagination, Stack, Grid } from '@mui/material'
import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ApiPost } from '../../Api/Api';
import No_Data_Found from '../../Componets/noDataFound/No_Data_Found';
import moment from 'moment';
import { useTranslation } from 'react-i18next';


const rows = [
    {
        Name: 'Rabin Chatterjee',
        Date_and_Time: "14/05/2022 - (10:00 am)"
    },
    {
        Name: 'Rabin Chatterjee',
        Date_and_Time: "14/05/2022 - (10:00 am)"
    }
];
const Dashboard = () => {
    const { t } = useTranslation();
    const [data, setData] = useState([])
    const [totalpage, settotalpage] = useState(0);
    const [currentpage, setcurrentpage] = useState(1);
    useEffect(() => {
        contactRequest(currentpage)
    }, [])
    const contactRequest = (page) => {
        const body = {
            params: {
                page,
                limit: 9999
            }
        }
        ApiPost("contact-request", body)
            .then((res) => {
                console.log("res", res);
                setData(res?.data?.result)
                settotalpage(res?.data?.last_page);
                setcurrentpage(res?.data?.page);
            })
            .catch(async (err) => {
                console.log("a", err);
            });
    }
    const handlePageChange = (e, i) => {
        console.log(i);
        contactRequest(i);
    };
    return (
        <div>
            <div className="profile_Header">
                <h1>{t("dashborad.title")}</h1>
                <p>{t("dashborad.text")}</p>
                <Container>
                    <div className="profile_card dashboard ">
                        <Card>
                            <h2>Hi, Sangita </h2>
                            <span>Lorem ipsum dolor sit amet the consectetur it adipiscing the eiusmod tempor incididunt the caption laibore lorem ipsum dolor aaamet caption consectetur lorem ipsum dolor sit amet, consectetur the adipiscing caption. Lorem ipsum dolor sit amet the consectetur it adipiscing the eiusmod tempor.</span>
                            <Grid container spacing={2} className="mt-3">
                                <Grid item xs={12} sm={6} md={4}>
                                    <div className='box d-flex align-items-center position-relative'>
                                        <img className='ms-3 me-2' src={process.env.PUBLIC_URL + '/assest/Images/dashboard/1.svg'} alt="" />
                                        <div className="text">
                                            <h6>{t("dashborad.last")}</h6>
                                            <h1>14.06.2022</h1>
                                        </div>
                                        <div className="line1"></div>
                                        <div className="line2"></div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <div className='box d-flex align-items-center'>
                                        <img className='img2' src={process.env.PUBLIC_URL + '/assest/Images/dashboard/2.svg'} alt="" />
                                        <div className="text">
                                            <h6>{t("dashborad.sing")}</h6>
                                            <h1>10.02.2022</h1>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <div className='box d-flex align-items-center'>
                                        <img className='ms-3 me-2' src={process.env.PUBLIC_URL + '/assest/Images/dashboard/3.svg'} alt="" />
                                        <div className="text">
                                            <h6>{t("dashborad.profile")}</h6>
                                            <h1>10</h1>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <h3>{t("dashborad.view")}</h3>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">{t("table_header.name")}</TableCell>
                                        <TableCell align="left">{t("table_header.date_time")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.length === 0 && <No_Data_Found />}
                                    {data.map((row) => (
                                        <TableRow
                                            key={row.contact_user?.f_name}
                                        >
                                            <TableCell align="left">
                                                {row.contact_user?.f_name + " " + row.contact_user?.l_name}
                                            </TableCell>
                                            <TableCell align="left">{moment(row.date_viewed).format("DD-MM-YYYY" + " " + "HH:mm")}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>

                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Dashboard