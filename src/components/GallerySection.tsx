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

const galleryItems = [
  { id: 1, url: cherryVillage, title: 'Cherry Blossom Village' },
  { id: 2, url: teamPhoto, title: 'Team Photo' },
  { id: 3, url: birthdayCake, title: '1 Year Anniversary' },
  { id: 4, url: cathedral, title: 'Gothic Cathedral' },
  { id: 5, url: desertPlayer, title: 'Desert Exploration' },
  { id: 6, url: lushCave, title: 'Lush Cave Discovery' },
  { id: 7, url: cherryRain, title: 'Cherry Rain Romance' },
];

const FULL_WIDTH_PX = 120;
const COLLAPSED_WIDTH_PX = 35;
const GAP_PX = 2;
const MARGIN_PX = 2;

function Thumbnails({ index, setIndex }: { index: number; setIndex: (i: number) => void }) {
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
        behavior: 'smooth',
      });
    }
  }, [index]);

  return (
    <div ref={thumbnailsRef} className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-0.5 h-20 pb-2" style={{ width: 'fit-content' }}>
        {galleryItems.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? 'active' : 'inactive'}
            variants={{
              active: { width: FULL_WIDTH_PX, marginLeft: MARGIN_PX, marginRight: MARGIN_PX },
              inactive: { width: COLLAPSED_WIDTH_PX, marginLeft: 0, marginRight: 0 },
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative shrink-0 h-full overflow-hidden rounded-lg"
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover pointer-events-none select-none"
              draggable={false}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export const GallerySection = () => {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;
      animate(x, targetX, { type: 'spring', stiffness: 300, damping: 30 });
    }
  }, [index, x, isDragging]);

  return (
    <section id="gallery" className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Season 1 <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Memories from our incredible community
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-4 rounded-3xl"
        >
          <div className="flex flex-col gap-4">
            {/* Main Carousel */}
            <div className="relative overflow-hidden rounded-2xl bg-secondary/30" ref={containerRef}>
              <motion.div
                className="flex"
                drag="x"
                dragElastic={0.2}
                dragMomentum={false}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(e, info) => {
                  setIsDragging(false);
                  const containerWidth = containerRef.current?.offsetWidth || 1;
                  const offset = info.offset.x;
                  const velocity = info.velocity.x;

                  let newIndex = index;
                  if (Math.abs(velocity) > 500) {
                    newIndex = velocity > 0 ? index - 1 : index + 1;
                  } else if (Math.abs(offset) > containerWidth * 0.3) {
                    newIndex = offset > 0 ? index - 1 : index + 1;
                  }
                  newIndex = Math.max(0, Math.min(galleryItems.length - 1, newIndex));
                  setIndex(newIndex);
                }}
                style={{ x }}
              >
                {galleryItems.map((item) => (
                  <div key={item.id} className="shrink-0 w-full aspect-video">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-2xl select-none pointer-events-none"
                      draggable={false}
                    />
                  </div>
                ))}
              </motion.div>

              {/* Previous Button */}
              <button
                disabled={index === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-10 ${
                  index === 0
                    ? 'opacity-40 cursor-not-allowed bg-secondary'
                    : 'glass-button hover:scale-110'
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                disabled={index === galleryItems.length - 1}
                onClick={() => setIndex((i) => Math.min(galleryItems.length - 1, i + 1))}
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all z-10 ${
                  index === galleryItems.length - 1
                    ? 'opacity-40 cursor-not-allowed bg-secondary'
                    : 'glass-button hover:scale-110'
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full text-sm font-medium">
                {index + 1} / {galleryItems.length}
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <h3 className="text-xl font-semibold">{galleryItems[index].title}</h3>
            </div>

            {/* Thumbnails */}
            <Thumbnails index={index} setIndex={setIndex} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
