"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Form } from "@heroui/react";
import { Button } from "@heroui/button";
import { Google, Apple, ArrowLeft } from 'iconsax-react';

// Memoize slide data to prevent unnecessary re-renders
const SLIDES = [
  {
    image: "/images/auth/auth-bg1.jpg",
    quote: "Experience the rhythm and elegance of traditional dances passed down through generations.",
    author: "Sarah Johnson",
  },
  {
    image: "/images/auth/auth-bg2.jpg",
    quote: "Immerse yourself in the electrifying energy of live music and artistic expression.",
    author: "Maria Gonzalez",
  },
  {
    image: "/images/auth/auth-bg3.jpg",
    quote: "Explore the captivating world of art where creativity meets history.",
    author: "John Smith",
  },
];

export default function SignInPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload images once on mount
  useEffect(() => {
    SLIDES.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Memoized slide handlers
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  // Optimized auto-advance with cleanup
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Memoized slide change handler
  const goToSlide = useCallback((index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left Half - Carousel */}
      <div className="relative bg-gray-100 rounded-3xl m-1 overflow-hidden">
        {/* Background slides */}
        <div className="absolute inset-0">
          {SLIDES.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              aria-hidden={currentSlide !== index}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40" />
            </div>
          ))}
        </div>

        {/* Quote content */}
        <div className="absolute inset-0 flex items-end p-8 z-10">
          <div className="text-white max-w-lg">
            <blockquote className="text-4xl font-semibold mb-2">
              &ldquo;{SLIDES[currentSlide].quote}&rdquo;
            </blockquote>
            <p className="text-lg font-medium">{SLIDES[currentSlide].author}</p>
          </div>  
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Half - Form */}
      <div className="relative bg-white rounded-3xl m-1 p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-extrabold text-gray-800">Voices of Bokamoso</h3>
          <Button
            variant="light"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => router.push('/')}
          >
            <ArrowLeft size={20} variant='Outline' color='#333' />
            Back to Home
          </Button>
        </div>

        <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome Back</h2>
        <p className="text-gray-600 mb-6">We are glad to see you again! Please sign in to continue.</p>

        <div className="flex flex-col gap-4 mb-6">
          <Button variant="solid" className="flex items-center justify-center gap-4 w-full py-5 px-4 font-semibold rounded-xl text-gray-800 duration-200">
            <Google size={20} variant='Bold' color='#333' />
            Continue with Google
          </Button>
          <Button variant="ghost" className="flex items-center justify-center gap-4 w-full py-5 px-4 font-semibold rounded-xl text-gray-800 duration-200">
            <Apple size={20} variant='Bold' color='#333' />
            Continue with Apple
          </Button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <hr className="w-full border-gray-300" />
          <span className="text-gray-500 font-semibold mx-4">Or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <Form className="flex flex-col gap-4 mb-6">
          <div className="grid grid-cols-2 w-full gap-4 mb-2">
            <Input type="text" label="First Name" color='default' />
            <Input type="text" label="Last Name" color='default' />
          </div>
          <Input type="email" label="Email Address" color='default' />
          <Input type="password" label="Password" color='default' />
          <Button variant="solid" className="w-full py-6 px-4 font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 duration-200">
            Sign In
          </Button>
        </Form>

        <p className="text-gray-600 text-center">
          Don&apos;t have an account?{" "}
          <a href="/auth/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};