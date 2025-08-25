// app/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  Users,
  Shield,
  Zap,
  MessageCircle,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  Star,
  Award,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import AchievementsStrip from "@/components/AchievementsStrip"

const cryptoCoins = [
  { name: "Bitcoin", symbol: "BTC", image: "/images/bitcoin.png", color: "bg-orange-500" },
  { name: "Ethereum", symbol: "ETH", image: "/images/ethereum.png", color: "bg-blue-500" },
  { name: "Dogecoin", symbol: "DOGE", image: "/images/dogecoin.png", color: "bg-yellow-500" },
  { name: "Shiba Inu", symbol: "SHIB", image: "/images/shiba.png", color: "bg-orange-600" },
  { name: "Pepe", symbol: "PEPE", image: "/images/pepe.png", color: "bg-green-500" },
  { name: "Bonk", symbol: "BONK", image: "/images/bonk.png", color: "bg-orange-500" },
  { name: "Solana", symbol: "SOL", image: "/images/solana.png", color: "bg-purple-500" },
  { name: "Cardano", symbol: "ADA", image: "/images/cardano.png", color: "bg-blue-600" },
  { name: "Polygon", symbol: "MATIC", image: "/images/polygon.png", color: "bg-purple-600" },
  { name: "Chainlink", symbol: "LINK", image: "/images/chainlink.png", color: "bg-blue-400" },
  { name: "Avalanche", symbol: "AVAX", image: "/images/avalanche.png", color: "bg-red-500" },
  { name: "Polkadot", symbol: "DOT", image: "/images/polkadot.png", color: "bg-pink-500" },
  { name: "Uniswap", symbol: "UNI", image: "/images/uniswap.png", color: "bg-pink-600" },
  { name: "Litecoin", symbol: "LTC", image: "/images/litecoin.png", color: "bg-gray-400" },
  { name: "BNB", symbol: "BNB", image: "/images/bnb.png", color: "bg-yellow-600" },
  { name: "XRP", symbol: "XRP", image: "/images/xrp.png", color: "bg-blue-300" },
  { name: "Floki", symbol: "FLOKI", image: "/images/floki.png", color: "bg-orange-400" },
]

interface UserData {
  name: string
  email: string
  firstName: string
  loginTime: string
}

