"use client";
import {
  ImageIcon,
  Loader2Icon,
  MousePointerSquareDashedIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { type FileRejection } from "react-dropzone";
// @components
import { Progress } from "@/components/ui/progress";
// @hooks
import { useToast } from "@/hooks/use-toast";
// @libs
import { cn } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";

export default function ConfigureUpload() {
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const router = useRouter();
  const { toast, dismiss } = useToast();

  const [isPending, startTransition] = useTransition();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([{ serverData }]) => {
      startTransition(() => {
        const { configId } = serverData;
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress(p) {
      setProgress(p);
    },
  });

  const onDropAccepted = (acceptedFiles: Array<File>) => {
    dismiss();
    startUpload(acceptedFiles, { configId: undefined });

    setIsDragOver(false);
  };

  const onDropRejected = (rejectedFiles: Array<FileRejection>) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);

    toast({
      title: `il tipo ${file.file.type} non è supportato`,
      description: "Per favore scegli una image PNG, JPG, JPEG",
      variant: "destructive",
    });
  };

  return (
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        { "ring-blue-900/25 bg-blue-900/10": isDragOver },
      )}>
      <div
        className={cn(
          `relative flex flex-1 flex-col items-center justify-center w-full ${
            isPending || isUploading ? "cursor-not-allowed" : "cursor-pointer"
          }`,
        )}>
        <Dropzone
          accept={{
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
          }}
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          disabled={isUploading || isPending}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}>
          {({ getRootProps, getInputProps }) => {
            return (
              <div
                className="w-full h-full flex-1 flex flex-col items-center justify-center"
                {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragOver ? (
                  <MousePointerSquareDashedIcon className="h-6 w-6 text-zinc-500 mb-2" />
                ) : isUploading || isPending ? (
                  <Loader2Icon className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-zinc-500 mb-2" />
                )}
                <div className="flex flex-col justify-center mb-2 text-start text-sm">
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <p>Caricando...</p>
                      <Progress
                        value={progress}
                        className="mt-2 h-2 bg-gray-300"
                      />
                    </div>
                  ) : isPending ? (
                    <div className="flex flex-col items-center">
                      <p>Reindirizzamento, per favore aspettare...</p>
                    </div>
                  ) : isDragOver ? (
                    <p>
                      <span className="font-semibold">Drop File</span> per
                      caricare
                    </p>
                  ) : (
                    <p>
                      <span className="font-semibold">
                        Clicca per caricare un file
                      </span>{" "}
                      o drag e drop
                    </p>
                  )}
                </div>
                {!isPending && (
                  <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
                )}
              </div>
            );
          }}
        </Dropzone>
      </div>
    </div>
  );
}
