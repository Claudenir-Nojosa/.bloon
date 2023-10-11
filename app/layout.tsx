import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { ThemeProvider } from "../components/providers/theme.provider";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";
import { AuthProvider } from "@/components/providers/auth.provider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "https://github.com/Claudenir-Nojosa/servidor_estaticos/raw/main/site-bloon-favicon.ico",
    shortcut:
      "https://github.com/Claudenir-Nojosa/servidor_estaticos/raw/main/site-bloon-favicon.ico",
    apple:
      "https://github.com/Claudenir-Nojosa/servidor_estaticos/raw/main/site-bloon-favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <AuthProvider>
        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            themeProps={{ attribute: "class", defaultTheme: "dark" }}
          >
            <div className="relative flex flex-col h-screen">
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
