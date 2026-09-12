import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Share2, Download, Check, Terminal } from 'lucide-react';
import type { AnalysisResult } from '../../types';

interface Props {
  result: AnalysisResult;
}

export default function ShareCard({ result }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleShare = async () => {
    const text = `OVERTHINKING CALCULATOR REPORT\nOverthinking Index: ${result.overthinkingIndex}%\nClassification: ${result.verdict.classificationLabel}\nPayload: "${result.summary}"\nPrimary Verdict: "${result.verdict.mainExplanation}"`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Overthinking Calculator Report',
          text: text,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback
      }
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0a0b0e',
        scale: 2,
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `overthinking-report-${result.id}.png`;
      link.click();
    } catch (e) {
      console.error('Failed to generate image', e);
    } finally {
      setDownloading(false);
    }
  };

  const timeWastedMinutes = Math.round(result.input.responseTime + 15);

  return (
    <div className="flex flex-col items-center gap-6 font-mono">
      {/* Report Box */}
      <div
        ref={cardRef}
        className="w-full max-w-md bg-[#0a0b0e] border-2 border-white p-8 space-y-6 text-white shadow-[8px_8px_0px_#00f0ff]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-white font-bold text-xs">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-accent-cyan" />
            <span>OVERTHINKING_CALCULATOR</span>
          </div>
          <span className="badge-brutal badge-cyan text-[10px]">REPORT</span>
        </div>

        {/* Payload */}
        <div className="space-y-1">
          <span className="text-[10px] text-text-muted uppercase tracking-widest block font-bold">TARGET PAYLOAD</span>
          <p className="text-base font-black text-accent-cyan font-mono">"{result.summary}"</p>
        </div>

        {/* Main Metric */}
        <div className="p-5 bg-black border-2 border-white text-center space-y-2">
          <span className="text-[10px] text-text-muted uppercase tracking-widest block font-bold">OVERTHINKING INDEX</span>
          <p className="text-4xl font-black text-white font-mono">{result.overthinkingIndex.toFixed(2)}%</p>
          <span className="badge-brutal badge-yellow text-xs inline-block">
            {result.verdict.classificationLabel}
          </span>
        </div>

        {/* Primary Verdict */}
        <div className="p-4 bg-black border-2 border-white text-xs space-y-1">
          <span className="text-[10px] text-text-muted uppercase tracking-widest block font-bold">PRIMARY VERDICT</span>
          <p className="text-white font-sans text-xs font-bold">"{result.verdict.mainExplanation}"</p>
        </div>

        {/* Telemetry Summary */}
        <div className="grid grid-cols-2 gap-3 text-xs pt-1 font-bold">
          <div className="p-3 bg-black border-2 border-white">
            <span className="text-text-muted block text-[10px] uppercase">Alternate Scenarios</span>
            <span className="text-accent-cyan text-sm">{result.interpretations.length}</span>
          </div>
          <div className="p-3 bg-black border-2 border-white">
            <span className="text-text-muted block text-[9px] uppercase">Est. Latency Wasted</span>
            <span className="text-accent-yellow text-sm">{timeWastedMinutes} min</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t-2 border-white flex items-center justify-between text-[10px] text-text-muted font-bold">
          <span>REPORT_ID // {result.id}</span>
          <span>science of okay</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
        <button
          onClick={handleShare}
          className="btn-primary w-full sm:flex-1 py-4 text-xs font-black"
        >
          {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'COPIED TO CLIPBOARD' : 'SHARE MY OVERTHINKING'}</span>
        </button>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="btn-secondary w-full sm:flex-1 py-4 text-xs font-black"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? 'GENERATING...' : 'DOWNLOAD RESULT'}</span>
        </button>
      </div>
    </div>
  );
}
