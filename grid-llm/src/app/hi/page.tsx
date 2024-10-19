import React from 'react';

export default function HiPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Hi there!
        </h1>
        <p className="mt-3 text-2xl">
          Welcome to your new page.
        </p>
      </main>
    </div>
  );
}
