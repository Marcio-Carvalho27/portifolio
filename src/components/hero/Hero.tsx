export function Hero() {
  return (
    <section className="min-h-screen bg-[#f5f5f5]">
      <div className="container-custom">
        {/* TOPBAR */}
        <div className="flex items-center justify-between pt-8">
          {/* STATUS */}
          <div className="rounded-full border border-[#e5e5e5] bg-white px-4 py-2">
            <p className="text-sm text-[#111111]">
              Available for New Project
            </p>
          </div>

          {/* NAVIGATION */}
          <nav className="hidden gap-10 md:flex">
            <a
              href="#work"
              className="text-sm text-[#111111] transition hover:opacity-60"
            >
              Work
            </a>

            <a
              href="#experience"
              className="text-sm text-[#111111] transition hover:opacity-60"
            >
              Experience
            </a>

            <a
              href="#contact"
              className="text-sm text-[#111111] transition hover:opacity-60"
            >
              Contact
            </a>
          </nav>

          {/* CTA */}
          <button className="rounded-full bg-[#111111] px-6 py-3 text-sm text-white transition hover:opacity-80">
            Let&apos;s Talk
          </button>
        </div>

        {/* HERO CONTENT */}
        <div className="relative flex min-h-[85vh] flex-col items-center justify-center">
          {/* BIG NAME */}
          <h1 className="text-center text-[70px] font-black uppercase leading-none tracking-[-4px] text-transparent md:text-[160px]">
            <span className="stroke-text">MÁRCIO</span>{" "}
            <span className="text-[#111111]">CARVALHO</span>
          </h1>

          {/* PHOTO */}
          <div className="relative mt-[-20px]">
            <img
              src="/profile.png"
              alt="Profile"
              className="w-[280px] object-cover md:w-[420px]"
            />
          </div>

          {/* LEFT INFO */}
          <div className="absolute bottom-24 left-0 hidden max-w-[280px] md:block">
            <h2 className="text-3xl font-semibold">
              Full Stack Developer
            </h2>

            <p className="mt-4 text-[#7b7b7b]">
              Building digital products focused on
              performance, usability and clean design.
            </p>

            <button className="mt-6 rounded-full bg-[#111111] px-6 py-3 text-white transition hover:opacity-80">
              Let&apos;s Collaborate
            </button>
          </div>

          {/* SOCIALS */}
          <div className="absolute right-0 bottom-24 hidden flex-col gap-4 md:flex">
            <a
              href="#"
              className="rounded-full border border-[#e5e5e5] bg-white px-5 py-3 text-sm transition hover:bg-[#111111] hover:text-white"
            >
              GitHub
            </a>

            <a
              href="#"
              className="rounded-full border border-[#e5e5e5] bg-white px-5 py-3 text-sm transition hover:bg-[#111111] hover:text-white"
            >
              LinkedIn
            </a>

            <a
              href="#"
              className="rounded-full border border-[#e5e5e5] bg-white px-5 py-3 text-sm transition hover:bg-[#111111] hover:text-white"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}