import BlogCard from "./BlogCard"
import { TBlog } from "../Home"
import { Link } from "react-router-dom"
type BlogListProps = {
  blogs: TBlog[] | undefined
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  
  const blogCards = blogs?.map(blog => {
    return <BlogCard key={blog.id} title={blog.title} content={blog.content} id={blog.id} />
  });

  if(!blogCards || !blogCards.length){
    return (
      <h2 className="mt-10 text-xl text-center text-gray-500">
        There are no blogs :( , How about you <Link className="underline" to="/blog/new">create one</Link>...
      </h2>
    )
  }
  return (

    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:p-6">
      {blogCards}
    </section>
  )
}

export default BlogList