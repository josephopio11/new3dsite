import { cn } from "@/lib/utils";
import { KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

type Props = {
  linkField: LinkField;
  label: KeyTextField;
  showIcon?: boolean;
  className?: string;
};

export default function NewButton({
  linkField,
  label,
  showIcon,
  className,
}: Props) {
  return (
    <PrismicNextLink
      field={linkField}
      className={cn(
        "group text-slate-800 relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4 py-2 font-bold transition-transform ease-out hover:scale-105",
        className
      )}
    >
      <span className="absolute inset-0 z-0 h-full translate-y-9 bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0 rounded-md"></span>
      <span className="relative flex items-center justify-center gap-2">
        {label}
        {showIcon && " 🚀"}
      </span>
    </PrismicNextLink>
  );
}
