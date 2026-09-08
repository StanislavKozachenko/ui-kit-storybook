import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "vitest-browser-react";
import { Button } from "./Button";

describe("Button Component", () => {
    it("should successfully render children text inside the button", async () => {
        const screen = await render(<Button>Click me</Button>);

        const button = screen.getByRole("button", { name: "Click me" });
        await expect.element(button).toBeInTheDocument();
    });

    it("should be disabled when the disabled prop is passed", async () => {
        const screen = await render(<Button disabled>Disabled Action</Button>);

        const button = screen.getByRole("button", { name: "Disabled Action" });
        await expect.element(button).toBeDisabled();
    });
});