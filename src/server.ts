import fastify from "fastify";
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
import { env } from "../env.ts";
import { sql } from "./db/conection.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: "http://localhost:5173",
}
);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", async () => {
    return { message: "Hello World!" };
});

app.listen({ port: env.PORT }).then(() => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
});