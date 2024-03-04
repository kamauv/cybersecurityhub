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
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleDashed, RocketIcon } from "lucide-react";

const FormSchema = z.object({
  category: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface Props {
  onSubmit: ({ category }: { category: string }) => void;
  initialData?: {
    category: string;
  };
  submissionError?: string;
  isFormSubmitting?: boolean;
}

const CategoryForm = ({
  onSubmit,
  initialData,
  submissionError,
  isFormSubmitting,
}: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: initialData ? initialData.category : "",
    },
  });

  function onFormSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data as any);
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isFormSubmitting} type="submit">
            {isFormSubmitting ? (
              <CircleDashed className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default CategoryForm;
