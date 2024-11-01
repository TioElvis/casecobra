// @libs
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

export function Phone({ imgSrc, className, ...props }: Readonly<Props>) {
  return (
    <div className={cn("relative pointer-events-none z-50 overflow-hidden", className)} {...props}>
      <img
        src="/phone-template.png"
        alt="phone-template"
        className="pointer-events-none z-50 select-none"
      />
      <div className="absolute -z-10 inset-px">
        <img
          src={imgSrc}
          alt="overlaying phone image"
          className="object-cover min-w-full min-h-full rounded-[2.5rem]"
        />
      </div>
    </div>
  );
}
