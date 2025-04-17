"use client"

interface FilterIndicatorProps { 
  status?: string
  role?: string
  membershipType?: string 
}

export function FilterIndicator({ 
  status, 
  role, 
  membershipType 
}: FilterIndicatorProps) {
  const hasFilters = status || role || membershipType
  
  return hasFilters ? (
    <span className="ml-1 rounded-full bg-primary w-2 h-2" />
  ) : null
} 