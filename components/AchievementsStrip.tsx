// components/AchievementsStrip.tsx
"use client";

type Achievement = { src: string; alt?: string; text?: string };

export default function AchievementsStrip({
  images,
  speed = 40,          // ثواني (أكبر = أبطأ)
  gutter = "12rem",    // مسافة الحواف
  minCard = 220,       // أقل عرض للكرت (نفس السابق)
  maxCard = 300,       // أكبر عرض للكرت (نفس السابق)
}: {
  images: Achievement[];
  speed?: number;
  gutter?: string;
  minCard?: number;
  maxCard?: number;
}) {
  return (
    <section className="py-10 relative z-10">
      <div
        className="relative w-screen left-1/2 -translate-x-1/2"
        style={{ ["--edge" as any]: gutter }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            paddingInline: "var(--edge)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black var(--edge), black calc(100% - var(--edge)), transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0, black var(--edge), black calc(100% - var(--edge)), transparent 100%)",
          }}
        >
          <div
            className="marquee-track flex gap-16 will-change-transform"
            style={{ ["--dur" as any]: `${speed}s` }}
          >
            {[...images, ...images].map((it, i) => (
              <div
                key={i}
                // ↓ تصغير الظلال على الموبايل فقط (الأبعاد كما هي)
                className="rounded-2xl bg-green-700/90 text-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.16)] sm:shadow-[0_10px_24px_rgba(0,0,0,0.28)]"
                style={{
                  minWidth: `${minCard}px`,
                  maxWidth: `${maxCard}px`,
                }}
              >
                <div className="transform-gpu transition-transform duration-300 hover:scale-[1.05]">
                  <div className="rounded-xl overflow-hidden w-full">
                    <img
                      src={it.src}
                      alt={it.alt ?? "achievement"}
                      className="w-full h-auto block select-none"
                      style={{ backfaceVisibility: "hidden" }}
                      loading="lazy"
                    />
                  </div>
                  {it.text && (
                    <p className="mt-4 text-lg font-semibold text-center">
                      {it.text}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          width: max-content;
          animation: marquee var(--dur, 20s) linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
