import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>

        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  my-10 mt-40 text-sm'>
            <div>
            {/* --------- Left -----------*/}
            <img
                className='mb-5 w-40'
                src={assets.logo} alt=""
            />
            <p className='w-full md:w-2/3 text-gray-600 leaeding-6'>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
            </p>
        </div>

        <div>
            {/* --------- Center -----------*/}
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>HOME</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>


        <div>
            {/* --------- Right -----------*/}
            <p className='text-xl font-medium mb-5' >GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+12-2333-4443</li>
                <li>mehreen@gmail.com</li>
            </ul>
        </div>
        </div>
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2024@Prescripto-All Rights Reserved</p>
        </div>

    </div>
  )
}

export default Footer
