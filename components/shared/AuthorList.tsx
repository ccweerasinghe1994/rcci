"use client";

import { Author } from "@/lib/generated/prisma";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AuthorListProps {
  authors: Author[];
}

export default function AuthorList({ authors }: AuthorListProps) {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authorDetails, setAuthorDetails] = useState<Author | null>(null);

  if (!authors || authors.length === 0) {
    return null;
  }

  // Function to fetch author details when needed
  const fetchAuthorDetails = async (authorId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/author?id=${authorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch author details");
      }
      const data = await response.json();
      setAuthorDetails(data.author);
    } catch (error) {
      console.error("Error fetching author details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // When selectedAuthor changes, fetch details if needed
  useEffect(() => {
    if (selectedAuthor) {
      fetchAuthorDetails(selectedAuthor.id);
    } else {
      setAuthorDetails(null);
    }
  }, [selectedAuthor]);

  return (
    <>
      <div className="mt-8 pt-8 border-t border-gray-200 prose lg:prose-lg">
        <h2 className="mb-6">Authors</h2>

        <div className="space-y-6">
          {authors.map((author) => (
            <div key={author.id} className="flex items-start gap-4">
              <div className="relative w-[80px] h-[80px] shrink-0">
                <div className="absolute inset-0 rounded-full border-2 border-[#047bc1] p-1">
                  <div className="relative overflow-hidden rounded-full w-full h-full">
                    {author.authorImage ? (
                      <Image
                        src={author.authorImage}
                        alt={author.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl text-gray-500">
                          {author.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-[#047bc1] pl-4">
                <h3 className="!mt-0">{author.name}</h3>
                <p className="text-gray-700">{author.position}</p>
                <button
                  onClick={() => setSelectedAuthor(author)}
                  className="text-[#047bc1] hover:underline"
                >
                  Read biography
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Author Biography Dialog */}
      {selectedAuthor && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-20 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 relative">
              <button
                onClick={() => setSelectedAuthor(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
                <span className="sr-only">Close</span>
              </button>

              {isLoading ? (
                <div className="py-12 text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#047bc1] border-r-transparent"></div>
                  <p className="mt-4 text-gray-600">
                    Loading author information...
                  </p>
                </div>
              ) : authorDetails ? (
                <>
                  <div className="flex items-star">
                    <div className="relative w-[100px] h-[100px] shrink-0">
                      <div className="absolute inset-0 rounded-full border-2 border-[#047bc1] p-1">
                        <div className="relative overflow-hidden rounded-full w-full h-full">
                          {authorDetails.authorImage ? (
                            <Image
                              src={authorDetails.authorImage}
                              alt={authorDetails.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-2xl text-gray-500">
                                {authorDetails.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="border-l-2 border-[#047bc1] h-32 mx-4 w-1 " />
                    <div className="">
                      <h2 className="text-2xl font-bold mb-2">
                        {authorDetails.name}
                      </h2>
                      <p className="text-gray-700 prose">
                        {authorDetails.position}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: authorDetails.biography,
                      }}
                      className="prose max-w-none"
                    />
                  </div>
                </>
              ) : (
                <div className="py-12 text-center text-red-500">
                  <p>Could not load author information. Please try again.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
