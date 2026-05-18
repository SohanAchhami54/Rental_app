        import React, { useState } from 'react';
        import { useForm } from 'react-hook-form';
        import { zodResolver } from '@hookform/resolvers/zod';
        import * as z from 'zod';
        import { useAdmin } from '../context/Admincontext';
        import { adminLogin } from '../services/auth';



        const formSchema = z.object({
            email: z.string().nonempty('Email is required').email('Invalid email address'),
            password: z.string().nonempty('Password is required')
            .min(8, "Password must be of 8 characters long")
            //   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
        });

        const Login = () => {
            const {adToken,setAdToken,setLoading}=useAdmin()
    
        const { register, handleSubmit, reset, watch, formState:{ errors, isSubmitting } } =
            useForm({
            resolver: zodResolver(formSchema),    
            mode: 'onChange'
            });

        const onSubmit = async(formdata) => {
            await adminLogin(formdata,setAdToken)
            reset({email:'',password:''})
        };

        return (
            <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-sm w-full mx-auto mt-16 p-5 flex flex-col gap-4 bg-white border rounded-lg shadow-sm"
            >
            <h2 className="text-lg font-semibold text-center text-gray-800">
            Admin Login
            </h2>

            {/* Email */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                Email
                </label>

                <input
                type="text"
                {...register('email')}
                className="w-full border border-gray-400 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                />

                {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                Password
                </label>

                <input
                type="password"
                {...register('password')}
                className="w-full border border-gray-400 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                />

                {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
                )}
            </div>

            <button
             type="submit"
             disabled={isSubmitting}
             className="w-full bg-black text-white py-2 rounded-md"
            >
            {isSubmitting?'Login...':'Login'}
            </button>
            </form>
        );
        };

        export default Login;

    