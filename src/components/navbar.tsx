import Link from "next/link";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRightIcon } from "lucide-react";
// @components
import { buttonVariants } from "./ui/button";
import { MaxWidthWrapper } from "./max-width-wrapper";

export async function Navbar() {
  const user = await getKindeServerSession().getUser();

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="w-full h-full px-8 border-gray-200 border-b transition-all md:px-0">
      <MaxWidthWrapper>
        <div className="h-full flex items-center justify-between">
          <Link href="/" className="font-bold">
            case<span className="text-primary">cobra</span>
          </Link>
          <div className="flex items-center gap-4">
            {!!user === true ? (
              <>
                <LogoutLink
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}>
                  Esci
                </LogoutLink>
                {isAdmin === true && (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}>
                    Dashboard
                  </Link>
                )}
              </>
            ) : (
              <>
                <RegisterLink
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}>
                  Registrati
                </RegisterLink>
                <LoginLink
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}>
                  Login
                </LoginLink>
              </>
            )}
            <div className="w-px h-8 hidden bg-zinc-200 sm:block" />
            <Link
              href="/configure/upload"
              className={buttonVariants({
                size: "sm",
                className: "hidden items-center gap-1 sm:flex",
              })}>
              Crea una cover
              <ArrowRightIcon className="w-5 h-5 ml-1.5" />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
