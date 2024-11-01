"use client";
import { useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
// actions
import { getAuthStatus } from "./actions";

export default function AuthCallback() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  useEffect(() => {
    if (data?.success === true) {
      router.push("/");
    }
  }, [data?.success, router]);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2Icon className="w-8 h-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Accesso in corso...</h3>
        <p>Verrai reindirizzato automaticamente</p>
      </div>
    </div>
  );
}
