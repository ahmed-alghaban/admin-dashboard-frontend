import { DataTable } from '@/components/ui/table/DataTable'
import { useUsers } from '../hooks/useUser'
import { columns } from './UserTableColumns'
import { useState } from 'react'
import { SideDrawer } from '@/components/ui/sheet/SideDrawer'
import { UserCreateForm } from './UserCreateForm'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button/button'
import { Plus } from 'lucide-react'

const UsersTable = () => {
    const { data: users, isLoading, error } = useUsers()
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)
    const queryClient = useQueryClient()

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="text-destructive text-lg font-medium">Error loading users</div>
                    <div className="text-sm text-muted-foreground mt-1">{error.message}</div>
                </div>
            </div>
        )
    }

    const handleAddUserSuccess = () => {
        setIsAddDrawerOpen(false)
        queryClient.invalidateQueries({ queryKey: ['users'] })
        toast.success('User added successfully!')
    }

    const handleAddUserCancel = () => {
        setIsAddDrawerOpen(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">
                        Manage your users and their permissions
                    </p>
                </div>
                <Button onClick={() => setIsAddDrawerOpen(true)}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add User
                </Button>
            </div>

            <div className="bg-card">
                <DataTable
                    columns={columns}
                    data={users || []}
                    loading={isLoading}
                    emptyMessage="No users found."
                />
            </div>

            <SideDrawer
                open={isAddDrawerOpen}
                onOpenChange={setIsAddDrawerOpen}
                title="Add New User"
                description="Create a new user account"
                side="right"
                widthClassName="w-full sm:max-w-2xl"
            >
                <UserCreateForm
                    onSuccess={handleAddUserSuccess}
                    onCancel={handleAddUserCancel}
                />
            </SideDrawer>
        </div>
    )
}

export default UsersTable
