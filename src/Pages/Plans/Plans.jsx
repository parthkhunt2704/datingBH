import { Button, Card, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ApiPost } from '../../Api/Api'

const Plans = () => {
    const { t } = useTranslation();
    const [data, setData] = useState([])
    const userData = JSON.parse(localStorage.getItem("userinfo"))
    const Buy_plan = (e) => {
        console.log("eeeee", e);
        const body = {
            params: {
                package_id: e?.id
            }
        }
        ApiPost("buy-package", body)
            .then((res) => {
                console.log("res", res);
            })
            .catch(async (err) => {
                console.log("a", err);
            });
    }
    useEffect(() => {
        ApiPost("package", {})
            .then((res) => {
                console.log("res", res);
                setData(res?.data?.result?.packages)
            })
            .catch(async (err) => {
                console.log("a", err);
            });
    }, [])

    return (
        <div>
            <div className="profile_Header">
                <h1>{t("buy_plan.title")}</h1>
                <p>{t("buy_plan.text")}</p>

                <Container>
                    <div className="profile_card ">
                        <Card>
                            <Grid container spacing={2}>
                                {data.map((e) => {
                                    return (
                                        <Grid item sx={12} sm={6} md={4} className="w-100">
                                            <div className="plan_box">
                                                <div className="main_box">
                                                    <div className="label_box">
                                                        {e?.name}
                                                    </div>
                                                </div>
                                                <h1>${e?.price}</h1>
                                                <p>{e?.no_of_contact_view} {t("buy_plan.card_text")}</p>
                                                <Button className='Custom_Btn w-100 mb-2 me-3' onClick={() => Buy_plan(e)}>{t("buy_plan.card_button")}</Button>
                                            </div>
                                        </Grid>
                                    )
                                })

                                }
                            </Grid>
                        </Card>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Plans