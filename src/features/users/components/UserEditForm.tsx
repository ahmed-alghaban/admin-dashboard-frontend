// Updated UserEditForm.tsx
import { Button } from "@/components/ui/button/button"
import { GenericForm } from "@/components/ui/form/GenericForm"
import { userEditSchema } from "../schemas/userEditSchema"
import type { z } from "zod"
import { TextField } from "@/components/ui/form/fields/TextField"
import { useEditUser } from "../hooks/useEditUser"
import { useGetUserById } from "../hooks/useUser"
import type { UserEditFormProps } from "@/lib/types"
import { logger } from "@/lib/logger"



const UserEditForm = ({ userId, onSuccess, onCancel }: UserEditFormProps) => {
    const { mutate: editUser, isPending } = useEditUser();
    const { data: userResponse, isLoading, error } = useGetUserById(userId);



    const handleSubmit = async (data: z.infer<typeof userEditSchema>) => {
        try {
            await editUser({ userId, user: data }, {
                onSuccess: () => {
                    onSuccess?.();
                }
            });
        } catch (error) {
            logger.error(error);
        }
    }

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
    const userData = userResponse ? {
        firstName: userResponse.firstName || userResponse.result?.firstName || "",
        lastName: userResponse.lastName || userResponse.result?.lastName || "",
        email: userResponse.email || userResponse.result?.email || "",
        phoneNumber: userResponse.phoneNumber || userResponse.result?.phoneNumber || "",
        profileImageUrl: userResponse.profileImageUrl || userResponse.result?.profileImageUrl || "",
    } : {};




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



                        <TextField
                            name="profileImageUrl"
                            label="Profile Image URL"
                            placeholder="Enter profile image URL (optional)"
                            type="url"
                        />

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
                                {form.formState.isSubmitting ? "Updating..." : "Update User"}
                            </Button>
                        </div>
                    </>
                )}
            </GenericForm>
        </div>
    )
}

export default UserEditForm;