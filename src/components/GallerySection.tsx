import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cherryVillage from '@/assets/gallery/cherry-village.png';
import teamPhoto from '@/assets/gallery/team-photo.png';
import birthdayCake from '@/assets/gallery/birthday-cake.png';
import cathedral from '@/assets/gallery/cathedral.png';
import desertPlayer from '@/assets/gallery/desert-player.png';
import lushCave from '@/assets/gallery/lush-cave.png';
import cherryRain from '@/assets/gallery/cherry-rain.png';
import nightStars from '@/assets/gallery/night-stars.png';
import forestMist from '@/assets/gallery/forest-mist.png';
import endDimension from '@/assets/gallery/end-dimension.png';
import mountainLake from '@/assets/gallery/mountain-lake.png';

const galleryItems = [{
  id: 1,
  url: cherryVillage,
  title: 'Cherry Blossom Village'
}, {
  id: 2,
  url: teamPhoto,
  title: 'Team Photo'
}, {
  id: 3,
  url: birthdayCake,
  title: '1 Year Anniversary'
}, {
  id: 4,
  url: cathedral,
  title: 'Gothic Cathedral'
}, {
  id: 5,
  url: desertPlayer,
  title: 'Desert Exploration'
}, {
  id: 6,
  url: lushCave,
  title: 'Lush Cave Discovery'
}, {
  id: 7,
  url: cherryRain,
  title: 'Cherry Rain Romance'
}, {
  id: 8,
  url: nightStars,
  title: 'Starry Night'
}, {
  id: 9,
  url: forestMist,
  title: 'Misty Forest Morning'
}, {
  id: 10,
  url: endDimension,
  title: 'The End Dimension'
}, {
  id: 11,
  url: mountainLake,
  title: 'Mountain Lake Vista'
}];

const FULL_WIDTH_PX = 100;
const COLLAPSED_WIDTH_PX = 30;
const GAP_PX = 2;
const MARGIN_PX = 2;

function Thumbnails({
  index,
  setIndex
}: {
  index: number;
  setIndex: (i: number) => void;
}) {
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (thumbnailsRef.current) {
      let scrollPosition = 0;
      for (let i = 0; i < index; i++) {
        scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX;
      }
      scrollPosition += MARGIN_PX;
      const containerWidth = thumbnailsRef.current.offsetWidth;
      const centerOffset = containerWidth / 2 - FULL_WIDTH_PX / 2;
      scrollPosition -= centerOffset;
      thumbnailsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [index]);

  return (
    <div ref={thumbnailsRef} className="overflow-x-auto scrollbar-hide">
      <div
        className="flex gap-0.5 h-16 sm:h-20 pb-2"
        style={{ width: 'fit-content' }}
      >
        {galleryItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setIndex(i)}
            className={`relative shrink-0 h-full overflow-hidden rounded-lg transition-all duration-300 ${
              i === index ? 'w-[100px]' : 'w-[30px]'
            }`}
            style={{
              marginLeft: i === index ? MARGIN_PX : 0,
              marginRight: i === index ? MARGIN_PX : 0
            }}
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover pointer-events-none select-none"
              draggable={false}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export const GallerySection = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;
      // Faster, snappier animation
      animate(x, targetX, {
        type: 'spring',
        stiffness: 500,
        damping: 50,
        mass: 0.8
      });
    }
  }, [index, x, isMobile]);

  const handlePrev = () => setIndex(i => Math.max(0, i - 1));
  const handleNext = () => setIndex(i => Math.min(galleryItems.length - 1, i + 1));

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
            Season 1 Gallery
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Memories from our incredible community
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
          className="glass-card p-3 sm:p-4 rounded-2xl"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Main Carousel */}
            <div
              className="relative overflow-hidden rounded-xl bg-black/20"
              ref={containerRef}
            >
              <motion.div
                className="flex"
                style={{ x }}
              >
                {galleryItems.map(item => (
                  <div key={item.id} className="shrink-0 w-full aspect-video">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-xl select-none pointer-events-none"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Previous Button */}
              <button
                disabled={index === 0}
                onClick={handlePrev}
                className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-10 ${
                  index === 0
                    ? 'opacity-40 cursor-not-allowed bg-black/50'
                    : 'bg-black/60 hover:bg-black/80 active:scale-95'
                }`}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Next Button */}
              <button
                disabled={index === galleryItems.length - 1}
                onClick={handleNext}
                className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-10 ${
                  index === galleryItems.length - 1
                    ? 'opacity-40 cursor-not-allowed bg-black/50'
                    : 'bg-black/60 hover:bg-black/80 active:scale-95'
                }`}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-white">
                {index + 1} / {galleryItems.length}
              </div>
            </div>

            {/* Thumbnails */}
            <Thumbnails index={index} setIndex={setIndex} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};