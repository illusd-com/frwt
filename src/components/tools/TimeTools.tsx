import { useState, useEffect, useRef } from "react";

function CountdownTimer() {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setTimeLeft(minutes * 60 + seconds);
    setRunning(true);
  };

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(intervalRef.current!);
    }
    if (timeLeft === 0 && running) setRunning(false);
  }, [running, timeLeft]);

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;

  return (
    <div className="space-y-4 text-center">
      {!running ? (
        <div className="flex gap-4 justify-center">
          <div><label className="tool-label">分鐘</label><input type="number" min="0" value={minutes} onChange={e => setMinutes(+e.target.value)} className="w-20 rounded-lg border bg-card p-2 text-sm text-center" /></div>
          <div><label className="tool-label">秒</label><input type="number" min="0" max="59" value={seconds} onChange={e => setSeconds(+e.target.value)} className="w-20 rounded-lg border bg-card p-2 text-sm text-center" /></div>
        </div>
      ) : null}
      <div className="text-6xl font-mono font-bold">{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}</div>
      <div className="flex gap-2 justify-center">
        {!running ? (
          <button onClick={start} className="tool-btn px-8">▶ 開始</button>
        ) : (
          <>
            <button onClick={() => { setRunning(false); clearInterval(intervalRef.current!); }} className="tool-btn-secondary">⏸ 暫停</button>
            <button onClick={() => { setRunning(false); setTimeLeft(0); clearInterval(intervalRef.current!); }} className="tool-btn bg-destructive hover:bg-destructive/90 text-destructive-foreground">⏹ 停止</button>
          </>
        )}
      </div>
    </div>
  );
}

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setTime(t => t + 10), 10);
      return () => clearInterval(intervalRef.current!);
    }
  }, [running]);

  const fmt = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4 text-center">
      <div className="text-6xl font-mono font-bold">{fmt(time)}</div>
      <div className="flex gap-2 justify-center">
        <button onClick={() => setRunning(!running)} className="tool-btn px-8">{running ? "⏸ 暫停" : "▶ 開始"}</button>
        <button onClick={() => setLaps(l => [time, ...l])} disabled={!running} className="tool-btn-secondary">📌 分段</button>
        <button onClick={() => { setRunning(false); setTime(0); setLaps([]); }} className="tool-btn-secondary">🔄 重置</button>
      </div>
      {laps.length > 0 && (
        <div className="text-sm space-y-1 max-h-[200px] overflow-auto">
          {laps.map((l, i) => <div key={i} className="tool-result">#{laps.length - i} — {fmt(l)}</div>)}
        </div>
      )}
    </div>
  );
}

function WorldClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const zones = [
    { name: "台北", tz: "Asia/Taipei" },
    { name: "東京", tz: "Asia/Tokyo" },
    { name: "紐約", tz: "America/New_York" },
    { name: "倫敦", tz: "Europe/London" },
    { name: "巴黎", tz: "Europe/Paris" },
    { name: "洛杉磯", tz: "America/Los_Angeles" },
    { name: "雪梨", tz: "Australia/Sydney" },
    { name: "杜拜", tz: "Asia/Dubai" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {zones.map(z => (
        <div key={z.tz} className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">{z.name}</p>
          <p className="text-2xl font-mono font-bold">{time.toLocaleTimeString("zh-TW", { timeZone: z.tz })}</p>
          <p className="text-xs text-muted-foreground">{time.toLocaleDateString("zh-TW", { timeZone: z.tz, weekday: "short", month: "short", day: "numeric" })}</p>
        </div>
      ))}
    </div>
  );
}

function DateDiff() {
  const [date1, setDate1] = useState(new Date().toISOString().split("T")[0]);
  const [date2, setDate2] = useState("");

  const diff = date1 && date2 ? Math.abs(new Date(date2).getTime() - new Date(date1).getTime()) : 0;
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.44);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">起始日期</label><input type="date" value={date1} onChange={e => setDate1(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
        <div><label className="tool-label">結束日期</label><input type="date" value={date2} onChange={e => setDate2(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      </div>
      {date2 && (
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg border bg-card p-4"><div className="text-2xl font-bold">{days}</div><div className="text-xs text-muted-foreground">天</div></div>
          <div className="rounded-lg border bg-card p-4"><div className="text-2xl font-bold">{weeks}</div><div className="text-xs text-muted-foreground">週</div></div>
          <div className="rounded-lg border bg-card p-4"><div className="text-2xl font-bold">{months}</div><div className="text-xs text-muted-foreground">月</div></div>
        </div>
      )}
    </div>
  );
}

function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(intervalRef.current!);
    }
    if (timeLeft === 0 && running) {
      setRunning(false);
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(5 * 60);
      } else {
        setIsBreak(false);
        setTimeLeft(25 * 60);
      }
    }
  }, [running, timeLeft, isBreak]);

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;

  return (
    <div className="space-y-4 text-center">
      <p className="text-sm font-medium">{isBreak ? "☕ 休息時間" : "🍅 專注時間"}</p>
      <div className="text-7xl font-mono font-bold">{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}</div>
      <div className="flex gap-2 justify-center">
        <button onClick={() => setRunning(!running)} className="tool-btn px-8">{running ? "⏸ 暫停" : "▶ 開始"}</button>
        <button onClick={() => { setRunning(false); setTimeLeft(25 * 60); setIsBreak(false); }} className="tool-btn-secondary">🔄 重置</button>
      </div>
    </div>
  );
}

function WorkingDays() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const calcWorkingDays = () => {
    if (!date1 || !date2) return 0;
    let count = 0;
    const d1 = new Date(date1), d2 = new Date(date2);
    const current = new Date(d1);
    while (current <= d2) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="tool-label">起始日期</label><input type="date" value={date1} onChange={e => setDate1(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
        <div><label className="tool-label">結束日期</label><input type="date" value={date2} onChange={e => setDate2(e.target.value)} className="w-full rounded-lg border bg-card p-2 text-sm" /></div>
      </div>
      {date1 && date2 && (
        <div className="tool-result text-center text-lg">工作日數: <span className="font-bold">{calcWorkingDays()}</span> 天</div>
      )}
    </div>
  );
}

export const TimeTools = {
  CountdownTimer,
  Stopwatch,
  WorldClock,
  DateDiff,
  Pomodoro,
  WorkingDays,
};
