"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleDashed, RocketIcon } from "lucide-react";
import RichTextInput from "@/components/ui/rich-text-input";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  categorySlug: z.string().min(2, {
    message: "Category must be selected .",
  }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
});

interface Props {
  onSubmit: ({
    title,
    categorySlug,
    content,
  }: {
    title: string;
    categorySlug: string;
    content: string;
  }) => void;
  initialData?: {
    title: string;
    categorySlug: string;
    content: string;
  };
  categories: {
    title: string;
    slug: string;
  }[];
  submissionError?: string;
  isFormSubmitting?: boolean;
}

const ArticleForm = ({
  onSubmit,
  initialData = {
    title: "",
    categorySlug: "",
    content: "",
  },
  categories,
  submissionError,
  isFormSubmitting,
}: Props) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: initialData?.title || "",
      categorySlug: initialData?.categorySlug || "",
      content: initialData?.content || "",
    },
  });

  function onFormSubmit(data: z.infer<typeof FormSchema>) {
    const formdata = {
      title: data.title,
      categorySlug: data.categorySlug,
      content: data.content,
    };
    onSubmit(formdata);
  }

  return (
    <Card className="p-4">
      {submissionError && (
        <Alert variant={"destructive"}>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Error creating category</AlertTitle>
          <AlertDescription>{submissionError}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categorySlug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories && categories.length > 0
                      ? categories.map((category, index) => (
                          <SelectItem
                            className="capitalize"
                            key={category.slug}
                            value={category.slug}
                          >
                            {category.title}
                          </SelectItem>
                        ))
                      : "No categories found"}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Article content" rows={5} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}

          <RichTextInput
            id="content"
            placeholder="Article content"
            value={form.watch("content") || ""}
            onChange={(html) => {
              form.setValue("content", html);
            }}
          />

          <Button disabled={isFormSubmitting} type="submit">
            {isFormSubmitting ? (
              <CircleDashed className="animate-spin" />
            ) : (
              "submit"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default ArticleForm;
