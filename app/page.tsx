"use client"


import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Page =   () => {


  // await requireAuth();

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const testAi = useMutation(trpc.testAi.mutationOptions());


  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
    }
  }));

  



  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">

      <Button disabled={testAi.isPending}  onClick={() => testAi.mutate()}>Test Ai</Button>
     
      hello protected route

      {JSON.stringify(data, null , 2)}
    </div>
  )
}; 


export default Page;