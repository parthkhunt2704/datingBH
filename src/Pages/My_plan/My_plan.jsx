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

const My_plan = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([])
  const [totalpage, settotalpage] = useState(0);
  const [currentpage, setcurrentpage] = useState(1);
  useEffect(() => {
    myPlan(currentpage)
}, [])
const myPlan = (page) => {
  const body = {
    params: {
      page,
      limit:9
    }
  }
  ApiPost("my-plan", body)
  .then((res) => {
      console.log("res",res);
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
  myPlan(i);
};
  return (
    <div>
    <div className="profile_Header">
        <h1>{t("my_plan.title")}</h1>
        <p>{t("my_plan.text")}</p>

        <Container>
            <div className="profile_card ">
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">{t("table_header.plan")}</TableCell>
            <TableCell align="left">{t("table_header.amount")}</TableCell>
            <TableCell align="left">{t("table_header.purchased_on")}</TableCell>
            <TableCell align="center">{t("table_header.contact_view")}</TableCell>
            <TableCell align="center">{t("table_header.contact_view_used")}</TableCell>
            <TableCell align="center">{t("table_header.contact_view_remaining")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.length === 0 && <No_Data_Found />}
          {data.map((row) => (
            <TableRow
              key={row.Plan}
            >
              <TableCell  align="left">
                {row?.package?.name}
              </TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{moment(row?.created_at).format("DD-MM-YYYY")}</TableCell>
              <TableCell align="center">{row.no_of_contact_view}</TableCell>
              <TableCell align="center">{row.no_of_contact_view_used}</TableCell>
              <TableCell align="center">{row.no_of_contact_view - row.no_of_contact_view_used }</TableCell>
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

export default My_plan