

import { useTRPC } from "@/trpc/client";
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";
import { Client } from './cient';
import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";

const Page =  () => {

  // const trpc = useTRPC();
  // const { data: users } = useQuery(trpc.getUsers.queryOptions());
  // console.log('user is ', users);

  const queryClient = getQueryClient(); 

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading...</p>}>
          <Client></Client>
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}; 


export default Page;