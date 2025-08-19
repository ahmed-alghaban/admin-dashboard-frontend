import type { UserCreateFormData } from "./schemas/userSchema";

export type User = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: string;
  createdAt: Date;
  role?: {
    roleId: string;
    name: string;
    description: string;
  };
  profileImageUrl?: string;
  passwordHash?: string;
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
  roleId?: string;
  passwordHash?: string;
  profileImageUrl?: string;
};

export interface UserUIStore {
  // Drawer states
  isAddDrawerOpen: boolean;
  isEditDrawerOpen: boolean;
  selectedUserId: string | null;

  // Actions
  openAddDrawer: () => void;
  closeAddDrawer: () => void;
  openEditDrawer: (userId: string) => void;
  closeEditDrawer: () => void;
  reset: () => void;
}
