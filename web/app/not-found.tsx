'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CircleArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative flex h-dvh items-center justify-center overflow-hidden`}>
      <div className='relative z-10 text-center'>
        <h1 className='glitch-text mb-4 text-9xl font-extrabold text-[#1C1C1C]' data-text='404'>
          404
        </h1>
        <h2 className='mb-6 text-4xl font-semibold text-[#353535]'>Page Not Found</h2>
        <p className='mx-auto mb-8 max-w-lg text-xl text-[#353535]'>
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className='space-x-4'>
          <Link
            title='Home'
            href='/dashboard'
            className='group inline-flex items-center rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:opacity-90 active:scale-95'
          >
            <Home className='mr-2 h-5 w-5 transition-transform group-hover:rotate-12' />
            Home
          </Link>
          <button
            title='Back'
            onClick={() => router.back()}
            className='group inline-flex items-center rounded-full bg-secondary px-8 py-3 font-semibold text-primary transition-all hover:scale-105 hover:opacity-90 active:scale-95'
          >
            <CircleArrowLeft className='mr-2 h-5 w-5 transition-transform group-hover:rotate-12' />
            Back
          </button>
        </div>
      </div>

      {mounted && (
        <style jsx global>{`
          .glitch-text {
            position: relative;
            animation: glitch 1s linear infinite;
          }

          .glitch-text::before,
          .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          .glitch-text::before {
            left: 2px;
            text-shadow: -2px 0 #9ca6f8;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim 5s infinite linear alternate-reverse;
          }

          .glitch-text::after {
            left: -2px;
            text-shadow:
              -2px 0 #6878fd,
              2px 2px #9ca6f8;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim2 5s infinite linear alternate-reverse;
          }

          @keyframes glitch-anim {
            0% {
              clip: rect(31px, 9999px, 94px, 0);
            }
            4.16666667% {
              clip: rect(91px, 9999px, 43px, 0);
            }
            8.33333333% {
              clip: rect(15px, 9999px, 13px, 0);
            }
            12.5% {
              clip: rect(75px, 9999px, 57px, 0);
            }
            16.66666667% {
              clip: rect(83px, 9999px, 66px, 0);
            }
            20.83333333% {
              clip: rect(63px, 9999px, 28px, 0);
            }
            25% {
              clip: rect(7px, 9999px, 10px, 0);
            }
            29.16666667% {
              clip: rect(34px, 9999px, 26px, 0);
            }
            33.33333333% {
              clip: rect(73px, 9999px, 50px, 0);
            }
            37.5% {
              clip: rect(71px, 9999px, 2px, 0);
            }
            41.66666667% {
              clip: rect(40px, 9999px, 47px, 0);
            }
            45.83333333% {
              clip: rect(57px, 9999px, 49px, 0);
            }
            50% {
              clip: rect(98px, 9999px, 74px, 0);
            }
            54.16666667% {
              clip: rect(2px, 9999px, 55px, 0);
            }
            58.33333333% {
              clip: rect(10px, 9999px, 90px, 0);
            }
            62.5% {
              clip: rect(66px, 9999px, 4px, 0);
            }
            66.66666667% {
              clip: rect(84px, 9999px, 85px, 0);
            }
            70.83333333% {
              clip: rect(36px, 9999px, 32px, 0);
            }
            75% {
              clip: rect(72px, 9999px, 99px, 0);
            }
            79.16666667% {
              clip: rect(3px, 9999px, 8px, 0);
            }
            83.33333333% {
              clip: rect(77px, 9999px, 21px, 0);
            }
            87.5% {
              clip: rect(39px, 9999px, 17px, 0);
            }
            91.66666667% {
              clip: rect(48px, 9999px, 42px, 0);
            }
            95.83333333% {
              clip: rect(13px, 9999px, 65px, 0);
            }
            100% {
              clip: rect(86px, 9999px, 97px, 0);
            }
          }

          @keyframes glitch-anim2 {
            0% {
              clip: rect(65px, 9999px, 100px, 0);
            }
            4.16666667% {
              clip: rect(96px, 9999px, 43px, 0);
            }
            8.33333333% {
              clip: rect(92px, 9999px, 6px, 0);
            }
            12.5% {
              clip: rect(23px, 9999px, 75px, 0);
            }
            16.66666667% {
              clip: rect(46px, 9999px, 75px, 0);
            }
            20.83333333% {
              clip: rect(50px, 9999px, 80px, 0);
            }
            25% {
              clip: rect(71px, 9999px, 61px, 0);
            }
            29.16666667% {
              clip: rect(97px, 9999px, 74px, 0);
            }
            33.33333333% {
              clip: rect(59px, 9999px, 97px, 0);
            }
            37.5% {
              clip: rect(92px, 9999px, 36px, 0);
            }
            41.66666667% {
              clip: rect(75px, 9999px, 5px, 0);
            }
            45.83333333% {
              clip: rect(54px, 9999px, 35px, 0);
            }
            50% {
              clip: rect(2px, 9999px, 48px, 0);
            }
            54.16666667% {
              clip: rect(46px, 9999px, 16px, 0);
            }
            58.33333333% {
              clip: rect(54px, 9999px, 52px, 0);
            }
            62.5% {
              clip: rect(6px, 9999px, 34px, 0);
            }
            66.66666667% {
              clip: rect(92px, 9999px, 2px, 0);
            }
            70.83333333% {
              clip: rect(71px, 9999px, 36px, 0);
            }
            75% {
              clip: rect(39px, 9999px, 5px, 0);
            }
            79.16666667% {
              clip: rect(45px, 9999px, 64px, 0);
            }
            83.33333333% {
              clip: rect(32px, 9999px, 60px, 0);
            }
            87.5% {
              clip: rect(91px, 9999px, 97px, 0);
            }
            91.66666667% {
              clip: rect(82px, 9999px, 89px, 0);
            }
            95.83333333% {
              clip: rect(54px, 9999px, 82px, 0);
            }
            100% {
              clip: rect(71px, 9999px, 47px, 0);
            }
          }
        `}</style>
      )}
    </div>
  );
}
