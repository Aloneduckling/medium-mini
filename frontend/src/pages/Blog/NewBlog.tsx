import { useState } from "react";
import RichTextEditor from "@/components/Editor/RichTextEditor";
import { Button } from "@/components/ui/button";

import { BookPlus } from "lucide-react";

const NewBlog = () => {
  const [content, setContent] = useState<string>('')
  
  const publishBlog = () => {
    console.log(content);
  }


  return (
    <div className="m-3">
      <div className="m-3 flex justify-end">
        <Button variant="outline" onClick={publishBlog}> Publish <BookPlus className="ml-2 w-4 h-4"/> </Button>
      </div>
      <div >
        <RichTextEditor value={`Write Something.....`} onChange={(editorContent) => setContent(editorContent)} />
      </div>
    </div>
  )
}

export default NewBlog