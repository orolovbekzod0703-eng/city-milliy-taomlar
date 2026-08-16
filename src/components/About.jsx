import ArchFrieze from './ArchFrieze'

const VALUES = [
  {
    title: 'Yangi mahsulotlar',
    text: "Har kuni bozordan tanlab olingan yangi go'sht, sabzavot va ziravorlardan foydalanamiz.",
  },
  {
    title: "An'anaviy retsept",
    text: "Taomlarimiz avlodlardan-avlodlarga o'tib kelayotgan asl o'zbek retseptlari asosida tayyorlanadi.",
  },
  {
    title: 'Mehmondo\u2019stlik',
    text: "Har bir mehmonimizni o'z uyimizdagidek issiq va samimiy kutib olamiz.",
  },
]

export default function About() {
  return (
    <section id="about" className="bg-[var(--color-parchment)] py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5 md:px-8 text-center">
        <p className="font-script italic text-[var(--color-terracotta-dark)] text-lg mb-2">Biz haqimizda</p>
        <h2 className="font-display text-2xl md:text-3xl text-[var(--color-ink)] tracking-wide">
          MILLIY TAOMLAR MADANIYATI
        </h2>
        <p className="mt-5 max-w-2xl mx-auto text-[var(--color-ink)]/70 leading-relaxed text-sm md:text-base">
          CITY Milliy taomlar — bu shunchaki restoran emas, balki o'zbek dasturxoni an'analarini davom ettiruvchi joy.
          Osh, shashlik, manti va boshqa sara taomlarimizni har kuni yangi tayyorlab, mehmonlarimizga xush kayfiyat bilan
          taqdim etamiz.
        </p>

        <div className="mt-14 grid sm:grid-cols-3 gap-8 text-left">
          {VALUES.map((v, i) => (
            <div key={v.title} className="relative pl-5">
              <span className="absolute left-0 top-1 text-xs font-display text-[var(--color-gold)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="border-l-2 border-[var(--color-gold)]/40 pl-4">
                <h3 className="font-display text-sm tracking-wide text-[var(--color-terracotta-dark)] mb-2">
                  {v.title.toUpperCase()}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink)]/65">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto mt-16 px-5">
        <ArchFrieze color="var(--color-terracotta)" className="opacity-60" />
      </div>
    </section>
  )
}
