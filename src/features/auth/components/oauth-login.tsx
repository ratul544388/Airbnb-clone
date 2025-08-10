import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { FaGithub } from "react-icons/fa";

export const OauthLogin = ({ disabled }: { disabled?: boolean }) => {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div>
      <Button
        disabled={disabled}
        onClick={handleLogin}
        variant="outline"
        size="lg"
        className="w-full"
      >
        <FaGithub className="size-5" />
        Login With GitHub
      </Button>
      <div className="relative">
        <Separator className="my-8" />
        <span className="bg-background absolute -top-2 left-1/2 -translate-x-1/2 px-2 text-xs font-medium">
          OR
        </span>
      </div>
    </div>
  );
};
