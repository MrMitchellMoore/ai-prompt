import "./globals.css";
import { Merriweather } from "next/font/google";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

const merriweather = Merriweather({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700", "900"],
  style: ["normal"],
  fallback: "sans",
});

export const metadata = {
  title: "AI Prompt",
  description: "Discover & Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <link rel="icon" href="ai.png" type="image/png" />
      <body className={merriweather.className}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
