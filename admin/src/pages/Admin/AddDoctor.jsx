import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import {AdminContext} from "../../Context/AdminContext";
import {toast} from 'react-toastify';
import axios from 'axios';
const AddDoctor = () => {
  const [_id,setId] = useState('');
  const [docImg,setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [experience,setExperience] = useState('1 Year');
  const [fees,setfees] = useState('');
  const [about,setAbout] = useState('');
  const [address2,setAddress2] = useState('');
  const [address1,setAddress1] = useState('');

  const [degree,setDegree] = useState('');
  const [speciality,setSpeciality] = useState('General Physician');
  const {backendUrl,aToken} = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try{
      if(!docImg){
        return toast.error("Image not selected")
      }
      const formData = new FormData();
      formData.append('_id',_id)
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fee',Number(fees))
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('about',about)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))

      // console log formdata
      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`)
      })

      const data = await axios.post(backendUrl+"/api/admin/add-doctor",formData,
        {headers:{
          aToken
        }}
      )
      if (data.data.success) { // ✅ correct property
          toast.success(data.data.message);
          setId('')
          setDocImg(false)
          setName('')
          setEmail('')
          setPassword('')
          setAddress1('')
          setAddress2('')
          setDegree('')
          setAbout('')
          setfees('')
        } else {
          toast.error(data.data.message);
        }
    }catch(error){
      toast.error(error.message)
    }


  }
  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        
        {/* Upload Picture */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg?URL.createObjectURL(docImg):assets.upload_area}
              alt=""
            />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>
            Upload Doctor <br /> Picture
          </p>
        </div>

        {/* Form fields */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          
          {/* Left side */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Id</p>
              <input onChange={(e)=>setId(e.target.value)} value={_id} type="text" className="border rounded px-3 py-2" placeholder="Id" required />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Your Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="border rounded px-3 py-2" placeholder="Name" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border rounded px-3 py-2" type="email" placeholder="Email" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border rounded px-3 py-2" type="password" placeholder="Password" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="border rounded px-3 py-2">
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} Year{i > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input onChange={(e)=>setfees(e.target.value)} value={fees} className="border rounded px-3 py-2"  type="number" placeholder="Fees" required />
            </div>
          </div>

          {/* Right side */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-2">
                <option value="General Physician">General Physician</option>
                <option value="Gynaecologist">Gynaecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pediatricians">Pediatrician</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input onChange={(e)=>setDegree(e.target.value)} value={degree} className="border rounded px-3 py-2" type="text" placeholder="Education" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className="border rounded px-3 py-2" type="text" placeholder="Address 1" required />
              <input  onChange={(e)=>setAddress2(e.target.value)} value={address2} className="border rounded px-3 py-2" type="text" placeholder="Address 2" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="mt-4 mb-2">About Doctor</p>
              <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border rounded"
              placeholder="Write about doctor" rows={5} required></textarea>
            </div>
          </div> 
        </div>

        {/* Submit button */}
        <button type="submit" className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
