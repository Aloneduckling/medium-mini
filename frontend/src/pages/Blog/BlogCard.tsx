import { useNavigate } from "react-router-dom";

type BlogCardProps = {
    title: string;
    content: string;
    id: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, content, id }) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/blog/${id}`)} className="flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-950 hover:cursor-pointer">
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-400">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 line-clamp-2 mt-3">
                    {content.substring(0, 100) + '...'}
                </p>
            </div>
        </div>
    )
}

export default BlogCard;