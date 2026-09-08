import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
        },
        size: {
            control: "select",
            options: ["default", "sm", "lg", "icon"],
        },
        disabled: { control: "boolean" },
        error: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Нажми меня",
        variant: "default",
    },
};

export const WithError: Story = {
    args: {
        children: "Действие заблокировано",
        error: true,
    },
};

export const Disabled: Story = {
    args: {
        children: "Недоступно",
        disabled: true,
    },
};

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
    </svg>
);

export const Icon: Story = {
    args: {
        size: "icon",
        "aria-label": "Добавить",
        children: <PlusIcon />,
    },
};