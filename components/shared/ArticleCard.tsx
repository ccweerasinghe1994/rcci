import { ArticleWithAuthorAndCategory } from "@/app/(main)/get-started/start-business/actions";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { formatDate } from "date-fns";
import Link from "next/link";

export default function ArticleCard({ article }: { article: ArticleWithAuthorAndCategory }) {
  return (
    <Card className="max-w-[900px]">
      <CardHeader>
        <Link href={`/articles/${article.slug}`}>
          <CardTitle className="hover:text-[#047bc1] text-lg sm:text-xl md:text-2xl">{article.title}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="text-[15px] text-muted-foreground">
        <p>By {article.author?.name}</p>
      </CardContent>
      <CardFooter className="text-[15px] text-muted-foreground">
        {formatDate(new Date(article.createdAt), "MMMM d, yyyy")}
      </CardFooter>
    </Card>
  );
}
