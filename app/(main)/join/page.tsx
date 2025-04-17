"use client"

import { Footer } from "@/components/shared/Footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import AdditionalInfoForm from "./additional-info-form"
import FeesAndCommitmentsForm from "./fees-and-commitments-form"
import PersonalDetailsForm from "./personal-details-form"

// Define the form data structure
type FormData = {
  // Personal Details
  title: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  membershipType: "personal" | "corporate"

  // Additional Information
  country: string
  facebook: string
  linkedin: string
  motivation: string

  // Fees and Commitments
  startupProject: boolean
  paymentPeriod: "6months" | "1year"
  supportContribution: string
  agreeToProcess: boolean
  agreeToConstitution: boolean
  readCodeOfConduct: boolean
  readPrivacyPolicy: boolean
  subscribeToNewsletter: boolean
}

export default function JoinPage() {
  const [step, setStep] = useState(1)
  const methods = useForm<FormData>({
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      membershipType: "personal",
      country: "Rodrigues",
      facebook: "",
      linkedin: "",
      motivation: "",
      startupProject: false,
      paymentPeriod: "6months",
      supportContribution: "",
      agreeToProcess: false,
      agreeToConstitution: false,
      readCodeOfConduct: false,
      readPrivacyPolicy: false,
      subscribeToNewsletter: false,
    },
  })

  const nextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!")
    // Redirect to a thank you page or home page
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#1976D2] text-white">
          <div className="container py-12">
            <h1 className="text-3xl font-bold mb-4">Get Started</h1>
            <p className="max-w-2xl mb-8">
              New to the RCCI? Here you find valuable information to help you understand the Chamber's purpose and how
              it can support you in your entrepreneurial journey.
            </p>
            <Link
              href="#join-chamber"
              className="inline-block border border-white px-8 py-3 uppercase font-medium tracking-wide hover:bg-white hover:text-[#1976D2] transition-colors"
            >
              Join the Chamber
            </Link>
          </div>
        </section>

        {/* Secondary Navigation */}
        <section className="border-b border-gray-200 py-4">
          <div className="container">
            <div className="flex gap-8">
              <Link href="#rcci-newsletter" className="text-primary hover:underline">
                RCCI Newsletter
              </Link>
              <Link href="#daily-comment" className="text-primary hover:underline">
                Daily Comment
              </Link>
              <Link href="#rcci-in-news" className="text-primary hover:underline">
                RCCI in the News
              </Link>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-8">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">RCCI Account Registration</h2>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between">
                <div className={`text-center flex-1 ${step >= 1 ? "text-green-600" : "text-gray-400"}`}>
                  <div>Personal Details</div>
                </div>
                <div className={`text-center flex-1 ${step >= 2 ? "text-green-600" : "text-gray-400"}`}>
                  <div>Additional Information</div>
                </div>
                <div className={`text-center flex-1 ${step >= 3 ? "text-green-600" : "text-gray-400"}`}>
                  <div>Fees and Commitments</div>
                </div>
              </div>
              <div className="relative mt-2">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
                <div className="relative flex justify-between">
                  <div className={`w-4 h-4 rounded-full ${step >= 1 ? "bg-green-600" : "bg-gray-200"}`}></div>
                  <div className={`w-4 h-4 rounded-full ${step >= 2 ? "bg-green-600" : "bg-gray-200"}`}></div>
                  <div className={`w-4 h-4 rounded-full ${step >= 3 ? "bg-green-600" : "bg-gray-200"}`}></div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-6">For help see the article: Registration step by step</div>

            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                {step === 1 && <PersonalDetailsForm onNext={nextStep} />}
                {step === 2 && <AdditionalInfoForm onNext={nextStep} onPrevious={prevStep} />}
                {step === 3 && <FeesAndCommitmentsForm onPrevious={prevStep} />}
              </form>
            </FormProvider>
          </div>
        </section>
      </main>
    </div>
  )
}
