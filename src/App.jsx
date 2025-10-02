import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { edoPeriodData, modernPeriodData, getDataByYear, getYearRange } from './data/historyData'
import './App.css'

function App() {
  const maxYear = getYearRange()
  const [currentYear, setCurrentYear] = useState([157]) // 2025年に対応する157年を初期値に

  const handleSliderChange = (value) => {
    setCurrentYear(value)
  }

  const modernData = getDataByYear(currentYear[0], modernPeriodData)
  const edoData = getDataByYear(currentYear[0], edoPeriodData)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* 背景の波模様 */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <path
            d="M0,400 C300,300 600,500 900,400 C1050,350 1150,450 1200,400 L1200,800 L0,800 Z"
            fill="currentColor"
            className="text-blue-300"
          />
          <path
            d="M0,500 C300,400 600,600 900,500 C1050,450 1150,550 1200,500 L1200,800 L0,800 Z"
            fill="currentColor"
            className="text-blue-400"
          />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-wider">
            Edo-Shift
          </h1>
          <p className="text-xl text-blue-100 font-light">
            あなたの"今"は、江戸時代の"いつ"？
          </p>
        </header>

        {/* 年数選択セクション */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <p className="text-white mb-4 text-lg">
              現代: <span className="font-bold text-blue-200">{modernData.year}年</span>
              （明治から<span className="font-bold text-blue-200">{currentYear[0]}年後</span>）
            </p>
            
            {/* スライダー */}
            <div className="w-80 mx-auto mb-4">
              <Slider
                value={currentYear}
                onValueChange={handleSliderChange}
                max={maxYear}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-between text-sm text-blue-200 w-80 mx-auto">
              <span>明治元年</span>
              <span>現在</span>
            </div>
          </div>
        </div>

        {/* 比較カード */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* 近現代カード */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="border-b border-white/20">
              <CardTitle className="text-2xl text-center text-blue-200">
                近現代
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold">西暦:</span> {modernData.year}年 ({modernData.era})
                </p>
                <p className="text-lg">
                  <span className="font-semibold">明治から:</span> {modernData.yearsFromStart}年後
                </p>
                <p className="text-lg">
                  <span className="font-semibold">指導者:</span> {modernData.leader}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-200 mb-2">▼ 主な出来事</h4>
                <ul className="space-y-1">
                  {modernData.events.map((event, index) => (
                    <li key={index} className="text-sm leading-relaxed">
                      ・{event}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 江戸時代カード */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="border-b border-white/20">
              <CardTitle className="text-2xl text-center text-amber-200">
                江戸時代
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold">西暦:</span> {edoData.year}年 ({edoData.era})
                </p>
                <p className="text-lg">
                  <span className="font-semibold">江戸幕府成立から:</span> {edoData.yearsFromStart}年後
                </p>
                <p className="text-lg">
                  <span className="font-semibold">将軍:</span> {edoData.shogun}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-amber-200 mb-2">▼ 主な出来事</h4>
                <ul className="space-y-1">
                  {edoData.events.map((event, index) => (
                    <li key={index} className="text-sm leading-relaxed">
                      ・{event}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* フッター */}
        <footer className="text-center mt-12">
          <Button 
            variant="outline" 
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            自分の生年で見てみる →
          </Button>
          <p className="text-blue-200 text-sm mt-4">
            江戸時代（1603-1868年）と近現代（1868年-現在）の時間軸を比較
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
