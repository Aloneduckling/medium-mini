import useFetch from "../hooks/useFetch"

import { Player } from '@lottiefiles/react-lottie-player'
import loading from '../assets/postLoading.json'
import DisplayError from "@/components/DisplayError.tsx";
import BlogList from "./Blog/BlogList";

export type TBlog = {
    id: string;
    title: string;
    content: string;
    published: boolean;
    authorId: string;
};

const Home = () => {

    const [isLoading, data, error] = useFetch<TBlog[]>({
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
        <div className="flex flex-col justify-between  mt-10 p-4">
            <h2 className="text-center font-bold text-3xl">All Blogs</h2>
            <BlogList blogs={data}/>
        </div>
    )
}

export default Home