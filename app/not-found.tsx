// app/not-found.js

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex h-screen justify-center align-middle'>
        <div className='m-auto'>
            <h1 className='text-white text-2xl'>404 - Page Not Found</h1>
            <p className='text-white pb-5 '>Sorry, the page you are looking for does not exist.</p>
            <Link className='text-white bg-sky-500 hover:bg-sky-700 pl-4 pr-4 pt-2 pb-2 rounded-lg' href="/">Go back home</Link>
        </div>
    </div>
  );
}