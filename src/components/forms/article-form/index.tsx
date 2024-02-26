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

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
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
    username,
    categorySlug,
    content,
  }: {
    username: string;
    categorySlug: string;
    content: string;
  }) => void;
  initialData?: {
    username: string;
    categorySlug: string;
    content: string;
  };
  categories: {
    title: string;
    slug: string;
  }[];
}

const ArticleForm = ({ onSubmit, initialData, categories }: Props) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: initialData ? initialData.username : "",
      categorySlug: initialData ? initialData.categorySlug : "",
      content: initialData ? initialData.content : "",
    },
  });

  function onFormSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data);
  }

  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="username"
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
                          <SelectItem key={category.slug} value={category.slug}>
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

          <FormField
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
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Card>
  );
};

export default ArticleForm;
