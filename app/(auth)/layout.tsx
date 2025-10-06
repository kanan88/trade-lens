import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/better-auth/auth'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session?.user) redirect('/')

  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            src="/assets/icons/logo.svg"
            alt="TradeLens logo"
            width={32}
            height={32}
            className="size-8"
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>

      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            TradeLens turned my watchlist into a winning list. The alerts are
            spot-on, and I feel more confident making moves in the market
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">- Ken F.</cite>
              <p className="max-md:text-xs text-gray-500">Retail Investor</p>
            </div>

            <div className="flex items-center gap-0.5">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Image
                    key={i}
                    src="/assets/icons/star.svg"
                    alt="Star"
                    width={20}
                    height={20}
                    className="size-5"
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <Image
            src="/assets/images/dashboard.png"
            alt="Dahsboard Preview"
            width={1440}
            height={1150}
            priority
            className="auth-dashboard-preview absolute top-0"
          />
        </div>
      </section>
    </main>
  )
}

export default Layout
