import { type ButtonHTMLAttributes } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "accent" | "outline" | "outline-white" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = ButtonBaseProps &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (ButtonHTMLAttributes<HTMLAnchorElement> & { href: string })
  );

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-black text-white hover:bg-neutral-900 active:bg-neutral-800",
  accent:
    "bg-brand-accent text-white hover:bg-brand-accent-hover active:bg-red-800",
  outline:
    "border border-brand-black text-brand-black hover:bg-brand-black hover:text-white",
  "outline-white":
    "border border-white/30 text-white hover:bg-white hover:text-brand-black",
  ghost: "text-brand-black hover:bg-brand-gray-200",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-widest",
  md: "px-6 py-3 text-sm tracking-[0.15em]",
  lg: "px-8 py-4 text-sm tracking-[0.2em]",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;

  const baseStyles =
    "inline-flex items-center justify-center font-semibold uppercase transition-all duration-300";

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <Link href={href} className={styles} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
