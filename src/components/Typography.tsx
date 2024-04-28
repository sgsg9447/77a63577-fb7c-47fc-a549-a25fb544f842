import React from "react";
import "./Typography.css";

const TAGS = {
  title: "h1",
  subtitle: "h2",
  body: "p",
  caption: "span",
} as const;

const textType = {
  title: "text-title",
  subtitle: "text-subtitle",
  body: "text-body",
  caption: "text-caption",
} as const;

const textColor = {
  default: "text-dark",
  red: "text-red",
  blue: "text-blue",
} as const;

const textWeight = {
  regular: "textWeight-regular",
  semiBold: "textWeight-semiBold",
  bold: "textWeight-bold",
} as const;

interface TypographyProps {
  type?: keyof typeof TAGS;
  color?: keyof typeof textColor;
  weight?: keyof typeof textWeight;
  className?: string;
  children: React.ReactNode;
}

const Typography = ({
  type = "body",
  color = "default",
  weight = "regular",
  className = "",
  children,
  ...props
}: TypographyProps) => {
  const Component = TAGS[type] || "p";

  const computedClassName = `
    ${textType[type]}
    ${textColor[color]} 
    ${textWeight[weight]} 
    ${className}
  `.trim();

  return (
    <Component className={computedClassName} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
