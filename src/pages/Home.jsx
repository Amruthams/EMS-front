import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hometable from '../components/Hometable'
import LoadingSpinner from '../components/LoadingSpinner'
import { registerContext } from './Contextshare'
import Alert from 'react-bootstrap/Alert';
import { allUsers, deleteUser } from '../services/allapi'





function Home() {


  const [allUserData,setallUserData]=useState([])

  const { registerData, setregisterData } = useContext(registerContext)

  const [showspin, setshowspin] = useState(true)


  //to search employee
  const[search,setsearch]=useState("")

  useEffect(() => {

    // call getAllEmployees

    getAllEmployees()


    setTimeout(() => {

      setshowspin(false)

    }, 1000);
  }, [search])




  //function defintion for get all data

  const getAllEmployees=async()=>{

    const response= await allUsers(search)
    console.log(response);
    setallUserData(response.data)
  }



  //delete employee

  const removeUser=async(id)=>{
    const response=await deleteUser(id)
    console.log(id);

    if (response.status===200){
      getAllEmployees()
    }
    else{
      alert("Operation Failed !! Please try after some time")
    }

  }


  return (

    <>

      {
        registerData && <Alert variant='success' onClose={() => setregisterData("")} dismissible>
          {registerData.fname.toUpperCase()} Registered Successfully.......
        </Alert>



      }



      {
        showspin ?
          <LoadingSpinner /> :
          <div className='container'>

            <div className='search-all d-flex align-items-center'>

              <div className='search d-flex algn-items-center mt-4'>

                <span className='fw-bolder mt-2'>Search</span>

                <input type="text" onChange={e=>setsearch(e.target.value)} placeholder='Search by employee name' className='form-control ms-3' style={{ width: "400px" }} />
              </div>


              <Link to={'/add'} className='btn btn-success ms-auto  mt-4'> Add <i class="fa-solid fa-user-plus"></i></Link>
            </div>

            <div className='table mt-5'>

              <h1 className='fw-boider'>List of all Employess</h1>

              <Hometable displayData={allUserData} removeuser={removeUser}/>
            </div>



          </div>

      }
    </>
  )
}

export default Home