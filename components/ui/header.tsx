
import React from "react";
import { Flame } from "lucide-react";
import { Button } from "./button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Header() {
    return (
        <div className="w-full flex items-center justify-between p-5 shadow-sm h-16 sticky top-0 z-10 bg-white">
            <div className="flex items-end gap-1 text-rose-800">
                <Flame className="w-10 h-10 text-rose-800 fill-rose-800" />
                <p className="text-3xl">for <span className="italic font-semibold">TIMSDCR</span></p>
            </div>
            <div>
                <SignedOut>
                    <Button className="rounded-full px-8">
                        <SignInButton />
                    </Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
}

