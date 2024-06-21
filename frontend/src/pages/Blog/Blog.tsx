import useFetch from "@/hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";

import { TBlog } from "../Home";
import DisplayError from "@/components/DisplayError";
import { Player } from "@lottiefiles/react-lottie-player";
import blogLoading from '../../assets/blogLoading.json'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import StarterKit from "@tiptap/starter-kit";

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();



  const [isLoading, data, error] = useFetch<TBlog>({
    url: `${import.meta.env.VITE_BACKEND_BASE_URL}/blog/${id}`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
    }
  });

  const editor = useEditor({
    content: data?.content || '',
    editable: false,
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
        'mx-auto mt-10 w-full prose prose-sm sm:prose-base lg:prose-lg m-5 focus:outline-none'
      },
    },
  });

  if (isLoading) {
    return <Player
      className="w-[300px] h-[300px]"
      src={blogLoading}
      autoplay
      loop
      speed={1}
    />
  }

  if (error) {
    return <DisplayError error={error} />
  }

  const words = data ? Math.ceil(data.content.length / 5) : 1;
  const time = Math.ceil(words / 238);

  if (editor && data?.content) {
    editor?.commands.setContent(data.content);
  }


  return (
    <>
      <Button onClick={() => navigate('/')} variant={'outline'} className="m-5 flex items-center"><span>Back</span></Button>
      <article className="mx-auto mb-10 w-[70%] mt-10 px-4 pb-12 md:px-6 md:py-10 border-2 rounded-xl">
        <div className="space-y-4 not-prose border-b-2 pb-4">
          <div className="space-y-2">
            <div className="flex justify-between mb-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl m">{data?.title}</h1>
              <Badge className="mt-4 self-start" >{time} min read</Badge>
            </div>
            <div className="flex items-center justify-start space-x-2 text-gray-500 dark:text-gray-400">
              <div>
                <span className="font-medium">{data?.author.name}</span>, Author
              </div>
            </div>
          </div>
        </div>
        {editor ? <EditorContent editor={editor} /> : data?.content}
      </article>
    </>

  )
}

export default Blog;

/*
  Single blog page
  New Blog page
  Update Blog page
  Blog card
*/