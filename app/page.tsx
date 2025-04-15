import { prisma } from "@/prisma";

export default async function Home() {
  const user = await prisma.user.findMany();
  console.log(user);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="font-bold text-4xl">Hello World</h1>
    </div>
  );
}
