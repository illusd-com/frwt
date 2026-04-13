import { useState, useRef } from "react";

function SubtitleGen() {
  const [lines, setLines] = useState([{ start: "00:00:00,000", end: "00:00:03,000", text: "字幕文字" }]);
  const addLine = () => setLines(l => [...l, { start: "00:00:00,000", end: "00:00:03,000", text: "" }]);
  const update = (i: number, field: string, val: string) => setLines(l => l.map((item, idx) => idx === i ? { ...item, [field]: val } : item));

  const srt = lines.map((l, i) => `${i + 1}\n${l.start} --> ${l.end}\n${l.text}\n`).join("\n");

  return (
    <div className="space-y-4">
      {lines.map((l, i) => (
        <div key={i} className="flex gap-2 items-center flex-wrap">
          <span className="text-xs text-muted-foreground w-6">{i + 1}</span>
          <input type="text" value={l.start} onChange={e => update(i, "start", e.target.value)} className="w-36 rounded-lg border bg-card p-2 text-xs font-mono" />
          <span className="text-xs">→</span>
          <input type="text" value={l.end} onChange={e => update(i, "end", e.target.value)} className="w-36 rounded-lg border bg-card p-2 text-xs font-mono" />
          <input type="text" value={l.text} onChange={e => update(i, "text", e.target.value)} placeholder="字幕文字" className="flex-1 rounded-lg border bg-card p-2 text-sm min-w-[150px]" />
        </div>
      ))}
      <button onClick={addLine} className="tool-btn-secondary">+ 新增字幕行</button>
      <textarea readOnly value={srt} className="tool-textarea min-h-[200px]" />
      <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(srt)}`} download="subtitles.srt" className="tool-btn inline-block">下載 SRT</a>
    </div>
  );
}

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    chunksRef.current = [];
    mr.ondataavailable = e => chunksRef.current.push(e.data);
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioUrl(URL.createObjectURL(blob));
      stream.getTracks().forEach(t => t.stop());
    };
    mr.start();
    mediaRef.current = mr;
    setRecording(true);
  };

  const stop = () => {
    mediaRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="space-y-4 text-center">
      <button onClick={recording ? stop : start} className={recording ? "tool-btn bg-destructive hover:bg-destructive/90" : "tool-btn"}>
        {recording ? "⏹ 停止錄音" : "🎙 開始錄音"}
      </button>
      {recording && <p className="text-sm text-destructive animate-pulse">錄音中...</p>}
      {audioUrl && (
        <div className="space-y-2">
          <audio controls src={audioUrl} className="mx-auto" />
          <a href={audioUrl} download="recording.webm" className="tool-btn-secondary inline-block">下載錄音</a>
        </div>
      )}
    </div>
  );
}

function MediaInfo() {
  const [info, setInfo] = useState<Record<string, string>>({});
  const handleFile = (file: File) => {
    setInfo({
      "檔案名稱": file.name,
      "檔案大小": `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      "檔案類型": file.type,
      "最後修改": new Date(file.lastModified).toLocaleString(),
    });

    if (file.type.startsWith("video/") || file.type.startsWith("audio/")) {
      const url = URL.createObjectURL(file);
      const el = document.createElement(file.type.startsWith("video/") ? "video" : "audio");
      el.src = url;
      el.onloadedmetadata = () => {
        setInfo(prev => ({
          ...prev,
          "時長": `${Math.floor(el.duration / 60)}:${Math.floor(el.duration % 60).toString().padStart(2, "0")}`,
          ...("videoWidth" in el ? { "解析度": `${(el as HTMLVideoElement).videoWidth}x${(el as HTMLVideoElement).videoHeight}` } : {}),
        }));
        URL.revokeObjectURL(url);
      };
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors" onClick={() => document.getElementById("media-input")?.click()}>
        <input id="media-input" type="file" accept="video/*,audio/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        <p className="text-muted-foreground text-sm">拖放或點擊上傳影片/音訊檔案</p>
      </div>
      {Object.keys(info).length > 0 && (
        <div className="space-y-2">
          {Object.entries(info).map(([k, v]) => (
            <div key={k} className="flex gap-2 text-sm"><span className="font-medium min-w-[80px]">{k}:</span><span className="tool-result flex-1">{v}</span></div>
          ))}
        </div>
      )}
    </div>
  );
}

export const VideoTools = {
  SubtitleGen,
  AudioRecorder,
  MediaInfo,
};
