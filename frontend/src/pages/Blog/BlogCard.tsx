import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
type BlogCardProps = {
    title: string;
    content: string;
    id: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, content, id }) => {
    const navigate = useNavigate();

    const editor = useEditor({
        content: `${content.substring(0, 100)}...` || '',
        editable: false,
        extensions: [StarterKit]
    });

    return (
        <div onClick={() => navigate(`/blog/${id}`)} className="flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-950 hover:cursor-pointer">
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-400">{title}</h3>
                <div className="text-gray-500 dark:text-gray-400 line-clamp-2 mt-3">
                    { editor ? <EditorContent editor={editor}/> : `${content.substring(0, 100)}...`}
                </div>
            </div>
        </div>
    )
}

export default BlogCard;