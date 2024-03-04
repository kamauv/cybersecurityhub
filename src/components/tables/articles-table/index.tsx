"use client";

import { deleteArticle } from "@/app/actions/article/delete-article";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { CircleDashed, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  articles: {
    id: string;
    title: string;
    articleSlug: string;
    content: string;
    categoryName: string;
  }[];
}

const ArticlesTable = ({ articles }: Props) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  const router = useRouter();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Title</TableHead>
            {/* <TableHead>Content</TableHead> */}
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id} className="">
              <TableCell className="font-medium capitalize">
                {article.title}
              </TableCell>
              {/* <TableCell className="font-medium capitalize">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </TableCell> */}
              <TableCell className="font-medium capitalize">
                {article.categoryName}
              </TableCell>
              <TableCell className="flex  space-x-2">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size={"sm"}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader>
                      <DialogTitle className="mb-3">Delete article</DialogTitle>

                      {isDeleting ? (
                        <CircleDashed className="animate-spin mx-auto" />
                      ) : (
                        <DialogDescription className="">
                          Are you sure you want to delete this article, this
                          action cannot be undone
                        </DialogDescription>
                      )}
                    </DialogHeader>

                    <DialogFooter>
                      <div className="px-4 flex space-x-2 justify-center">
                        <Button
                          variant={"destructive"}
                          type="submit"
                          disabled={isDeleting}
                          onClick={async () => {
                            setIsDeleting(true);
                            const _deleteArticle = await deleteArticle({
                              articleSlug: article.articleSlug,
                            });

                            console.log(_deleteArticle);

                            if (_deleteArticle.isSuccess) {
                              toast({
                                title: "Article deleted successfully",
                              });
                              setOpen(false);
                              router.refresh();
                            } else {
                              toast({
                                variant: "destructive",
                                title: "Article deleted successfully",
                              });
                            }

                            setIsDeleting(false);
                          }}
                        >
                          {isDeleting ? (
                            <CircleDashed className="animate-spin" />
                          ) : (
                            "Delete"
                          )}
                        </Button>
                        <Button
                          variant={"outline"}
                          className="border-primary text-primary hover:bg-primary hover:text-white"
                          type="submit"
                        >
                          Cancel
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Link href={`/admin/update-article/${article.articleSlug}`}>
                  <Button
                    size={"sm"}
                    className="bg-green-500 hover:bg-green-400"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArticlesTable;
