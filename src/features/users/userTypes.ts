import type { UserCreateFormData } from "./schemas/userSchema";

export type User = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    status: string;
    createdAt: Date;
};

export type UserCreateDto = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    roleId: string; // Guid maps to string
    passwordHash: string;
    profileImageUrl?: string | null;
};

export const defaultValues: UserCreateFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    roleId: "",
    password: "",
    confirmPassword: "",
    profileImageUrl: "",
};

export type UserUpdateDto = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    roleId?: string; // Guid in C# maps to string in TS
    passwordHash?: string;
    profileImageUrl?: string;
};
