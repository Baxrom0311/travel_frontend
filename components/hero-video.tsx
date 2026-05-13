interface HeroVideoProps {
  poster?: string;
  className?: string;
  webmSrc?: string;
  mp4Src?: string;
}

export function HeroVideo({
  poster = '/images/khiva-main.jpg',
  className = '',
  webmSrc = '/videos/khiva-hero.webm',
  mp4Src = '/videos/khiva-hero.mp4',
}: HeroVideoProps) {
  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
    >
      <source src={webmSrc} type="video/webm" />
      <source src={mp4Src} type="video/mp4" />
    </video>
  );
}
