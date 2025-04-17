"use client"

import type React from "react"

import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AdditionalInfoFormProps {
  onNext: () => void
  onPrevious: () => void
}

export default function AdditionalInfoForm({ onNext, onPrevious }: AdditionalInfoFormProps) {
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
        <Label htmlFor="country">Country *</Label>
        <Select defaultValue={watch("country")} onValueChange={(value) => setValue("country", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Rodrigues">Rodrigues</SelectItem>
            <SelectItem value="Mauritius">Mauritius</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message as string}</p>}
      </div>

      <div>
        <Label htmlFor="facebook">Facebook</Label>
        <Input id="facebook" {...register("facebook")} />
      </div>

      <div>
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input id="linkedin" {...register("linkedin")} />
      </div>

      <div>
        <Label htmlFor="motivation">Your motivation to join the RCCI *</Label>
        <Textarea
          id="motivation"
          rows={6}
          {...register("motivation", { required: "Please share your motivation to join" })}
        />
        {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation.message as string}</p>}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  )
}
