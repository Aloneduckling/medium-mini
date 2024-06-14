import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "@shantanu.kau/medium";

const user = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    }
}>();

user.post("/signup", async (c) => {
    try {
        //init prisma client
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());


        //get data from the body
        const signupData = await c.req.json();

        const { error, data: userData } = signupInput.safeParse(signupData);

        if (error) {
            return c.json({ message: "invalid inputs" }, 400);
        }

        const newUser = await prisma.user.create({
            data: {
                ...userData,
            },
        });

        const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);

        return c.json({ token }, 201);
    } catch (error) {
        console.log(error);
        return c.json({ message: "Internal server error" }, 500);
    }
});

user.post("/signin", async (c) => {
    try {
        // init prisma client
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();

        
        const { error, data } = signinInput.safeParse(body);

        if (error) {
            return c.json({ message: "invalid inputs" }, 400);
        }

        const user = await prisma.user.findFirst({
            where: {
                email: data.email,
            },
        });

        if (!user) {
            return c.json({ message: "user not found" }, 404);
        }

        //check password
        if (user.password !== data.password) {
            return c.json({ message: "invalid password" }, 401);
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        
        return c.json({ token });
    } catch (error) {
        return c.json({ message: "internal server error" }, 500);
    }
});

user.get('/me', async (c) => {
    //TODO: return the name of the user with the id
    
    try {
        const tokenString = c.req.header("Authorization");
        if (!tokenString) {
            return c.json({ message: "Unauthorized" }, 401);
        }

        const token = tokenString.split(" ")[1];

        const payload = await verify(token, c.env.JWT_SECRET);

        if (!payload) {
            return c.json({ message: "unauthorized" }, 401);
        }

        return c.json({ id: payload.id });
    } catch (error) {
        return c.json({ message: "Unauthorized" }, 401);
    }
})


export default user;