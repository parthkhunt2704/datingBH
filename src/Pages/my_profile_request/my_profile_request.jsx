import { Container, Pagination, Stack } from '@mui/material'
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
import moment from 'moment';
import No_Data_Found from '../../Componets/noDataFound/No_Data_Found';
import { useTranslation } from 'react-i18next';

const My_profile_request = () => {
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
        limit: 9
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
      <h1>{t("profile_request.title")}</h1>
        <p>{t("profile_request.text")}</p>

        <Container>
          <div className="profile_card ">
            <TableContainer component={Paper}>
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
              <div className="table_pagination">
                <Stack spacing={2}>
                  <Pagination
                    count={totalpage}
                    page={currentpage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    className="pagination_"
                  />
                </Stack>
              </div>
            </TableContainer>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default My_profile_request