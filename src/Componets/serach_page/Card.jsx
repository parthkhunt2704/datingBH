import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import moment from 'moment';
import { getFileImage } from '../../Api/Api';


const Cards = ({ data }) => {
  const navigate = useNavigate()
  const age = moment(Date.now()).format("YYYY") - moment(data?.dob).format("YYYY")
  console.log("datadata", data);
  return (
    <Card className='search_card'>
      <CardContent>
        <div className="card-content" style={{ background: "linear-gradient(0deg, #000000 -0.39%, rgba(0, 0, 0, 0) 38.83%)" }}>
          {data?.user_picture.map((e) => {
            return (
              <img className='w-100 h-100 back_img' src={data?.user_picture ? getFileImage(
                "storage/app/public/images/profile_images/" +
                e?.picture_name
              ) : ""} alt="Image not Found" />
            )
          })}
          <div className="eye_icon" onClick={() => navigate(`/profile/${data?.id}`,{
            state:{id:data?.id}
          })}>
            <AiOutlineEye />
          </div>
          <div className="details">
            <h6 className='cursor_pointer' onClick={() => navigate(`/profile/${data?.id}`,{
            state:{id:data?.id}
          })}> {data?.f_name} - {age}</h6>
            <div className="d-flex justify-content-between flex-wrap">
              <p><img className='img' src={process.env.PUBLIC_URL + "/assest/Images/height.svg"} alt="" srcset="" /> Height : {data?.height} cm</p>
              <p><img src={process.env.PUBLIC_URL + "/assest/Images/waight.svg"} alt="" srcset="" /> Weight : {data?.weight} kg</p>
            </div>
            <div className="d-flex flex-wrap">
              {data?.user_interest.map((e) => {
                return (
                  <>
                    {e?.interest[0]?.interest && <div className="hobbies">
                      {e?.interest[0]?.interest}
                    </div>}
                  </>
                )
              })}
              {/* <div className="hobbies more_hobi">
                +10
                </div> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Cards