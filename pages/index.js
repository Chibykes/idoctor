import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsFillChatSquareTextFill } from 'react-icons/bs';
import { GiMedicalThermometer } from 'react-icons/gi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index(){

    const [form, setForm] = useState({});
    const router = useRouter();

    const doctors = [
        {
            img: "/img/chibykes.webp",
            about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nihil consequatur dolor laborum neque doloremque iure perspiciatis aperiam adipisci architecto! Alias incidunt, libero delectus voluptatem dignissimos reprehenderit',
            name: "Dr. Roberts Anosike PhD",
            hospital: "City of Saints Hospital, Ikeja",
            specs: ['General Consultancy', 'Ulcers', 'Gastrointestinal diseases', 'Abdominal Analysis']
        },
        {
            img: "/img/benedict.jpg",
            about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nihil consequatur dolor laborum neque doloremque iure perspiciatis aperiam adipisci architecto! Alias incidunt, libero delectus voluptatem dignissimos reprehenderit',
            name: "Dr. Benedict Ajuzie MD",
            hospital: "Glory Days Hospital",
            specs: ['General Consultancy', 'Chest cavity', 'Lung related diseases']
        },
        {
            img: "/img/hisnu.jpg",
            about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nihil consequatur dolor laborum neque doloremque iure perspiciatis aperiam adipisci architecto! Alias incidunt, libero delectus voluptatem dignissimos reprehenderit',
            name: "Dr. Cleopatra Hisnu MD",
            hospital: "All Time Hospital, India",
            specs: ['General Consultancy', 'Head Injuries', 'Psychotherapy']
        },
    ]

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
        <main className="bg-neutral-100 space-y-6 ply-12 plx-8 mx-auto w-full min-h-screen overflow-auto">

            <div className='p-8 grid grid-cols-1 lg:grid-cols-2 items-center bg-[url(/img/bg.jpg)] bg-cover bg-top min-h-[85vh]'>

                <div className='space-y-12'>
                    <div className="flex items-center font-bold gap-3">
                        <div className='relative w-8 h-8'>
                            <Image src="/img/logo.png" fill style={{objectFit: 'contain'}} />
                        </div>
                        <p className="text-2xl text-white">iDoctor</p>
                    </div>

                    <p className='text-6xl lg:text-6xl text-white font-bold'> Speak with a doctor in real-time online </p>

                    <div className='flex flex-col lg:flex-row gap-5'>
                        <Link href="/login" className='block rounded-full lg:w-1/3 text-center p-3 lg:p-4 bg-white text-sky-500 text-sm font-bold uppercase ring-4 ring-neutral-200'>login</Link>
                        <Link href="/register" className='block rounded-full lg:w-1/3 text-center p-3 lg:p-4 bg-gradient-to-tr from-sky-200 to-sky-500 text-white text-sm font-bold uppercase ring-4 ring-neutral-200'>register</Link>
                    </div>
                </div>

            </div>

            <div className='p-5 lg:p-12 space-y-12'>
                <p className='w-2/3 mx-auto text-2xl text-center font-bold'>Take your health seriously. <br /> See list of our available doctors </p>

                <div className='grid lg:grid-cols-3 gap-8'>

                    {doctors.map(({img, about, name, specs, hospital},index) => (
                        <div key={index} className='p-4 space-y-4 bg-neutral-200 rounded-lg self-baseline'>
                            <div className='flex items-center gap-4'>
                                <div className='ring-4 ring-white relative w-16 h-16 rounded-full overflow-hidden'>
                                    <Image src={img} style={{objectFit: 'cover'}} fill/>
                                </div>
                                <div className=''>
                                    <p className='font-bold'>{name}</p>
                                    <p className='text-sm text-sky-500'>{hospital}</p>
                                </div>
                            </div>

                            <div className=''>
                                <p className='text-sm font-bold'>About</p>
                                <p className='text-xs'>
                                    {about}
                                </p>

                                <p className='mt-5'></p>
                                <p className='text-sm font-bold'>Specializes:</p>
                                <div className='flex flex-wrap gap-1'>
                                    {specs.map((spec, index) => 
                                        <p key={index} className='text-[.625rem] font-semibold rounded-full px-2 py-1 bg-white'>{spec}</p>
                                    )}
                                </div>
                            </div>

                            <Link href="/login" className='lg:w-1/2 mx-auto flex justify-center gap-2 p-2 text-xs font-bold rounded-full bg-gradient-to-tr from-sky-400 to-sky-500 text-white'>
                                <BsFillChatSquareTextFill className="text-white text-lg" />
                                Chat
                            </Link>
                        </div>
                    ))}

                </div>
            </div>

            <div className='p-12 bg-black'>
                <div className='text-xs text-white font-bold text-center'>&copy; iDoctor, 2022</div>
            </div>
                

        </main>
    );
}