export default function HomePage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("hommit_user")
    if (userData) setUser(JSON.parse(userData))
  }, [])

  const achievements = Array.from({ length: 17 }, (_, i) => ({
    src: `/achievements/${i + 1}.png`,
    alt: `Achievement ${i + 1}`,
  }))

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden pb-28 [padding-bottom:env(safe-area-inset-bottom)]">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-pulse-glow">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <h1 className="text-2xl font-bold text-white">HOMMIT</h1>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-green-400 font-medium transition-colors">Home</a>
            <a href="#clients" className="text-gray-300 hover:text-green-400 font-medium transition-colors">OUR CLIENTS</a>
            <a href="#about" className="text-gray-300 hover:text-green-400 font-medium transition-colors">About</a>
            <a href="#features" className="text-gray-300 hover:text-green-400 font-medium transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-green-400 font-medium transition-colors">Pricing</a>
          </nav>

          {/* Mobile menu button (3 lines) */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-slate-700 text-gray-100 active:scale-[.98]"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        <div className={`${mobileOpen ? "block" : "hidden"} md:hidden border-t border-slate-800 bg-slate-900/98`}>
          <div className="container mx-auto px-4 py-3 space-y-2">
            {[
              { href: "#home", label: "Home" },
              { href: "#clients", label: "OUR CLIENTS" },
              { href: "#about", label: "About" },
              { href: "#features", label: "Features" },
              { href: "#pricing", label: "Pricing" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-3 py-3 rounded-lg text-gray-200 hover:bg-slate-800"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* spacer for fixed header */}
      <div className="h-[64px] pt-[env(safe-area-inset-top)]" />

      {/* Hero */}
      <section
        id="home"
        className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 flex items-center justify-center px-4 overflow-hidden scroll-mt-24 md:scroll-mt-20"
      >
        {/* Floating Crypto Coins */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {cryptoCoins.slice(0, 12).map((coin, index) => (
            <div
              key={coin.symbol}
              className={`absolute w-12 h-12 md:w-16 md:h-16 ${
                index % 4 === 0 ? "animate-float" : index % 4 === 1 ? "animate-float-delayed" : index % 4 === 2 ? "animate-float-slow" : "animate-bounce-slow"
              }`}
              style={{
                top: `${10 + ((index * 7) % 70)}%`,
                left: `${5 + ((index * 13) % 85)}%`,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              <Image
                src={coin.image || "/placeholder.svg"}
                alt={coin.name}
                width={64}
                height={64}
                className="rounded-full shadow-2xl"
              />
            </div>
          ))}
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center bg-green-500/10 border border-green-500/20 rounded-full px-6 py-2 mb-6 animate-pulse-glow">
              <Star className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-green-300 text-sm font-medium">Nepal's #1 Memecoin Trading Platform</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
            Master the Art of
            <br />
            Memecoin Trading
          </h1>

<section className="mt-10 mb-16">
  <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-2">
    {/* WhatsApp */}
    <a
      href="https://api.whatsapp.com/send/?phone=13678481023&text&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full min-h-[128px] items-center gap-4 rounded-2xl border border-emerald-500/70 bg-slate-900/80 p-6 no-underline transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
    >
      <div className="relative h-16 w-16 overflow-hidden rounded-xl shrink-0">
        <Image
          src="/achievements/26.png"
          alt="WhatsApp"
          fill
          sizes="64px"
          className="object-cover"
          priority
        />
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-xl font-semibold text-emerald-300 sm:text-[20px]">
          Chat on WhatsApp
        </h3>
        <p className="mt-2 text-sm text-slate-300/80">
          Get quick responses and direct support
        </p>
      </div>
      <span className="ms-auto text-xl text-emerald-300 transition group-hover:translate-x-1">
        ↗
      </span>
    </a>

    {/* Telegram */}
    <a
      href="https://t.me/HOMMIT"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full min-h-[128px] items-center gap-4 rounded-2xl border border-emerald-500/70 bg-slate-900/80 p-6 no-underline transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
    >
      <div className="relative h-16 w-16 overflow-hidden rounded-xl shrink-0">
        <Image
          src="/achievements/25.png"
          alt="Telegram"
          fill
          sizes="64px"
          className="object-cover"
          priority
        />
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-xl font-semibold text-emerald-300 sm:text-[20px]">
          Join our Telegram
        </h3>
        <p className="mt-2 text-sm text-slate-300/80">
          Stay updated with the latest memecoin signals
        </p>
      </div>
      <span className="ms-auto text-xl text-emerald-300 transition group-hover:translate-x-1">
        ↗
      </span>
    </a>
  </div>
</section>


          {/* Crypto Ticker Strip */}
          <div className="mb-16 overflow-hidden">
            <div className="relative">
              <div className="flex animate-scroll space-x-8">
                {[...cryptoCoins, ...cryptoCoins].map((coin, index) => (
                  <div
                    key={`${coin.symbol}-${index}`}
                    className="flex-shrink-0 flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-6 py-3 hover:border-green-500/50 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="relative w-8 h-8">
                      <Image
                        src={coin.image || "/placeholder.svg"}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="rounded-full shadow-lg group-hover:shadow-green-500/50 transition-all duration-300"
                      />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold text-sm">{coin.symbol}</div>
                      <div className="text-gray-400 text-xs">{coin.name}</div>
                    </div>
                    <div className="text-green-400 text-sm font-bold">
                      +{Math.floor(Math.random() * 20 + 1)}.{Math.floor(Math.random() * 9)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Ticker Strip - Reverse Direction */}
          <div className="mb-8 overflow-hidden">
            <div className="relative">
              <div className="flex animate-scroll-reverse space-x-8">
                {[...cryptoCoins.slice().reverse(), ...cryptoCoins.slice().reverse()].map((coin, index) => (
                  <div
                    key={`reverse-${coin.symbol}-${index}`}
                    className="flex-shrink-0 flex items-center space-x-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-full px-6 py-3 hover:border-green-500/50 hover:from-green-900/20 hover:to-green-800/20 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="relative w-8 h-8">
                      <Image
                        src={coin.image || "/placeholder.svg"}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="rounded-full shadow-lg group-hover:shadow-green-500/50 transition-all duration-300"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold text-sm">{coin.symbol}</div>
                      <div className="text-gray-400 text-xs">{coin.name}</div>
                    </div>
                    <div className={`text-sm font-bold ${Math.random() > 0.3 ? "text-green-400" : "text-red-400"}`}>
                      {Math.random() > 0.3 ? "+" : "-"}
                      {Math.floor(Math.random() * 15 + 1)}.{Math.floor(Math.random() * 9)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-12 px-4">
            {!user ? (
              <>
                <a href="#pricing" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto button-glow text-white px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all group">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="https://wa.me/13678481023" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-gray-600 text-white hover:bg-gray-800 hover:border-green-500 px-10 py-4 text-lg rounded-full bg-transparent transition-all duration-300"
                  >
                    Contact Expert
                    <MessageCircle className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </>
            ) : (
              <>
                <Button size="lg" className="button-glow text-white px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all group">
                  استكشف لوحة التحكم
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <a href="https://wa.me/13678481023" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-600 text-white hover:bg-gray-800 hover:border-green-500 px-10 py-4 text-lg rounded-full bg-transparent transition-all duration-300"
                  >
                    تواصل مع الخبراء
                    <MessageCircle className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* OUR CLIENTS */}
      <section id="clients" className="py-24 px-4 bg-slate-900 scroll-mt-24 md:scroll-mt-20 overflow-x-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-green-400/10 border border-green-400/20 rounded-full px-6 py-2 mb-4">
              <span className="text-green-300 text-sm font-medium">OUR CLIENTS</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
  <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
    PROOF
  </span> 
  {" "}is in the{" "} 
  <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
    PROGRESS
  </span>
</h2>

          </div>
          <AchievementsStrip images={achievements} speed={60} />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-4 bg-gradient-to-br from-green-800 via-green-700 to-green-900 scroll-mt-24 md:scroll-mt-20 overflow-x-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-green-400/10 border border-green-400/20 rounded-full px-6 py-2 mb-6">
              <span className="text-green-300 text-sm font-medium">About HOMMIT</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              What is <span className="text-green-300">Hommit</span>?
            </h2>
            <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              HOMMIT is Nepal&apos;s premier educational platform dedicated to memecoin trading. We empower Nepalis with the
              knowledge, community, and strategies needed to navigate the exciting world of cryptocurrency memes and potentially create wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center max-w-6xl mx-auto">
            <div>
              <Card className="card-glow overflow-hidden rounded-2xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-3xl text-white mb-6 flex items-center">
                    <Award className="w-8 h-8 text-green-400 mr-3" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    We believe that memecoin trading represents one of the most accessible paths to financial growth for Nepalis. Our mission is to demystify crypto trading, reduce risks through education, and build a supportive community of successful traders.
                  </p>

                  <div className="space-y-6">
                    {[
                      { title: "Expert-Led Education", desc: "Comprehensive training tailored specifically for Nepali traders" },
                      { title: "Real-Time Market Analysis", desc: "Live trading insights and professional market analysis" },
                      { title: "Risk Management", desc: "Proven strategies to protect and grow your investments" },
                      { title: "Community Support", desc: "Join thousands of successful Nepali crypto traders" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 group">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-green-500/40 transition-colors">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1 group-hover:text-green-300 transition-colors">{item.title}</h4>
                          <p className="text-gray-300">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <div className="card-glow rounded-3xl p-8 sm:p-8 transition-all duration-500 overflow-hidden">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 mb-6">
                  <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="text-center relative z-10">
                      <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                        <TrendingUp className="w-12 h-12 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-4">Live Markets</h3>
                      <div className="space-y-3">
                        {[
                          { coin: "BTC", change: "+2.4%", positive: true },
                          { coin: "ETH", change: "-1.2%", positive: false },
                          { coin: "DOGE", change: "+15.7%", positive: true },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full overflow-hidden">
                                <Image src={cryptoCoins.find((c) => c.symbol === item.coin)?.image || "/images/bitcoin.png"} alt={item.coin} width={24} height={24} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-sm font-medium">{item.coin}</span>
                            </div>
                            <span className={`text-sm font-semibold ${item.positive ? "text-green-600" : "text-red-600"}`}>{item.change}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">Join the Memecoin Revolution</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Learn how to spot trends early and capitalize on the next big memecoin opportunity with our expert guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 bg-slate-900 scroll-mt-24 md:scroll-mt-20">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-green-500/10 border border-green-500/20 rounded-full px-6 py-2 mb-6">
              <span className="text-green-300 text-sm font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Why Choose <span className="text-green-400">Hommit</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We combine expert knowledge, community support, and proven strategies to help you navigate the volatile yet rewarding world of memecoins with confidence and success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              { icon: Users, title: "Made Especially for Nepalis", desc: "Content and strategies tailored specifically for the Nepali market, regulations, and investment preferences." },
              { icon: MessageCircle, title: "Supportive Community", desc: "Join a thriving community of like-minded traders who share insights, celebrate wins, and support each other." },
              { icon: Shield, title: "Risk Management", desc: "Learn proven strategies to minimize risks while maximizing potential returns through disciplined trading." },
              { icon: Zap, title: "VIP Expert Group", desc: "Get exclusive access to our VIP group with premium insights, early opportunities, and direct expert guidance." },
              { icon: TrendingUp, title: "Proven Track Record", desc: "Our strategies have helped thousands of Nepali traders achieve consistent profits in the memecoin market." },
              { icon: Award, title: "Expert Mentorship", desc: "Learn directly from experienced traders who have navigated multiple market cycles and achieved success." },
            ].map((feature, index) => (
              <Card key={index} className="card-glow overflow-hidden rounded-2xl transition-all duration-500 group cursor-pointer">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/30 transition-colors group-hover:scale-110 transform duration-300">
                    <feature.icon className="w-10 h-10 text-green-400" />
                  </div>
                  <CardTitle className="text-xl text-white mb-3 group-hover:text-green-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-center leading-relaxed group-hover:text-gray-300 transition-colors">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-gradient-to-br from-green-800 via-green-700 to-green-900 scroll-mt-24 md:scroll-mt-20">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center bg-green-400/10 border border-green-400/20 rounded-full px-6 py-2 mb-6">
            <span className="text-green-300 text-sm font-medium">Exclusive Membership</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Invest in Your <span className="text-green-300">Future</span>
          </h2>
          <p className="text-xl text-green-100 mb-16 sm:mb-20 max-w-4xl mx-auto leading-relaxed">
            Join our exclusive community and gain access to premium knowledge, insights, and support that can transform your financial future.
          </p>

          <div className="max-w-5xl mx-auto">
            <Card className="card-glow overflow-hidden rounded-3xl shadow-2xl transition-all duration-500">
              <CardContent className="p-6 sm:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <div className="text-left">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-pulse-glow">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white">Full Membership</h3>
                    </div>
                    <div className="space-y-6">
                      {[
                        { title: "Access to VIP Expert Group", desc: "Premium trading insights with 95% accuracy rate" },
                        { title: "Complete Educational Materials", desc: "Comprehensive courses from beginner to advanced" },
                        { title: "One-on-One Mentoring Sessions", desc: "Personal guidance from expert traders" },
                        { title: "Early Access to New Opportunities", desc: "Be first to know about emerging memecoins" },
                        { title: "Advanced Risk Management", desc: "Professional portfolio protection strategies" },
                        { title: "Lifetime Community Access", desc: "Permanent access to our trading community" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-4 group">
                          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                          <div>
                            <h4 className="text-white font-semibold mb-1 group-hover:text-green-300 transition-colors">{item.title}</h4>
                            <p className="text-gray-300 text-sm">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-700/50 bg-slate-900/40">
                      <div className="mb-6">
                        <div className="inline-flex items-center bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-4 animate-pulse-glow">
                          <span className="text-green-300 text-sm font-medium">Limited Time Offer</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">One-time payment</p>
                        <div className="text-6xl font-bold text-white mb-2">
                          50,000 <span className="text-3xl text-gray-300 ml-2">Nrs</span>
                        </div>
                      </div>
                      <a href="https://t.me/HOMMIT" target="_blank" rel="noopener noreferrer" className="block">
                        <Button size="lg" className="w-full button-glow text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all group">
                          Get Started Now
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <p className="text-green-200 text-lg mb-8">Not ready to commit? Text us to get a taste of what we offer.</p>
            <a href="https://wa.me/13678481023" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-2 border-slate-600 text-white hover:bg-slate-800 hover:border-green-500 px-8 py-3 rounded-full bg-transparent transition-all duration-300">
                Text Us First
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-slate-900">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">Ready to Start Your Memecoin Journey?</h2>

          <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-700 mb-12">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/Lb86g0DMrr8"
              title="How to make 1 Lakh a day in Nepal"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join the community of successful Nepali traders who are changing their financial future with memecoins. Your journey to financial freedom starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a href="https://t.me/HOMMIT" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto button-glow text-white px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all group">
                Join Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>

            <a href="https://wa.me/13678481023" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-slate-600 text-white hover:bg-slate-800 hover:border-green-500 px-10 py-4 text-lg rounded-full bg-transparent transition-all duration-300">
                Contact Us
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-pulse-glow">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <h3 className="text-2xl font-bold text-white">HOMMIT</h3>
            </div>

            <div className="flex items-center gap-6">
              <a href="https://wa.me/13678481023" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-slate-600 text-gray-300 hover:bg-slate-800 hover:border-green-500 bg-transparent transition-all duration-300">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Text Us
                </Button>
              </a>
              <span className="text-gray-500 text-sm">© 2025 HOMMIT. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global styles */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }

        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,.6); }
          50%     { box-shadow: 0 0 20px 8px rgba(34,197,94,.35); }
        }
        .animate-pulse-glow { animation: pulseGlow 2.2s ease-in-out infinite; }

        @keyframes floatKf { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-12px) } }
        @keyframes floatSlowKf { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-6px) } }
        @keyframes bounceSlowKf { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-16px) } }
        .animate-float { animation: floatKf 6s ease-in-out infinite; }
        .animate-float-delayed { animation: floatKf 7.5s ease-in-out infinite; }
        .animate-float-slow { animation: floatSlowKf 9s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounceSlowKf 5.5s ease-in-out infinite; }

        @keyframes scrollLeft { 0%{ transform: translateX(0) } 100%{ transform: translateX(-50%) } }
        .animate-scroll { animation: scrollLeft 25s linear infinite; }
        .animate-scroll-reverse { animation: scrollLeft 25s linear infinite reverse; }
      `}</style>
    </div>
  )
}
