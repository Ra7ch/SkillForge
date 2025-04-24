import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SkillForge - Certification Platform",
  description: "The premier certification platform for skilled trade professionals",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
