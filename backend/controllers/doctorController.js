import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';


export const changeAvailability =async (req,res) => {

    try{

        const {docId} = req.body;

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})

        res.json({success:true,message:'Availability Changed'})

    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }   
}
export const doctorList = async (req,res) =>{
    try{
        const doctors =  await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

// API for doctor login
export const loginDoctor = async (req,res) => {
    try{
        const {email,password} = req.body
        const doctor = await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password,doctor.password)

        if(isMatch){
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
        

    }catch(error){
         console.log(error.message);
        res.json({success:false,message:error.message})
    }
}


// API to get doctor appointments for doctor panel

export const appointmentsDoctor = async (req,res)=>{
    try{

        const {docId} = req
        const appointments = await appointmentModel.find({docId})
        res.json({success:true,appointments})


    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

// API to marks appointment completed for the doctor panel
export const appointmentComplete = async (req,res) =>{
    try{
        const {docId,appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true,message:'Appointment Completed'})
        }
        else{
            return res.json({success:false,message:"mark failed"})
        }
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}



export const appointmentCancel = async (req,res) =>{
    try{
        const {docId,appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true,message:'Appointment Cancelled'})
        }
        else{
            return res.json({success:false,message:"Cannot Cancel"})
        }
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}


// API for the doctor dashboard 
export const doctorDashboard = async (req,res) => {
    try{

        const {docId} = req

        const appointments = await appointmentModel.find({docId})
        let earning = 0

        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earning += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData =  {
            earning,
            appointments:appointments.length,
            patients:patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        return res.json({success:true,dashData})

    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}