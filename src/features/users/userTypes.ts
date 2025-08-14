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
