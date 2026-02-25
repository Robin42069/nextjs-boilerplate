'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [portfolioItems, setPortfolioItems] = useState<Array<{ id: number; title: string; image: string }>>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    setCurrentImageIndex((prev) => (prev === 0 ? featuredImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === featuredImages.length - 1 ? 0 : prev + 1));
  };

  const bannerOpacity = Math.max(0, Math.min(1, 1 - scrollY / 400));

  return (
    <div className="page">
      <header className="hero">
        <div
          className="heroBackdrop"
          style={{
            backgroundImage: 'url(/images/DREAMS.png)',
            height: isMobile ? '220px' : isTablet ? '320px' : '420px',
            transform: `translateY(${-scrollY * (isMobile ? 0.5 : 1.2)}px)`,
            opacity: bannerOpacity,
          }}
        />
        <div className="heroContent">
          <div className="avatarWrap">
            <Image
              src="/images/Strings PATCH CROP PFP.png"
              alt="Profile Picture"
              width={isMobile ? 110 : 160}
              height={isMobile ? 110 : 160}
              className="avatar"
            />
          </div>
          <div className="heroText">
            <span className="eyebrow">Digital Artist</span>
            <h1 className="title">Artspear</h1>
            <p className="subtitle">Illustrator • Character Designer • Visual Storyteller</p>
          </div>
        </div>
      </header>

      <nav className="tabs">
        <button
          onClick={() => setActiveTab('about')}
          className={`tabButton ${activeTab === 'about' ? 'active' : ''}`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`tabButton ${activeTab === 'gallery' ? 'active' : ''}`}
        >
          Gallery
        </button>
        <button
          onClick={() => setActiveTab('socials')}
          className={`tabButton ${activeTab === 'socials' ? 'active' : ''}`}
        >
          Socials
        </button>
      </nav>

      <section className="panel">
        {activeTab === 'about' && (
          <div className="aboutGrid">
            <div className="aboutCopy">
              <p>
                I am a freelance digital artist who has been working with multiple individual clients since 2020, gaining practical
                experience through a wide range of commissioned projects. My artistic journey began at a very young age, as I have been
                drawing since I was six years old. What started as a childhood hobby gradually became a serious pursuit when I was around
                fifteen, and by the age of eighteen, I began formally studying digital art to further develop my technical and creative
                skills. Over the years, I have learned how to work closely with clients, interpret creative direction, manage deadlines, and
                deliver high-quality artwork that balances artistic vision with client expectations. These experiences have helped shape me
                not only as an artist, but also as a professional who values clear communication, consistency, and continuous improvement.
              </p>
              <p>
                My main specialties are character design and character illustration, where I focus on creating expressive, visually
                compelling characters that communicate personality, emotion, and story. I am currently expanding my creative abilities by
                studying both 2D and 3D animation, which has strengthened my understanding of movement, timing, and visual storytelling. This
                background in animation allows me to design characters that feel more dynamic and adaptable across different media, from
                static illustrations to animated sequences. As I continue to grow, my goal is to become a more versatile and well-rounded
                digital artist, combining my strengths in illustration and animation to contribute to a wide range of creative projects while
                continuing to refine my craft and develop my personal artistic style.
              </p>
              <div className="pillRow">
                <span className="pill">Commission Work</span>
                <span className="pill">Character Design</span>
                <span className="pill">Illustration</span>
                <span className="pill">2D/3D Animation</span>
              </div>
            </div>
            <div className="carousel">
              <div
                className="carouselFrame"
                style={{ height: isMobile ? '260px' : isTablet ? '380px' : '520px' }}
              >
                <div
                  className="carouselBlur"
                  style={{ backgroundImage: `url('${featuredImages[currentImageIndex].image}')` }}
                />
                <div className="carouselImageWrap" onClick={() => setIsModalOpen(true)}>
                  <Image
                    key={currentImageIndex}
                    src={featuredImages[currentImageIndex].image}
                    alt={featuredImages[currentImageIndex].title}
                    fill
                    className="carouselImage"
                    priority
                  />
                </div>
              </div>
              <div className="carouselControls">
                <button className="button ghost" onClick={handlePrevious}>
                  ← Previous
                </button>
                <span className="carouselCounter">
                  {currentImageIndex + 1} / {featuredImages.length}
                </span>
                <button className="button ghost" onClick={handleNext}>
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="galleryGrid">
            {portfolioItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="galleryCard"
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsModalOpen(true);
                }}
              >
                <Image src={item.image} alt={item.title} fill className="galleryImage" />
              </button>
            ))}
          </div>
        )}

        {activeTab === 'socials' && (
          <div className="socials">
            <h2 className="sectionTitle">Connect With Me</h2>
            <div className="socialGrid">
              <div className="socialCard twitter">
                <div className="socialHeader">
                  <div className="socialIcon">𝕏</div>
                  <div>
                    <h3>X (Twitter)</h3>
                    <p>@The_Artspear</p>
                  </div>
                </div>
                <div className="socialEmbed">
                  <a
                    className="twitter-timeline"
                    data-theme="dark"
                    data-height="400"
                    href="https://twitter.com/The_Artspear?ref_src=twsrc%5Etfw"
                  >
                    Loading timeline...
                  </a>
                  <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                </div>
                <a
                  href="https://x.com/The_Artspear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button brand"
                >
                  Visit Profile →
                </a>
              </div>

              <div className="socialCard instagram">
                <div className="socialHeader">
                  <div className="socialIcon">📷</div>
                  <div>
                    <h3>Instagram</h3>
                    <p>@the_artspear</p>
                  </div>
                </div>
                <div className="socialEmbed">
                  <iframe
                    src="https://www.instagram.com/the_artspear/embed"
                    title="Instagram Profile"
                  />
                </div>
                <a
                  href="https://www.instagram.com/the_artspear/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button brand gradient"
                >
                  Visit Profile →
                </a>
              </div>
            </div>

            <div className="contactCard">
              <h2 className="sectionTitle">📧 Contact Me</h2>
              <form
                action="https://formsubmit.co/robinjohnaranguiz@gmail.com"
                method="POST"
                className="contactForm"
              >
                <div className="formRow">
                  <label className="field">
                    <span>
                      Full Name <em>*</em>
                    </span>
                    <input type="text" name="name" required />
                  </label>
                  <label className="field">
                    <span>
                      Email Address <em>*</em>
                    </span>
                    <input type="email" name="email" required />
                  </label>
                </div>
                <label className="field">
                  <span>
                    Subject <em>*</em>
                  </span>
                  <input type="text" name="subject" required />
                </label>
                <label className="field">
                  <span>
                    Message <em>*</em>
                  </span>
                  <textarea name="message" rows={isMobile ? 4 : 6} required />
                </label>
                <input type="hidden" name="_captcha" value="false" />
                <button type="submit" className="button primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <button
            className="modalButton close"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
          <button
            className="modalButton prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            aria-label="Previous"
          >
            ←
          </button>
          <button
            className="modalButton next"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next"
          >
            →
          </button>
          <div className="modalImage" onClick={(e) => e.stopPropagation()}>
            <Image
              src={featuredImages[currentImageIndex].image}
              alt={featuredImages[currentImageIndex].title}
              fill
              className="modalImageContent"
              priority
            />
          </div>
          <div className="modalCounter">
            {currentImageIndex + 1} / {featuredImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
