import {
  Type, Hash, Link2, Code, Calculator, Palette, FileText, Shield,
  AlignLeft, CaseSensitive, ArrowDownUp, Trash2, SortAsc, Space, Repeat, Replace,
  Binary, Link, FileCode, Key, Globe2, Radio,
  Braces, Database, FileJson, Indent,
  Lock, Fingerprint, Dice3, PaintBucket, Shuffle, QrCode, Users, CreditCard,
  Ruler, Weight, Thermometer, Clock, Gauge, HardDrive, DollarSign, Calendar,
  Regex, Eye, GitCompare, Terminal, Brackets, Smartphone,
  Search, Tags, FileCheck, Bot,
  Image, Crop, Maximize, RotateCcw
} from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
}

export interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
}

export const categories: Category[] = [
  { id: "text", name: "文字工具", icon: Type, color: "oklch(0.55 0.15 175)" },
  { id: "encode", name: "編碼/解碼", icon: Hash, color: "oklch(0.55 0.18 250)" },
  { id: "format", name: "格式化工具", icon: Code, color: "oklch(0.6 0.15 140)" },
  { id: "generator", name: "產生器", icon: Dice3, color: "oklch(0.65 0.18 300)" },
  { id: "converter", name: "轉換工具", icon: Repeat, color: "oklch(0.6 0.18 50)" },
  { id: "calculator", name: "計算工具", icon: Calculator, color: "oklch(0.55 0.15 30)" },
  { id: "developer", name: "開發者工具", icon: Terminal, color: "oklch(0.5 0.12 260)" },
  { id: "seo", name: "SEO 工具", icon: Search, color: "oklch(0.55 0.15 140)" },
];

