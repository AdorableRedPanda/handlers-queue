import type { Context } from 'hono';
import { execute } from "@/execute";
import { Loggable } from "@/types";

export const handle = async (c: Context) => {

    const input = c.req.query('input');
    const onLog = (task: Loggable) => {
        console.log(task.toLogger());
    }

    const result = await execute(input, onLog);

    return c.json(result);
}
