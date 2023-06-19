import { ConnectKitButton } from "connectkit";

export function Header() {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center gap-8">
        <ConnectKitButton />
      </div>
    </div>
  );
}
