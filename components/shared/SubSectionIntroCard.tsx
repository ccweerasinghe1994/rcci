import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SubSectionIntroCard({title, description, image, link}: {title: string, description: string, image: string, link: string}) {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-video relative">
          <Image 
            src={image} 
            alt={title} 
            className="object-cover"
            fill
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-gray-600 mb-4">
            {description}
          </p>
          <Link 
            href={link} 
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    )
}
