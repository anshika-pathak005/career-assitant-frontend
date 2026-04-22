"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { useLogin } from "@/hooks/useLogin";

/* ─── Zod schema ─────────────────────────────────────────────────── */
/*
  Login validation schema (Zod)

  • Defines form structure for login
  • Email: required + valid email format
  • Password: required field
  • Used with react-hook-form for validation before submit
*/
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

/*
  LoginFormData type is inferred from Zod schema

  • Automatically generates TypeScript type from loginSchema
  • Keeps type and schema always in sync
  • Avoids manual type definition and duplication
*/
type LoginFormData = z.infer<typeof loginSchema>;

/* ─── Page ───────────────────────────────────────────────────────── */
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  /*
  Creates and configures React Hook Form (RHF) instance

  • Initializes form state management (values, errors, submit handling)
  • Defines form data structure using LoginFormData (TypeScript safety)
  • Connects Zod validation using resolver (zodResolver)
  • RHF will call Zod to validate form data on submit

  • RHF delegates validation to Zod via zodResolver
  • On submit, RHF sends form data to Zod
  • Zod validates all rules (email, password, etc.)

  • If invalid:
      - Zod returns errors in its own format
      - zodResolver converts them to RHF format
      - RHF stores them in formState.errors for UI display

  • If valid:
      - No errors returned
      - Data passed to onSubmit handler
*/

  const onSubmit = (data: LoginFormData) => loginMutation.mutate(data);

  return (
    <main className="min-h-screen bg-[#C2E8FF] flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#557EB2]/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Brand */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#000F22] rounded-md flex items-center justify-center">
              <BriefcaseBusiness size={18} className="text-white" />
            </div>
            <span className="font-display  text-[#000F22] text-2xl">
              CareerPilot
            </span>
          </Link>
        </div>

        <Card className="animate-fade-up delay-1 shadow-lg">
          {/* Header */}
          <div className="mb-7">
            <h1 className="font-display  text-[#000F22] text-3xl mb-1">
              Welcome back
            </h1>
            <p className="text-sm text-[#537FAF]">
              Sign in to continue your career journey.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            <div className="animate-fade-up delay-2">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                leftIcon={<Mail size={15} />}
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <div className="animate-fade-up delay-3">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                leftIcon={<Lock size={15} />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-[#537FAF] hover:text-[#042558] transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
                error={errors.password?.message}
                {...register("password")}
              />
              <div className="mt-1.5 flex justify-end">
                <button
                  type="button"
                  className="text-xs text-[#557EB2] hover:text-[#042558] font-semibold transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <div className="animate-fade-up delay-4 mt-1">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={loginMutation.isPending}
                rightIcon={<ArrowRight size={16} />}
              >
                Sign In
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#7A9BC4]/25" />
            <span className="text-xs text-[#537FAF] font-medium">
              New to CareerPilot?
            </span>
            <div className="flex-1 h-px bg-[#7A9BC4]/25" />
          </div>

          <Link href="/register" className="block animate-fade-up delay-5">
            <Button variant="ghost" className="w-full" size="md">
              Create a free account
            </Button>
          </Link>
        </Card>
      </div>
    </main>
  );
}
