import React , { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { allUsers } from '../services/allapi'
import { BASE_URL } from '../services/baseUrl';

function View() {

  const [showspin, setshowspin] = useState(true)

  const[user,setuser]=useState({})

//to get id 
  const {id}=useParams()
  console.log(id);


  


  useEffect(() => {

    getuser()

    setTimeout(() => {

      setshowspin(false)

    }, 1000);
  }, [])


  // api call for  get single user
  const getuser=async()=>{
    const {data}=await allUsers("")
    // console.log(data);

   // to print one data 
    // console.log(data.find(item=>item._id===id));
    setuser(data.find(item=>item._id===id))
  }

  console.log(user);

  return (
    <>
      {
        showspin?
        <LoadingSpinner/>:
        <div className='container ' style={{ height: "80vh" }}>
        {

          user?

          <Card className='shadow col-lg-6 ms-auto mt-5 p-3 '>

          {/* image */}
          <div className='text-center'>

            <img style={{ width: "80px", height: "80px", borderRadius: "50%" }} src={`${BASE_URL}/uploads/${user.profile}`} alt="no image" />

          </div>

          {/* content */}

          <div className='text-center'>
            <h3>{user.fname}{user.lname}</h3>
            <h5>Email: {user.email}</h5>
            <h5>Phone No: {user.mobile}</h5>
            <h5>Gender: {user.gender}</h5>
            <h5>Status: {user.status}</h5>
            <h5>Location: {user.location}</h5>
          </div>
        </Card> :""

        }
      </div>}

    </>
  )
}

export default View