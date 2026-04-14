import { useState } from "react";

function HexEncode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const encode = (s: string) => Array.from(new TextEncoder().encode(s)).map(b => b.toString(16).padStart(2, "0")).join(" ");
  const decode = (s: string) => {
    try {
      const bytes = s.trim().split(/\s+/).map(h => parseInt(h, 16));
      return new TextDecoder().decode(new Uint8Array(bytes));
    } catch { return "解碼錯誤"; }
  };
  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} placeholder="輸入文字..." />
      <div className="flex gap-2">
        <button className="tool-btn" onClick={() => setOutput(encode(input))}>編碼</button>
        <button className="tool-btn-secondary" onClick={() => setOutput(decode(input))}>解碼</button>
      </div>
      <div className="tool-result whitespace-pre-wrap font-mono">{output || "—"}</div>
    </div>
  );
}

function Rot13() {
  const [input, setInput] = useState("");
  const rot13 = (s: string) => s.replace(/[a-zA-Z]/g, c => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
  const output = rot13(input);
  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} placeholder="輸入文字（ROT13 加密/解密相同）..." />
      <div className="tool-result whitespace-pre-wrap">{output || "—"}</div>
      <button className="tool-btn-secondary" onClick={() => navigator.clipboard.writeText(output)}>複製</button>
    </div>
  );
}

function Base32Encode() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const encode = (s: string) => {
    const bytes = new TextEncoder().encode(s);
    let bits = "", result = "";
    bytes.forEach(b => bits += b.toString(2).padStart(8, "0"));
    while (bits.length % 5) bits += "0";
    for (let i = 0; i < bits.length; i += 5) result += alphabet[parseInt(bits.slice(i, i + 5), 2)];
    while (result.length % 8) result += "=";
    return result;
  };
  const decode = (s: string) => {
    try {
      let bits = "";
      s.replace(/=+$/, "").split("").forEach(c => {
        const i = alphabet.indexOf(c.toUpperCase());
        if (i >= 0) bits += i.toString(2).padStart(5, "0");
      });
      const bytes = [];
      for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
      return new TextDecoder().decode(new Uint8Array(bytes));
    } catch { return "解碼錯誤"; }
  };

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} placeholder="輸入文字..." />
      <div className="flex gap-2">
        <button className="tool-btn" onClick={() => setOutput(encode(input))}>編碼</button>
        <button className="tool-btn-secondary" onClick={() => setOutput(decode(input))}>解碼</button>
      </div>
      <div className="tool-result whitespace-pre-wrap font-mono">{output || "—"}</div>
    </div>
  );
}

function AsciiArt() {
  const [text, setText] = useState("Hello");
  const fonts: Record<string, Record<string, string[]>> = {
    block: Object.fromEntries("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ".split("").map(c => {
      const map: Record<string, string[]> = {
        A: ["█▀█","█▀█","▀ ▀"], B: ["█▀▄","█▀▄","▀▀ "], C: ["█▀▀","█  ","▀▀▀"], D: ["█▀▄","█ █","▀▀ "],
        E: ["█▀▀","█▀▀","▀▀▀"], F: ["█▀▀","█▀▀","▀  "], G: ["█▀▀","█ █","▀▀▀"], H: ["█ █","█▀█","▀ ▀"],
        I: ["▀█▀"," █ "," ▀ "], J: ["  █","  █","▀▀ "], K: ["█ █","█▀▄","▀ ▀"], L: ["█  ","█  ","▀▀▀"],
        M: ["█▄█","█ █","▀ ▀"], N: ["█▀█","█ █","▀ ▀"], O: ["█▀█","█ █","▀▀▀"], P: ["█▀█","█▀▀","▀  "],
        Q: ["█▀█","█ █","▀▀▄"], R: ["█▀▄","█▀▄","▀ ▀"], S: ["█▀▀","▀▀█","▀▀▀"], T: ["▀█▀"," █ "," ▀ "],
        U: ["█ █","█ █","▀▀▀"], V: ["█ █","█ █"," ▀ "], W: ["█ █","█ █","▀█▀"], X: ["█ █"," ▀ ","█ █"],
        Y: ["█ █"," █ "," ▀ "], Z: ["▀▀█"," █ ","█▀▀"],
        "0": ["█▀█","█ █","▀▀▀"], "1": [" █ "," █ "," ▀ "], "2": ["▀▀█"," █▀","▀▀▀"], "3": ["▀▀█"," ▀█","▀▀▀"],
        "4": ["█ █","▀▀█","  ▀"], "5": ["█▀▀","▀▀█","▀▀▀"], "6": ["█▀▀","█▀█","▀▀▀"], "7": ["▀▀█","  █","  ▀"],
        "8": ["█▀█","█▀█","▀▀▀"], "9": ["█▀█","▀▀█","▀▀▀"], " ": ["   ","   ","   "],
      };
      return [c, map[c] || ["   ","   ","   "]];
    })),
  };

  const render = () => {
    const chars = text.toUpperCase().split("");
    const lines = [0, 1, 2].map(row => chars.map(c => (fonts.block[c] || fonts.block[" "])[row]).join(" "));
    return lines.join("\n");
  };

  return (
    <div className="space-y-4">
      <input className="w-full rounded border bg-card p-2 text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="輸入英文文字..." />
      <pre className="tool-result whitespace-pre font-mono text-xs overflow-x-auto">{render()}</pre>
      <button className="tool-btn-secondary" onClick={() => navigator.clipboard.writeText(render())}>複製</button>
    </div>
  );
}

export const EncodeToolsExtra = { HexEncode, Rot13, Base32Encode, AsciiArt };
