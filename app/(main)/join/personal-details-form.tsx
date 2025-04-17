"use client"

import type React from "react"

import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PersonalDetailsFormProps {
  onNext: () => void
}

export default function PersonalDetailsForm({ onNext }: PersonalDetailsFormProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Select defaultValue={watch("title")} onValueChange={(value) => setValue("title", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select title" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mr.">Mr.</SelectItem>
            <SelectItem value="Mrs.">Mrs.</SelectItem>
            <SelectItem value="Ms.">Ms.</SelectItem>
            <SelectItem value="Dr.">Dr.</SelectItem>
          </SelectContent>
        </Select>
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message as string}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input id="firstName" {...register("firstName", { required: "First name is required" })} />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message as string}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input id="lastName" {...register("lastName", { required: "Last name is required" })} />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message as string}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
      </div>

      <div>
        <Label htmlFor="mobileNumber">Mobile Number *</Label>
        <div className="flex">
          <div className="bg-gray-100 border border-gray-300 rounded-l-md px-3 flex items-center text-gray-500">
            +230
          </div>
          <Input
            id="mobileNumber"
            className="rounded-l-none"
            {...register("mobileNumber", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{7,}$/,
                message: "Please enter a valid mobile number",
              },
            })}
          />
        </div>
        {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message as string}</p>}
      </div>

      <div>
        <Label>Membership Type *</Label>
        <RadioGroup
          defaultValue={watch("membershipType")}
          onValueChange={(value) => setValue("membershipType", value as "personal" | "corporate")}
          className="flex flex-col space-y-2 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="personal" id="personal" />
            <Label htmlFor="personal" className="cursor-pointer">
              Personal Membership
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="corporate" id="corporate" />
            <Label htmlFor="corporate" className="cursor-pointer">
              Corporate Membership
            </Label>
          </div>
        </RadioGroup>
        {errors.membershipType && (
          <p className="text-red-500 text-sm mt-1">{errors.membershipType.message as string}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  )
}
