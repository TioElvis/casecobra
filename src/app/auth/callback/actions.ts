"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// @db
import { db } from "@/db/prisma";

export async function getAuthStatus() {
  const user = await getKindeServerSession().getUser();

  if (!!user?.id === false || !!user.email === false) {
    throw new Error("Invalid user data");
  }

  const existingUser = await db.user.findUnique({
    where: { id: user.id },
  });

  if (!!existingUser === false) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    await db.user.create({ data: { ...payload } });
  }

  return { success: true };
}
