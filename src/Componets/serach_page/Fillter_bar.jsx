import { Container, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import { ApiPost } from '../../Api/Api';
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
  
const Fillter_bar = () => {
  const selected = localStorage.getItem("i18nextLng") || "en";
  const [data, setData] = useState({
    nationality:""
  })
    const [currency, setCurrency] = React.useState(' ');
    const [value, setValue] = React.useState('');
    const [country, setCountry] = useState([]);
    console.log("data",data);
    useEffect(() => {
      window.scroll(0, 0)
      ApiPost("nationalities", {})
        .then((res) => {
          setCountry(res?.data?.result?.nationalities)
        })
        .catch(async (err) => {
          console.log("a",err);
        });
    }, [])

  const handleChangeinput = (event) => {
    setValue(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target
            setData({
                ...data,
                [name]: value,
            });
  };
  return (
    <div className='serach_bar'>
        <Container>
        <TextField
          dir={`${selected === "ar" && "rtl"}`}
          id="outlined-multiline-flexible"
          label="Keywords"
          name='keyword'
          placeholder='Keywords'
          value={data?.keyword}
          onChange={handleChange}
          focused
        />
        <TextField
          dir={`${selected === "ar" && "rtl"}`}
          id="outlined-select-currency"
          select
          name='nationality'
          label="Nationality"
          value={data?.nationality}
          onChange={handleChange}
          focused
          style={{color:"red"}}
        >
          
          {country?.map((e) => {
                            return <MenuItem value={e?.id}>{e?.en_short_name}</MenuItem>
                          })}
        </TextField>
        <TextField
      dir={`${selected === "ar" && "rtl"}`}
      
          id="outlined-select-Age"
          select
          label="Age"
          value={currency}
          onChange={handleChange}
          focused
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
      dir={`${selected === "ar" && "rtl"}`}
      
          id="outlined-select-weight"
          select
          label="Weight"
          value={currency}
          onChange={handleChange}
          focused
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
      dir={`${selected === "ar" && "rtl"}`}
      
          id="outlined-select-height"
          select
          label="Height"
          value={currency}
          onChange={handleChange}
          focused
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
      dir={`${selected === "ar" && "rtl"}`}
      
          id="outlined-select-interests"
          select
          placeholder='Select'
          label="Interests"
          value={currency}
          onChange={handleChange}
          focused
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <span className='search_btn'><FiSearch /></span>
        </Container>
    </div>
  )
}

export default Fillter_bar