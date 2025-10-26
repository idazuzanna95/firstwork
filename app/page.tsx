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
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const wrongMessages = [
    'Hmm... nie ten!',
    'Spróbuj jeszcze raz!',
    'Nie, to nie ten kot!',
    'Nieee, szukaj dalej!',
    'Ciepło... ale nie!',
    'Może inny?',
    'Nie trafione!',
    'Blisko, ale jednak nie!',
  ];

  const handleClick = (breed: string) => {
    if (breed === 'Bengal') {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#3b82f6', '#fbbf24', '#ec4899'],
      });
      setShowBengal(true);
      setMessage('');
    } else {
      setAttempts(prev => prev + 1);
      const randomMessage = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
      setMessage(randomMessage);
      setFlippedCard(breed);
      setTimeout(() => {
        setFlippedCard(null);
        setMessage('');
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <main className="w-full max-w-4xl px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            Który Kot Jest Najfajniejszy?
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            Odgadnij, który kot ma magiczną moc!
          </p>
          {attempts > 0 && !showBengal && (
            <p className="text-purple-400 text-sm">
              Próby: {attempts}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {catBreeds.map((breed) => {
            const isFlipped = flippedCard === breed;
            return (
              <div key={breed} className="card-container" style={{ minHeight: '140px' }}>
                <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                  {/* Front of card */}
                  <div className="card-front">
                    <button
                      onClick={() => handleClick(breed)}
                      className="group relative overflow-hidden rounded-2xl px-6 py-8 shadow-lg shadow-black/50 transition-all duration-200 hover:shadow-2xl hover:shadow-purple-500/20 border bg-slate-800 border-slate-700 hover:border-purple-500/50 w-full h-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <p className="text-gray-100 font-medium text-center leading-snug">
                          {breed}
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* Back of card */}
                  <div className="card-back">
                    <div className="rounded-2xl px-6 py-8 shadow-lg border bg-red-900/50 border-red-500/50 w-full h-full flex items-center justify-center">
                      <p className="text-red-200 text-lg font-bold text-center shake">
                        {message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  🎉 Gratulacje! 🎉
                </h2>
                <p className="text-white text-xl font-semibold mb-1">
                  Znalazłeś najfajniejszego kota - Bengal!
                </p>
                <p className="text-gray-300 text-sm">
                  Liczba prób: {attempts}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
