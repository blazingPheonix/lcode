import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
import { google } from '@ai-sdk/google'; 
import { generateText } from 'ai';

export const appRouter = createTRPCRouter({

    testAi: protectedProcedure.mutation(async () => {

        await inngest.send({
            name: "execute/ai",
        });
        // const { text } = await generateText({
        //     model: google('gemini-2.5-flash'),
        //     prompt: 'consider yourself virat kohli and msDhoni .I am feeling very low and I am turned very numb and want to make a comeback in my coding field , motivate me '
        // });
        return { success: true , message: "Job queued"};
    }),
    getWorkflows: protectedProcedure
        .query(({ctx}) => {
            return prisma.workflow.findMany({
                where: {
                    id: ctx.auth.user.id,
                }
            });
        }),
    createWorkflow: protectedProcedure.mutation(async () => {
        
        // //fetch the video
        // await new Promise((resolve) => setTimeout(resolve, 5_000));

        // //transcribe the video
        // await new Promise((resolve) => setTimeout(resolve, 4000));

        await inngest.send({
            name: "test/hello.world",
            data: {
                email: "abc@gmail.com",
            },
        })



        return prisma.workflow.create({
            data: {
                name: "test-workflow"
            }
        });
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;