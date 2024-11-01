import { z } from "zod";
import sharp from "sharp";
import { Configuration } from "@prisma/client";
import { createUploadthing, type FileRouter } from "uploadthing/next";
// @db
import { db } from "@/db/prisma";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      let configuration: Configuration;

      const { configId } = metadata.input;

      const response = await fetch(file.url);
      const buffer = await response.arrayBuffer();

      const { width, height } = await sharp(buffer).metadata();

      if (!!configId === true) {
        configuration = await db.configuration.update({
          where: {
            id: configId,
          },
          data: {
            croppedImageUrl: file.url,
          },
        });
      } else {
        const payload = {
          imgSrc: file.url,
          height: height || 500,
          width: width || 500,
        };

        configuration = await db.configuration.create({ data: { ...payload } });
      }

      return { configId: configuration.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
