import styles from "@/res/style/styles";
import theme from "@/res/style/theme";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import localFont from "next/font/local";
// https://github.com/mui/material-ui/blob/v6.4.2/packages/mui-material/src/CssBaseline/CssBaseline.js

const pretendard = localFont({
  src: "./PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});
export const metadata: Metadata = {
  title: "개떡찰떡 타이머",
  description: "Laikyuno Timer",
};

const globalStyles = (
  <>
    <CssBaseline />
    <GlobalStyles styles={styles} />
  </>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable}`}>
        {globalStyles}
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
