import type { MetaFunction } from "@remix-run/node";
import TypingAnimation from "~/components/ui/TypingAnimation";
import GradualSpacing from "~/components/ui/GradualSpacing";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col space-y-0">
          <TypingAnimation text="SubIT" duration={200} />
          <GradualSpacing text="麦当劳挑战赛计分榜" className="text-xl" />
        </div>
      </div>
    </div>
  );
}
