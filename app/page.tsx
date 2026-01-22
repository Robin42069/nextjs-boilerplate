'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [portfolioItems, setPortfolioItems] = useState<Array<{id: number, title: string, image: string}>>([]);

  const featuredImages = [
    { id: 1, title: 'Insanity', image: '/gallery/Insanity.jpg' },
    { id: 2, title: 'Iris One Woman Army', image: '/gallery/Iris One Woman Army.jpg' },
    { id: 3, title: 'Iris Oni', image: '/gallery/Iris Oni.jpg' },
    { id: 4, title: 'Lounging Misfits', image: '/gallery/Lounging MisfitsFINAL.jpg' },
    { id: 5, title: 'Patchworks', image: '/gallery/patchworks.jpg' },
    { id: 6, title: 'Saiko Artist', image: '/gallery/Saiko Artist RESIZE.jpg' },
    { id: 7, title: 'Saiko Oni', image: '/gallery/Saiko Oni.jpg' },
    { id: 8, title: 'Saiko Wreak Havoc', image: '/gallery/Saiko wreak havoc sat high final full quality.jpg' },
    { id: 9, title: 'Sakuya The Maid', image: '/gallery/sakuya the maid.jpg' },
    { id: 10, title: 'The Honey Bee', image: '/gallery/The Honey Bee.jpg' },
  ];

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch('/api/gallery');
        const images = await response.json();
        setPortfolioItems(images);
      } catch (error) {
        console.error('Failed to load gallery images:', error);
      }
    };
    
    fetchGalleryImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === 'Escape') {
          setIsModalOpen(false);
        } else if (e.key === 'ArrowLeft') {
          handlePrevious();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentImageIndex]);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => prev === 0 ? featuredImages.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => prev === featuredImages.length - 1 ? 0 : prev + 1);
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
      <p style={{ textAlign: 'center', fontSize: '0.8rem', margin: '0 20px', color: '#111' }}>Digital Artist/Illustrator/Character Designer</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '30px 20px 20px', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
        <button
          onClick={() => setActiveTab('about')}
          style={{
            padding: '12px 30px',
            backgroundColor: activeTab === 'about' ? 'rgba(55, 55, 55, 0.9)' : 'rgba(200, 200, 200, 0.6)',
            color: activeTab === 'about' ? '#fff' : '#111',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: activeTab === 'about' ? 'bold' : 'normal',
            transition: 'all 0.3s ease'
          }}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          style={{
            padding: '12px 30px',
            backgroundColor: activeTab === 'gallery' ? 'rgba(55, 55, 55, 0.9)' : 'rgba(200, 200, 200, 0.6)',
            color: activeTab === 'gallery' ? '#fff' : '#111',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: activeTab === 'gallery' ? 'bold' : 'normal',
            transition: 'all 0.3s ease'
          }}
        >
          Gallery
        </button>
        <button
          onClick={() => setActiveTab('socials')}
          style={{
            padding: '12px 30px',
            backgroundColor: activeTab === 'socials' ? 'rgba(55, 55, 55, 0.9)' : 'rgba(200, 200, 200, 0.6)',
            color: activeTab === 'socials' ? '#fff' : '#111',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: activeTab === 'socials' ? 'bold' : 'normal',
            transition: 'all 0.3s ease'
          }}
        >
          Socials
        </button>
      </div>

      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'rgba(55, 55, 55, 0.8)', borderRadius: '0 0 12px 12px', backdropFilter: 'blur(10px)', minHeight: '400px' }}>
        {activeTab === 'about' && (
          <div style={{ display: 'flex', gap: '40px' }}>
            <div style={{ flex: 1, color: '#fff' }}>
          <p style={{ color: '#fff' }}>
            I am a freelance digital artist who has been working with multiple individual clients since 2020, gaining practical experience through a wide range of commissioned projects. My artistic journey began at a very young age, as I have been drawing since I was six years old. What started as a childhood hobby gradually became a serious pursuit when I was around fifteen, and by the age of eighteen, I began formally studying digital art to further develop my technical and creative skills. Over the years, I have learned how to work closely with clients, interpret creative direction, manage deadlines, and deliver high-quality artwork that balances artistic vision with client expectations. These experiences have helped shape me not only as an artist, but also as a professional who values clear communication, consistency, and continuous improvement.
          </p>
          <p style={{ color: '#fff' }}>
            My main specialties are character design and character illustration, where I focus on creating expressive, visually compelling characters that communicate personality, emotion, and story. I am currently expanding my creative abilities by studying both 2D and 3D animation, which has strengthened my understanding of movement, timing, and visual storytelling. This background in animation allows me to design characters that feel more dynamic and adaptable across different media, from static illustrations to animated sequences. As I continue to grow, my goal is to become a more versatile and well-rounded digital artist, combining my strengths in illustration and animation to contribute to a wide range of creative projects while continuing to refine my craft and develop my personal artistic style.
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <div style={{ position: 'relative', height: '500px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundImage: `url('${featuredImages[currentImageIndex].image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(20px)',
                zIndex: 0,
                backgroundColor: '#f2f2f2',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <div 
              style={{ position: 'absolute', width: '100%', height: '100%', opacity: 1, transition: 'opacity 0.5s ease-in-out', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              onClick={() => setIsModalOpen(true)}
            >
              <Image
                key={currentImageIndex}
                src={featuredImages[currentImageIndex].image}
                alt={featuredImages[currentImageIndex].title}
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
            <span style={{ alignSelf: 'center', fontWeight: 'bold', color: '#fff' }}>
              {currentImageIndex + 1} / {featuredImages.length}
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
        )}
        
        {activeTab === 'gallery' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
            {portfolioItems.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => { setCurrentImageIndex(index); setIsModalOpen(true); }}
                style={{ 
                  position: 'relative', 
                  height: '250px', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)'; }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'socials' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
            <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '10px', textAlign: 'center' }}>Connect With Me</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
              
              {/* X/Twitter Card with Embed */}
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '2px solid rgba(29, 155, 240, 0.5)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                  <div style={{ fontSize: '2rem' }}>𝕏</div>
                  <div>
                    <h3 style={{ margin: '0', fontSize: '1.2rem', color: '#1DA1F2' }}>X (Twitter)</h3>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#aaa' }}>@The_Artspear</p>
                  </div>
                </div>
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <a 
                    className="twitter-timeline" 
                    data-theme="dark" 
                    data-height="400" 
                    href="https://twitter.com/The_Artspear?ref_src=twsrc%5Etfw"
                    style={{ width: '100%', height: '100%', color: '#fff' }}
                  >
                    Loading timeline...
                  </a>
                  <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                </div>
                <a
                  href="https://x.com/The_Artspear"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '12px 20px',
                    backgroundColor: '#1DA1F2',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1a8cd8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1DA1F2'; }}
                >
                  Visit Profile →
                </a>
              </div>

              {/* Instagram Card with Preview */}
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '2px solid rgba(225, 48, 108, 0.5)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                  <div style={{ fontSize: '2rem' }}>📷</div>
                  <div>
                    <h3 style={{ margin: '0', fontSize: '1.2rem', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Instagram</h3>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#aaa' }}>@the_artspear</p>
                  </div>
                </div>
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <iframe
                    src="https://www.instagram.com/the_artspear/embed"
                    style={{ width: '100%', height: '100%', border: 'none', backgroundColor: 'transparent' }}
                    title="Instagram Profile"
                  />
                </div>
                <a
                  href="https://www.instagram.com/the_artspear/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '12px 20px',
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    transition: 'opacity 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                  Visit Profile →
                </a>
              </div>
              
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#000',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              zIndex: 10000
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#000',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              zIndex: 10000
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
          >
            ←
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#000',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              zIndex: 10000
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
          >
            →
          </button>
          <div style={{ position: 'relative', width: '90vw', height: '90vh', maxWidth: '1400px', maxHeight: '900px' }} onClick={(e) => e.stopPropagation()}>
            <Image
              src={featuredImages[currentImageIndex].image}
              alt={featuredImages[currentImageIndex].title}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div style={{ position: 'absolute', bottom: '30px', color: '#fff', fontSize: '18px', fontWeight: 'bold', zIndex: 10000 }}>
            {currentImageIndex + 1} / {featuredImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
