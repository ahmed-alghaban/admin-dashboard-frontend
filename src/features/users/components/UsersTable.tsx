import { DataTable } from '@/components/ui/table/DataTable'
import { useUsers } from '../hooks/useUser'
import type { User } from '../userTypes'
import type { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'firstName',
        header: 'First Name',
    },
    {
        accessorKey: 'lastName',
        header: 'Last Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt'))
            return date.toLocaleDateString()
        },
    },
]

const UsersTable = () => {
    const { data: users, isLoading, error } = useUsers()

    if (error) {
        return <div>Error loading users: {error.message}</div>
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Users Table</h1>
            <DataTable
                columns={columns}
                data={users || []}
                loading={isLoading}
                emptyMessage="No users found."
            />
        </div>
    )
}

export default UsersTable
