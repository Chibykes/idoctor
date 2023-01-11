import { useRouter } from 'next/router';
import { useState } from 'react';
import { GiMedicalThermometer } from 'react-icons/gi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index(){

    const [form, setForm] = useState({});
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(form.email === "user@idoctor.dev"){
            if(form.password === "idoctor2022"){
                toast('✅ Login Successful');
                return router.push('/doctors');
            }

            return toast('❌ Password incorrect');
        }

        return toast('❌ Username incorrect');
    }

    return(
        <main className="bg-neutral-100 space-y-6 py-12 px-8 mx-auto w-screen min-h-screen flex flex-col justify-center">

                <ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={true}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>


            <form className='px-12 py-8 max-w-md w-full mx-auto bg-white rounded-md border-t-2 border-sky-500 space-y-3' onSubmit={handleSubmit}>

                <div className="flex justify-center items-center font-bold gap-1">
                    <p className="text-xl">Sign In</p>
                </div>

                <div className="border border-neutral-400 rounded-md p-1">
                    <input 
                        name='email'
                        type="text"
                        className='text-sm block w-full focus:outline-none focus:ring-0 border-none'
                        placeholder='Enter email'
                        required
                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                    />
                </div>

                <div className="border border-neutral-400 rounded-md p-1">
                    <input 
                        name='password'
                        type="password"
                        className='text-sm block w-full focus:outline-none focus:ring-0 border-none'
                        placeholder='Enter pasword'
                        required
                        onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                    />
                </div>

                <button type="submit" className='block w-full hover:ring-sky-500 hover:bg-sky-500 ring-offset-2 ring-2 ring-transparent py-4 text-white text-center uppercase text-sm font-bold bg-black cursor-pointer rounded-md'>Sign In</button>
            </form>


        </main>
    );
}