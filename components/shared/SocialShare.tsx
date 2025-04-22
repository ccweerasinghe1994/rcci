"use client"

import Link from "next/link"
import { Facebook, Linkedin, Mail, Link2 as LinkIcon } from "lucide-react"

interface SocialShareProps {
  url?: string;
  title?: string;
  className?: string;
  showCopyLink?: boolean;
  vertical?: boolean;
}

export function SocialShare({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "Share this page",
  className = "",
  showCopyLink = true,
  vertical = true
}: SocialShareProps) {
  // Encode the URL and title for sharing
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  // Handle copy link to clipboard
  const copyToClipboard = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(url).then(
        () => {
          // Success feedback could be implemented here
          console.log("URL copied to clipboard")
        },
        (err) => {
          console.error("Could not copy text: ", err)
        }
      )
    }
  }

  const containerClass = `flex ${vertical ? "flex-col" : "flex-row"} gap-2 ${className}`
  const iconSize = 16

  return (
    <div className={containerClass} aria-label="Share this content">
      <Link 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        aria-label="Share on Facebook"
      >
        <Facebook size={iconSize} />
      </Link>
      
      <Link 
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={iconSize} />
      </Link>
      
      <Link 
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="w-8 h-8 rounded-full bg-[#d14836] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        aria-label="Share via Email"
      >
        <Mail size={iconSize} />
      </Link>
      
      {showCopyLink && (
        <button
          onClick={copyToClipboard}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300 transition-colors"
          aria-label="Copy link to clipboard"
        >
          <LinkIcon size={iconSize} />
        </button>
      )}
    </div>
  )
} 