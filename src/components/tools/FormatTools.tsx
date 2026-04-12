import { useState } from "react";

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = (indent: number | null) => {
    try {
      const parsed = JSON.parse(input);
      setOutput(indent === null ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[200px]" value={input} onChange={e => setInput(e.target.value)} placeholder='{"key": "value"}' />
      <div className="flex gap-2">
        <button className="tool-btn" onClick={() => format(2)}>格式化 (2 空格)</button>
        <button className="tool-btn" onClick={() => format(4)}>格式化 (4 空格)</button>
        <button className="tool-btn-secondary" onClick={() => format(null)}>壓縮</button>
      </div>
      {error && <p className="text-sm text-destructive">❌ {error}</p>}
      {output && <pre className="tool-result whitespace-pre-wrap max-h-[400px] overflow-auto">{output}</pre>}
    </div>
  );
}

function SqlFormatter() {
  const [input, setInput] = useState("");
  const keywords = ["SELECT","FROM","WHERE","AND","OR","INSERT","INTO","VALUES","UPDATE","SET","DELETE","JOIN","LEFT","RIGHT","INNER","OUTER","ON","GROUP","BY","ORDER","HAVING","LIMIT","OFFSET","CREATE","TABLE","ALTER","DROP","INDEX","UNION","ALL","AS","IN","NOT","NULL","IS","BETWEEN","LIKE","EXISTS","CASE","WHEN","THEN","ELSE","END","DISTINCT","COUNT","SUM","AVG","MAX","MIN"];

  const format = () => {
    let sql = input.trim();
    keywords.forEach(kw => {
      sql = sql.replace(new RegExp(`\\b${kw}\\b`, "gi"), `\n${kw}`);
    });
    return sql.replace(/^\n/, "").replace(/\n{2,}/g, "\n");
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[200px]" value={input} onChange={e => setInput(e.target.value)} placeholder="SELECT * FROM users WHERE id = 1" />
      <button className="tool-btn" onClick={() => setInput(format())}>格式化</button>
    </div>
  );
}

function CssFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const format = () => {
    let css = input.replace(/\s*{\s*/g, " {\n  ").replace(/\s*}\s*/g, "\n}\n\n").replace(/;\s*/g, ";\n  ").replace(/\n\s*\n/g, "\n");
    setOutput(css.trim());
  };
  const minify = () => {
    setOutput(input.replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").replace(/;}/g, "}").trim());
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[200px]" value={input} onChange={e => setInput(e.target.value)} placeholder=".class { color: red; }" />
      <div className="flex gap-2">
        <button className="tool-btn" onClick={format}>格式化</button>
        <button className="tool-btn-secondary" onClick={minify}>壓縮</button>
      </div>
      {output && <pre className="tool-result whitespace-pre-wrap max-h-[400px] overflow-auto">{output}</pre>}
    </div>
  );
}

function XmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const format = () => {
    let xml = input.replace(/>\s*</g, ">\n<");
    let indent = 0;
    const lines = xml.split("\n");
    const formatted = lines.map(line => {
      line = line.trim();
      if (line.match(/^<\//) ) indent = Math.max(0, indent - 1);
      const result = "  ".repeat(indent) + line;
      if (line.match(/^<[^/!?]/) && !line.match(/\/>$/) && !line.match(/<\/.*>$/)) indent++;
      return result;
    });
    setOutput(formatted.join("\n"));
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[200px]" value={input} onChange={e => setInput(e.target.value)} placeholder="<root><child>text</child></root>" />
      <button className="tool-btn" onClick={format}>格式化</button>
      {output && <pre className="tool-result whitespace-pre-wrap max-h-[400px] overflow-auto">{output}</pre>}
    </div>
  );
}

function HtmlFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const format = () => {
    let html = input.replace(/>\s*</g, ">\n<");
    let indent = 0;
    const voidElements = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);
    const lines = html.split("\n");
    const formatted = lines.map(line => {
      line = line.trim();
      if (line.match(/^<\//)) indent = Math.max(0, indent - 1);
      const result = "  ".repeat(indent) + line;
      const tagMatch = line.match(/^<(\w+)/);
      if (tagMatch && !line.match(/\/>$/) && !line.match(/<\//) && !voidElements.has(tagMatch[1].toLowerCase())) indent++;
      return result;
    });
    setOutput(formatted.join("\n"));
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[200px]" value={input} onChange={e => setInput(e.target.value)} placeholder="<div><p>Hello</p></div>" />
      <button className="tool-btn" onClick={format}>格式化</button>
      {output && <pre className="tool-result whitespace-pre-wrap max-h-[400px] overflow-auto">{output}</pre>}
    </div>
  );
}

function JsMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const minify = () => {
    let js = input
      .replace(/\/\/.*$/gm, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{}();,=<>!+\-*/%&|^~?:])\s*/g, "$1")
      .trim();
    setOutput(js);
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[200px]" value={input} onChange={e => setInput(e.target.value)} placeholder="function hello() { console.log('hi'); }" />
      <button className="tool-btn" onClick={minify}>壓縮</button>
      {output && (
        <div>
          <p className="text-sm text-muted-foreground mb-1">壓縮後大小: {output.length} 字元 (節省 {Math.round((1 - output.length / input.length) * 100)}%)</p>
          <pre className="tool-result whitespace-pre-wrap max-h-[300px] overflow-auto">{output}</pre>
        </div>
      )}
    </div>
  );
}

export const FormatTools = { JsonFormatter, SqlFormatter, CssFormatter, XmlFormatter, HtmlFormatter, JsMinifier };
