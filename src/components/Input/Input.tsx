import * as React from "react";
import { Input as ShadcnInput } from "@/shared/ui/shadcn/input";
import { cn } from "cn";

export interface InputProps extends React.ComponentProps<typeof ShadcnInput> {
    label?: string;
    errorText?: string;
}

export function Input({ className, type = "text", label, errorText, disabled, ...props }: InputProps) {
    const generatedId = React.useId();
    const isError = Boolean(errorText);
    const errorId = `${generatedId}-error`;

    return (
        <div className="w-full max-w-sm flex flex-col gap-1.5">
            {label && (
                <label
                    htmlFor={generatedId}
                    className={cn(
                        "text-sm font-medium tracking-tight select-none",
                        disabled && "opacity-50 cursor-not-allowed",
                        isError && "text-destructive"
                    )}
                >
                    {label}
                </label>
            )}

            <ShadcnInput
                id={generatedId}
                type={type}
                disabled={disabled}
                aria-invalid={isError}
                aria-describedby={isError ? errorId : undefined}
                className={cn(
                    "transition-shadow duration-200",
                    "hover:border-ring/60",
                    "focus-visible:ring-2 focus-visible:ring-offset-2",

                    isError && [
                        "border-destructive",
                        "hover:border-destructive/70",
                        "focus-visible:ring-destructive",
                        "text-destructive",
                        "placeholder:text-destructive/50"
                    ],
                    className
                )}
                {...props}
            />

            {isError && (
                <span id={errorId} className="text-xs font-medium text-destructive transition-all">
                    {errorText}
                </span>
            )}
        </div>
    );
}
