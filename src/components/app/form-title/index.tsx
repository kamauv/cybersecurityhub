import React from "react";

interface Props {
  title: string;
}

const FormTitle = ({ title }: Props) => {
  return <h1 className="text-2xl font-bold capitalize mb-6">{title}</h1>;
};

export default FormTitle;
