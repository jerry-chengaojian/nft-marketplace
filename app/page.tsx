import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <Button>hello</Button>
      <ConnectButton />
    </div>
  );
}