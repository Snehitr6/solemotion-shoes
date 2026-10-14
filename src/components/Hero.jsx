import { ArrowDown, ArrowUpRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[650px] overflow-hidden bg-[#f4f3ed] text-[#171815] lg:min-h-[720px]"
    >
      {/* Premium background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#d8e7a0]/40 blur-[110px]" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-white/80 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-96 rounded-full bg-[#e5dcd0]/50 blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(#252820 0.7px, transparent 0.7px)",
            backgroundSize: "7px 7px",
          }}
        />
      </div>

      <div className="mx-auto grid min-h-[650px] max-w-[1440px] items-center gap-12 px-5 py-16 sm:px-8 lg:min-h-[720px] lg:grid-cols-2 lg:gap-10 lg:px-16 xl:px-20">
        {/* Left content */}
        <div className="relative z-10 max-w-[590px]">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#9bc52d] shadow-[0_0_0_5px_rgba(155,197,45,0.15)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#66685e]">
              Made for your next move
            </span>
          </div>

          <h1 className="text-[clamp(3.6rem,7.3vw,6.8rem)] font-black leading-[0.88] tracking-[-0.085em]">
            Find your
            <br />
            own{" "}
            <span className="font-serif font-medium italic tracking-[-0.075em] text-[#708b20]">
              pace.
            </span>
          </h1>

          <p className="mt-8 max-w-[390px] text-sm leading-7 text-[#73746c] sm:text-base">
            Performance meets everyday style. Discover footwear built to move
            with you, wherever your day takes you.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#collection"
              className="group inline-flex min-h-14 items-center gap-5 bg-[#191a17] px-6 text-sm font-semibold text-white transition duration-300 hover:bg-[#708b20]"
            >
              Explore the collection
              <ArrowUpRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href="#story"
              className="group inline-flex items-center gap-2 py-3 text-sm font-semibold text-[#34352f]"
            >
              Our approach
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-1"
              />
            </a>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[
                { letter: "J", color: "#d8c6ad" },
                { letter: "A", color: "#b5c5ad" },
                { letter: "M", color: "#d9b2a2" },
              ].map((person) => (
                <div
                  key={person.letter}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f4f3ed] text-[10px] font-bold text-[#34352f]"
                  style={{ backgroundColor: person.color }}
                >
                  {person.letter}
                </div>
              ))}
            </div>

            <div>
              <div className="flex gap-1 text-[#718d22]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
                    fill="currentColor"
                    strokeWidth={1}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-[#73746c]">
                Made for the way you move
              </p>
            </div>
          </div>
        </div>

        {/* Right product showcase */}
        <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
          <div className="absolute left-1/2 top-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d9d8cd] opacity-70" />

          <div className="absolute -right-2 top-3 h-24 w-24 rounded-full bg-[#d5ff4f] sm:-right-5 sm:h-28 sm:w-28">
            <div className="flex h-full flex-col justify-center px-5 text-[11px] font-black uppercase leading-[1.15] text-[#1c2112]">
              Move
              <br />
              your
              <br />
              way
              <ArrowUpRight className="mt-1 self-end" size={16} />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[5px] bg-[#c80820] shadow-[0_30px_80px_rgba(83,28,25,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e3112a] via-[#bd001a] to-[#720013]" />

            <div className="absolute inset-0 opacity-30">
              <div className="absolute -right-20 top-10 h-72 w-72 rounded-full border border-white/30" />
              <div className="absolute -right-10 top-20 h-60 w-60 rounded-full border border-white/20" />
            </div>

            {/* Replace this URL with your own sneaker image if needed */}
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90"
              alt="Red athletic sneaker"
              className="relative z-10 aspect-[1/1.03] w-full object-cover mix-blend-normal transition-transform duration-700 hover:scale-105"
              loading="eager"
            />
          </div>

          <div className="absolute -bottom-5 left-3 z-20 w-[min(260px,75%)] bg-white/95 p-4 shadow-[0_15px_45px_rgba(30,30,20,0.12)] backdrop-blur-md sm:-left-6 sm:p-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#77786e]">
              01 / The everyday runner
            </p>
            <h2 className="mt-2 text-sm font-bold tracking-tight">
              Velocity Runner Pro
            </h2>
            <p className="mt-2 text-xs text-[#77786e]">
              Built to go further ↗
            </p>
          </div>

          <p className="absolute -right-8 top-1/2 hidden -translate-y-1/2 rotate-90 text-[9px] font-bold uppercase tracking-[0.35em] text-[#77786e] xl:block">
            SOLE / MOTION — 2026
          </p>
        </div>
      </div>
    </section>
  );
}
