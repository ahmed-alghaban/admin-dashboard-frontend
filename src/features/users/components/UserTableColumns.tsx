import type { ColumnDef } from "@tanstack/react-table"
import type { User } from "../userTypes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown/dropdown-menu"
import { Button } from "@/components/ui/button/button"
import { MoreHorizontal, Edit, Plus, User as UserIcon } from "lucide-react"

export const columns = (handleAddUser: () => void): ColumnDef<User>[] => [
    {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue('firstName')}</div>
        ),
    },
    {
        accessorKey: 'lastName',
        header: 'Last Name',
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue('lastName')}</div>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
            <div className="text-sm text-muted-foreground">{row.getValue('email')}</div>
        ),
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone',
        cell: ({ row }) => (
            <div className="text-sm">{row.getValue('phoneNumber')}</div>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            return (
                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === 'Active'
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'bg-destructive/10 text-destructive border border-destructive/20'
                    }`}>
                    {status}
                </div>
            )
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt'))
            return (
                <div className="text-sm text-muted-foreground">
                    {date.toLocaleDateString()}
                </div>
            )
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const user = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => console.log('Edit user:', user.userId)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleAddUser}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('View user:', user.userId)}>
                            <UserIcon className="mr-2 h-4 w-4" />
                            View Details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]