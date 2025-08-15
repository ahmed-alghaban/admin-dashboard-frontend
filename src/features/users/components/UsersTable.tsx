import { DataTable } from '@/components/ui/table/DataTable'
import { useUsers } from '../hooks/useUser'
import { columns } from './UserTableCoulumns'

const UsersTable = () => {
    const { data: users, isLoading, error } = useUsers()

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

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <p className="text-muted-foreground">
                    Manage your users and their permissions
                </p>
            </div>

            <div className="border rounded-lg bg-card">
                <DataTable
                    columns={columns}
                    data={users || []}
                    loading={isLoading}
                    emptyMessage="No users found."
                />
            </div>
        </div>
    )
}

export default UsersTable
