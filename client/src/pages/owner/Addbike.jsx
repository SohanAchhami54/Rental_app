import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Title from './Title'
import { assets } from '../../assets/assets'

import toast from 'react-hot-toast'
import Axios from '../../api/axios'
import { addBike } from '../../services/owner'

const bikeSchema = z.object({
  brand: z.string().nonempty('Brand is required'),
  model: z.string().nonempty('Model is required'),
  year: z.coerce.number()
    .min(1990, 'Year must be 1990 or later')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  pricePerDay: z.coerce.number()
    .min(1, 'Price must be greater than 0'),
  category: z.string().nonempty('Category is required'),
  transmission: z.string().nonempty('Transmission is required'),
  fuel_type: z.string().nonempty('Fuel type is required'),
  location: z.string().nonempty('Location is required'),
  description: z.string()
    .nonempty('Description is required')
    .min(10, 'Description must be at least 10 characters'),
})

const Addbike = () => {
  const [image, setImage] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }, 
  } = useForm({
    resolver: zodResolver(bikeSchema),
    defaultValues: {
      brand: '', model: '', year: '', pricePerDay: '',
      category: 'Normal', transmission: 'manual',
      fuel_type: '', location: '', description: '',
    },mode:'onChange'
  })

  const onSubmit = async (bike) => {
    if (!image) return toast.error('Please upload a bike image')
     await addBike(image,bike,setImage)
    reset()

  }

  return (
    <div className='px-4 py-5 md:px-10'>
      <Title title='Add new Bike here' subTitle='List your bike and earn real money.' />

      <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col space-y-8'>

        {/* Image Upload */}
        <div className='flex gap-3 justify-center items-center w-60 mb-3'>
          <label htmlFor='bikeimage'>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt='Bikeimage'
              className='h-14 w-16 object-cover rounded cursor-pointer'
            />
            <input type='file' id='bikeimage' accept='image/*'
              onChange={(e) => setImage(e.target.files[0])} hidden />
          </label>
          <p className='text-sm text-gray-500'>Upload the picture of your Bike</p>
        </div>

        {/* Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='mb-4'>
            <label htmlFor='brand' className='block text-sm font-medium mb-1'>Brand</label>
            <input id='brand' type='text' placeholder='e.g. Pulsar, Honda'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              {...register('brand')} />
            {errors.brand && <p className='text-red-700'>{errors.brand.message}</p>}
          </div>

          <div className='mb-4'>
            <label htmlFor='model' className='block text-sm font-medium mb-1'>Model</label>
            <input id='model' type='text' placeholder='e.g. V3, V5'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              {...register('model')} />
            {errors.model && <p className='text-red-700'>{errors.model.message}</p>}
          </div>
        </div>

        {/* Year, Price, Category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='mb-4'>
            <label htmlFor='year' className='block text-sm font-medium mb-1'>Year</label>
            <input id='year' type='number' placeholder='e.g. 2025'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              {...register('year')} />
            {errors.year && <p className='text-red-700'>{errors.year.message}</p>}
          </div>

          <div className='mb-4'>
            <label htmlFor='pricePerDay' className='block text-sm font-medium mb-1'>Daily Price</label>
            <input id='pricePerDay' type='number' placeholder='100'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              {...register('pricePerDay')} />
            {errors.pricePerDay && <p className='text-red-700'>{errors.pricePerDay.message}</p>}
          </div>

          <div className='mb-4'>
            <label htmlFor='category' className='block text-sm font-medium mb-1'>Category</label>
            <select id='category'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              {...register('category')}>
              <option value='Normal'>Normal</option>
              <option value='sport'>Sport</option>
              <option value='adventure'>Adventure</option>
              <option value='Touring'>Touring</option>
              <option value='scooter'>Scooter</option>
              <option value='offroad'>Offroad</option>
              <option value='electric'>Electric</option>
            </select>
            {errors.category && <p className='text-red-700'>{errors.category.message}</p>}
          </div>
        </div>

        {/* Transmission & Fuel */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='mb-4'>
            <label htmlFor='transmission' className='block text-sm font-medium mb-1'>Transmission</label>
            <select id='transmission'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              {...register('transmission')}>
              <option value='manual'>Manual</option>
              <option value='automatic'>Automatic</option>
              <option value='semi-automatic'>Semi-Automatic</option>
            </select>
            {errors.transmission && <p className='text-red-700'>{errors.transmission.message}</p>}
          </div>

          <div className='mb-4'>
            <label htmlFor='fuel_type' className='block text-sm font-medium mb-1'>Fuel Type</label>
            <select id='fuel_type'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              {...register('fuel_type')}>
              <option value=''>Select Fuel Type</option>
              <option value='petrol'>Petrol</option>
              <option value='diesel'>Diesel</option>
              <option value='electric'>Electric</option>
              <option value='hybrid'>Hybrid</option>
            </select>
            {errors.fuel_type && <p className='text-red-700'>{errors.fuel_type.message}</p>}
          </div>
        </div>

        {/* Location */}
        <div className='mb-4'>
          <label htmlFor='location' className='block text-sm font-medium mb-1'>Location</label>
          <input id='location' type='text' placeholder='Enter the location'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            {...register('location')} />
          {errors.location && <p className='text-red-700'>{errors.location.message}</p>}
        </div>

        {/* Description */}
        <div className='mb-4'>
          <label htmlFor='description' className='block text-sm font-medium mb-1'>Description</label>
          <textarea id='description' placeholder='Describe your bike...'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24'
            {...register('description')} />
          {errors.description && <p className='text-red-700'>{errors.description.message}</p>}
        </div>

      
        <button type='submit'
          disabled={isSubmitting}
          className='text-lg text-gray-800 bg-black/25 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed'>
          {isSubmitting ? 'Listing....' : 'List your Bike'}
        </button>

      </form>
    </div>
  )
}

export default Addbike