"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem } from "@heroui/dropdown";
import { Input } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from 'next/link';

const scrollButtonVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function LandingPage() {
  const [navbarBg, setNavbarBg] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Add state for mobile menu

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg(true);
      } else {
        setNavbarBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      image: "/hero-bg1.jpg",
      title: "Traditional Dances of the World",
      description:
        "Experience the rhythm and elegance of traditional dances passed down through generations, celebrating the rich cultural heritage of diverse communities across the globe.",
      category: "Cultural",
      cta: "Learn More",
      author: "By Sarah Johnson",
      date: "Published March 12, 2024",
      length: "5 min read",
    },
    {
      image: "/hero-bg2.jpg",
      title: "Music Festival",
      description:
        "Immerse yourself in the electrifying energy of live music, where artists and fans unite to celebrate sound, rhythm, and artistic expression in an unforgettable festival experience.",
      category: "Music",
      cta: "Learn More",
      author: "By Maria Gonzalez",
      date: "Published March 15, 2024",
      length: "3 min read",
    },
    {
      image: "/hero-bg3.jpg",
      title: "Art and Culture",
      description:
        "Explore the captivating world of art, where creativity meets history to tell stories through paintings, sculptures, and performances that reflect the soul of civilization.",
      category: "Art",
      cta: "Discover More",
      author: "By John Smith",
      date: "Published March 18, 2024",
      length: "1 min read",
    },
  ];

  // Add section refs
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const blogsRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll handler
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  };
  

  return (
    <div className="relative w-full h-full">
      {/* Navbar */}
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        navbarBg ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#"
              className={`font-extrabold text-2xl tracking-widest ${
                navbarBg ? "text-black" : "text-white"
              }`}
            >
              Voices of Bokamoso
            </a>
          </div>

          {/* Desktop Menu - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About Us", "Latest", "Contact Us"].map((item) => (
              <a
                key={item}
                onClick={() => {
                  switch(item) {
                    case "Home": window.scrollTo({ top: 0, behavior: "smooth" }); break;
                    case "About Us": scrollToSection(aboutRef); break;
                    case "Latest": scrollToSection(blogsRef); break;
                    case "Contact Us": scrollToSection(contactRef); break;
                  }
                }}
                className={`font-medium transition-colors ${
                  navbarBg
                    ? "text-gray-800 hover:text-gray-500"
                    : "text-white hover:text-gray-200"
                } cursor-pointer`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Auth Buttons - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              className={`py-2 px-4 border text-sm font-semibold text-center rounded-lg ${
                navbarBg ? "border-black text-black" : "border-white text-white"
              } hover:bg-white/10 transition-colors`}
              href="/auth/signin"
            >
              Sign In
            </Link>
            <Link
              className={`py-2 px-4 border text-sm font-semibold text-center rounded-lg ${
                navbarBg ? "border-black text-black" : "border-white text-white"
              } hover:bg-white/10 transition-colors`}
              href="#"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                navbarBg ? "text-gray-800" : "text-white"
              } hover:text-gray-300 focus:outline-none`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - show/hide based on menu state */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 ${navbarBg ? "bg-white" : "bg-black/90"}`}>
          {["Home", "About Us", "Latest", "Contact Us"].map((item) => (
            <a
              key={item}
              onClick={() => {
                setIsMobileMenuOpen(false);
                switch(item) {
                  case "Home": window.scrollTo({ top: 0, behavior: "smooth" }); break;
                  case "About Us": scrollToSection(aboutRef); break;
                  case "Latest": scrollToSection(blogsRef); break;
                  case "Contact Us": scrollToSection(contactRef); break;
                }
              }}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                navbarBg
                  ? "text-gray-800 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              } cursor-pointer`}
            >
              {item}
            </a>
          ))}
          <div className="pt-4 pb-2 border-t border-gray-700">
            <div className="flex items-center px-5 space-x-4">
              <Link
                className={`w-full px-4 py-2 border text-center rounded-md text-sm font-medium ${
                  navbarBg
                    ? "border-gray-800 text-gray-800 hover:bg-gray-100"
                    : "border-white text-white hover:bg-white/10"
                }`}
                href="/auth/signin"
              >
                Sign In
              </Link>
              <Link
                className={`w-full px-4 py-2 border text-center rounded-md text-sm font-medium ${
                  navbarBg
                    ? "border-gray-800 text-gray-800 hover:bg-gray-100"
                    : "border-white text-white hover:bg-white/10"
                }`}
                href="#"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>

      <section className="relative min-h-screen w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Optional overlay for darker background */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 w-full text-white">
              <div className="container mx-auto px-10 py-20">
                <div className="max-w-4xl">
                  {/* Category type */}
                  <span className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg text-white text-md font-bold px-5 py-1.5 rounded-full">
                    {slide.category}
                  </span>

                  {/* Title */}
                  <h1 className="text-3xl font-bold mt-5">{slide.title}</h1>

                  {/* Description and CTA row */}
                  <div className="flex justify-between items-start mt-5">
                    {/* Left side - Description */}
                    <div className="w-2/3 pr-8">
                      <p className="text-lg leading-relaxed">
                        {slide.description}
                      </p>
                    </div>

                    {/* Right Side - Author & Date */}
                    <div className="w-1/3 h-24 pl-8 border-l border-white/30">
                      <div className="text-left">
                        <p className="font-medium text-white/90">
                          {slide.author}
                        </p>
                        <p className="text-sm text-white/70 mt-1">
                          {slide.date}
                        </p>
                        <p className="text-sm text-white/70 mt-1">
                          {slide.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  {slide.cta && (
                    <Button
                    href="#"
                    className="inline-block mt-8 py-2.5 px-8 bg-transparent border border-white text-white"
                  >
                    {slide.cta}
                  </Button>
                )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div 
          className="absolute bottom-0 left-0 w-full text-white text-center py-5 cursor-pointer"
          onClick={() => scrollToSection(aboutRef)}
          >
          <motion.div
            variants={scrollButtonVariants}
            animate="animate"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-auto text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
          <p className="text-sm mt-2">Scroll down</p>
        </div>
      </section>

      {/* About Us */}
      <section ref={aboutRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <Image
              src="/hero-bg3.jpg"
              alt="About Culture Fest"
              removeWrapper
              className="w-full h-full object-cover transition-transform duration-500"
            />

            {/* Right Column - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Building Bridges Through Cultural Exchange
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Voices of Bokamoso is a fresh initiative established by passionate creators and cultural advocates. 
                We&apos;re laying the foundation for meaningful connections through arts and traditions, 
                creating a platform where diverse voices can converge and inspire global understanding.
              </p>

              {/* Focus Areas Grid */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                {[
                  { 
                    title: 'Cultural Discovery', 
                    text: 'Uncovering authentic traditions worldwide',
                    accent: 'text-blue-600'
                  },
                  { 
                    title: 'Community First', 
                    text: 'Fostering inclusive cultural spaces',
                    accent: 'text-green-600'
                  },
                  { 
                    title: 'Artistic Innovation', 
                    text: 'Supporting contemporary interpretations',
                    accent: 'text-purple-600'
                  },
                  { 
                    title: 'Educational Outreach', 
                    text: 'Sharing knowledge through experiences',
                    accent: 'text-orange-600'
                  }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-8 ${item.accent} bg-current`}></div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <Button
                  href="/join"
                  className="px-8 py-3.5 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  Become a Founding Member
                </Button>
                <p className="text-sm text-gray-500">
                  As a new platform, we welcome collaborators and visionaries to help shape 
                  this initiative from the ground up. Your participation defines our trajectory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs */}
      <section ref={blogsRef} className="py-16 bg-white">
        <div className="container mx-auto px-10">
          <div className="text-left mb-12">
            <h2 className="text-3xl font-medium text-gray-900">Featured Stories</h2>
            <p className="text-gray-600 mt-3 max-w-2xl">
              Discover fresh perspectives and cultural insights through our curated selection of articles 
              and experiences from around the world.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-3">
              {["All", "Art", "Music", "Dance", "Culture"].map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className={`px-4 py-2 rounded-full ${
                    category === "All" 
                      ? "bg-black text-white hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="ghost" className="text-gray-600 hover:bg-gray-100">
                  Sort by: Newest First
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="w-48">
                <DropdownSection>
                  <DropdownItem>Newest First</DropdownItem>
                  <DropdownItem>Most Popular</DropdownItem>
                  <DropdownItem>Editor&apos;s Picks</DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {slides.map((post, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    removeWrapper
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-4 right-4 z-10 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </CardHeader>
                <CardBody className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date.replace('Published ', '')}</span>
                    <span className="mx-2">•</span>
                    <span>{post.length}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-600 line-clamp-3 mb-4">{post.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{post.author}</span>
                    <Button
                      variant="ghost"
                      className="text-black hover:bg-gray-100 flex items-center gap-2"
                    >
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* View All CTA */}
          <div className="mt-12 text-center">
            <Button
              href="#"
              className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Collage Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column - Stacked Cards */}
            <div className="space-y-3">
              <div className="relative group h-64 overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/hero-bg1.jpg"
                  alt="Cultural Events"
                  removeWrapper
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute z-10 inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 flex flex-col justify-end">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-[0.7rem] font-medium w-fit">
                    Cultural Events
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">
                    Traditional Dance Festivals
                  </h3>
                  <Button
                    href="#"
                    className="mt-1.5 w-fit bg-transparent border border-white text-white hover:bg-white/10 text-[0.7rem] px-2.5 py-1"
                  >
                    Explore Traditions
                  </Button>
                </div>
              </div>

              <div className="relative group h-64 overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/hero-bg2.jpg"
                  alt="Music Concerts"
                  removeWrapper
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute z-10 inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 flex flex-col justify-end">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-[0.7rem] font-medium w-fit">
                    Live Music
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">
                    Global Music Experiences
                  </h3>
                  <Button
                    href="#"
                    className="mt-1.5 w-fit bg-transparent border border-white text-white hover:bg-white/10 text-[0.7rem] px-2.5 py-1"
                  >
                    Discover Sounds
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Big Card */}
            <div className="relative group min-h-[360px] overflow-hidden rounded-lg shadow-md">
              <Image
                src="/hero-bg3.jpg"
                alt="Art Exhibition"
                removeWrapper
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute z-10 inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 flex flex-col justify-end">
                <span className="bg-white/20 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-xs font-medium w-fit">
                  Art & Culture
                </span>
                <h3 className="text-lg font-bold text-white mt-2">
                  World Art Showcase
                </h3>
                <p className="text-gray-200 mt-1 max-w-xl text-xs leading-tight">
                  Discover masterpieces from contemporary artists and ancient 
                  civilizations in our immersive exhibitions.
                </p>
                <Button
                  href="#"
                  className="mt-2 w-fit bg-transparent border border-white text-white hover:bg-white/10 text-xs px-3 py-1.5"
                >
                  View Collections
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800">
        <div className="container mx-auto px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-100">
                Voices of Bokamoso
              </h3>
              <p className="text-gray-400 text-sm">
                {/* Connecting the world through cultural exchange and artistic expression. */}
                Founded in 2024, Voices of Bokamoso is a global platform dedicated to preserving cultural heritage 
                while fostering modern artistic expression. 
                {/* <br />
                We bridge traditional and contemporary through 
                immersive experiences, educational programs, and community-driven initiatives. */}
              </p>
              <div className="flex items-center space-x-5">
                  {[
                    ['Twitter', 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'],
                    ['Facebook', 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'],
                    ['Instagram', 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'],
                    ['LinkedIn', 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z']
                  ].map(([name, path]) => (
                    <a
                      key={name}
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={name}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d={path} />
                      </svg>
                    </a>
                  ))}
                </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-300 uppercase">Quick Links</h4>
              <ul className="space-y-2">
                {['About Us', 'Events', 'Blog', 'FAQs'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-300 uppercase">Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Code of Conduct', 'Accessibility'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h4 className="text-sm font-semibold text-gray-300 uppercase">Stay Updated</h4>
              <form className="space-y-3">
                <p className="text-sm text-gray-400">
                  Subscribe to our newsletter for the latest updates and cultural insights.
                </p>
                <Input
                  type="email"
                  // placeholder="Enter your email"
                  label="Email Address"
                  size="sm"
                />
                <Button
                  type="submit"
                  className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-500 text-gray-800 transition-colors"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Voices Of Bokamoso. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
