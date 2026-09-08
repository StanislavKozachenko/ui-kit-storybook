import * as React from "react";
import { Button as ShadcnButton } from "@/shared/ui/shadcn/button";
import { cn } from "cn";

export interface ButtonProps extends React.ComponentProps<typeof ShadcnButton> {
    error?: boolean;
}

export function Button({ className, error, variant, ...props }: ButtonProps) {
    return (
        <ShadcnButton
            variant={error ? "destructive" : variant}
            className={cn(
                "cursor-pointer",
                "transition-colors duration-200",
                "focus-visible:ring-2 focus-visible:ring-offset-2",
                className
            )}
            {...props}
        />
    );
}
