'use client'

import InputField from '@/components/forms/InputField'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'

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
