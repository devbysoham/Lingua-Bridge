import { useState, useEffect } from 'react';
import { ArrowRightLeft, Globe, Sparkles, Zap, CheckCircle2, Copy } from 'lucide-react';
import { Button } from '@/react-app/components/ui/button';
import { Textarea } from '@/react-app/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/react-app/components/ui/select';
import { Card } from '@/react-app/components/ui/card';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
];

export default function Home() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load custom fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Lexend:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
    setTranslatedText('');
    
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLang,
          targetLang,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Translation failed');
      }

      const data = await response.json();
      setTranslatedText(data.translation);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText(error instanceof Error ? `Error: ${error.message}` : 'Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const swapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const copyToClipboard = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 bg-black/80 backdrop-blur-2xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/50 group hover:shadow-violet-500/80 transition-all duration-300 hover:scale-105">
                <Globe className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  Lingua Bridge
                </h1>
                <p className="text-xs text-gray-400 font-medium" style={{ fontFamily: '"Lexend", sans-serif' }}>AI-Powered Translation</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-900/50 backdrop-blur-sm border border-violet-500/30">
              <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
              <span className="hidden sm:inline text-sm font-medium text-violet-300" style={{ fontFamily: '"Lexend", sans-serif' }}>Breaking Barriers</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 pt-16 pb-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-900/40 border border-violet-500/30 text-violet-300 text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm" style={{ fontFamily: '"Lexend", sans-serif' }}>
            <Zap className="w-4 h-4" />
            Real-Time AI Translation
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 bg-clip-text text-transparent leading-tight tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Communicate<br />Without Boundaries
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: '"Lexend", sans-serif', fontWeight: 300 }}>
            Experience seamless translation powered by advanced AI.<br className="hidden sm:block" />
            Connect with anyone, anywhere, in any language.
          </p>
        </div>

        {/* Main Translation Card */}
        <Card className="relative max-w-6xl mx-auto shadow-2xl shadow-violet-500/30 border border-white/10 bg-gray-900/60 backdrop-blur-2xl overflow-hidden group">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="relative p-8 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Source Language */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-100 flex items-center gap-2.5" style={{ fontFamily: '"Lexend", sans-serif' }}>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
                    </span>
                    Source Language
                  </label>
                  <Select value={sourceLang} onValueChange={setSourceLang}>
                    <SelectTrigger className="w-[200px] border-violet-500/30 focus:ring-violet-500 bg-gray-800/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="backdrop-blur-xl bg-gray-900/95 border-gray-700">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <span className="flex items-center gap-2.5 text-gray-100">
                            <span className="text-lg">{lang.flag}</span>
                            <span style={{ fontFamily: '"Lexend", sans-serif' }}>{lang.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder="Enter text to translate..."
                    className="min-h-[320px] text-base border-violet-500/30 focus:ring-2 focus:ring-violet-500 resize-none rounded-2xl bg-gray-800/50 text-gray-100 placeholder:text-gray-500 shadow-inner transition-all"
                    style={{ fontFamily: '"Lexend", sans-serif' }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium">{sourceText.length} characters</span>
                  {sourceText && (
                    <span className="text-violet-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Ready to translate
                    </span>
                  )}
                </div>
              </div>

              {/* Target Language */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-100 flex items-center gap-2.5" style={{ fontFamily: '"Lexend", sans-serif' }}>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                    </span>
                    Target Language
                  </label>
                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger className="w-[200px] border-purple-500/30 focus:ring-purple-500 bg-gray-800/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="backdrop-blur-xl bg-gray-900/95 border-gray-700">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <span className="flex items-center gap-2.5 text-gray-100">
                            <span className="text-lg">{lang.flag}</span>
                            <span style={{ fontFamily: '"Lexend", sans-serif' }}>{lang.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Textarea
                    value={translatedText}
                    readOnly
                    placeholder="Translation will appear here..."
                    className="min-h-[320px] text-base bg-gray-800/50 border-purple-500/30 resize-none rounded-2xl shadow-inner text-gray-100 placeholder:text-gray-500"
                    style={{ fontFamily: '"Lexend", sans-serif' }}
                  />
                  {translatedText && (
                    <Button
                      onClick={copyToClipboard}
                      size="sm"
                      variant="outline"
                      className="absolute top-3 right-3 bg-gray-800/90 backdrop-blur-sm border-purple-500/30 hover:bg-purple-900/50 transition-all text-gray-100"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-green-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1.5" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium">{translatedText.length} characters</span>
                  {translatedText && (
                    <span className="text-purple-400 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI translated
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={handleTranslate}
                disabled={!sourceText.trim() || isTranslating}
                className="w-full sm:w-auto px-8 py-6 text-base font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-xl shadow-violet-500/50 hover:shadow-violet-500/70 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 rounded-xl"
                size="lg"
                style={{ fontFamily: '"Lexend", sans-serif' }}
              >
                {isTranslating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2.5" />
                    Translating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2.5" />
                    Translate Now
                  </>
                )}
              </Button>
              <Button
                onClick={swapLanguages}
                variant="outline"
                className="w-full sm:w-auto px-8 py-6 text-base font-semibold border-2 border-violet-500/30 hover:bg-violet-900/30 text-gray-100 transition-all duration-300 hover:scale-105 rounded-xl"
                size="lg"
                style={{ fontFamily: '"Lexend", sans-serif' }}
              >
                <ArrowRightLeft className="w-5 h-5 mr-2.5" />
                Swap Languages
              </Button>
            </div>
          </div>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16 mb-12">
          <div className="group text-center p-8 rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-white/10 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105">
            <div className="relative w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-violet-600 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg shadow-violet-500/40 group-hover:shadow-violet-500/60 transition-all duration-300 group-hover:rotate-6">
              <Globe className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>12+ Languages</h3>
            <p className="text-sm text-gray-400 leading-relaxed" style={{ fontFamily: '"Lexend", sans-serif', fontWeight: 300 }}>Support for major world languages with accurate translations</p>
          </div>
          <div className="group text-center p-8 rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-white/10 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">
            <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg shadow-purple-500/40 group-hover:shadow-purple-500/60 transition-all duration-300 group-hover:rotate-6">
              <Sparkles className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>AI-Powered</h3>
            <p className="text-sm text-gray-400 leading-relaxed" style={{ fontFamily: '"Lexend", sans-serif', fontWeight: 300 }}>Advanced AI technology for context-aware translations</p>
          </div>
          <div className="group text-center p-8 rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-white/10 hover:shadow-xl hover:shadow-pink-500/30 transition-all duration-300 hover:scale-105">
            <div className="relative w-16 h-16 bg-gradient-to-br from-pink-500 via-red-500 to-pink-600 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg shadow-pink-500/40 group-hover:shadow-pink-500/60 transition-all duration-300 group-hover:rotate-6">
              <Zap className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Lightning Fast</h3>
            <p className="text-sm text-gray-400 leading-relaxed" style={{ fontFamily: '"Lexend", sans-serif', fontWeight: 300 }}>Instant translation results in real-time processing</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black/80 backdrop-blur-2xl mt-auto">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-gray-400 font-medium" style={{ fontFamily: '"Lexend", sans-serif' }}>
            Breaking language barriers with AI • Promoting global communication and understanding
          </p>
        </div>
      </footer>
    </div>
  );
}
