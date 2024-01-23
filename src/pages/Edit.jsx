
import React , { useContext,useEffect, useState }from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { addUser, allUsers, editUser } from '../services/allapi';
import { registerContext } from './Contextshare';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';


function Edit() {


  //context

  const { registerData, setregisterData } = useContext(registerContext)
  const navigate = useNavigate()


  const [showspin, setshowspin] = useState(true)

  //to hold normal user input
  const [normalInputs, setNormalUserInput] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  })


  const [status, setStatus] = useState("")     //to hold status 
  const [profile, setProfile] = useState("")
  const [preview, setPreview] = useState("")     //profile picture


  useEffect(() => {

    if (profile) {
      setexistingImg("")
      URL.createObjectURL(profile)
      setPreview(URL.createObjectURL(profile))
    }

    setTimeout(() => {
      setshowspin(false)
    }, 2000);
  }, [profile])



  //to get single item for edit

  const {id}=useParams()
  console.log(id);

  const [existingImg,setexistingImg]=useState("")

  useEffect(() => {
    getuser()
     
   }, [])

  //to get all employee details from database
  const getuser=async()=>{
    const {data}=await allUsers("")
    console.log(data);

    let existingUser=data.find(item=>item._id===id)
    // console.log(existingUser);
    setNormalUserInput(existingUser)
    setStatus(existingUser.status)
    setexistingImg(existingUser.profile)
  }



  // define normaluser inpiut function 

  const getandsetuserNormalInputs = (e) => {

    const { name, value } = e.target
    setNormalUserInput({ ...normalInputs, [name]: value })

  }


  //to handle file

  const handlefile = (e) => {
    // console.log(e.target.files[0]);

    setProfile(e.target.files[0])
  }

  // console.log(normalInputs);
  // console.log(status);
  // console.log(profile);



  

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];


  // define handlesubmit function

  const handleSubmit = async (e) => {

    e.preventDefault()

    // destructure normal inputs

    const { fname, lname, email, mobile, gender, location } = normalInputs;


    if (!fname || !lname || !email || !mobile || !gender || !status || !profile || !location) {

      alert('Please fill the form completely.....')

    }
    else {
      // alert('form submitted successfully.....')


      // when our form contains any uploading content,then it should be change to form data

      const data = new FormData()

      // body/data
      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("status", status)

      profile?data.append("profile", profile):data.append("profile",existingImg)
      data.append("location", location)

      if(profile){
        var headers={
          "content-type":"multipart/form-data"
        }

      }else{
        var headers=""
      }

      

      //api call

      const response=await editUser(id,data,headers)
      console.log(response);

      

      if (response.status == 200) {
        
        navigate('/')

      }
      else {
        alert('Request Failed!')
      }



    }
  }



 

  return (
    <>

{
        showspin ?
          <LoadingSpinner /> :

          <div className='container mt-3'>
            <h1 className='text-center fw-bolder'>Update Employee Details</h1>

            <div className='mt-3 shadow border rounded p-2'>
              <div className='text-center'>

                <img style={{ width: "80px", height: "80px", borderRadius: "50%" }} src={preview ? preview : `${BASE_URL}/uploads/${existingImg}`} alt="no image" />

              </div>

              <Form className='mt-4'>

                <Row>
                  {/* first name */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputfname" label="First name">
                    <Form.Control type="text" name='fname' placeholder="First name" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.fname} />
                  </FloatingLabel>

                  {/* last name */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputlname" label="Last name">
                    <Form.Control type="text" name='lname' placeholder="Last name" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.lname} />
                  </FloatingLabel>

                  {/* email */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputemail" label="Email">
                    <Form.Control type="text" name='email' placeholder="Email" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.email} />
                  </FloatingLabel>

                  {/* phone */}
                  <FloatingLabel className='mb-3 col-lg-6' controlId="floatingInputphone" label="Phone No">
                    <Form.Control type="text" name='mobile' placeholder="Phone No" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.mobile} />
                  </FloatingLabel>

                  {/* gender */}
                  <Form.Group className='mb-3 col-lg-6'>
                    <Form.Label>Select Gender</Form.Label>
                    <Form.Check type={"radio"} name='gender' onChange={e => getandsetuserNormalInputs(e)} value={"Male"} label={"Male"} checked={normalInputs.gender==="Male"?true:false} />
                    <Form.Check type={"radio"} name='gender' onChange={e => getandsetuserNormalInputs(e)} value={"Female"} label={"Female"} checked={normalInputs.gender==="Female"?true:false} />
                  </Form.Group>

                  {/* status */}
                  <Form.Group className='mb-3 col-lg-6 text-dark'>
                    <Form.Label>Select Employee Status</Form.Label>
                    <Select placeholder={status} onChange={e => setStatus(e.value)} options={options} />
                  </Form.Group>

                  {/* file upload */}
                  <Form.Group className='mb-3 col-lg-6 text-dark'>
                    <Form.Label>Choose a Profile picture</Form.Label>
                    <Form.Control type="file" onChange={e => handlefile(e)} name='Profile' />

                  </Form.Group>


                  {/* location */}
                  <FloatingLabel className='mb-3 col-lg-6 mt-3' controlId="floatingInputloc" label="Location">
                    <Form.Control type="text" name='location' placeholder="Location" value={normalInputs.location} onChange={e => getandsetuserNormalInputs(e)} />
                  </FloatingLabel>


                  <Button type='submit' variant='primary' onClick={e => handleSubmit(e)}>Submit</Button>



                </Row>



              </Form>
            </div>
          </div>}

     
    </>
  )
}


export default Edit