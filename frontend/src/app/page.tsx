import dynamic from 'next/dynamic';

const Gravity = dynamic(() => import('@/components/Gravity/Gravity'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Gravity />
    </main>
  );
}
