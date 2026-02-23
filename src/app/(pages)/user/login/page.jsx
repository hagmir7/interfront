"use client";
import LoginForm from "@/components/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {


    return (
        <div className="p-10 max-w-5xl mx-auto">
            <Suspense fallback={<div>Chargement...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
