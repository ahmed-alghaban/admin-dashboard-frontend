import * as React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet/sheet"; 
import { Button } from "@/components/ui/button/button";
import type { SideDrawerProps } from "@/lib/types";

export const SideDrawer: React.FC<SideDrawerProps> = ({
    open,
    onOpenChange,
    title = "Panel",
    description,
    trigger = <Button>Open</Button>,
    side = "right",
    children,
    widthClassName = "sm:max-w-md",
}) => (
    <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent side={side} className={widthClassName}>
            <SheetHeader>
                <SheetTitle>{title}</SheetTitle>
                {description && <SheetDescription>{description}</SheetDescription>}
            </SheetHeader>

            <div className="mt-4">{children}</div>
        </SheetContent>
    </Sheet>
);