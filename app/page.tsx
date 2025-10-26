'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import Image from 'next/image';

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
  const [showBengal, setShowBengal] = useState(false);

  const handleClick = (breed: string) => {
    if (breed === 'Bengal') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setShowBengal(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <main className="w-full max-w-4xl px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            Rasy Kotów
          </h1>
          <p className="text-gray-400 text-lg">
            Wybierz swoją ulubioną rasę kota
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {catBreeds.map((breed) => (
            <button
              key={breed}
              onClick={() => handleClick(breed)}
              className="group relative overflow-hidden rounded-2xl bg-slate-800 px-6 py-8 shadow-lg shadow-black/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 active:scale-95 border border-slate-700 hover:border-purple-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <p className="text-gray-100 font-medium text-center leading-snug">
                  {breed}
                </p>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Bengal Modal */}
      {showBengal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowBengal(false)}
        >
          <div
            className="relative max-w-3xl mx-4 animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowBengal(false)}
              className="absolute -top-4 -right-4 z-10 bg-purple-500 hover:bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="relative rounded-3xl overflow-hidden border-4 border-purple-500 shadow-2xl shadow-purple-500/50">
              <Image
                src="/bengal.jpg"
                alt="Bengal Cat"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-3xl font-bold text-white mb-2">Bengal</h2>
                <p className="text-gray-200">Piękny kot rasy Bengal!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
