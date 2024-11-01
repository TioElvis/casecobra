"use client";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState, type HTMLAttributes } from "react";
// @components
import { Phone } from "./phone";
import { MaxWidthWrapper } from "./max-width-wrapper";
// @libs
import { _split, cn } from "@/lib/utils";

const POSSIBLE_ANIMATION_DELAYS = [
  "0s",
  "0.1s",
  "0.2s",
  "0.3s",
  "0.4s",
  "0.5s",
];

const EXAMPLES = [
  "/examples/1.jpg",
  "/examples/2.jpg",
  "/examples/3.jpg",
  "/examples/4.jpg",
  "/examples/5.jpg",
  "/examples/6.jpg",
];

interface IReviewColumn extends HTMLAttributes<HTMLDivElement> {
  ms: number;
  reviews: Array<string>;
  reviewClassName?: (index: number) => string;
}

export function ReviewColumn({ms, reviews, reviewClassName, className, ...props}: Readonly<IReviewColumn>) {
  const [high, setHigh] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!!ref.current === false) {
      return;
    }

    const resizeObserver = new window.ResizeObserver(() => {
      setHigh(ref.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const duration = `${high * ms}ms`;

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  const array = reviews.concat(reviews);

  return (
    <div
      ref={ref}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
      {...props}>
      {array.map((imgSrc, index) => {
        return (
          <div
            key={index}
            className={cn(
              "animate-fade-in p-8 w-80",
              reviewClassName?.(index % reviews.length),
            )}
            style={{ animationDelay }}>
            <Phone imgSrc={imgSrc} />
          </div>
        );
      })}
    </div>
  );
}

export function ReviewGrid() {
  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const columns = _split(EXAMPLES, 3);

  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = _split(columns[2], 2);

  return (
    <div
      ref={ref}
      className="h-[32rem] max-h-[150vh] relative mt-16 grid grid-cols-1 items-start place-items-center gap-4 overflow-hidden px-4 sm:mt-20 md:h-[48rem] md:grid-cols-2 lg:grid-cols-3">
      {isInView ? (
        <>
          <ReviewColumn
            ms={10}
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              cn({
                "md:hidden": reviewIndex >= column1.length + column3[0].length,
                "lg:hidden": reviewIndex >= column1.length,
              })
            }
          />
          <ReviewColumn
            ms={15}
            reviews={[...column2, ...column3[1]]}
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? "lg:hidden" : ""
            }
            className="hidden md:block"
          />
          <ReviewColumn
            ms={10}
            reviews={column3.flat()}
            className="hidden md:block"
          />
        </>
      ) : null}
      <div className="h-20 pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-slate-100" />
      <div className="h-20 pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-100" />
    </div>
  );
}

export function Reviews() {
  return (
    <MaxWidthWrapper className="relative max-w-5xl my-16">
      <img
        aria-hidden="true"
        src="/what-people-are-buying.png"
        alt=""
        className="absolute select-none hidden -left-32 top-1/3 xl:block"
      />
      <ReviewGrid />
    </MaxWidthWrapper>
  );
}
