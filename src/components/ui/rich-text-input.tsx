"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Label } from "./label";

const DynamicReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Props {
  value: String;
  onChange: (html: any) => void;
  placeholder?: string;
  id?: string;
}

const RichTextInput = ({ value, onChange, id, placeholder }: Props) => {
  const handleEditorChange = (html: any) => {
    onChange(html);
  };
  return (
    <div>
      <div className="mb-2">
        <Label htmlFor="content" className="">
          Content
        </Label>
      </div>
      <DynamicReactQuill
        id={id}
        placeholder={placeholder}
        className=""
        //   modules={}
        theme="snow" // Choose your preferred theme
        value={value as any}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default RichTextInput;
