import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";
import { todos as todosTable } from "../schemas/todos";
import { mightFail } from "might-fail";
import { db } from "../db";
import { HTTPException } from "hono/http-exception";

export const todosRouter = new Hono().post(
    "/", 
    zValidator(
        "json",
        createInsertSchema(todosTable).omit({todoId: true, createdAt: true})
    ),
async (c)=> {
 const insertValues = c.req.valid("json");
 console.log(insertValues)
 const { error:todoInsertError, result:todoInsertResult} = 
 await mightFail(db.insert(todosTable).values(insertValues).returning())
 if (todoInsertError){
    throw new HTTPException(500, {
        message: "Failed to insert todo",
        cause: todoInsertError,
    })
 }
 return c.json({todo: todoInsertResult[0]});
}
).get(
    "/",
    async (c) => {
        const { error:todosQueryError, result:todosQueryResult} =
        await mightFail(db.select().from(todosTable))
        if (todosQueryError){
            throw new HTTPException(500, {
                message: "Failed to select todos",
                cause: todosQueryError,
            })
        }
        return c.json({todos: todosQueryResult}, 200)
    }
)