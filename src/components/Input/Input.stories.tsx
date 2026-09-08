import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const meta: Meta<typeof Input> = {
    title: "Components/Input",
    component: Input,
    tags: ["autodocs"],
    argTypes: {
        disabled: { control: "boolean" },
        placeholder: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        label: "Электронная почта",
        placeholder: "example@domain.com",
    },
};

export const WithError: Story = {
    args: {
        label: "Пароль",
        type: "password",
        placeholder: "••••••••",
        errorText: "Пароль должен содержать минимум 8 символов",
    },
};

const FormSchema = z.object({
    username: z
        .string()
        .min(3, "Имя пользователя должно быть не менее 3 символов")
        .max(20, "Слишком длинное имя"),
});

type FormValues = z.infer<typeof FormSchema>;

const ControlledForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: { username: "" },
    });

    const onSubmit = (data: FormValues) => {
        alert(`Форма успешно отправлена: ${JSON.stringify(data)}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
            <Input
                label="Имя пользователя"
                placeholder="Введите никнейм"
                errorText={errors.username?.message}
                {...register("username")}
            />
            <Button type="submit">Отправить форму</Button>
        </form>
    );
};

export const InteractiveForm: Story = {
    render: () => <ControlledForm />,
};