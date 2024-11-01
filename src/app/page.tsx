import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
// @components
import { Phone } from "@/components/phone";
import { Reviews } from "@/components/reviews";
import { buttonVariants } from "@/components/ui/button";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

const LIST = [
  "Materiale di alta qualità e resistente",
  "Garanzia di stampa per 5 anni",
  "Supporto per i modelli moderni di iPhone",
];

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
      <section>
        <MaxWidthWrapper className="mt-12 lg:grid lg:grid-cols-3 lg:gap-x-0 xl:gap-x-8 xl:mt-32">
          <div className="col-span-2">
            <div className="mx-auto flex flex-col items-center text-center relative lg:text-left lg:items-start">
              <div className="w-28 hidden absolute left-0 -top-20 xl:block">
                <img src="/snake-1.png" alt="snake" className="w-full" />
              </div>
              <h1 className="relative tracking-tight text-balance font-bold !leading-tight text-5xl md:mt-16 md:text-6xl">
                La Tua Immagine su una{" "}
                <span className="bg-primary px-2 text-white">Cover</span>{" "}
                Personalizzata
              </h1>
              <p className="max-w-prose mt-10 text-lg text-center text-balance lg:pr-10 lg:text-left md:text-wrap">
                Cattura i tuoi ricordi preferiti con la tua cover per telefono,{" "}
                <b>unica nel suo genere</b>. Casecobra ti permette di proteggere
                i tuoi ricordi, non solo la tua cover per telefono.
              </p>
              <ul className="flex flex-col items-center mt-8 space-y-2 text-left font-medium sm:items-start">
                {LIST.map((description) => {
                  return (
                    <li
                      key={description}
                      className="flex gap-1.5 items-center text-left">
                      <CheckIcon className="w-5 h-5 shrink-0 text-primary" />
                      {description}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="w-full flex justify-center my-16 col-span-full lg:col-span-1">
            <div className="relative md:max-w-xl">
              <img
                src="/line.png"
                alt="line"
                className="w-20 -left-6 -bottom-6 select-none absolute"
              />
              <Phone imgSrc="/examples/1.jpg" className="w-64" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="mt-32">
        <div className="w-full flex items-center justify-center">
          <h2 className="px-6 bg-primary text-white tracking-tighter text-center !leading-tight font-bold text-5xl md:text-6xl">
            Alcuni Esempi
          </h2>
        </div>
        <Reviews />
      </section>
      <section className="my-32">
        <MaxWidthWrapper>
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tighter text-center text-balance !leading-tight font-bold text-black text-5xl md:text-6xl">
                Crea subito la tua{" "}
                <span className="relative px-2 bg-primary text-white">
                  cover
                </span>
              </h2>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="flex flex-col items-center relative grid-cols-2 gap-40 md:grid">
              <img
                src="/arrow.png"
                alt=""
                className="absolute top-[25rem] md:top-1/2 -translate-y-1/2
                 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
              />
              <div className="w-full h-80 max-w-sm relative md:h-full md:justify-self-end">
                <img
                  src="/horse.jpg"
                  alt=""
                  className="w-full h-full object-cover rounded-sm shadow-2xl"
                />
              </div>
              <Phone className="w-60" imgSrc="/horse_phone.jpg" />
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <ul className="space-y-2 sm:text-lg">
              {LIST.map((description) => {
                return (
                  <li
                    key={description}
                    className="flex gap-1.5 items-center text-left">
                    <CheckIcon className="w-5 h-5 shrink-0 text-primary" />
                    {description}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex justify-center">
            <Link
              href="/configure/upload"
              className={buttonVariants({
                size: "lg",
                className: "mx-auto mt-6",
              })}>
              Crea la tua cover adesso{" "}
              <ArrowRightIcon className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
