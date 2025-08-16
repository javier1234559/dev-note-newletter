import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

interface MediaPreviewProps {
  url: string;
  mediaType: "image" | "video";
  posterUrl?: string;
  alt?: string;
  className?: string;
}

export default function MediaPreview({ url, mediaType, posterUrl, alt = "Media Preview", className = "" }: MediaPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imgError, setImgError] = useState(false);

  if (mediaType === "image") {
    return (
      <img
        src={imgError ? "/placeholder.svg" : url}
        alt={alt}
        className={className}
        onError={() => setImgError(true)}
      />
    );
  }

  // Video
  return (
    <div className={`relative ${className}`} onClick={() => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
      }
    }}>
      <video
        ref={videoRef}
        src={url}
        poster={posterUrl}
        className="w-full h-full object-cover"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10">
        {isPlaying ? (
          <Pause className="w-12 h-12 text-white" />
        ) : (
          <Play className="w-12 h-12 text-white" />
        )}
      </div>
    </div>
  );
}