import { Hono } from "hono";
import { verify } from "hono/jwt";

import user from "./routes/user";
import blog from "./routes/blogs";
import { cors } from "hono/cors";

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();

// middlewares

app.use('/api/v1/*', cors());

app.use("/api/v1/blog/*", async (c, next) => {
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

        c.set("userId", payload.id);
    } catch (error) {
        return c.json({ message: "Unauthorized" }, 401);
    }

    await next();
});

app.get('/api/v1/', async (c) => c.json({message: 'working'}));
//groups
app.route('/api/v1/user', user);
app.route('/api/v1/blog', blog);

export default app;
