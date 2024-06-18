import useFetch from "./hooks/useFetch.ts"

import { Player } from '@lottiefiles/react-lottie-player'
import loading from './assets/postLoading.json'
import DisplayError from "@/components/DisplayError.tsx";

type Blog = {
    id: string;
    title: string;
    content: string;
    published: boolean;
    authorId: string;
};

const Home = () => {

    const [isLoading, data, error] = useFetch<Blog[]>({
        method: 'get',
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/blog/bulk`,
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
        }
    });

    if (isLoading) {
        return <div className="w-full h-[100vh] flex flex-col justify-center">
            <Player
                className="w-[500px] h-[500px]"
                src={loading}
                autoplay
                loop
                speed={1}
            />
        </div>;
    }

    if (error) {
        return <DisplayError error={error}/>
    }
    console.log(data);
    return (
        <div>loaded</div>
    )
}

export default Home