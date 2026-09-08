import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "vitest-browser-react";
import { Input } from "./Input";

describe("Input Component", () => {
    it("should correctly render the provided label text", async () => {
        const screen = await render(<Input label="Username" />);

        const label = screen.getByText("Username");
        await expect.element(label).toBeInTheDocument();
    });

    it("should display error message and enter error state when errorText is passed", async () => {
        const screen = await render(<Input errorText="This field is required" />);

        const errorMsg = screen.getByText("This field is required");
        await expect.element(errorMsg).toBeInTheDocument();

        const input = screen.getByRole("textbox");
        await expect.element(input).toHaveAttribute("aria-invalid", "true");
    });
});