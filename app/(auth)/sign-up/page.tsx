'use client'

import { useForm } from 'react-hook-form'

import CountrySelectField from '@/components/forms/CountrySelectField'
import InputField from '@/components/forms/InputField'
import SelectField from '@/components/forms/SelectField'
import { Button } from '@/components/ui/button'
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS
} from '@/lib/constants'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      country: 'UK',
      investmentGoals: 'Growth',
      riskTolerance: 'Medium',
      preferredIndustry: 'Technology'
    },
    mode: 'onBlur'
  })

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log('Form Data: ', data)
    } catch (e) {
      console.error('Submission error: ', e)
    }
  }

  return (
    <>
      <h1 className="form-title">Sign Up & Personalise</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full Name"
          register={register}
          placeholder="John Doe"
          error={errors.fullName}
          validation={{ required: 'Full name is required', minLength: 2 }}
          disabled={isSubmitting}
        />

        <InputField
          name="email"
          label="Email"
          register={register}
          placeholder="joedoe@email.com"
          error={errors.email}
          validation={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
          disabled={isSubmitting}
        />

        <InputField
          name="password"
          label="Password"
          type="password"
          register={register}
          placeholder="Enter a strong password"
          error={errors.password}
          validation={{ required: 'Password is required', minLength: 8 }}
          disabled={isSubmitting}
        />

        <CountrySelectField
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goals"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />

        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk tolerance"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />

        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting
            ? 'Creating an account...'
            : 'Start Your Investing Journey'}
        </Button>
      </form>
    </>
  )
}

export default SignUp
