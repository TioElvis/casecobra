import Link from "next/link";
// @components
import { MaxWidthWrapper } from "./max-width-wrapper";

const LIST = [
  { href: "#", name: "Terms" },
  { href: "#", name: "Privacy Policy" },
  { href: "#", name: "Cookie Policy" },
];

export function Footer() {
  return (
    <footer className="h-20 bg-white">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200" />
        <div className="h-full flex flex-col items-center justify-center gap-2 md:gap-0 md:flex-row md:justify-between">
          <div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Tutti i diritti riservati
            </p>
          </div>
          <div>
            <div className="flex gap-8">
              {LIST.map(({ href, name }) => {
                return (
                  <Link
                    key={name}
                    href={href}
                    className="text-sm text-muted-foreground hover:text-gray-800">
                    {name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
