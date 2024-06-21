import axios from "axios"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import Navbar from "./Navbar"

import { globalLoadingAtom, userAtom } from "@/store/atom/globalAtoms"
import { useRecoilState, useSetRecoilState } from "recoil";

import { Player } from "@lottiefiles/react-lottie-player";

import globalLoader from '../assets/globalLoader.json'

const ProtectedRoute = () => {
    const navigate = useNavigate();

    const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingAtom);
    const setGlobalUserState = useSetRecoilState(userAtom);

    useEffect(() => {
        const authRequest = async () => {
            try {
                const token = localStorage.getItem('token');

                setGlobalLoading(true);
                const res = await axios({
                    method: 'get',
                    url: `${import.meta.env.VITE_BACKEND_BASE_URL}/user/me`,
                    headers: {
                        Authorization: `Bearer ${token ? JSON.parse(token) : ''}`
                    }
                });

                setGlobalUserState(res.data);
                setGlobalLoading(false);
            } catch (error) {
                setGlobalUserState({
                    id: '',
                    name: ''
                });
                navigate('/signin');
            }
            
        }
        authRequest();
    }, []);

    return (
        <>
            {
            globalLoading ? <div className="w-full h-[100vh] flex flex-col justify-center">
                <Player
                    className="w-[300px] h-[300px]"
                    src={globalLoader}
                    autoplay
                    loop
                    speed={1}
                />
            </div> : <> <Navbar /> <Outlet /></>
            }

        </>
    )
}

export default ProtectedRoute;