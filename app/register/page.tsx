"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  BriefcaseBusiness,
  ArrowRight,
  Check,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { registerStep1 } from "@/services/authService";

/* ─── Zod schema ─────────────────────────────────────────────────── */
const step1Schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(80),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/\d/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Step1FormData = z.infer<typeof step1Schema>;

/* ─── Password requirement indicator ────────────────────────────── */
const passwordRules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
];

/* ─── Page ───────────────────────────────────────────────────────── */
export default function RegisterStep1Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step1FormData>({ resolver: zodResolver(step1Schema) });

  const passwordValue = watch("password", "");

  const mutation = useMutation({
    mutationFn: registerStep1,
    onSuccess: () => {
      toast.success("Account created! Complete your profile.");
      router.push("/register/step2");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "Registration failed. Please try again.";
      toast.error(message);
    },
  });

  const onSubmit = (data: Step1FormData) =>
    mutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });

  return (
    <main className="min-h-screen bg-[#C2E8FF] flex items-center justify-center px-4 py-12">
      {/* Background decorations */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#557EB2]/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Brand */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#000F22] rounded-md flex items-center justify-center">
              <BriefcaseBusiness size={18} className="text-white" />
            </div>
            <span className="font-display italic text-[#000F22] text-2xl">
              CareerPilot
            </span>
          </Link>
        </div>

        <Card className="animate-fade-up delay-1 shadow-lg">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#537FAF] uppercase tracking-wider">
                Step 1 of 2
              </span>
              <span className="text-xs font-bold text-[#557EB2]">50%</span>
            </div>
            <div className="h-1.5 bg-[#C2E8FF] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#000F22] rounded-full transition-all duration-500"
                style={{ width: "50%" }}
              />
            </div>
          </div>

          {/* Header */}
          <div className="mb-7">
            <h1 className="font-display italic text-[#000F22] text-3xl mb-1">
              Create your account
            </h1>
            <p className="text-sm text-[#537FAF]">
              Your AI-powered career journey begins here.
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
                label="Full Name"
                type="text"
                placeholder="Alex Johnson"
                autoComplete="name"
                leftIcon={<User size={15} />}
                error={errors.name?.message}
                {...register("name")}
              />
            </div>

            <div className="animate-fade-up delay-3">
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

            <div className="animate-fade-up delay-4">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 characters"
                autoComplete="new-password"
                leftIcon={<Lock size={15} />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-[#537FAF] hover:text-[#042558] transition-colors"
                    aria-label="Toggle password"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
                error={errors.password?.message}
                {...register("password")}
              />

              {/* Live password rules — only shown while typing */}
              {passwordValue.length > 0 && (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {passwordRules.map(({ label, test }) => {
                    const ok = test(passwordValue);
                    return (
                      <li
                        key={label}
                        className="flex items-center gap-2 text-xs transition-colors"
                        style={{ color: ok ? "#16A34A" : "#537FAF" }}
                      >
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                          style={{
                            background: ok
                              ? "#16A34A"
                              : "rgba(83,127,175,0.12)",
                            border: ok
                              ? "none"
                              : "1px solid rgba(83,127,175,0.35)",
                          }}
                        >
                          {ok && (
                            <Check
                              size={9}
                              strokeWidth={3}
                              className="text-white"
                            />
                          )}
                        </span>
                        {label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="animate-fade-up delay-5">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                leftIcon={<Lock size={15} />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="text-[#537FAF] hover:text-[#042558] transition-colors"
                    aria-label="Toggle confirm password"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>
                }
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </div>

            <div className="animate-fade-up delay-6 mt-1">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={mutation.isPending}
                rightIcon={<ArrowRight size={16} />}
              >
                Continue to Step 2
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#7A9BC4]/25" />
            <span className="text-xs text-[#537FAF] font-medium">
              Already have an account?
            </span>
            <div className="flex-1 h-px bg-[#7A9BC4]/25" />
          </div>

          <Link href="/login" className="block">
            <Button variant="ghost" className="w-full" size="md">
              Sign in instead
            </Button>
          </Link>
        </Card>
      </div>
    </main>
  );
}
