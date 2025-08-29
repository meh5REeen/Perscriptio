import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const DoctorProfile = () => {
  const { dToken, profile, setProfile,backendUrl ,getProfile } = useContext(DoctorContext);
  const { currency} = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);


  const updateProfile = async () =>{
    try{

      const updatedData = {
        address:profile.address,
        fee:profile.fee,
        available:profile.available,

      }

      const {data} = await axios.post(backendUrl+'/api/doctor/update-profile',updatedData,{headers:{dToken}})
    
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfile()
      }else{
        toast.error(data.message)
      }
    
    }catch(error){
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfile();
    }
  }, [dToken]);

  return (
    profile && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-[#5f6FFF] w-full sm:max-w-64 rounded-lg"
              src={profile.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* -------Doc Info : name , degree,experience ----------- */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profile.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profile.degree} - {profile.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profile.experience}
              </button>
            </div>

            {/* Doctor About */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:{" "}
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profile.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    value={profile.fee}
                    type="number"
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, fee: e.target.value }))
                    }
                  />
                ) : (
                  profile.fee
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (

                  <input
                  value={profile.address.line1}
                  type="text"
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev.address,
                        line1: e.target.value,
                      }))
                    }
                  />
                ) : (
                  profile.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                  value={profile.address.line2}
                    type="text"
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev.address,
                        line2: e.target.value,
                      }))
                    }
                  />
                ) : (
                  profile.address.line2
                )}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  isEdit &&
                  setProfile((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profile.available}
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-[#5f6FFF]  text-sm rounded-full mt-5 hover:bg-[#5f6FFF] hover:text-white transition-all"
              >
                Save
              </button>
            )
            :(
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-[#5f6FFF]  text-sm rounded-full mt-5 hover:bg-[#5f6FFF] hover:text-white transition-all"
              >
                Edit
              </button>
            ) }
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
