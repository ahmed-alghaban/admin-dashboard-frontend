// Updated UserEditForm.tsx
import { Button } from "@/components/ui/button/button";
import { GenericForm } from "@/components/ui/form/GenericForm";
import { userEditSchema } from "../schemas/userEditSchema";
import type { z } from "zod";
import { TextField } from "@/components/ui/form/fields/TextField";
import { SelectField } from "@/components/ui/form/fields/SelectField";
import { useEditUser } from "../hooks/useEditUser";
import { useGetUserById } from "../hooks/useUser";
import type { UserEditFormProps } from "@/lib/types";

// Mock roles - you can replace this with actual API call
const roleOptions = [
  { label: "Admin", value: "bd7a308d-ef14-4028-9706-1356dba8af56" },
  { label: "Manager", value: "9e9542bb-c92e-48d5-bf6a-06d510f10aa7" },
  { label: "Viewer", value: "test-role-id" },
];

const UserEditForm = ({ userId, onSuccess, onCancel }: UserEditFormProps) => {
  const { mutate: editUser, isPending } = useEditUser();
  const { data: userResponse, isLoading, error } = useGetUserById(userId);

  const handleSubmit = async (data: z.infer<typeof userEditSchema>) => {
    // Filter out empty values and send only changed data
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value !== undefined && value !== null && value !== ""
      )
    );

    // Include passwordHash from current user data
    if (userResponse?.passwordHash) {
      filteredData.passwordHash = userResponse.passwordHash;
    }
    await editUser(
      { userId, user: filteredData },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <div className="text-muted-foreground">Loading user data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <div className="text-destructive">Error loading user data</div>
        </div>
      </div>
    );
  }

  // Transform the API response to match the form schema
  const userData = userResponse
    ? {
        firstName: userResponse.firstName || "",
        lastName: userResponse.lastName || "",
        email: userResponse.email || "",
        phoneNumber: userResponse.phoneNumber || "",
        roleId: userResponse.role?.roleId || null,
        profileImageUrl: userResponse.profileImageUrl || "",
      }
    : {};

  return (
    <div className="w-full">
      <GenericForm
        schema={userEditSchema}
        defaultValues={userData}
        onSubmit={handleSubmit}
        className="space-y-4"
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
              label="Role"
              options={roleOptions}
              placeholder="Select a role (optional)"
            />

            <TextField
              name="profileImageUrl"
              label="Profile Image URL"
              placeholder="Enter profile image URL (optional)"
              type="url"
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {form.formState.isSubmitting ? "Updating..." : "Update User"}
              </Button>
            </div>
          </>
        )}
      </GenericForm>
    </div>
  );
};

export default UserEditForm;
