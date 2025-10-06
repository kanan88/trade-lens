'use client'

import { useForm } from 'react-hook-form'

import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import { Button } from '@/components/ui/button'
import { signInWithEmail } from '@/lib/actions/auth.actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SignIn = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur'
  })

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data)
      if (result.success) {
        router.push('/')
      }
    } catch (e) {
      console.error('Submission error: ', e)
      toast.error('Sign in failed.', {
        description: e instanceof Error ? e.message : 'Failed to sign in.'
      })
    }
  }

  return (
    <>
      <h1 className="form-title">Welcome back</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          placeholder="Enter your password"
          error={errors.password}
          validation={{ required: 'Password is required', minLength: 8 }}
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? 'Signing In...' : 'Start Your Investing Journey'}
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText="Sign Up"
          href="/sign-up"
        />
      </form>
    </>
  )
}

export default SignIn
