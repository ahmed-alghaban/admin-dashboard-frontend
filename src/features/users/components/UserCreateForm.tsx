import { GenericForm } from "@/components/ui/form/GenericForm";
import { TextField } from "@/components/ui/form/fields/TextField";
import { SelectField } from "@/components/ui/form/fields/SelectField";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent } from "@/components/ui/card/card";
import { userCreateSchema, type UserCreateFormData } from "../schemas/userSchema";
import { toast } from "sonner";
import type { UserCreateFormProps } from "../userTypes";

// Mock roles - you can replace this with actual API call
const roleOptions = [
    { label: "Admin", value: "admin-role-id" },
    { label: "Manager", value: "manager-role-id" },
    { label: "Viewer", value: "viewer-role-id" },
];

export const UserCreateForm = ({ onSuccess, onCancel }: UserCreateFormProps) => {
    const defaultValues: UserCreateFormData = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        roleId: "",
        password: "",
        confirmPassword: "",
        profileImageUrl: "",
    };

    const handleSubmit = async (data: UserCreateFormData) => {
        try {
            // Remove confirmPassword and hash the password before sending
            const { confirmPassword, ...userData } = data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            void confirmPassword; // Suppress unused variable warning

            // TODO: Hash the password here before sending to API
            // const hashedPassword = await hashPassword(data.password);

            // TODO: Replace with actual API call
            console.log("Creating user:", userData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("User created successfully!");
            onSuccess?.();
        } catch (error) {
            console.error("Error creating user:", error);
            toast.error("Failed to create user. Please try again.");
        }
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
                                    disabled={form.formState.isSubmitting}
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