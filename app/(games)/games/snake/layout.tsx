import "./globals.css";
import Footer from "@/components/snakeGame/Footer";

export const metadata = {
  title: "Snake Game",
  description: "Nextjs Snake Game",
  creator: "Fadi Omar",
  icons: {
    icon: "../icon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="container">
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
