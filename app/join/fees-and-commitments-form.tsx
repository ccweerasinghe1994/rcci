"use client"

import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FeesAndCommitmentsFormProps {
  onPrevious: () => void
}

export default function FeesAndCommitmentsForm({ onPrevious }: FeesAndCommitmentsFormProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  // Calculate membership dues based on selections
  const membershipType = watch("membershipType")
  const paymentPeriod = watch("paymentPeriod")
  const startupProject = watch("startupProject")

  // Membership fee calculation
  let monthlyFee = membershipType === "personal" ? 1000 : 2000
  if (startupProject) {
    monthlyFee = monthlyFee / 2 // 50% reduction
  }

  const entranceFee = membershipType === "personal" ? 1500 : 3000
  const months = paymentPeriod === "6months" ? 6 : 12
  const discount = paymentPeriod === "1year" ? 0.05 : 0 // 5% discount for yearly payment

  const totalMonthlyFees = monthlyFee * months * (1 - discount)
  const totalDues = entranceFee + totalMonthlyFees

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-semibold mb-4">Personal Membership Fees Chart</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Membership Type</th>
                <th className="py-2 px-4 text-right">Monthly Fee</th>
                <th className="py-2 px-4 text-right">Entrance Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-t">Ordinary Personal Membership</td>
                <td className="py-2 px-4 border-t text-right">1,000</td>
                <td className="py-2 px-4 border-t text-right">1,500</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-t">Personal Membership (Linked to Start-Up Support/Mentorship)</td>
                <td className="py-2 px-4 border-t text-right">500</td>
                <td className="py-2 px-4 border-t text-right">1,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <Label className="flex items-start space-x-2">
          <div>
            <Checkbox
              checked={watch("startupProject")}
              onCheckedChange={(checked) => setValue("startupProject", checked === true)}
            />
          </div>
          <span>
            Are you submitting a start-up project or applying for mentorship with this application to qualify for a 50%
            fee reduction in the first year? *
          </span>
        </Label>
      </div>

      <div>
        <Label>I pay monthly fees for *</Label>
        <RadioGroup
          defaultValue={watch("paymentPeriod")}
          onValueChange={(value) => setValue("paymentPeriod", value as "6months" | "1year")}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="6months" id="6months" />
            <Label htmlFor="6months" className="cursor-pointer">
              6 Months
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1year" id="1year" />
            <Label htmlFor="1year" className="cursor-pointer">
              1 Year (5% Discount)
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="supportContribution">Support contributions *</Label>
        <Select
          defaultValue={watch("supportContribution")}
          onValueChange={(value) => setValue("supportContribution", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select contribution level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="supporting-silver">Supporting Silver Member - 36,000</SelectItem>
            <SelectItem value="supporting-gold">Supporting Gold Member - 60,000</SelectItem>
            <SelectItem value="supporting-platinum">Supporting Platinum Member - 120,000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-semibold mb-2">Your Membership Dues: {totalDues.toLocaleString()} (MUR)</h3>
        <p className="text-sm text-gray-600">
          Dues breakdown: Entrance Fees - {entranceFee.toLocaleString()} + Monthly Fees - {monthlyFee.toLocaleString()}{" "}
          x {months} Months
          {discount > 0 && ` (with ${discount * 100}% discount)`}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeToProcess"
            checked={watch("agreeToProcess")}
            onCheckedChange={(checked) => setValue("agreeToProcess", checked === true)}
          />
          <Label htmlFor="agreeToProcess" className="text-sm">
            I approve the receipt and consideration that my membership application requires the Chamber's Management
            Council's approval. I understand that after approval, I will receive a payment link and commit to settling
            the amount within 10 days.
          </Label>
        </div>

        <div>
          <p className="font-medium">By pressing SUBMIT, I hereby confirm that:</p>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeToConstitution"
            checked={watch("agreeToConstitution")}
            onCheckedChange={(checked) => setValue("agreeToConstitution", checked === true)}
          />
          <Label htmlFor="agreeToConstitution" className="text-sm">
            I agree to abide by the Constitution and By-laws of RCCI (available upon request)
          </Label>
        </div>

        <div>
          <p className="font-medium">I confirm that I have reviewed and approve the following documents:</p>

          <div className="ml-4 mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="readCodeOfConduct"
                checked={watch("readCodeOfConduct")}
                onCheckedChange={(checked) => setValue("readCodeOfConduct", checked === true)}
              />
              <Label htmlFor="readCodeOfConduct" className="text-sm">
                RCCI's Code of Conduct
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="readPrivacyPolicy"
                checked={watch("readPrivacyPolicy")}
                onCheckedChange={(checked) => setValue("readPrivacyPolicy", checked === true)}
              />
              <Label htmlFor="readPrivacyPolicy" className="text-sm">
                RCCI's Privacy Policy
              </Label>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="subscribeToNewsletter"
            checked={watch("subscribeToNewsletter")}
            onCheckedChange={(checked) => setValue("subscribeToNewsletter", checked === true)}
          />
          <Label htmlFor="subscribeToNewsletter" className="text-sm">
            I would like to subscribe to the RCCI Newsletter
          </Label>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </div>
  )
}
