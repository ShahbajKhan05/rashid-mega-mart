
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen w-full items-center justify-center overflow-hidden bg-[#FFF9D8] px-6 text-center text-black">
      <section className="coming-soon-container">
        <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#1DCED8] p-2">
          <Image
            src="/Logo.png"
            alt="NOOR TECHNOLOGIES Logo"
            width={64}
            height={64}
            priority
            className="h-full w-full object-contain"
          />
        </div>

        <p className="coming-soon-label text-sm font-semibold uppercase tracking-[0.3em]">
          RASHID MEGA MART
        </p>

        <h1 className="coming-soon-title mt-5 text-5xl font-black tracking-tight sm:text-7xl">
          Coming
          <span className="coming-soon-second block">Soon.</span>
        </h1>

        <p className="coming-soon-description mt-5 text-base sm:text-lg">
          Something exciting is on the way.
        </p>

        <div className="coming-soon-line mx-auto mt-8 h-1.5 w-20 rounded-full bg-[#1DCED8]" />
      </section>
    </main>
  );
}
