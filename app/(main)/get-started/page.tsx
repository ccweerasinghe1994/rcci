"use client";

import SubSectionIntroCard from "@/components/shared/SubSectionIntroCard";
import { usePathname } from "next/navigation";

const subSectionIntroCards = [
  {
    title: "Start a Business",
    description:
      "Learn about the necessary steps, documentation, and resources needed to establish a new business in Rodrigues. Get guidance on registration, planning, and funding options.",
    image: "/images/start-a-business.jpeg",
    link: "/get-started/start-business",
  },
  {
    title: "About RCCI",
    description:
      "Discover the mission, vision, and history of the Rodrigues Chamber of Commerce and Industry. Learn about our leadership and organizational structure.",
    image: "/images/about-rcci.jpeg",
    link: "/get-started/about-rcci",
  },
  {
    title: "Join the RCCI",
    description:
      "Explore the benefits of becoming an RCCI member, including networking opportunities, advocacy support, access to resources, and exclusive business events.",
    image: "/images/join-the-rcci.jpeg",
    link: "/join",
  },
];

export default function GetStarted() {
  const pathname = usePathname();

  return (
    // Content Section
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12">How Can We Help You?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subSectionIntroCards.map((item) => (
            <SubSectionIntroCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
