import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsFillChatSquareTextFill } from 'react-icons/bs';
import { RiCloseCircleFill, RiSendPlaneFill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { io } from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URI);

export default function Index(){

    const [typingPatients,  setTypingPatients] = useState([]);
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState('');
    const [me, setMe] = useState({ 
        email: 'doctor@idoctor.dev',
        name: 'Dr. Chidi Mark MD'
    });
    const [openChat, setOpenChat] = useState(false);
    const [currentPatient, setCurrentPatient] = useState({});
    const router = useRouter();

    const patients = [
        {
            img: "/img/chibykes.webp",
            email: "user@idoctor.dev",
            name: "Chukwubuikem Chiabuotu"
        },
    ]

    const chatPatient = ({img, name, email}) => {
        setCurrentPatient({img, name, email});
        setChat([]);
        setOpenChat(true);
    }

    const sendMessage = () => {
        const data = { ...me, for: currentPatient.email, message };
        socket.emit('send', data)
        setChat([...chat, data]);
        setMessage('');
    }

    const emitTyping = () => socket.emit('typing', {...me, for: currentPatient.email});
    const emitNoTyping = () => socket.emit('no_typing', {...me, for: currentPatient.email});

    socket.on('send', (data) => {
        if(currentPatient.email === data.email && me.email === data.for){
            setChat([...chat, data]);
            setTypingPatients(typingPatients.filter(({email}) => email !== data.email));
        }
    });

    socket.on('no_typing', (data) => {
        if(currentPatient.email === data.email && me.email === data.for){
            setTypingPatients(typingPatients.filter(({email}) => email !== data.email));
        }
    });

    socket.on('typing', (data) => {
        if(currentPatient.email === data.email && me.email === data.for){
            setTypingPatients([...typingPatients, data]);
        }
    })

    return(
        <main className="bg-neutral-100 space-y-6 ply-12 plx-8 mx-auto w-full min-h-screen overflow-auto">

            <div className='p-5 lg:p-12 space-y-12'>
                <p className='w-2/3 mx-auto text-2xl text-center font-bold'>Take your health seriously. <br /> See list of our available patients </p>

                <div className='grid lg:grid-cols-3 gap-8'>

                    {patients.map(({img, email, name},index) => (
                        <div key={index} className='p-4 space-y-4 bg-neutral-200 rounded-lg self-baseline'>
                            <div className='flex items-center gap-4'>
                                <div className='ring-4 ring-white relative w-16 h-16 rounded-full overflow-hidden'>
                                    <Image src={img} style={{objectFit: 'cover'}} fill/>
                                </div>
                                <div className=''>
                                    <p className='font-bold'>{name}</p>
                                    <p className='text-xs font-semibold text-sky-500'>{email}</p>
                                </div>
                            </div>

                            <div onClick={() => chatPatient({img, name, email})} className='lg:w-1/2 mx-auto flex justify-center gap-2 p-2 text-xs font-bold rounded-full bg-gradient-to-tr from-sky-400 to-sky-500 text-white'>
                                <BsFillChatSquareTextFill className="text-white text-lg" />
                                Chat
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div className='p-12 bg-black'>
                <div className='text-xs text-white font-bold text-center'>&copy; iDoctor, 2022</div>
            </div>

            {openChat && <div className='mt-[0px!important] fixed top-0 left-0 w-full h-full bg-[#0003] flex items-end justify-end'>
                <div className='flex flex-col w-full lg:w-1/4 h-full lg:h-[75%] bg-white lg:mx-5 lg:rounded-t-2xl overflow-hidden'>

                    <div className='flex items-center gap-4 bg-gradient-to-tr from-sky-400 to-sky-500 p-2'>
                        <div className='border-2 border-white relative w-12 h-12 rounded-full overflow-hidden'>
                            <Image src={currentPatient?.img} style={{objectFit: 'cover'}} fill/>
                        </div>
                        <div className='text-white mr-auto'>
                            <p className='font-bold text-sm'>{currentPatient?.name}</p>
                            <p className='text-xs'>{currentPatient?.email}</p>
                        </div>
                        
                        <RiCloseCircleFill onClick={() => setOpenChat(false)} className="text-white" />
                    </div>

                    <div className='h-full flex flex-col p-2 space-y-1'>
                        {chat.map(({email, message}, index) => (
                            email === me.email ? 
                            <div key={index} class="inline-block rounded-md text-xs p-2 bg-sky-500 text-white max-w-[49%] ml-auto">{message}</div>:
                            <div key={index} class="inline-block rounded-md text-xs p-2 bg-neutral-100 max-w-[49%] mr-auto">{message}</div>
                        ))}
                        
                        {typingPatients.find(({email}) => email === currentPatient.email) && <div className='inline-flex justify-center items-center pt-2 gap-1 max-w-[49%] mr-auto'>
                            <div style={{'--delay': 1}} className='rounded-full h-2 w-2 bg-neutral-400 loading'></div>
                            <div style={{'--delay': 2}} className='rounded-full h-2 w-2 bg-neutral-400 loading'></div>
                            <div style={{'--delay': 3}} className='rounded-full h-2 w-2 bg-neutral-400 loading'></div>
                            <div style={{'--delay': 4}} className='rounded-full h-2 w-2 bg-neutral-400 loading'></div>
                        </div>}
                    </div>

                    <div className='p-2'>
                        <div className='flex p-1 items-center border border-neutral-400 rounded-full'>
                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onFocus={emitTyping}
                                onBlur={emitNoTyping}
                                className='p-2 w-full focus-visible:outline-none outline:none focus:ring-transparent bg-transparent border-none text-xs'
                                rows="2"
                                placeholder='Type Message'
                            />

                            <div onClick={sendMessage} className='grid place-content-center w-8 h-8 rounded-full'>
                                <RiSendPlaneFill className="text-sky-500 text-xl" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>}

        </main>
    );
}