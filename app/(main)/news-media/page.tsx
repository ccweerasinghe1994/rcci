"use client";

import SubSectionIntroCard from "@/components/shared/SubSectionIntroCard";
import { usePathname } from "next/navigation";

const subSectionIntroCards = [
  {
    title: "RCCI Newsletter",
    description:
      "Stay informed with our official newsletter featuring the latest updates, announcements, and developments from the Rodrigues Chamber of Commerce and Industry.",
    image: "/images/rcci-news-letter.jpeg",
    link: "/news-media/newsletter",
  },
  {
    title: "Daily Comment",
    description:
      "Expert insights and commentary on current business trends, economic developments, and policy changes that affect the business community in Rodrigues.",
    image: "/images/daily-comment.jpeg",
    link: "/news-media/daily-comment",
  },
  {
    title: "RCCI in the News",
    description:
      "Coverage of RCCI activities, events, and initiatives in local and international media.",
    image: "/images/rcci-in-the-news.jpeg",
    link: "/news-media/news",
  },
];
export default function NewsMedia() {
  const pathname = usePathname();

  return (
    // Content Section
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">
          News & Media Resources
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subSectionIntroCards.map((item) => (
            <SubSectionIntroCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
