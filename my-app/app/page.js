'use client'

import MovieList from './components/MovieList';

const Page = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
        <h1 className="text-3xl font-bold">Movie Database</h1>
      </header>

      <MovieList />

      <footer className="text-center text-sm">
        <p>Movie Database - Powered by Next.js and MongoDB</p>
      </footer>
    </div>
  );
};

export default Page;
