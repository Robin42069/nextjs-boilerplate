'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const portfolioItems = [
    { id: 1, title: 'Insanity', image: '/gallery/Insanity.png' },
    { id: 2, title: 'Iris One Woman Army', image: '/gallery/Iris One Woman Army.png' },
    { id: 3, title: 'Iris Oni', image: '/gallery/Iris Oni.png' },
    { id: 4, title: 'Lounging Misfits', image: '/gallery/Lounging MisfitsFINAL.png' },
    { id: 5, title: 'Patchworks', image: '/gallery/patchworks.png' },
    { id: 6, title: 'Saiko Artist', image: '/gallery/Saiko Artist RESIZE.png' },
    { id: 7, title: 'Saiko Oni', image: '/gallery/Saiko Oni.png' },
    { id: 8, title: 'Saiko Wreak Havoc', image: '/gallery/Saiko wreak havoc sat high final full quality.png' },
    { id: 9, title: 'Sakuya The Maid', image: '/gallery/sakuya the maid.png' },
    { id: 10, title: 'The Honey Bee', image: '/gallery/The Honey Bee.png' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => prev === 0 ? portfolioItems.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => prev === portfolioItems.length - 1 ? 0 : prev + 1);
  };

  const bannerOpacity = Math.max(0, Math.min(1, 1 - scrollY / 400));

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s ease, color 0.2s ease, transform 0.1s ease'
  } as const;

  return (
    <div style={{ backgroundColor: '#f8f8f8', color: '#111', minHeight: '100vh' }}>
      <div style={{
        backgroundImage: 'url(/images/DREAMS.png)',
        backgroundSize: 'cover',
        backgroundPosition: '50% 80%',
        height: '400px',
        width: '100%',
        transform: `translateY(${-scrollY * 1.5}px)`,
        opacity: bannerOpacity,
        transition: 'transform 0.6s ease-out, opacity 0.8s ease-out'
      }}></div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Image
          src="/images/Strings PATCH CROP PFP.png"
          alt="Profile Picture"
          width={150}
          height={150}
          style={{ borderRadius: '50%' }}
        />
      </div>
      <h1 style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: '2rem', margin: '10px 0', color: '#111' }}>Artspear</h1>
      <p style={{ textAlign: 'center', fontSize: '0.8rem', margin: '0', color: '#111' }}>Digital Artist/Illustrator/Character Designer</p>
      <div style={{ display: 'flex', gap: '40px', padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ flex: 1, color: '#111' }}>
          <p style={{ color: '#111' }}>
            Welcome to my portfolio. I'm a passionate digital artist specializing in character design, illustration, and concept art. With several years of experience in the creative industry, I've worked with various clients to bring their visions to life through digital art. My work spans from character design and concept art to detailed illustrations and animations. I focus on creating unique, engaging characters with strong personality and visual appeal. Whether you're looking for character design for games, animation, comics, or illustration work, I'm here to help bring your creative ideas to fruition. My process involves detailed consultation with clients to understand their vision, followed by sketches, refinements, and final polished artwork. I'm passionate about storytelling through art and creating characters that resonate with audiences.
          </p>
          <p style={{ color: '#111' }}>
            Throughout my career, I've had the privilege of working on diverse projects ranging from indie video games to major animation studios. Each project has helped me refine my skills and expand my artistic vision. I specialize in creating characters with depth, personality, and visual interest. Whether it's a heroic protagonist, a cunning villain, or a quirky side character, I bring creativity and attention to detail to every design. My illustrations capture emotion and movement, bringing characters to life on the page or screen.
          </p>
          <p style={{ color: '#111' }}>
            I'm proficient in a variety of digital tools and software, including Photoshop, Procreate, Clip Studio Paint, and Blender. My workflow combines traditional art principles with modern digital techniques to create stunning visual work. I'm always learning and staying updated with the latest tools and trends in the industry. Whether you need concept art, character sheets, promotional illustrations, or full-fledged character animations, I'm equipped to deliver high-quality work that exceeds expectations.
          </p>
          <p style={{ color: '#111' }}>
            My approach to art is collaborative and client-focused. I believe in the power of communication and feedback to create work that truly resonates with your vision. From initial sketches to final revisions, I'm committed to delivering artwork that captures your ideas and brings them to life in the most compelling way possible.
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <div style={{ position: 'relative', height: '500px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundImage: `url('${portfolioItems[currentImageIndex].image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(20px)',
                zIndex: 0,
                backgroundColor: '#f2f2f2',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 1, transition: 'opacity 0.5s ease-in-out', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                key={currentImageIndex}
                src={portfolioItems[currentImageIndex].image}
                alt={portfolioItems[currentImageIndex].title}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              onClick={handlePrevious}
              style={buttonStyle}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#333'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1)'; }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              ← Previous
            </button>
            <span style={{ alignSelf: 'center', fontWeight: 'bold', color: '#111' }}>
              {currentImageIndex + 1} / {portfolioItems.length}
            </span>
            <button
              onClick={handleNext}
              style={buttonStyle}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#333'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1)'; }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
