// @components
import { Steps } from "@/components/steps";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
}
