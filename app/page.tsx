'use client';

import confetti from 'canvas-confetti';

const catBreeds = [
  'Bengal',
  'Perski',
  'Maine Coon',
  'Brytyjski Krótkowłosy',
  'Syjamski',
  'Ragdoll',
  'Sfinks',
  'Rosyjski Niebieski',
  'Norweski Leśny',
  'Abisynski',
];

export default function Home() {
  const handleClick = (breed: string) => {
    if (breed === 'Bengal') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <main className="w-full max-w-4xl px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-3">
            Rasy Kotów
          </h1>
          <p className="text-slate-600 text-lg">
            Wybierz swoją ulubioną rasę kota
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {catBreeds.map((breed) => (
            <button
              key={breed}
              onClick={() => handleClick(breed)}
              className="group relative overflow-hidden rounded-2xl bg-white px-6 py-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <p className="text-slate-800 font-medium text-center leading-snug">
                  {breed}
                </p>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
