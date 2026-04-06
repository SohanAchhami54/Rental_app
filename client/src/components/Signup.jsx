  import { Button } from '../shadcnui/button';
  import { useNavigate } from 'react-router-dom';
  import * as z from 'zod'
  import { zodResolver } from '@hookform/resolvers/zod';
  import { useForm } from 'react-hook-form';
  import { userSignup } from '../services/auth';

  export const Signup = () => {
    const navigate = useNavigate();
    const formSchema=z.object({
      firstname:z.string()
      .nonempty('Firstname is required')
      .min(3,'Name must be more than 3 Character long.')
      .max(20,'Name cannot exceed 20 character long.'),
      
      lastname:z.string()
      .nonempty('Lastname is required')
      .min(3,'Name must be of 3 Character long.')
      .max(20,'Name cannot exceed 20 character long.'),
      
      usertype:z.string()
      .min(1,'Please select only one type'),

      address:z.string()
      .nonempty('Address is required')
      .min(4,'Address should be more than 4 character long'),

      email:z.string()
      .nonempty('Email is required')
      .email('Invalid Email Address'),

      password:z.string()
      .nonempty('Password is required')
      .min(8,'Password must be of 8 Character long')
    })
    const {register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm({resolver:zodResolver(formSchema),mode:'onChange'})


    const onSubmit = async (formData,navigate) => {
     await userSignup(formData)
      reset()
      
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstname" className="block text-sm mb-1">First Name</label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                {...register('firstname')}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.firstname && <p className='text-red-600'> {errors.firstname.message} </p>}
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm mb-1">Last Name</label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                {...register('lastname')}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.lastname && <p className='text-red-600'>{errors.lastname.message} </p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="usertype" className="block text-sm mb-1">User Type</label>
            <select
              id="usertype"
              name="usertype"
              {...register('usertype')}
              required
              className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select user type</option>
              <option value="guest">Guest</option>
              <option value="host">Host</option>
            </select>
            {errors.usertype && <p className='text-red-600'>{errors.usertype.message} </p>}
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input type="text" 
            placeholder='type here'
            name='address' 
            id='address'
            {...register('address')}
              required
              className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              {errors.address && <p className='text-red-600'>{errors.address.message} </p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-1">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              {...register('email')}
              placeholder='type here'
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && <p className='text-red-600'>{errors.email.message} </p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm mb-1">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              {...register('password')}
              placeholder='type here'
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.password && <p className='text-red-600'>{errors.password.message} </p> }
          </div>

          <Button
            type='submit'
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-md"
          >
            Sign Up
          </Button>
        </form>
      </div>
    );
  };