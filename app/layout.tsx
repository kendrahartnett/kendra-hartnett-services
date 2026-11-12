import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const inter = localFont({ src:[{path:'../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2',weight:'400'},{path:'../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2',weight:'600'},{path:'../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2',weight:'700'}], variable:'--font-inter', display:'swap' });
const space = localFont({ src:[{path:'../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff2',weight:'400'},{path:'../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2',weight:'500'},{path:'../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff2',weight:'600'},{path:'../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2',weight:'700'}], variable:'--font-space', display:'swap' });
const display = localFont({ src:'../node_modules/@fontsource/dm-serif-display/files/dm-serif-display-latin-400-normal.woff2', variable:'--font-display', display:'swap' });
const mono = localFont({ src:'../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2', variable:'--font-mono', display:'swap' });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  title:'Kendra Hartnett | Independent Software & Automation',
  description:'Custom software, intelligent automations, and practical AI solutions designed to help your business work smarter.',
  ...(siteUrl ? { metadataBase:new URL(siteUrl), alternates:{canonical:'/'}, openGraph:{url:'/',title:'Kendra Hartnett | Independent Software & Automation',description:'Less busywork. Better systems. More room to grow.',type:'website'} } : {}),
  robots:{index:true,follow:true},
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body className={`${inter.variable} ${space.variable} ${display.variable} ${mono.variable}`}>{children}</body></html>; }
