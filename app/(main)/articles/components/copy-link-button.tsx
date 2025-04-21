"use client"

import { Link2 } from "lucide-react"
import { useState } from "react"

interface CopyLinkButtonProps {
  url: string
}

export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 relative"
      title="Copy link to clipboard"
    >
      <Link2 size={16} />
      {copied && (
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
          Copied!
        </span>
      )}
    </button>
  )
} 