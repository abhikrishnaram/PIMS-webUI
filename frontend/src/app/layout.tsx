import './globals.css';
import {Toaster} from "@/components/ui/toaster";

export const metadata = {
  title: 'PIMS - Precision Irrigation Management System',
  description: 'A dashboard for managing irrigation systems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
