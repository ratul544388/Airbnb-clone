import { getCurrentUser } from "@/lib/get-current-user";
import { Container } from "../container";
import { Logo } from "../logo";
import { ListMyPropertyButton } from "./list-my-property-button";
import { UserButton } from "./user-button";

const Header = async () => {
  const user = await getCurrentUser({ required: false });
  return (
    <header className="h-header bg-background sticky top-0 z-50 border-b ">
      <Container
        className="flex h-full items-center justify-between"
      >
        <Logo />
        <div className="flex items-center gap-3">
          <ListMyPropertyButton />
          <UserButton user={user} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