export const tools: Tool[] = [
  // 文字工具 (Text)
  { id: "word-counter", name: "字數計算器", description: "計算文字、字元、句子和段落數量", category: "text", icon: AlignLeft },
  { id: "case-converter", name: "大小寫轉換", description: "轉換文字為大寫、小寫、標題格式等", category: "text", icon: CaseSensitive },
  { id: "text-reverser", name: "文字反轉", description: "反轉文字或每一行的順序", category: "text", icon: ArrowDownUp },
  { id: "duplicate-remover", name: "重複行移除", description: "移除文字中重複的行", category: "text", icon: Trash2 },
  { id: "text-sorter", name: "文字排序", description: "按字母順序排序文字行", category: "text", icon: SortAsc },
  { id: "whitespace-remover", name: "空白清理", description: "移除多餘的空白和空行", category: "text", icon: Space },
  { id: "find-replace", name: "尋找與替換", description: "在文字中尋找並替換指定內容", category: "text", icon: Replace },
  { id: "text-repeat", name: "文字重複", description: "將文字重複指定次數", category: "text", icon: Repeat },

  // 編碼/解碼 (Encode)
  { id: "base64", name: "Base64 編碼/解碼", description: "Base64 文字編碼與解碼", category: "encode", icon: Binary },
  { id: "url-encode", name: "URL 編碼/解碼", description: "URL 百分比編碼與解碼", category: "encode", icon: Link },
  { id: "html-encode", name: "HTML 實體編碼", description: "HTML 特殊字元編碼與解碼", category: "encode", icon: FileCode },
  { id: "jwt-decoder", name: "JWT 解碼器", description: "解碼 JSON Web Token 的內容", category: "encode", icon: Key },
  { id: "unicode-converter", name: "Unicode 轉換", description: "文字與 Unicode 編碼互轉", category: "encode", icon: Globe2 },
  { id: "morse-code", name: "摩斯密碼", description: "文字與摩斯密碼互轉", category: "encode", icon: Radio },

  // 格式化 (Format)
  { id: "json-formatter", name: "JSON 格式化", description: "格式化、壓縮或驗證 JSON 資料", category: "format", icon: Braces },
  { id: "sql-formatter", name: "SQL 格式化", description: "美化 SQL 查詢語句", category: "format", icon: Database },
  { id: "css-formatter", name: "CSS 格式化", description: "美化或壓縮 CSS 程式碼", category: "format", icon: FileJson },
  { id: "xml-formatter", name: "XML 格式化", description: "格式化 XML 文件", category: "format", icon: Indent },
  { id: "html-formatter", name: "HTML 格式化", description: "美化 HTML 程式碼", category: "format", icon: FileCode },
  { id: "js-minifier", name: "JavaScript 壓縮", description: "壓縮 JavaScript 程式碼", category: "format", icon: Code },

  // 產生器 (Generator)
  { id: "password-generator", name: "密碼產生器", description: "產生安全的隨機密碼", category: "generator", icon: Lock },
  { id: "uuid-generator", name: "UUID 產生器", description: "產生隨機 UUID v4", category: "generator", icon: Fingerprint },
  { id: "random-number", name: "隨機數字", description: "產生指定範圍內的隨機數字", category: "generator", icon: Dice3 },
  { id: "color-generator", name: "顏色產生器", description: "產生隨機顏色或調色盤", category: "generator", icon: PaintBucket },
  { id: "lorem-ipsum", name: "Lorem Ipsum", description: "產生假文字段落用於排版", category: "generator", icon: FileText },
  { id: "hash-generator", name: "Hash 產生器", description: "計算文字的 MD5、SHA-1、SHA-256", category: "generator", icon: Shield },
  { id: "fake-data", name: "假資料產生器", description: "產生假姓名、電話、地址等", category: "generator", icon: Users },
  { id: "credit-card-validator", name: "信用卡驗證", description: "驗證信用卡號碼格式 (Luhn)", category: "generator", icon: CreditCard },

  // 轉換工具 (Converter)
  { id: "length-converter", name: "長度轉換", description: "公尺、公分、英呎、英吋互轉", category: "converter", icon: Ruler },
  { id: "weight-converter", name: "重量轉換", description: "公斤、磅、盎司互轉", category: "converter", icon: Weight },
  { id: "temperature-converter", name: "溫度轉換", description: "攝氏、華氏、凱氏互轉", category: "converter", icon: Thermometer },
  { id: "time-converter", name: "時間轉換", description: "時、分、秒、毫秒互轉", category: "converter", icon: Clock },
  { id: "speed-converter", name: "速度轉換", description: "km/h、mph、m/s 互轉", category: "converter", icon: Gauge },
  { id: "data-size-converter", name: "資料大小轉換", description: "Byte、KB、MB、GB 互轉", category: "converter", icon: HardDrive },
  { id: "number-base", name: "進位轉換", description: "二進位、八進位、十進位、十六進位互轉", category: "converter", icon: Binary },
  { id: "color-converter", name: "顏色轉換", description: "HEX、RGB、HSL 顏色互轉", category: "converter", icon: Palette },

  // 計算工具 (Calculator)
  { id: "percentage-calc", name: "百分比計算", description: "計算百分比、增減比例", category: "calculator", icon: Calculator },
  { id: "bmi-calc", name: "BMI 計算器", description: "計算身體質量指數", category: "calculator", icon: Weight },
  { id: "age-calc", name: "年齡計算器", description: "根據出生日期計算精確年齡", category: "calculator", icon: Calendar },
  { id: "discount-calc", name: "折扣計算器", description: "計算折扣後的價格", category: "calculator", icon: DollarSign },
  { id: "tip-calc", name: "小費計算器", description: "計算餐廳小費金額", category: "calculator", icon: DollarSign },
  { id: "loan-calc", name: "貸款計算器", description: "計算每月還款金額", category: "calculator", icon: DollarSign },

  // 開發者工具 (Developer)
  { id: "regex-tester", name: "Regex 測試器", description: "測試正規表達式並即時匹配", category: "developer", icon: Regex },
  { id: "markdown-preview", name: "Markdown 預覽", description: "即時預覽 Markdown 內容", category: "developer", icon: Eye },
  { id: "diff-checker", name: "文字差異比較", description: "比較兩段文字的差異", category: "developer", icon: GitCompare },
  { id: "json-to-csv", name: "JSON 轉 CSV", description: "將 JSON 資料轉換為 CSV 格式", category: "developer", icon: FileText },
  { id: "csv-to-json", name: "CSV 轉 JSON", description: "將 CSV 資料轉換為 JSON 格式", category: "developer", icon: Braces },
  { id: "timestamp-converter", name: "時間戳轉換", description: "Unix 時間戳與日期互轉", category: "developer", icon: Clock },
  { id: "json-path", name: "JSON Path 查詢", description: "使用路徑查詢 JSON 資料", category: "developer", icon: Brackets },
  { id: "pixel-converter", name: "Px/Rem 轉換", description: "像素與 Rem 單位互轉", category: "developer", icon: Smartphone },

  // SEO
  { id: "meta-generator", name: "Meta 標籤產生器", description: "產生 HTML meta 標籤", category: "seo", icon: Tags },
  { id: "robots-generator", name: "Robots.txt 產生器", description: "產生搜尋引擎爬蟲規則", category: "seo", icon: Bot },
  { id: "og-preview", name: "OG 預覽", description: "預覽社群分享卡片外觀", category: "seo", icon: Eye },
  { id: "sitemap-generator", name: "Sitemap 產生器", description: "產生 XML Sitemap", category: "seo", icon: FileCheck },
  { id: "slug-generator", name: "Slug 產生器", description: "將標題轉為 URL 友善格式", category: "seo", icon: Link2 },
  { id: "char-counter-seo", name: "SEO 字數檢查", description: "檢查標題和描述的字元數", category: "seo", icon: AlignLeft },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(t => t.category === categoryId);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find(t => t.id === id);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.id.includes(q)
  );
}
