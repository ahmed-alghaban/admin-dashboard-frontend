import { GenericForm } from "@/components/ui/form/GenericForm";
import { TextField } from "@/components/ui/form/fields/TextField";
import { SelectField } from "@/components/ui/form/fields/SelectField";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent } from "@/components/ui/card/card";
import { userCreateSchema, type UserCreateFormData } from "../schemas/userSchema";
import { toast } from "sonner";
import { defaultValues } from "../userTypes";
import { logger } from "@/lib/logger";
import { useAddUser } from "../hooks/useAddUser";
import type { UserCreateFormProps } from "@/lib/types";

// Mock roles - you can replace this with actual API call
const roleOptions = [
    { label: "Admin", value: "bd7a308d-ef14-4028-9706-1356dba8af56" },
    { label: "Manager", value: "9e9542bb-c92e-48d5-bf6a-06d510f10aa7" },
    { label: "Viewer", value: "test-role-id" },
];



export const UserCreateForm = ({ onSuccess, onCancel }: UserCreateFormProps) => {
    const { mutate: addUser, isPending } = useAddUser();

    const handleSubmit = (data: UserCreateFormData) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        addUser({
            ...data,
            passwordHash: data.password, // Password hashing should be handled on the backend
        }, {
            onSuccess: () => {
                logger.log(data);
                onSuccess?.();
            }
        });
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardContent>
                <GenericForm
                    schema={userCreateSchema}
                    defaultValues={defaultValues}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {(form) => (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    name="firstName"
                                    label="First Name *"
                                    placeholder="Enter first name"
                                />
                                <TextField
                                    name="lastName"
                                    label="Last Name *"
                                    placeholder="Enter last name"
                                />
                            </div>

                            <TextField
                                name="email"
                                label="Email Address *"
                                placeholder="Enter email address"
                                type="email"
                            />

                            <TextField
                                name="phoneNumber"
                                label="Phone Number *"
                                placeholder="Enter phone number"
                                type="tel"
                            />

                            <SelectField
                                name="roleId"
                                label="Role *"
                                options={roleOptions}
                                placeholder="Select a role"
                            />

                            <TextField
                                name="profileImageUrl"
                                label="Profile Image URL"
                                placeholder="Enter profile image URL (optional)"
                                type="url"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    name="password"
                                    label="Password *"
                                    placeholder="Enter password"
                                    type="password"
                                />
                                <TextField
                                    name="confirmPassword"
                                    label="Confirm Password *"
                                    placeholder="Confirm password"
                                    type="password"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                >
                                    {form.formState.isSubmitting ? "Creating..." : "Create User"}
                                </Button>
                            </div>
                        </>
                    )}
                </GenericForm>
            </CardContent>
        </Card>
    );
}; 