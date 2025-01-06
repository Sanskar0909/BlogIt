import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const getPrismaClient = (databaseURL: string): any => {
    const prisma = new PrismaClient({
        datasourceUrl: databaseURL
    }).$extends(withAccelerate())

    return prisma
}