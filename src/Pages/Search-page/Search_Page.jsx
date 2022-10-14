import { Button, Container, Grid, Menu, MenuItem, Pagination, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Fillter_bar from '../../Componets/serach_page/Fillter_bar';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Cards from '../../Componets/serach_page/Card';
import { ApiPost } from '../../Api/Api';

import { makeStyles } from '@material-ui/styles';
import { TextField } from '@mui/material'
import { FiSearch } from 'react-icons/fi';
import Loader from '../../Componets/Loader/Loader';
import No_Data_Found from '../../Componets/noDataFound/No_Data_Found';
import { useTranslation } from 'react-i18next';
const currencies = [
  {
    value: ' ',
    label: 'Select',
  },
  {
    value: 'India',
    label: 'India',
  },
  {
    value: 'Germany',
    label: 'Germany',
  }
];



const ITEM_HEIGHT = 48;

const Search_Page = () => {
  const selected = localStorage.getItem("i18nextLng") || "en";
  const { t } = useTranslation();
  const options = [
    {
      lable: `${t("search.rj")}`,
      value: "rj"
    },
    {
      lable: `${t("search.htl")}`,
      value: "htl"
    },
    {
      lable: `${t("search.lth")}`,
      value: "lth"
    },
    ,
  ];
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [interests, setinterests] = useState([])
  const heights = [
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
    200]
  const age = [18, 19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40]
  const weights = [
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99]
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [serachdata, setserachData] = useState({
    nationality: "",
    keyword: "",
    interest: "",
    height: "",
    age: "",
    weight: "",
  })
  const [totalUser, setTotalUser] = useState(0);
  const [value, setValue] = React.useState('');
  const [sortby, setSortby] = useState("rj")
  const [country, setCountry] = useState([]);
  const [totalpage, settotalpage] = useState(0);
  const [currentpage, setcurrentpage] = useState(1);
  console.log("datadatadatadatadata", data);
  useEffect(() => {
    window.scroll(0, 0)
    ApiPost("interest", {})
      .then((res) => {
        console.log("----------interest----------------------------------", res);
        setinterests(res?.data?.result?.interest)
      })
      .catch(async (err) => {
        console.log("interest", err);
      });
    ApiPost("nationalities", {})
      .then((res) => {
        setCountry(res?.data?.result?.nationalities)
      })
      .catch(async (err) => {
        console.log("a", err);
      });
  }, [])

  const handleChangeinput = (event) => {
    setValue(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setserachData({
      ...serachdata,
      [name]: value,
    });
  };
  const handlePageChange = (e, i) => {
    console.log(i);
    searchUser(i);
  };
  useEffect(() => {
    searchUser(currentpage)
  }, [])

  const searchUser = (page) => {
    setLoading(true)
    const body = {
      params: {
        keyword: serachdata?.keyword,
        age: serachdata?.age,
        nationality: serachdata?.nationality,
        weight: serachdata?.weight,
        height: serachdata?.height,
        lnterest: serachdata?.interest,
        page,
        limit:9
      }
    }
    ApiPost("search-profile", body)
      .then((res) => {
        console.log("datadatadatadatadata", res);
        setData(res?.data?.result?.users)
        setLoading(false)
        setTotalUser(res?.data?.total_user)
        settotalpage(res?.data?.last_page);
        setcurrentpage(res?.data?.page);
      })
      .catch(async (err) => {
        console.log("search", err);
        setLoading(false)
      });
  }

  const handleChange2 = async (e) => {
    console.log("eee",e.target.value);
    await setSortby(e.target.value)
  }
  const sort_by = () => {
    setLoading(true)
    var formData = new FormData();
    formData.append("shortby", sortby);
    formData.append("limit", 9);
    formData.append("page", currentpage);
    ApiPost("short-by", formData)
      .then((res) => {
        console.log("---short_by-", res);
        setData(res?.data?.result?.users)
        settotalpage(res?.data?.last_page);
        setcurrentpage(res?.data?.page);
        setLoading(false)
      })
      .catch(async (err) => {
        console.log("search", err);
        setLoading(false)
      });
  }
  useEffect(() => {
    sort_by()
  }, [sortby])
  
  return (
    <>
      {loading && <Loader />}
      <div className="desk_fil">
        <div className='serach_bar'>
          <Container>
            <TextField
              id="outlined-multiline-flexible"
              label={`${t("search.keyword")}`}
              name='keyword'
              placeholder={`${t("search.keyword")}`}
              value={serachdata?.keyword}
              onChange={handleChange}
              dir={`${selected === "ar" && "rtl"}`}
              focused
            />
            <TextField
              id="outlined-select-currency"
              select
              name='nationality'
              label={`${t("search.nationality")}`}
              value={serachdata?.nationality}
              onChange={handleChange}
              focused
              style={{ color: "red" }}
            >

              {country?.map((e) => {
                return <MenuItem value={e?.id}>{e?.en_short_name}</MenuItem>
              })}
            </TextField>
            <TextField

              id="outlined-select-Age"
              select
              label={`${t("search.age")}`}
              name='age'
              value={data?.age}
              onChange={handleChange}
              focused
            >
              {age.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField

              id="outlined-select-weight"
              select
              label={`${t("search.weight")}`}
              name='weight'
              value={serachdata?.weight}
              onChange={handleChange}
              focused
            >
              {weights.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField

              id="outlined-select-height"
              select
              label={`${t("search.height")}`}
              name='height'
              value={serachdata?.height}
              onChange={handleChange}
              focused
            >
              {heights.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField

              id="outlined-select-interests"
              select
              placeholder='Select'
              label={`${t("search.interests")}`}
              name='interest'
              value={serachdata?.interest}
              onChange={handleChange}
              focused
            >
              {interests.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.interest}
                </MenuItem>
              ))}
            </TextField>
            <span className='search_btn' onClick={() => searchUser(currentpage)}><FiSearch /></span>
          </Container>
        </div>
      </div>

      <div className="fillter_result">
        <Container>
          <div className='filter_res'>
            <h1>{t("search.Showing")} {data?.length} {t("search.of")} {totalUser} {t("search.results")} </h1>
            <div className="sort_by">
              <span>{t("search.sort")}: </span>
              <TextField
                hiddenLabel
                id="outlined-select-currency"
                select
                name='sortby'
                value={sortby}
                onChange={handleChange2}
                focused
              >
                {options?.map((e) => {
                  return <MenuItem value={e?.value}>{e?.lable}</MenuItem>
                })}
              </TextField>
            </div>
            <div className="mob_fil">
              <button data-bs-toggle="collapse" className='collapse_btn' data-bs-target="#demo">Filter</button>
              <div id="demo" class="collapse posi_ab">
                <div className='serach_bar'>
                <Container>
            <TextField
              id="outlined-multiline-flexible"
              label={`${t("search.keyword")}`}
              name='keyword'
              placeholder={`${t("search.keyword")}`}
              value={serachdata?.keyword}
              onChange={handleChange}
              dir={`${selected === "ar" && "rtl"}`}
              focused
            />
            <TextField
              id="outlined-select-currency"
              select
              name='nationality'
              label={`${t("search.nationality")}`}
              value={serachdata?.nationality}
              onChange={handleChange}
              focused
              style={{ color: "red" }}
            >

              {country?.map((e) => {
                return <MenuItem value={e?.id}>{e?.en_short_name}</MenuItem>
              })}
            </TextField>
            <TextField

              id="outlined-select-Age"
              select
              label={`${t("search.age")}`}
              name='age'
              value={data?.age}
              onChange={handleChange}
              focused
            >
              {age.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField

              id="outlined-select-weight"
              select
              label={`${t("search.weight")}`}
              name='weight'
              value={serachdata?.weight}
              onChange={handleChange}
              focused
            >
              {weights.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField

              id="outlined-select-height"
              select
              label={`${t("search.height")}`}
              name='height'
              value={serachdata?.height}
              onChange={handleChange}
              focused
            >
              {heights.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField

              id="outlined-select-interests"
              select
              placeholder='Select'
              label={`${t("search.interests")}`}
              name='interest'
              value={serachdata?.interest}
              onChange={handleChange}
              focused
            >
              {interests.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.interest}
                </MenuItem>
              ))}
            </TextField>
            <span className='search_btn' onClick={searchUser}><FiSearch /></span>
          </Container>
                </div>
              </div>
            </div>
          </div>
          <Grid container spacing={4} >
            {data?.length === 0 ? <No_Data_Found />:
              <>
                {data.map((e) => {
                  return (
                    <>{e?.headline && <Grid item xs={12} sm={6} md={6} lg={4}>
                      <Cards data={e} />
                    </Grid>}</>
                  )
                })
                }
              </>}
          </Grid>
          <Stack spacing={2}>
            {/* <Pagination count={4} variant="outlined" /> */}
            <Pagination
                    count={totalpage}
                    page={currentpage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    className="pagination_"
                  />
          </Stack>
        </Container>

      </div>
    </>

  )
}

export default Search_Page