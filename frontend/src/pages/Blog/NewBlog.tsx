import { useState } from "react";
import axios, { isAxiosError } from 'axios'
import { CreateBlogInput } from "@shantanu.kau/medium";

import RichTextEditor from "@/components/Editor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

import { BookPlus, Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const publishBlog = async () => {
    try {
      setIsLoading(true)
      const blogData: CreateBlogInput = {
        title: title,
        content: content,
        published: true
      }

      const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/blog`,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token') ?? '{}')}`
        },
        data: blogData
      });
      
      navigate(`/blog/${res.data.id}`);
      
    } catch (error) {
      console.log(error);
      let message = error;
      if(isAxiosError(error)){
        message = error.response?.data?.message ?? error;
      }
      toast(`Error: ${message}`);
    }
    setIsLoading(false);
  }


  return (
    <div className="m-3">
      <div className="m-6 mt-8 ml-1 pl-3 border-black border-l-4">
        <blockquote className="text-xl font-bold italic text-gray-800 dark:text-gray-200">
          "The only way to do great work is to love what you do."
        </blockquote>
        <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">- Steve Jobs</p>
      </div>
      <div className="border-2 rounded-lg">
        <div className="m-3 flex justify-between">
          <h3 className="text-3xl font-bold">Blog Editor</h3>
          {isLoading ? <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button> : <Button variant="outline" className="hover:bg-[#1F883D] hover:text-white" onClick={publishBlog}> Publish <BookPlus className="ml-2 w-4 h-4 " /> </Button>}
        </div>
        <div className="flex flex-col m-4">
          <label className="text-xl font-bold mb-2" htmlFor="title">Title</label>
          <Input id="title" className="outline-" type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
          <RichTextEditor value={`Write Something.....`} onChange={(editorContent) => setContent(editorContent)} />
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default NewBlog;


  //TODO: implement edit blog functionality