"use client";
import { deleteArticle } from "@/app/actions/article/delete-article";
import { deleteCategory } from "@/app/actions/category/delete-category";
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
import { useToast } from "@/components/ui/use-toast";
import { CircleDashed, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  categorySlug: string;
}

const DeleteDialog = ({ categorySlug }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const router = useRouter();

  const { toast } = useToast();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="bg-destructive hover:bg-destructive/90">
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
              {categorySlug} - Are you sure you want to delete this article,
              this action cannot be undone
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
                const _deleteArticle = await deleteCategory({
                  categorySlug: categorySlug,
                });

                console.log(_deleteArticle);

                if (_deleteArticle.isSuccess) {
                  toast({
                    title: "Article deleted successfully",
                  });
                  setOpen(false);
                  router.push("/admin/categories");
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
  );
};

export default DeleteDialog;
