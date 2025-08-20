"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, ArrowLeft, Clock, Target, Shield, BarChart3, Coins } from "lucide-react"
import Link from "next/link"
import { getTradingSignals } from "../admin/actions"

interface TradingSignal {
  id: string
  coinName: string
  coinSymbol: string
  signalType: "BUY" | "SELL" | "HOLD"
  entryPrice: number
  targetPrice: number
  stopLoss: number
  confidence: number
  analysis: string
  status: "active" | "completed" | "cancelled"
  createdAt: string
  updatedAt: string
  result?: "profit" | "loss" | "pending"
  actualPrice?: number
}

export default function TradingSignalsPage() {
  const [signals, setSignals] = useState<TradingSignal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  useEffect(() => {
    loadSignals()
  }, [])

  const loadSignals = async () => {
    try {
      const signalsData = await getTradingSignals()
      setSignals(signalsData)
    } catch (error) {
      console.error("Failed to load signals:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredSignals = signals.filter((signal) => {
    if (filter === "all") return true
    return signal.status === filter
  })

  const stats = {
    totalSignals: signals.length,
    activeSignals: signals.filter((s) => s.status === "active").length,
    profitableSignals: signals.filter((s) => s.result === "profit").length,
    successRate:
      signals.filter((s) => s.status === "completed").length > 0
        ? Math.round(
            (signals.filter((s) => s.result === "profit").length /
              signals.filter((s) => s.status === "completed").length) *
              100,
          )
        : 0,
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <p className="text-green-700 font-medium">Loading trading signals...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-green-600 hover:text-green-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-green-800">HomiTTrading Signals</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Expert Trading Signals</h1>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            Get professional meme coin trading signals from our expert team. Make informed decisions with our detailed
            analysis and recommendations.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Signals</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stats.totalSignals}</div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Active Signals</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeSignals}</div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Profitable</CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.profitableSignals}</div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Success Rate</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.successRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={
              filter === "all"
                ? "bg-green-600 hover:bg-green-700"
                : "border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
            }
          >
            All Signals
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
            className={
              filter === "active"
                ? "bg-green-600 hover:bg-green-700"
                : "border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
            }
          >
            Active ({stats.activeSignals})
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
            className={
              filter === "completed"
                ? "bg-green-600 hover:bg-green-700"
                : "border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
            }
          >
            Completed
          </Button>
        </div>

        {/* Trading Signals */}
        <div className="space-y-6">
          {filteredSignals.map((signal) => (
            <Card key={signal.id} className="border-green-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{signal.coinSymbol}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800">
                        {signal.coinName} ({signal.coinSymbol})
                      </h3>
                      <div className="flex items-center space-x-3 mt-2">
                        <Badge
                          className={
                            signal.signalType === "BUY"
                              ? "bg-green-100 text-green-800"
                              : signal.signalType === "SELL"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {signal.signalType}{" "}
                          {signal.signalType === "BUY" ? "🚀" : signal.signalType === "SELL" ? "📉" : "💎"}
                        </Badge>
                        <Badge
                          className={
                            signal.status === "active"
                              ? "bg-blue-100 text-blue-800"
                              : signal.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {signal.status}
                        </Badge>
                        <Badge className="bg-yellow-100 text-yellow-800">{signal.confidence}% Confidence</Badge>
                        {signal.result && (
                          <Badge
                            className={
                              signal.result === "profit"
                                ? "bg-green-100 text-green-800"
                                : signal.result === "loss"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {signal.result === "profit"
                              ? "✅ Profitable"
                              : signal.result === "loss"
                                ? "❌ Loss"
                                : "⏳ Pending"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">Published</p>
                    <p className="font-medium text-green-800">{new Date(signal.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 mb-1">Entry Price</p>
                    <p className="text-lg font-bold text-green-800">${signal.entryPrice}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 mb-1">Target Price</p>
                    <p className="text-lg font-bold text-blue-800">${signal.targetPrice}</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600 mb-1">Stop Loss</p>
                    <p className="text-lg font-bold text-red-800">${signal.stopLoss}</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-600 mb-1">Potential</p>
                    <p className="text-lg font-bold text-yellow-800">
                      {signal.targetPrice > signal.entryPrice
                        ? `+${Math.round(((signal.targetPrice - signal.entryPrice) / signal.entryPrice) * 100)}%`
                        : `${Math.round(((signal.targetPrice - signal.entryPrice) / signal.entryPrice) * 100)}%`}
                    </p>
                  </div>
                </div>

                {signal.analysis && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">Expert Analysis</h4>
                    <p className="text-green-700 bg-green-50 p-4 rounded-lg leading-relaxed">{signal.analysis}</p>
                  </div>
                )}

                {signal.result === "profit" && signal.actualPrice && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-green-700 font-medium">✅ Target Reached!</span>
                      <span className="text-green-800 font-bold">
                        Actual Price: ${signal.actualPrice}
                        (+{Math.round(((signal.actualPrice - signal.entryPrice) / signal.entryPrice) * 100)}%)
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {filteredSignals.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">No Signals Found</h3>
              <p className="text-green-600">
                {filter === "all"
                  ? "No trading signals available yet. Check back soon for expert insights!"
                  : `No ${filter} signals found. Try changing the filter.`}
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Want Exclusive Access?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join HomiTTrading to get real-time notifications for new signals and access to our premium analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold">
                Join Now 🚀
              </Button>
            </Link>
            <a href="https://wa.me/9779800000000" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
              >
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
