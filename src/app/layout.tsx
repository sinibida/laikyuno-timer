import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
// https://github.com/mui/material-ui/blob/v6.4.2/packages/mui-material/src/CssBaseline/CssBaseline.js
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/shared/style/theme";

const pretendard = localFont({
  src: "./PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});
export const metadata: Metadata = {
  title: "개떡찰떡 타이머",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable}`}>
        <CssBaseline />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
