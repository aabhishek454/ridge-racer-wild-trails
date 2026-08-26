import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Ridge Racer: Wild Trails', description: 'A polished 2D hill-climbing adventure.' };
export const viewport: Viewport = { width:'device-width', initialScale:1, maximumScale:1, userScalable:false, themeColor:'#08111f' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className="h-full"><body className="min-h-full bg-[#08111f] text-white antialiased">{children}</body></html>}
