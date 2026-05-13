'use client';

import { Instagram, ExternalLink, Hash } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';

interface Props {
  hashtag?: string;
  className?: string;
}

// Showcase images from /public/images (we can't fetch real Instagram without API)
// This is a simulated feed with real Khiva photos
const MOCK_POSTS = [
  { id: 1, src: '/images/ichan-kala.jpg', user: 'khiva_traveler', likes: 1247 },
  { id: 2, src: '/images/kalta-minor.jpg', user: 'uzbekistan_lens', likes: 892 },
  { id: 3, src: '/images/juma-mosque.jpg', user: 'silk_road_explorer', likes: 1583 },
  { id: 4, src: '/images/khiva-main.jpg', user: 'ancient_city_fans', likes: 2034 },
  { id: 5, src: '/images/bazaar.jpg', user: 'khiva_markets', likes: 567 },
  { id: 6, src: '/images/caravan.jpg', user: 'central_asia_tales', likes: 891 },
  { id: 7, src: '/images/khorezm-palace.jpg', user: 'khorezm_heritage', likes: 723 },
  { id: 8, src: '/images/topkapi-palace.jpg', user: 'architecture_uz', likes: 1102 },
];

export function InstagramFeed({ hashtag = 'visitkhorezm', className = '' }: Props) {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center">
            <Instagram className="text-white" size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold flex items-center gap-1">
              <Hash size={18} className="text-primary" strokeWidth={2.5} />
              {hashtag}
            </h3>
            <p className="text-xs text-muted-foreground">Instagram'da Xorazm sayyohlari</p>
          </div>
        </div>
        <a
          href={`https://www.instagram.com/explore/tags/${hashtag}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] text-white rounded-full px-4 py-2 text-sm font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform"
        >
          Instagram'da ko'rish <ExternalLink size={14} strokeWidth={2.5} />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {MOCK_POSTS.map((post, idx) => (
          <motion.a
            key={post.id}
            href={`https://www.instagram.com/explore/tags/${hashtag}/`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            whileHover={{ scale: 1.02 }}
            className="relative aspect-square rounded-lg overflow-hidden group"
          >
            <Image
              src={post.src}
              alt={`@${post.user}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="font-semibold truncate">@{post.user}</div>
              <div className="flex items-center gap-1">
                <span>❤️</span>
                <span>{post.likes.toLocaleString()}</span>
              </div>
            </div>
            <div className="absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Instagram size={14} strokeWidth={2.5} />
            </div>
          </motion.a>
        ))}
      </div>

      <p className="text-[10px] text-center text-muted-foreground mt-4">
        📸 #{hashtag} hashtag'i bilan sizning rasmlaringiz ham chiqishi mumkin
      </p>
    </div>
  );
}
