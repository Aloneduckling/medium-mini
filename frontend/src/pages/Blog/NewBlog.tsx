import { useState } from "react";
import RichTextEditor from "@/components/Editor/RichTextEditor";
import { Button } from "@/components/ui/button";

import { BookPlus } from "lucide-react";

const NewBlog = () => {
  const [content, setContent] = useState<string>('');

  const publishBlog = () => {
    console.log(content);
  }

  // #1F883D
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
          <Button variant="outline" className="hover:bg-[#1F883D] hover:text-white" onClick={publishBlog}> Publish <BookPlus className="ml-2 w-4 h-4 " /> </Button>
        </div>
        <div>
          <RichTextEditor value={`Write Something.....`} onChange={(editorContent) => setContent(editorContent)} />
        </div>
      </div>
    </div>
  )
}

export default NewBlog