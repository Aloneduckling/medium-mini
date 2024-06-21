import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { createBlogInput, updateBlogInput } from "@shantanu.kau/medium";

const blog = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();

blog.post("/", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const userId = c.get("userId");

        const body = await c.req.json();


        const { error, data } = createBlogInput.safeParse(body);

        if (error) {
            return c.json({ message: "invalid inputs" }, 400);
        }

        const newPost = await prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                published: data.published || false,
                authorId: userId,
            },
        });

        return c.json({ id: newPost.id }, 201);
    } catch (error) {
        return c.json({ message: "internal server error" }, 500);
    }
});

blog.put("/:id", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const blogId = c.req.param('id');
        const blogBody = await c.req.json();

       
        const { error, data } = updateBlogInput.safeParse(blogBody);

        if(error){
            return c.json({ message: "cannot update blog" }, 400);
        }

        await prisma.post.update({
            where:{
                id: blogId
            },
            data: {
                ...data
            }
        });

        return c.json({}, 204);
    } catch (error) {
        return c.json({ message: "internal server error" }, 500)
    }
});

blog.get("/bulk", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        
        const blogs = await prisma.post.findMany();

        return c.json(blogs);

    } catch (error) {
        return c.json({ message: "internal server error" }, 500);
    }
});

//TODO: Blog should return the name of the author from the backend: check this
blog.get("/:id", async(c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const blogId = c.req.param('id');
        
        const blog = await prisma.post.findFirst({
            where: {id: blogId},
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if(!blog){
            return c.json({ message: "blog not found" }, 404);
        }

        return c.json(blog);


    } catch (error) {
        return c.json({ message: "internal server error" }, 500);
    }
});



export default blog;
