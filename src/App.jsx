import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Slider } from './components/ui/slider'
import { Input } from './components/ui/input'
import { edoPeriodData, modernPeriodData, getHistoryDataByYear, getYearRange } from './data/historyData'
import './App.css'

function App() {
  const maxYear = getYearRange()
  const [currentYear, setCurrentYear] = useState([157]) // 2025年に対応
  const [showGenerator, setShowGenerator] = useState(false)
  const [birthYear, setBirthYear] = useState('')
  const [generatorResult, setGeneratorResult] = useState(null)

  const handleSliderChange = (value) => {
    setCurrentYear(value)
  }

  const handleGeneratorSubmit = () => {
    const year = parseInt(birthYear)
    if (year < 1868 || year > 2132) {
      alert('1868年から2132年の間で入力してください')
      return
    }
    
    const yearsFromMeiji = year - 1868
    const edoEquivalent = getHistoryDataByYear(yearsFromMeiji, edoPeriodData)
    const modernData = getHistoryDataByYear(yearsFromMeiji, modernPeriodData)
    
    setGeneratorResult({
      inputYear: year,
      yearsFromMeiji,
      edoData: edoEquivalent,
      modernData
    })
  }

  const resetGenerator = () => {
    setBirthYear('')
    setGeneratorResult(null)
    setShowGenerator(false)
  }

  const modernData = getHistoryDataByYear(currentYear[0], modernPeriodData)
  const edoData = getHistoryDataByYear(currentYear[0], edoPeriodData)

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
              {modernData.year > 2025 ? (
                <>
                  未来: <span className="font-bold text-amber-200">{modernData.year}年</span>
                  （明治から<span className="font-bold text-amber-200">{currentYear[0]}年後</span>）
                </>
              ) : (
                <>
                  現代: <span className="font-bold text-blue-200">{modernData.year}年</span>
                  （明治から<span className="font-bold text-blue-200">{currentYear[0]}年後</span>）
                </>
              )}
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
              <span>{modernData.year > 2025 ? '未来' : '現在'}</span>
            </div>
          </div>
        </div>

        {/* 比較カード */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* 近現代カード */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="border-b border-white/20">
              <CardTitle className="text-2xl text-center text-blue-200">
                {modernData.year > 2025 ? '未来' : '近現代'}
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

        {/* もしもジェネレーター */}
        {showGenerator && (
          <div className="mt-12 max-w-2xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader className="border-b border-white/20">
                <CardTitle className="text-2xl text-center text-green-200">
                  🔮 もしもジェネレーター
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {!generatorResult ? (
                  <div className="space-y-4">
                    <p className="text-center text-lg mb-4">
                      あなたの生まれ年を入力してください
                    </p>
                    <div className="flex gap-4 items-center justify-center">
                      <Input
                        type="number"
                        placeholder="例: 1990"
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                        className="w-32 bg-white/10 border-white/30 text-white placeholder-white/50"
                        min="1868"
                        max="2132"
                      />
                      <span className="text-white">年</span>
                      <Button 
                        onClick={handleGeneratorSubmit}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={!birthYear}
                      >
                        生成
                      </Button>
                    </div>
                    <p className="text-center text-sm text-blue-200">
                      1868年〜2132年の間で入力してください
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-green-200 mb-2">
                        もしもあなたが江戸時代に生まれていたら...
                      </h3>
                      <p className="text-lg">
                        <span className="font-bold text-blue-200">{generatorResult.inputYear}年</span>生まれのあなたは、
                        江戸時代の<span className="font-bold text-yellow-200">{generatorResult.edoData.year}年（{generatorResult.edoData.era}）</span>に生まれていました
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* 実際の時代 */}
                      <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                          <CardTitle className="text-lg text-blue-200">
                            実際の{generatorResult.inputYear}年
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p><span className="font-semibold">時代:</span> {generatorResult.modernData.era}</p>
                          <p><span className="font-semibold">指導者:</span> {generatorResult.modernData.leader}</p>
                          <div>
                            <p className="font-semibold mb-1">主な出来事:</p>
                            <ul className="space-y-1">
                              {generatorResult.modernData.events.map((event, index) => (
                                <li key={index} className="text-sm">・{event}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* 江戸時代 */}
                      <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                          <CardTitle className="text-lg text-yellow-200">
                            江戸時代の{generatorResult.edoData.year}年
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p><span className="font-semibold">時代:</span> {generatorResult.edoData.era}</p>
                          <p><span className="font-semibold">将軍:</span> {generatorResult.edoData.shogun}</p>
                          <div>
                            <p className="font-semibold mb-1">主な出来事:</p>
                            <ul className="space-y-1">
                              {generatorResult.edoData.events.map((event, index) => (
                                <li key={index} className="text-sm">・{event}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="text-center">
                      <Button 
                        onClick={resetGenerator}
                        variant="outline"
                        className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                      >
                        もう一度試す
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* フッター */}
        <footer className="text-center mt-12">
          <Button 
            variant="outline" 
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={() => setShowGenerator(!showGenerator)}
          >
            {showGenerator ? '← タイムスライダーに戻る' : '自分の生年で見てみる →'}
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
