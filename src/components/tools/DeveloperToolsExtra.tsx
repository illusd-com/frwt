import { useState } from "react";

function JsonToTs() {
  const [input, setInput] = useState('{"name":"Alice","age":30,"active":true,"tags":["a","b"],"address":{"city":"Taipei"}}');
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const data = JSON.parse(input);
      const gen = (obj: any, name: string, indent: string): string => {
        if (typeof obj !== "object" || obj === null) return "";
        if (Array.isArray(obj)) {
          if (obj.length === 0) return "";
          const first = obj[0];
          if (typeof first === "object") return gen(first, name + "Item", indent);
          return "";
        }
        let result = `${indent}interface ${name} {\n`;
        for (const [key, val] of Object.entries(obj)) {
          let type = typeof val;
          if (val === null) type = "null" as any;
          else if (Array.isArray(val)) {
            const itemType = val.length > 0 ? (typeof val[0] === "object" ? key.charAt(0).toUpperCase() + key.slice(1) + "Item" : typeof val[0]) : "unknown";
            type = `${itemType}[]` as any;
          } else if (type === "object") {
            type = key.charAt(0).toUpperCase() + key.slice(1) as any;
          }
          result += `${indent}  ${key}: ${type};\n`;
        }
        result += `${indent}}\n`;
        for (const [key, val] of Object.entries(obj)) {
          if (typeof val === "object" && val !== null && !Array.isArray(val)) {
            result += "\n" + gen(val, key.charAt(0).toUpperCase() + key.slice(1), indent);
          }
          if (Array.isArray(val) && val.length > 0 && typeof val[0] === "object") {
            result += "\n" + gen(val[0], key.charAt(0).toUpperCase() + key.slice(1) + "Item", indent);
          }
        }
        return result;
      };
      setOutput(gen(data, "Root", ""));
    } catch (e: any) { setOutput("錯誤: " + e.message); }
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[120px] font-mono" value={input} onChange={e => setInput(e.target.value)} placeholder="貼上 JSON..." />
      <button className="tool-btn" onClick={convert}>產生 TypeScript 型別</button>
      {output && <pre className="tool-result whitespace-pre-wrap text-xs">{output}</pre>}
    </div>
  );
}

function HtmlToJsx() {
  const [input, setInput] = useState('<div class="container">\n  <label for="name">Name</label>\n  <input type="text" tabindex="1" readonly />\n  <p style="color: red; font-size: 14px;">Hello</p>\n</div>');
  const convert = (html: string) => {
    return html
      .replace(/\bclass=/g, "className=")
      .replace(/\bfor=/g, "htmlFor=")
      .replace(/\btabindex=/g, "tabIndex=")
      .replace(/\breadonly/g, "readOnly")
      .replace(/\bautofocus/g, "autoFocus")
      .replace(/\bchecked(?!=)/g, "defaultChecked")
      .replace(/\bonclick=/gi, "onClick=")
      .replace(/\bonchange=/gi, "onChange=")
      .replace(/\bonsubmit=/gi, "onSubmit=")
      .replace(/style="([^"]*)"/g, (_, styles: string) => {
        const obj = styles.split(";").filter(Boolean).map(s => {
          const [prop, val] = s.split(":").map(x => x.trim());
          const camelProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          return `${camelProp}: "${val}"`;
        }).join(", ");
        return `style={{${obj}}}`;
      })
      .replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/g, "<$1$2 />");
  };

  const output = convert(input);

  return (
    <div className="space-y-4">
      <div><label className="tool-label">HTML</label><textarea className="tool-textarea min-h-[150px] font-mono" value={input} onChange={e => setInput(e.target.value)} /></div>
      <div><label className="tool-label">JSX</label><pre className="tool-result whitespace-pre-wrap text-xs">{output}</pre></div>
      <button className="tool-btn-secondary" onClick={() => navigator.clipboard.writeText(output)}>複製</button>
    </div>
  );
}

function JsonToYaml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"j2y" | "y2j">("j2y");

  const jsonToYaml = (obj: any, indent = 0): string => {
    const pad = "  ".repeat(indent);
    if (obj === null) return "null";
    if (typeof obj !== "object") return JSON.stringify(obj);
    if (Array.isArray(obj)) return obj.map(item => `${pad}- ${typeof item === "object" ? "\n" + jsonToYaml(item, indent + 1) : jsonToYaml(item)}`).join("\n");
    return Object.entries(obj).map(([k, v]) => {
      if (typeof v === "object" && v !== null) return `${pad}${k}:\n${jsonToYaml(v, indent + 1)}`;
      return `${pad}${k}: ${v === null ? "null" : typeof v === "string" ? `"${v}"` : v}`;
    }).join("\n");
  };

  const convert = () => {
    try {
      if (mode === "j2y") {
        setOutput(jsonToYaml(JSON.parse(input)));
      } else {
        setOutput("YAML → JSON 需要完整 YAML 解析器，建議使用 JSON 格式");
      }
    } catch (e: any) { setOutput("錯誤: " + e.message); }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className={`tool-btn ${mode === "j2y" ? "" : "opacity-60"}`} onClick={() => setMode("j2y")}>JSON → YAML</button>
        <button className={`tool-btn ${mode === "y2j" ? "" : "opacity-60"}`} onClick={() => setMode("y2j")}>YAML → JSON</button>
      </div>
      <textarea className="tool-textarea min-h-[150px] font-mono" value={input} onChange={e => setInput(e.target.value)} placeholder={mode === "j2y" ? "貼上 JSON..." : "貼上 YAML..."} />
      <button className="tool-btn" onClick={convert}>轉換</button>
      {output && <pre className="tool-result whitespace-pre-wrap text-xs">{output}</pre>}
    </div>
  );
}

function JsonSchemaGen() {
  const [input, setInput] = useState('{"name":"Alice","age":30,"tags":["a"]}');
  const [output, setOutput] = useState("");

  const gen = (val: any): any => {
    if (val === null) return { type: "null" };
    if (Array.isArray(val)) {
      return { type: "array", items: val.length > 0 ? gen(val[0]) : {} };
    }
    if (typeof val === "object") {
      const props: any = {};
      const required: string[] = [];
      for (const [k, v] of Object.entries(val)) {
        props[k] = gen(v);
        required.push(k);
      }
      return { type: "object", properties: props, required };
    }
    return { type: typeof val };
  };

  const convert = () => {
    try {
      const data = JSON.parse(input);
      const schema = { $schema: "http://json-schema.org/draft-07/schema#", ...gen(data) };
      setOutput(JSON.stringify(schema, null, 2));
    } catch (e: any) { setOutput("錯誤: " + e.message); }
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[120px] font-mono" value={input} onChange={e => setInput(e.target.value)} placeholder="貼上 JSON..." />
      <button className="tool-btn" onClick={convert}>產生 JSON Schema</button>
      {output && <pre className="tool-result whitespace-pre-wrap text-xs max-h-[400px] overflow-auto">{output}</pre>}
    </div>
  );
}

export const DeveloperToolsExtra = { JsonToTs, HtmlToJsx, JsonToYaml, JsonSchemaGen };
