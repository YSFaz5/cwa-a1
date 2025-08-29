import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/footer";

export const metadata = {
  title: "CSE3CWA A1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
