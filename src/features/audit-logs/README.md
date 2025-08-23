# Audit Logs Feature

This feature provides comprehensive audit logging functionality for the admin dashboard.

## Overview

The audit logs feature allows administrators to:

- View all system audit logs with pagination
- See audit log statistics (total logs, unique users, unique IPs, today's logs)
- Filter audit logs by action type, entity, and date range
- Export audit log data (placeholder functionality)
- Monitor user activities and system changes

## API Endpoints

The feature integrates with the following C# backend endpoints:

- `GET /audit-logs` - Get all audit logs with pagination (Admin role only)

## Components

### Core Components

- `AuditLogPage` - Main page component
- `AuditLogStatsCards` - Statistics display cards
- `AuditLogsTable` - Data table with audit log entries
- `AuditLogPageHeader` - Page header with action buttons

### Hooks

- `useAuditLogs` - Fetch audit log data
- `useAuditLogFilters` - Filter and pagination logic

### Stores

- `useAuditLogPreferencesStore` - User preferences with persistence

## Data Structure

The audit log data structure matches the C# DTO:

```typescript
interface AuditLog {
  auditLogId: string;
  userId: string;
  actionType: AuditActionType;
  entityName: string;
  description: string;
  ipAddress: string;
  timestamp: string;
}

type AuditActionType =
  | "Create"
  | "Update"
  | "Delete"
  | "Login"
  | "Logout"
  | "View"
  | "Export"
  | "Import";
```

## Features

### Action Type Indicators

Each action type has a distinct color-coded badge:

- **Create**: Green badge
- **Update**: Blue badge
- **Delete**: Red badge
- **Login**: Purple badge
- **Logout**: Gray badge
- **View**: Yellow badge
- **Export**: Indigo badge
- **Import**: Pink badge

### Role-Based Access

- **Admin**: Can view all audit logs
- **Manager/Viewer**: No access (restricted to Admin only)

### Statistics

- Total audit log entries
- Unique users count
- Unique IP addresses count
- Today's log entries count

### Filtering Capabilities

- Filter by action type (Create, Update, Delete, etc.)
- Filter by entity name
- Filter by date range
- Search across description, entity name, and IP address

## Usage

The audit logs feature is accessible via the sidebar navigation and is protected by role-based access control. Only users with Admin role can:

1. Navigate to the Audit Logs page
2. View audit log statistics and data
3. Use the refresh button to reload data
4. Export audit log data (placeholder)
5. Apply filters to narrow down results

## Table Columns

The audit logs table displays:

- **Log ID**: Unique identifier for each log entry
- **User ID**: ID of the user who performed the action
- **Action**: Color-coded action type with icon
- **Entity**: Name of the entity being acted upon
- **Description**: Detailed description of the action
- **IP Address**: IP address of the user
- **Timestamp**: Date and time of the action
- **Actions**: View details button (placeholder)

## Future Enhancements

- Add detailed view modal for individual log entries
- Implement advanced filtering with date pickers
- Add export functionality (CSV, PDF)
- Add real-time log streaming
- Implement log retention policies
- Add log analysis and reporting features
