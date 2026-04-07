  import { Button } from '../shadcnui/button';
  import { useForm } from 'react-hook-form';
  import { useAppcontext } from '../context/AppContext';
  import { useNavigate } from 'react-router-dom'; // Import useNavigate
  import * as z from 'zod'
  import { zodResolver } from '@hookform/resolvers/zod';
  import { userLogin } from '../services/auth';

  export const Login = () => {
    const { setToken } = useAppcontext();
    const navigate = useNavigate(); // Initialize useNavigate

    const formSchema=z.object({
      email:z.string()
      .nonempty('Email is required')
      .email('Invalid email address'),
      password:z.string()
      .nonempty('Password is required')
      .min(8,'Password must be of 8 Character')
    })

    const {register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm({resolver:zodResolver(formSchema),mode:'onChange'})

    const onSubmit = async (formData) => {
      await userLogin(formData,setToken,navigate)
      reset()
      
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               {...register('email')}
              required
            />
             {errors.email && <p className='text-red-700'>{errors.email.message} </p> }
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password')}
              required
            />
            {errors.password && <p className='text-red-700'>{errors.password.message} </p> }
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-md"
          >
            Login
          </Button>
        </form>
      </div>
    );
  };