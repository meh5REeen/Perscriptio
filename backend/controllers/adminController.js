import bcrypt from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js'
// Api ofr adding doctors 
const addDoc = async (req,res) => {
    try{
        const {_id,name,email,password,speciality,degree,experience,about,fee,address} = req.body;
        const imageFile = req.file;
        console.log("dts",req.body)
        console.log("req.file:", req.file);

        // checking for all data to verifiy
        if(!_id|| !name || !email || !imageFile || !password || !speciality || !about || !degree || !experience || !fee || !address){
            return res.json({success:false,message:"Missing details"})
        }

        // validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        //validating strong password
        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"})

        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password,salt);

        // upload image to the cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        const imageUrl =  imageUpload.secure_url

        const doctorData={
            _id,name,email,image:imageUrl,
            password:hashedPassword,speciality,degree,experience,
            about,fee,address:JSON.parse(address),
            date:Date.now(),

        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        return res.json({success:true,message:"Doctor added"})
    }
    catch(error){
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}


// API ffor teh admin login

const loginAdmin = async (req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.send({success:false,message:"Missing credentials"});
        }

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
           
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
    }

    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const allDoctors = async (req,res) => {
    try{
        const doctors = await doctorModel.find({}).select('-password');
        res.json({success:true,doctors})


    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


// API to get all appointments
const appointmentsAdmin = async (req,res) => {
    try{

        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    }catch(error)
{
    console.log(error)
    res.json({success:false , message:error.message})
}
}

// API for appointment cancellation
const cancelAppointment = async (req,res) =>{
    try{
    
            const {appointmentId} = req.body
    
            const appointmentData = await appointmentModel.findById(appointmentId)
    
    
        await appointmentModel.findByIdAndUpdate(appointmentId,{
            cancelled:true
        })
    
        // releasing doctor's slot
        const {docId,slotDate,slotTime} = appointmentData
        
    
        const doctorData = await doctorModel.findById(docId)
     
        let slots_booked = doctorData.slots_booked
    
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
    
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    
        res.json({success:true,message:"Appointment cancelled"})
    
        }catch(error){
            console.log(error)
            res.json({success:false,message:error.message})
        }
}


// API to get dashboard data for admin panel
const adminDashboard = async (req,res) => {
    try{
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})


        const dashData = {
            doctors: doctors.length,
            appointments:appointments.lengts,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5),

        }
        res.json({success:true,dashData})


    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export  {addDoc,cancelAppointment,adminDashboard,appointmentsAdmin,loginAdmin,allDoctors}