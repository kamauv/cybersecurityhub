"use client";

import { deleteCategory } from "@/app/actions/category/delete-category";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import DeleteDialog from "./delete-dialog";

interface Props {
  categories: {
    id: string;
    name: string;
    slug: string;
    articlesCount: number;
  }[];
}

const CategoriesTable = ({ categories }: Props) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  const router = useRouter();

  return (
    <div>
      <Card className="p-4 mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Category</TableHead>
              <TableHead>Articles</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id} className="">
                <TableCell className="font-medium capitalize">
                  {category.name}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {category.articlesCount}
                </TableCell>
                <TableCell className=" space-x-2">
                  <DeleteDialog categorySlug={category.slug} />
                  {/* <Dialog open={open} onOpenChange={setOpen}>
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
                        <DialogTitle className="mb-3">
                          Delete Category
                        </DialogTitle>

                        {isDeleting ? (
                          <CircleDashed className="animate-spin mx-auto" />
                        ) : (
                          <DialogDescription className="">
                            Are you sure you want to delete this category, this
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
                              const _deleteCategory = await deleteCategory({
                                categorySlug: category.slug,
                              });

                              console.log(_deleteCategory);

                              if (_deleteCategory.isSuccess) {
                                toast({
                                  title: "Category deleted successfully",
                                });
                                setOpen(false);
                                router.refresh();
                              } else {
                                toast({
                                  variant: "destructive",
                                  title: "Category deleted successfully",
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
                  </Dialog> */}

                  <Link href={`/admin/update-category/${category.slug}`}>
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
      </Card>
    </div>
  );
};

export default CategoriesTable;
