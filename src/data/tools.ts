import {
  Type, Hash, Link2, Code, Calculator, Palette, FileText, Shield,
  AlignLeft, CaseSensitive, ArrowDownUp, Trash2, SortAsc, Space, Repeat, Replace,
  Binary, Link, FileCode, Key, Globe2, Radio,
  Braces, Database, FileJson, Indent,
  Lock, Fingerprint, Dice3, PaintBucket, Shuffle, QrCode, Users, CreditCard,
  Ruler, Weight, Thermometer, Clock, Gauge, HardDrive, DollarSign, Calendar,
  Regex, Eye, GitCompare, Terminal, Brackets, Smartphone,
  Search, Tags, FileCheck, Bot,
  Image, Crop, Maximize, RotateCcw,
  Scissors, Droplets, Sun, Contrast, Layers, Frame, Aperture,
  LinkIcon, ExternalLink, Unlink, Globe, Share2, Wifi,
  Film, Music, Volume2, Play, Video, Mic,
  Table, BarChart3, PieChart, TrendingUp, FileSpreadsheet, Filter,
  ShieldCheck, KeyRound, Scan, ShieldAlert, EyeOff, AlertTriangle,
  FileOutput, Printer, BookOpen, FileArchive, ClipboardList,
  Server, Activity, MapPin, Compass, Antenna, Zap,
  Paintbrush, Pipette, Blend, Sparkles, Hexagon, CircleDot,
  Heart, MessageSquare, AtSign, ThumbsUp, UserPlus, Share,
  Briefcase, Receipt, Building2, BarChart, Percent, FileSignature,
  Plus, Minus, Divide, X, Pi, Triangle,
  Timer, AlarmClock, Hourglass, CalendarDays, Sunrise, Moon,
  Pencil, BookMarked, List, Quote, Heading, SpellCheck,
  Gamepad2, Dices, Puzzle, Target, Wand2, Joystick,
  Cpu, HardDriveDownload, Network, Webhook, Bug, Settings,
  Languages, Flag, Globe2 as GlobeAlt, MessageCircle, Type as TypeIcon,
  Accessibility, Monitor, Newspaper, Rss, Mail, Phone
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
  { id: "image", name: "圖片工具", icon: Image, color: "oklch(0.6 0.16 330)" },
  { id: "url", name: "網址工具", icon: LinkIcon, color: "oklch(0.55 0.14 200)" },
  { id: "video", name: "影片/音訊", icon: Film, color: "oklch(0.6 0.18 20)" },
  { id: "data", name: "資料工具", icon: Table, color: "oklch(0.55 0.12 280)" },
  { id: "security", name: "安全工具", icon: ShieldCheck, color: "oklch(0.5 0.15 150)" },
  { id: "document", name: "文件工具", icon: FileOutput, color: "oklch(0.6 0.12 60)" },
  { id: "network", name: "網路工具", icon: Server, color: "oklch(0.5 0.14 220)" },
  { id: "design", name: "設計工具", icon: Paintbrush, color: "oklch(0.6 0.2 340)" },
  { id: "social", name: "社群工具", icon: Heart, color: "oklch(0.6 0.2 10)" },
  { id: "business", name: "商業工具", icon: Briefcase, color: "oklch(0.55 0.1 80)" },
  { id: "math", name: "數學工具", icon: Pi, color: "oklch(0.55 0.15 260)" },
  { id: "time", name: "時間工具", icon: Timer, color: "oklch(0.6 0.12 100)" },
  { id: "writing", name: "寫作工具", icon: Pencil, color: "oklch(0.55 0.14 40)" },
  { id: "fun", name: "趣味工具", icon: Gamepad2, color: "oklch(0.65 0.2 320)" },
  { id: "devops", name: "DevOps 工具", icon: Cpu, color: "oklch(0.5 0.1 240)" },
  { id: "i18n", name: "國際化工具", icon: Languages, color: "oklch(0.6 0.14 160)" },
  { id: "a11y", name: "無障礙工具", icon: Accessibility, color: "oklch(0.55 0.12 120)" },
  { id: "code", name: "程式碼工具", icon: Terminal, color: "oklch(0.5 0.16 200)" },
];

export const tools: Tool[] = [
  // ─── 文字工具 (Text) ───
  { id: "word-counter", name: "字數計算器", description: "計算文字、字元、句子和段落數量", category: "text", icon: AlignLeft },
  { id: "case-converter", name: "大小寫轉換", description: "轉換文字為大寫、小寫、標題格式等", category: "text", icon: CaseSensitive },
  { id: "text-reverser", name: "文字反轉", description: "反轉文字或每一行的順序", category: "text", icon: ArrowDownUp },
  { id: "duplicate-remover", name: "重複行移除", description: "移除文字中重複的行", category: "text", icon: Trash2 },
  { id: "text-sorter", name: "文字排序", description: "按字母順序排序文字行", category: "text", icon: SortAsc },
  { id: "whitespace-remover", name: "空白清理", description: "移除多餘的空白和空行", category: "text", icon: Space },
  { id: "find-replace", name: "尋找與替換", description: "在文字中尋找並替換指定內容", category: "text", icon: Replace },
  { id: "text-repeat", name: "文字重複", description: "將文字重複指定次數", category: "text", icon: Repeat },
  { id: "text-truncate", name: "文字截斷", description: "將文字截斷至指定長度", category: "text", icon: Scissors },
  { id: "text-padding", name: "文字填充", description: "在文字左右填充指定字元", category: "text", icon: Space },
  { id: "text-to-slug", name: "文字轉 Slug", description: "將文字轉為 URL 友善的 slug 格式", category: "text", icon: Link2 },
  { id: "text-stats", name: "文字統計", description: "顯示詳細的文字統計資訊", category: "text", icon: BarChart3 },
  { id: "text-to-binary", name: "文字轉二進位", description: "將文字轉換為二進位表示", category: "text", icon: Binary },
  { id: "text-diff-word", name: "逐字差異比較", description: "逐字比較兩段文字的差異", category: "text", icon: GitCompare },
  { id: "text-extract-emails", name: "提取 Email", description: "從文字中提取所有 Email 地址", category: "text", icon: Mail },
  { id: "text-extract-urls", name: "提取網址", description: "從文字中提取所有 URL", category: "text", icon: Link },
  { id: "text-extract-numbers", name: "提取數字", description: "從文字中提取所有數字", category: "text", icon: Hash },
  { id: "text-to-list", name: "文字轉清單", description: "將文字轉換為編號或項目清單", category: "text", icon: List },
  { id: "text-columns", name: "欄位處理", description: "對文字欄位進行分割和重組", category: "text", icon: Table },
  { id: "text-prefix-suffix", name: "前後綴添加", description: "為每行添加前綴或後綴", category: "text", icon: Plus },

  // ─── 編碼/解碼 (Encode) ───
  { id: "base64", name: "Base64 編碼/解碼", description: "Base64 文字編碼與解碼", category: "encode", icon: Binary },
  { id: "url-encode", name: "URL 編碼/解碼", description: "URL 百分比編碼與解碼", category: "encode", icon: Link },
  { id: "html-encode", name: "HTML 實體編碼", description: "HTML 特殊字元編碼與解碼", category: "encode", icon: FileCode },
  { id: "jwt-decoder", name: "JWT 解碼器", description: "解碼 JSON Web Token 的內容", category: "encode", icon: Key },
  { id: "unicode-converter", name: "Unicode 轉換", description: "文字與 Unicode 編碼互轉", category: "encode", icon: Globe2 },
  { id: "morse-code", name: "摩斯密碼", description: "文字與摩斯密碼互轉", category: "encode", icon: Radio },
  { id: "base32-encode", name: "Base32 編碼/解碼", description: "Base32 文字編碼與解碼", category: "encode", icon: Binary },
  { id: "hex-encode", name: "Hex 編碼/解碼", description: "十六進位文字編碼與解碼", category: "encode", icon: Hash },
  { id: "rot13", name: "ROT13 加密", description: "ROT13 字母替換加密", category: "encode", icon: Repeat },
  { id: "punycode", name: "Punycode 轉換", description: "國際化域名 Punycode 轉換", category: "encode", icon: Globe2 },
  { id: "ascii-art", name: "ASCII 藝術字", description: "將文字轉換為 ASCII 藝術字", category: "encode", icon: Type },
  { id: "braille-converter", name: "盲文轉換", description: "文字與盲文點字互轉", category: "encode", icon: Fingerprint },

  // ─── 格式化 (Format) ───
  { id: "json-formatter", name: "JSON 格式化", description: "格式化、壓縮或驗證 JSON 資料", category: "format", icon: Braces },
  { id: "sql-formatter", name: "SQL 格式化", description: "美化 SQL 查詢語句", category: "format", icon: Database },
  { id: "css-formatter", name: "CSS 格式化", description: "美化或壓縮 CSS 程式碼", category: "format", icon: FileJson },
  { id: "xml-formatter", name: "XML 格式化", description: "格式化 XML 文件", category: "format", icon: Indent },
  { id: "html-formatter", name: "HTML 格式化", description: "美化 HTML 程式碼", category: "format", icon: FileCode },
  { id: "js-minifier", name: "JavaScript 壓縮", description: "壓縮 JavaScript 程式碼", category: "format", icon: Code },
  { id: "yaml-formatter", name: "YAML 格式化", description: "格式化 YAML 文件", category: "format", icon: FileJson },
  { id: "toml-formatter", name: "TOML 格式化", description: "格式化 TOML 設定檔", category: "format", icon: FileJson },
  { id: "graphql-formatter", name: "GraphQL 格式化", description: "美化 GraphQL 查詢", category: "format", icon: Braces },
  { id: "markdown-table", name: "Markdown 表格", description: "產生 Markdown 格式表格", category: "format", icon: Table },
  { id: "csv-formatter", name: "CSV 格式化", description: "格式化和驗證 CSV 資料", category: "format", icon: FileSpreadsheet },
  { id: "php-formatter", name: "PHP 格式化", description: "美化 PHP 程式碼", category: "format", icon: Code },

  // ─── 產生器 (Generator) ───
  { id: "password-generator", name: "密碼產生器", description: "產生安全的隨機密碼", category: "generator", icon: Lock },
  { id: "uuid-generator", name: "UUID 產生器", description: "產生隨機 UUID v4", category: "generator", icon: Fingerprint },
  { id: "random-number", name: "隨機數字", description: "產生指定範圍內的隨機數字", category: "generator", icon: Dice3 },
  { id: "color-generator", name: "顏色產生器", description: "產生隨機顏色或調色盤", category: "generator", icon: PaintBucket },
  { id: "lorem-ipsum", name: "Lorem Ipsum", description: "產生假文字段落用於排版", category: "generator", icon: FileText },
  { id: "hash-generator", name: "Hash 產生器", description: "計算文字的 MD5、SHA-1、SHA-256", category: "generator", icon: Shield },
  { id: "fake-data", name: "假資料產生器", description: "產生假姓名、電話、地址等", category: "generator", icon: Users },
  { id: "credit-card-validator", name: "信用卡驗證", description: "驗證信用卡號碼格式 (Luhn)", category: "generator", icon: CreditCard },
  { id: "qr-code-gen", name: "QR Code 產生器", description: "產生自訂 QR Code 圖片", category: "generator", icon: QrCode },
  { id: "barcode-gen", name: "條碼產生器", description: "產生各種格式的條碼", category: "generator", icon: Scan },
  { id: "avatar-gen", name: "頭像產生器", description: "產生隨機使用者頭像", category: "generator", icon: Users },
  { id: "api-key-gen", name: "API Key 產生器", description: "產生安全的 API 金鑰", category: "generator", icon: Key },
  { id: "cron-gen", name: "Cron 表達式產生器", description: "視覺化建立 Cron 排程", category: "generator", icon: Clock },
  { id: "regex-gen", name: "正規表達式產生器", description: "視覺化建立正規表達式", category: "generator", icon: Regex },
  { id: "htaccess-gen", name: ".htaccess 產生器", description: "產生 Apache .htaccess 設定", category: "generator", icon: Settings },
  { id: "gitignore-gen", name: ".gitignore 產生器", description: "產生各語言的 .gitignore", category: "generator", icon: FileCheck },

  // ─── 轉換工具 (Converter) ───
  { id: "length-converter", name: "長度轉換", description: "公尺、公分、英呎、英吋互轉", category: "converter", icon: Ruler },
  { id: "weight-converter", name: "重量轉換", description: "公斤、磅、盎司互轉", category: "converter", icon: Weight },
  { id: "temperature-converter", name: "溫度轉換", description: "攝氏、華氏、凱氏互轉", category: "converter", icon: Thermometer },
  { id: "time-converter", name: "時間轉換", description: "時、分、秒、毫秒互轉", category: "converter", icon: Clock },
  { id: "speed-converter", name: "速度轉換", description: "km/h、mph、m/s 互轉", category: "converter", icon: Gauge },
  { id: "data-size-converter", name: "資料大小轉換", description: "Byte、KB、MB、GB 互轉", category: "converter", icon: HardDrive },
  { id: "number-base", name: "進位轉換", description: "二進位、八進位、十進位、十六進位互轉", category: "converter", icon: Binary },
  { id: "color-converter", name: "顏色轉換", description: "HEX、RGB、HSL 顏色互轉", category: "converter", icon: Palette },
  { id: "area-converter", name: "面積轉換", description: "平方公尺、坪、英畝互轉", category: "converter", icon: Maximize },
  { id: "volume-converter", name: "體積轉換", description: "公升、毫升、加侖互轉", category: "converter", icon: Droplets },
  { id: "pressure-converter", name: "壓力轉換", description: "Pa、atm、psi 互轉", category: "converter", icon: Gauge },
  { id: "energy-converter", name: "能量轉換", description: "焦耳、卡路里、千瓦時互轉", category: "converter", icon: Zap },
  { id: "angle-converter", name: "角度轉換", description: "度、弧度、梯度互轉", category: "converter", icon: Triangle },
  { id: "currency-converter", name: "貨幣轉換", description: "各國貨幣匯率換算", category: "converter", icon: DollarSign },
  { id: "roman-numeral", name: "羅馬數字轉換", description: "阿拉伯數字與羅馬數字互轉", category: "converter", icon: Hash },
  { id: "cooking-converter", name: "烹飪單位轉換", description: "杯、匙、毫升、克互轉", category: "converter", icon: Droplets },

  // ─── 計算工具 (Calculator) ───
  { id: "percentage-calc", name: "百分比計算", description: "計算百分比、增減比例", category: "calculator", icon: Calculator },
  { id: "bmi-calc", name: "BMI 計算器", description: "計算身體質量指數", category: "calculator", icon: Weight },
  { id: "age-calc", name: "年齡計算器", description: "根據出生日期計算精確年齡", category: "calculator", icon: Calendar },
  { id: "discount-calc", name: "折扣計算器", description: "計算折扣後的價格", category: "calculator", icon: DollarSign },
  { id: "tip-calc", name: "小費計算器", description: "計算餐廳小費金額", category: "calculator", icon: DollarSign },
  { id: "loan-calc", name: "貸款計算器", description: "計算每月還款金額", category: "calculator", icon: DollarSign },
  { id: "compound-interest", name: "複利計算器", description: "計算複利投資收益", category: "calculator", icon: TrendingUp },
  { id: "tax-calc", name: "稅金計算器", description: "計算含稅與未稅金額", category: "calculator", icon: Receipt },
  { id: "margin-calc", name: "利潤率計算", description: "計算毛利率與淨利率", category: "calculator", icon: Percent },
  { id: "calorie-calc", name: "卡路里計算器", description: "計算每日所需熱量", category: "calculator", icon: Activity },
  { id: "electricity-calc", name: "電費計算器", description: "計算電器的電費", category: "calculator", icon: Zap },
  { id: "mortgage-calc", name: "房貸計算器", description: "計算房屋貸款月付金額", category: "calculator", icon: Building2 },

  // ─── 開發者工具 (Developer) ───
  { id: "regex-tester", name: "Regex 測試器", description: "測試正規表達式並即時匹配", category: "developer", icon: Regex },
  { id: "markdown-preview", name: "Markdown 預覽", description: "即時預覽 Markdown 內容", category: "developer", icon: Eye },
  { id: "diff-checker", name: "文字差異比較", description: "比較兩段文字的差異", category: "developer", icon: GitCompare },
  { id: "json-to-csv", name: "JSON 轉 CSV", description: "將 JSON 資料轉換為 CSV 格式", category: "developer", icon: FileText },
  { id: "csv-to-json", name: "CSV 轉 JSON", description: "將 CSV 資料轉換為 JSON 格式", category: "developer", icon: Braces },
  { id: "timestamp-converter", name: "時間戳轉換", description: "Unix 時間戳與日期互轉", category: "developer", icon: Clock },
  { id: "json-path", name: "JSON Path 查詢", description: "使用路徑查詢 JSON 資料", category: "developer", icon: Brackets },
  { id: "pixel-converter", name: "Px/Rem 轉換", description: "像素與 Rem 單位互轉", category: "developer", icon: Smartphone },
  { id: "json-to-yaml", name: "JSON 轉 YAML", description: "JSON 與 YAML 格式互轉", category: "developer", icon: FileJson },
  { id: "json-to-xml", name: "JSON 轉 XML", description: "JSON 與 XML 格式互轉", category: "developer", icon: FileCode },
  { id: "json-to-ts", name: "JSON 轉 TypeScript", description: "從 JSON 產生 TypeScript 型別", category: "developer", icon: Code },
  { id: "sql-to-json", name: "SQL 轉 JSON", description: "SQL 結果轉為 JSON 格式", category: "developer", icon: Database },
  { id: "html-to-jsx", name: "HTML 轉 JSX", description: "將 HTML 轉換為 JSX 語法", category: "developer", icon: Code },
  { id: "css-to-tailwind", name: "CSS 轉 Tailwind", description: "將 CSS 轉換為 Tailwind 類別", category: "developer", icon: Paintbrush },
  { id: "json-schema-gen", name: "JSON Schema 產生", description: "從 JSON 產生 JSON Schema", category: "developer", icon: Braces },
  { id: "http-status", name: "HTTP 狀態碼", description: "查詢所有 HTTP 狀態碼說明", category: "developer", icon: Server },

  // ─── SEO 工具 ───
  { id: "meta-generator", name: "Meta 標籤產生器", description: "產生 HTML meta 標籤", category: "seo", icon: Tags },
  { id: "robots-generator", name: "Robots.txt 產生器", description: "產生搜尋引擎爬蟲規則", category: "seo", icon: Bot },
  { id: "og-preview", name: "OG 預覽", description: "預覽社群分享卡片外觀", category: "seo", icon: Eye },
  { id: "sitemap-generator", name: "Sitemap 產生器", description: "產生 XML Sitemap", category: "seo", icon: FileCheck },
  { id: "slug-generator", name: "Slug 產生器", description: "將標題轉為 URL 友善格式", category: "seo", icon: Link2 },
  { id: "char-counter-seo", name: "SEO 字數檢查", description: "檢查標題和描述的字元數", category: "seo", icon: AlignLeft },
  { id: "keyword-density", name: "關鍵字密度", description: "分析文章中關鍵字出現頻率", category: "seo", icon: BarChart3 },
  { id: "schema-markup", name: "Schema Markup", description: "產生結構化資料標記", category: "seo", icon: Code },
  { id: "redirect-checker", name: "重定向檢查", description: "檢查 URL 重定向路徑", category: "seo", icon: ExternalLink },
  { id: "canonical-gen", name: "Canonical 標籤", description: "產生正確的 Canonical 標籤", category: "seo", icon: Link2 },

  // ─── 圖片工具 (Image) ───
  { id: "image-compress", name: "圖片壓縮", description: "在瀏覽器端壓縮圖片大小", category: "image", icon: Image },
  { id: "image-resize", name: "圖片縮放", description: "調整圖片尺寸大小", category: "image", icon: Maximize },
  { id: "image-crop", name: "圖片裁切", description: "裁切圖片至指定比例", category: "image", icon: Crop },
  { id: "image-rotate", name: "圖片旋轉", description: "旋轉或翻轉圖片", category: "image", icon: RotateCcw },
  { id: "image-to-base64", name: "圖片轉 Base64", description: "將圖片轉換為 Base64 字串", category: "image", icon: Binary },
  { id: "base64-to-image", name: "Base64 轉圖片", description: "將 Base64 字串轉回圖片", category: "image", icon: Image },
  { id: "image-format-convert", name: "圖片格式轉換", description: "PNG、JPG、WebP 格式互轉", category: "image", icon: Repeat },
  { id: "image-filter", name: "圖片濾鏡", description: "為圖片套用各種濾鏡效果", category: "image", icon: Aperture },
  { id: "image-watermark", name: "圖片浮水印", description: "為圖片添加文字或圖片浮水印", category: "image", icon: Layers },
  { id: "image-blur", name: "圖片模糊", description: "將圖片局部或全部模糊化", category: "image", icon: Droplets },
  { id: "image-brightness", name: "亮度/對比度", description: "調整圖片亮度和對比度", category: "image", icon: Sun },
  { id: "image-grayscale", name: "灰階轉換", description: "將彩色圖片轉為灰階", category: "image", icon: Contrast },
  { id: "svg-to-png", name: "SVG 轉 PNG", description: "將 SVG 向量圖轉為 PNG", category: "image", icon: Image },
  { id: "image-palette", name: "圖片取色", description: "從圖片中提取主要顏色", category: "image", icon: Pipette },
  { id: "favicon-gen", name: "Favicon 產生器", description: "產生各尺寸的網站圖示", category: "image", icon: Frame },
  { id: "screenshot-mockup", name: "裝置模型圖", description: "將截圖放入手機/電腦框架", category: "image", icon: Monitor },
  { id: "image-placeholder", name: "佔位圖產生", description: "產生指定尺寸的佔位圖片", category: "image", icon: Frame },
  { id: "sprite-sheet", name: "精靈圖合併", description: "將多張圖片合併為精靈圖", category: "image", icon: Layers },
  { id: "image-exif", name: "EXIF 資訊", description: "檢視和移除圖片 EXIF 資料", category: "image", icon: FileText },
  { id: "pixel-art", name: "像素畫產生器", description: "產生像素風格的圖片", category: "image", icon: Hexagon },
  { id: "image-search", name: "以圖搜尋", description: "上傳圖片並透過 Google Lens 智慧搜尋", category: "image", icon: Search },

  // ─── 網址工具 (URL) ───
  { id: "url-shortener", name: "縮短網址", description: "將長網址轉為短網址，產生 /s/ 分享連結", category: "url", icon: LinkIcon },
  { id: "text-share", name: "文字分享", description: "分享文字內容，產生短連結", category: "url", icon: FileText },
  { id: "image-share", name: "圖片分享", description: "上傳圖片並產生分享連結", category: "url", icon: Image },
  { id: "file-share", name: "檔案分享", description: "上傳檔案並產生下載連結", category: "url", icon: FileText },
  { id: "url-parser", name: "URL 解析", description: "解析 URL 的各個組成部分", category: "url", icon: Unlink },
  { id: "url-builder", name: "URL 建構器", description: "視覺化建構帶參數的 URL", category: "url", icon: Link },
  { id: "qr-code-reader", name: "QR Code 讀取", description: "從圖片讀取 QR Code 內容", category: "url", icon: QrCode },
  { id: "deep-link-gen", name: "Deep Link 產生", description: "產生 App Deep Link", category: "url", icon: Smartphone },
  { id: "utm-builder", name: "UTM 參數產生", description: "產生 UTM 追蹤參數", category: "url", icon: BarChart3 },
  { id: "url-validator", name: "URL 驗證", description: "驗證 URL 格式是否正確", category: "url", icon: FileCheck },
  { id: "url-compare", name: "URL 比較", description: "比較兩個 URL 的差異", category: "url", icon: GitCompare },
  { id: "link-preview", name: "連結預覽", description: "預覽網址的標題和描述", category: "url", icon: Eye },
  { id: "url-decode-bulk", name: "批量 URL 解碼", description: "批量解碼多個 URL", category: "url", icon: List },

  // ─── 影片/音訊 (Video/Audio) ───
  { id: "video-to-gif", name: "影片轉 GIF", description: "將影片片段轉為 GIF 動圖", category: "video", icon: Film },
  { id: "audio-trimmer", name: "音訊裁切", description: "裁切音訊檔案的片段", category: "video", icon: Scissors },
  { id: "video-trimmer", name: "影片裁切", description: "裁切影片的指定片段", category: "video", icon: Film },
  { id: "audio-converter", name: "音訊格式轉換", description: "MP3、WAV、OGG 格式互轉", category: "video", icon: Music },
  { id: "video-thumbnail", name: "影片縮圖擷取", description: "從影片中擷取縮圖", category: "video", icon: Image },
  { id: "audio-visualizer", name: "音訊視覺化", description: "將音訊轉為視覺波形", category: "video", icon: Activity },
  { id: "video-speed", name: "影片速度調整", description: "加速或減速影片播放", category: "video", icon: Gauge },
  { id: "subtitle-gen", name: "字幕產生器", description: "產生 SRT 格式字幕檔", category: "video", icon: FileText },
  { id: "media-info", name: "媒體資訊查看", description: "查看影片/音訊的詳細資訊", category: "video", icon: FileText },
  { id: "audio-recorder", name: "線上錄音", description: "在瀏覽器中錄製音訊", category: "video", icon: Mic },

  // ─── 資料工具 (Data) ───
  { id: "csv-editor", name: "CSV 編輯器", description: "線上編輯 CSV 資料表", category: "data", icon: Table },
  { id: "json-viewer", name: "JSON 樹狀檢視", description: "以樹狀結構檢視 JSON", category: "data", icon: Braces },
  { id: "data-chart", name: "資料圖表", description: "從資料產生圖表", category: "data", icon: BarChart3 },
  { id: "pivot-table", name: "樞紐分析", description: "建立資料樞紐分析表", category: "data", icon: Table },
  { id: "data-filter", name: "資料篩選", description: "篩選和排序資料集", category: "data", icon: Filter },
  { id: "csv-merge", name: "CSV 合併", description: "合併多個 CSV 檔案", category: "data", icon: Plus },
  { id: "data-faker", name: "測試資料產生", description: "產生大量測試用假資料", category: "data", icon: Database },
  { id: "json-diff", name: "JSON 差異比較", description: "比較兩個 JSON 的差異", category: "data", icon: GitCompare },
  { id: "xml-to-json", name: "XML 轉 JSON", description: "XML 與 JSON 格式互轉", category: "data", icon: FileCode },
  { id: "yaml-to-json", name: "YAML 轉 JSON", description: "YAML 與 JSON 格式互轉", category: "data", icon: FileJson },
  { id: "tsv-converter", name: "TSV 轉換器", description: "TSV 與其他格式互轉", category: "data", icon: Table },
  { id: "data-sampler", name: "資料抽樣", description: "從資料集中隨機抽取樣本", category: "data", icon: Dice3 },

  // ─── 安全工具 (Security) ───
  { id: "password-strength", name: "密碼強度檢測", description: "檢測密碼的安全強度", category: "security", icon: ShieldCheck },
  { id: "aes-encrypt", name: "AES 加密/解密", description: "AES 對稱式加密與解密", category: "security", icon: Lock },
  { id: "rsa-keygen", name: "RSA 金鑰產生", description: "產生 RSA 公私鑰對", category: "security", icon: KeyRound },
  { id: "ssl-checker", name: "SSL 檢查", description: "檢查網站 SSL 憑證資訊", category: "security", icon: ShieldCheck },
  { id: "csp-gen", name: "CSP 產生器", description: "產生內容安全政策標頭", category: "security", icon: Shield },
  { id: "cors-tester", name: "CORS 測試器", description: "測試 API 的 CORS 設定", category: "security", icon: Globe },
  { id: "hash-compare", name: "Hash 比對", description: "比對兩個 Hash 值是否相同", category: "security", icon: GitCompare },
  { id: "password-leak", name: "密碼洩漏檢查", description: "檢查密碼是否已被洩漏", category: "security", icon: AlertTriangle },
  { id: "totp-gen", name: "TOTP 產生器", description: "產生一次性驗證碼", category: "security", icon: Clock },
  { id: "xss-scanner", name: "XSS 檢測", description: "檢測文字中的 XSS 攻擊", category: "security", icon: Bug },

  // ─── 文件工具 (Document) ───
  { id: "pdf-merge", name: "PDF 合併", description: "合併多個 PDF 檔案", category: "document", icon: FileOutput },
  { id: "pdf-split", name: "PDF 分割", description: "將 PDF 分割為多個檔案", category: "document", icon: Scissors },
  { id: "html-to-pdf", name: "HTML 轉 PDF", description: "將 HTML 內容轉為 PDF", category: "document", icon: FileOutput },
  { id: "markdown-to-html", name: "Markdown 轉 HTML", description: "將 Markdown 轉為 HTML", category: "document", icon: FileCode },
  { id: "text-to-pdf", name: "文字轉 PDF", description: "將純文字轉為 PDF 檔案", category: "document", icon: FileOutput },
  { id: "invoice-gen", name: "發票產生器", description: "產生簡易發票 PDF", category: "document", icon: Receipt },
  { id: "resume-gen", name: "履歷產生器", description: "產生專業履歷模板", category: "document", icon: FileText },
  { id: "letter-gen", name: "信件產生器", description: "產生正式信件模板", category: "document", icon: Mail },
  { id: "table-to-csv", name: "表格轉 CSV", description: "將 HTML 表格轉為 CSV", category: "document", icon: Table },
  { id: "doc-word-count", name: "文件字數統計", description: "統計文件的字數和頁數", category: "document", icon: AlignLeft },

  // ─── 網路工具 (Network) ───
  { id: "ip-lookup", name: "IP 查詢", description: "查詢 IP 地址的地理位置", category: "network", icon: MapPin },
  { id: "dns-lookup", name: "DNS 查詢", description: "查詢域名的 DNS 記錄", category: "network", icon: Server },
  { id: "whois-lookup", name: "Whois 查詢", description: "查詢域名的註冊資訊", category: "network", icon: Globe },
  { id: "ping-tool", name: "Ping 工具", description: "測試伺服器的回應時間", category: "network", icon: Activity },
  { id: "port-scanner", name: "端口掃描", description: "掃描伺服器開放的端口", category: "network", icon: Antenna },
  { id: "http-headers", name: "HTTP 標頭查看", description: "查看網站的 HTTP 回應標頭", category: "network", icon: FileText },
  { id: "subnet-calc", name: "子網路計算", description: "計算子網路遮罩和範圍", category: "network", icon: Network },
  { id: "mac-lookup", name: "MAC 位址查詢", description: "查詢 MAC 位址的廠商資訊", category: "network", icon: Wifi },
  { id: "cidr-calc", name: "CIDR 計算器", description: "計算 CIDR 表示法的 IP 範圍", category: "network", icon: Calculator },
  { id: "user-agent", name: "User Agent 分析", description: "解析 User Agent 字串", category: "network", icon: Monitor },

  // ─── 設計工具 (Design) ───
  { id: "gradient-gen", name: "漸層產生器", description: "產生 CSS 漸層背景", category: "design", icon: Blend },
  { id: "shadow-gen", name: "陰影產生器", description: "產生 CSS Box Shadow", category: "design", icon: Layers },
  { id: "border-radius-gen", name: "圓角產生器", description: "產生 CSS 圓角效果", category: "design", icon: CircleDot },
  { id: "glassmorphism-gen", name: "玻璃擬態產生器", description: "產生玻璃擬態 CSS 效果", category: "design", icon: Sparkles },
  { id: "neumorphism-gen", name: "新擬態產生器", description: "產生 Neumorphism CSS 效果", category: "design", icon: CircleDot },
  { id: "color-palette-gen", name: "調色盤產生器", description: "產生和諧的配色方案", category: "design", icon: Palette },
  { id: "font-pairing", name: "字型搭配", description: "推薦適合搭配的字型組合", category: "design", icon: Type },
  { id: "css-animation-gen", name: "CSS 動畫產生器", description: "視覺化產生 CSS 動畫", category: "design", icon: Play },
  { id: "flexbox-gen", name: "Flexbox 產生器", description: "視覺化產生 Flexbox 佈局", category: "design", icon: Layers },
  { id: "grid-gen", name: "Grid 產生器", description: "視覺化產生 CSS Grid 佈局", category: "design", icon: Table },
  { id: "clip-path-gen", name: "Clip Path 產生器", description: "產生 CSS Clip Path 形狀", category: "design", icon: Scissors },
  { id: "transform-gen", name: "Transform 產生器", description: "視覺化產生 CSS Transform", category: "design", icon: RotateCcw },
  { id: "spacing-calc", name: "間距計算器", description: "計算一致的設計間距系統", category: "design", icon: Ruler },
  { id: "aspect-ratio-calc", name: "比例計算器", description: "計算各種螢幕比例", category: "design", icon: Monitor },

  // ─── 社群工具 (Social) ───
  { id: "social-image-size", name: "社群圖片尺寸", description: "各社群平台建議圖片尺寸", category: "social", icon: Image },
  { id: "hashtag-gen", name: "Hashtag 產生器", description: "產生相關的社群 Hashtag", category: "social", icon: Hash },
  { id: "twitter-card", name: "Twitter Card 預覽", description: "預覽 Twitter 分享卡片", category: "social", icon: MessageSquare },
  { id: "social-bio-gen", name: "個人簡介產生器", description: "產生社群媒體個人簡介", category: "social", icon: UserPlus },
  { id: "emoji-picker", name: "Emoji 選擇器", description: "搜尋和複製 Emoji 表情", category: "social", icon: Heart },
  { id: "social-post-gen", name: "貼文產生器", description: "產生社群貼文範本", category: "social", icon: MessageSquare },
  { id: "follower-count", name: "粉絲數格式化", description: "將數字轉為 K/M 格式", category: "social", icon: Users },
  { id: "social-link-gen", name: "社群連結頁", description: "產生個人社群連結頁面", category: "social", icon: Share },
  { id: "caption-gen", name: "圖片說明產生", description: "產生社群圖片說明文字", category: "social", icon: Pencil },
  { id: "engagement-calc", name: "互動率計算", description: "計算社群媒體互動率", category: "social", icon: TrendingUp },

  // ─── 商業工具 (Business) ───
  { id: "invoice-calculator", name: "帳單計算器", description: "計算含稅帳單金額", category: "business", icon: Receipt },
  { id: "roi-calc", name: "ROI 計算器", description: "計算投資報酬率", category: "business", icon: TrendingUp },
  { id: "break-even-calc", name: "損益平衡計算", description: "計算損益平衡點", category: "business", icon: BarChart },
  { id: "salary-calc", name: "薪資計算器", description: "計算年薪/月薪/時薪", category: "business", icon: DollarSign },
  { id: "meeting-cost", name: "會議成本計算", description: "計算會議的人力成本", category: "business", icon: Clock },
  { id: "business-name-gen", name: "公司名稱產生", description: "產生創意公司名稱", category: "business", icon: Building2 },
  { id: "email-template", name: "Email 範本", description: "產生商業 Email 範本", category: "business", icon: Mail },
  { id: "nda-gen", name: "NDA 範本產生", description: "產生保密協議範本", category: "business", icon: FileSignature },
  { id: "project-timeline", name: "專案時程", description: "產生專案時程表", category: "business", icon: CalendarDays },
  { id: "pricing-table-gen", name: "定價表產生器", description: "產生產品定價對比表", category: "business", icon: Table },

  // ─── 數學工具 (Math) ───
  { id: "scientific-calc", name: "科學計算機", description: "進階科學計算功能", category: "math", icon: Calculator },
  { id: "matrix-calc", name: "矩陣計算器", description: "矩陣加減乘和求逆", category: "math", icon: Table },
  { id: "equation-solver", name: "方程式求解", description: "求解一元和二元方程式", category: "math", icon: X },
  { id: "prime-checker", name: "質數檢測", description: "檢測數字是否為質數", category: "math", icon: Hash },
  { id: "gcd-lcm", name: "最大公因數/最小公倍數", description: "計算 GCD 和 LCM", category: "math", icon: Divide },
  { id: "factorial-calc", name: "階乘計算", description: "計算數字的階乘", category: "math", icon: X },
  { id: "fibonacci-gen", name: "費波那契數列", description: "產生費波那契數列", category: "math", icon: TrendingUp },
  { id: "statistics-calc", name: "統計計算器", description: "計算平均值、中位數、標準差", category: "math", icon: BarChart3 },
  { id: "unit-circle", name: "單位圓", description: "互動式三角函數單位圓", category: "math", icon: CircleDot },
  { id: "quadratic-solver", name: "二次方程求解", description: "求解二次方程的根", category: "math", icon: Triangle },
  { id: "permutation-calc", name: "排列組合計算", description: "計算排列和組合數", category: "math", icon: Shuffle },
  { id: "binary-calc", name: "二進位計算器", description: "進行二進位數字運算", category: "math", icon: Binary },

  // ─── 時間工具 (Time) ───
  { id: "countdown-timer", name: "倒數計時器", description: "設定倒數計時並提醒", category: "time", icon: Timer },
  { id: "stopwatch", name: "碼錶", description: "精確的線上碼錶", category: "time", icon: Clock },
  { id: "world-clock", name: "世界時鐘", description: "顯示各時區的時間", category: "time", icon: Globe },
  { id: "date-diff", name: "日期差計算", description: "計算兩個日期之間的天數", category: "time", icon: CalendarDays },
  { id: "date-add", name: "日期加減", description: "日期加減天數/月數/年數", category: "time", icon: Calendar },
  { id: "week-number", name: "週數查詢", description: "查詢日期所在的週數", category: "time", icon: Calendar },
  { id: "timezone-converter", name: "時區轉換", description: "各時區時間互轉", category: "time", icon: Globe },
  { id: "pomodoro", name: "番茄鐘", description: "25 分鐘專注工作計時器", category: "time", icon: Timer },
  { id: "age-in-days", name: "活了幾天", description: "計算從出生到今天的天數", category: "time", icon: CalendarDays },
  { id: "working-days", name: "工作日計算", description: "計算兩個日期間的工作日數", category: "time", icon: Briefcase },

  // ─── 寫作工具 (Writing) ───
  { id: "grammar-check", name: "文法檢查", description: "檢查英文文法錯誤", category: "writing", icon: SpellCheck },
  { id: "readability-score", name: "可讀性分析", description: "分析文章的可讀性指數", category: "writing", icon: Eye },
  { id: "outline-gen", name: "大綱產生器", description: "為文章產生結構化大綱", category: "writing", icon: List },
  { id: "title-gen", name: "標題產生器", description: "產生吸引人的文章標題", category: "writing", icon: Heading },
  { id: "plagiarism-check", name: "重複內容檢測", description: "檢測文字是否有重複內容", category: "writing", icon: Scan },
  { id: "summary-gen", name: "摘要產生器", description: "自動產生文章摘要", category: "writing", icon: FileText },
  { id: "paraphrase", name: "改寫工具", description: "將文字改寫為不同表達方式", category: "writing", icon: Replace },
  { id: "citation-gen", name: "引用格式產生", description: "產生 APA/MLA 引用格式", category: "writing", icon: BookMarked },
  { id: "essay-counter", name: "論文字數統計", description: "針對論文的進階字數統計", category: "writing", icon: AlignLeft },
  { id: "writing-prompt", name: "寫作提示", description: "產生隨機寫作靈感提示", category: "writing", icon: Sparkles },

  // ─── 趣味工具 (Fun) ───
  { id: "dice-roller", name: "擲骰子", description: "模擬擲骰子的結果", category: "fun", icon: Dices },
  { id: "coin-flip", name: "拋硬幣", description: "模擬拋硬幣正反面", category: "fun", icon: CircleDot },
  { id: "random-picker", name: "隨機選擇器", description: "從多個選項中隨機選擇", category: "fun", icon: Shuffle },
  { id: "name-picker", name: "抽籤工具", description: "從名單中隨機抽取", category: "fun", icon: Users },
  { id: "wheel-spinner", name: "幸運轉盤", description: "自訂選項的幸運轉盤", category: "fun", icon: Target },
  { id: "decision-maker", name: "決策幫手", description: "幫你做出困難的決定", category: "fun", icon: Puzzle },
  { id: "meme-text", name: "迷因文字", description: "產生各種趣味文字效果", category: "fun", icon: Wand2 },
  { id: "ascii-face", name: "顏文字", description: "搜尋和複製顏文字", category: "fun", icon: Heart },
  { id: "nickname-gen", name: "暱稱產生器", description: "產生隨機有趣暱稱", category: "fun", icon: UserPlus },
  { id: "fortune-cookie", name: "幸運餅乾", description: "隨機產生一句幸運語", category: "fun", icon: Sparkles },
  { id: "love-calc", name: "愛情計算器", description: "趣味計算兩人的匹配度", category: "fun", icon: Heart },
  { id: "typing-test", name: "打字速度測試", description: "測試你的打字速度", category: "fun", icon: Pencil },

  // ─── DevOps 工具 ───
  { id: "docker-compose", name: "Docker Compose 產生", description: "視覺化產生 Docker Compose", category: "devops", icon: Cpu },
  { id: "env-gen", name: ".env 產生器", description: "產生環境變數檔案模板", category: "devops", icon: Settings },
  { id: "nginx-config", name: "Nginx 設定產生", description: "產生 Nginx 設定檔", category: "devops", icon: Server },
  { id: "yaml-validator", name: "YAML 驗證器", description: "驗證 YAML 語法是否正確", category: "devops", icon: FileCheck },
  { id: "json-validator", name: "JSON 驗證器", description: "驗證 JSON 語法是否正確", category: "devops", icon: FileCheck },
  { id: "changelog-gen", name: "Changelog 產生", description: "產生版本更新日誌", category: "devops", icon: FileText },
  { id: "readme-gen", name: "README 產生器", description: "產生專案 README 模板", category: "devops", icon: BookOpen },
  { id: "license-gen", name: "License 產生器", description: "選擇和產生開源授權", category: "devops", icon: FileSignature },
  { id: "semver-calc", name: "語義化版本計算", description: "計算和比較版本號", category: "devops", icon: Tags },
  { id: "base-converter", name: "進位轉換器", description: "各進位數字互轉", category: "devops", icon: Binary },

  // ─── 國際化工具 (i18n) ───
  { id: "charset-detect", name: "編碼偵測", description: "偵測文字的字元編碼", category: "i18n", icon: Globe2 },
  { id: "i18n-key-gen", name: "i18n Key 產生", description: "為多語言產生翻譯鍵值", category: "i18n", icon: Key },
  { id: "locale-format", name: "地區格式查詢", description: "查詢各國日期/數字格式", category: "i18n", icon: Globe },
  { id: "rtl-tester", name: "RTL 文字測試", description: "測試右至左文字排版", category: "i18n", icon: ArrowDownUp },
  { id: "chinese-converter", name: "繁簡轉換", description: "繁體中文與簡體中文互轉", category: "i18n", icon: Languages },
  { id: "pinyin-converter", name: "拼音轉換", description: "中文漢字轉拼音", category: "i18n", icon: Type },
  { id: "country-code", name: "國碼查詢", description: "查詢各國的 ISO 國碼", category: "i18n", icon: Flag },
  { id: "timezone-list", name: "時區列表", description: "顯示所有時區和偏移量", category: "i18n", icon: Clock },

  // ─── 無障礙工具 (Accessibility) ───
  { id: "contrast-checker", name: "對比度檢查", description: "檢查顏色是否符合 WCAG", category: "a11y", icon: Contrast },
  { id: "color-blind-sim", name: "色盲模擬", description: "模擬色盲看到的顏色", category: "a11y", icon: Eye },
  { id: "aria-gen", name: "ARIA 屬性產生", description: "產生正確的 ARIA 標記", category: "a11y", icon: Code },
  { id: "alt-text-gen", name: "Alt 文字產生", description: "為圖片產生替代文字", category: "a11y", icon: Image },
  { id: "font-size-calc", name: "字型大小計算", description: "計算適合的字型大小", category: "a11y", icon: Type },
  { id: "heading-checker", name: "標題結構檢查", description: "檢查 HTML 標題層級", category: "a11y", icon: Heading },
  { id: "focus-order", name: "焦點順序測試", description: "測試鍵盤焦點順序", category: "a11y", icon: Target },
  { id: "screen-reader-text", name: "螢幕閱讀器文字", description: "產生螢幕閱讀器專用文字", category: "a11y", icon: Volume2 },

  // ─── 程式碼工具 (Code) ───
  { id: "html-preview", name: "HTML 即時預覽", description: "撰寫 HTML/CSS/JS 並即時預覽", category: "code", icon: Code },
  { id: "js-runner", name: "JavaScript 執行器", description: "線上執行 JavaScript 代碼", category: "code", icon: Terminal },
  { id: "css-playground", name: "CSS 遊樂場", description: "即時測試 CSS 樣式效果", category: "code", icon: Paintbrush },
  { id: "json-formatter-pro", name: "JSON 格式化工具", description: "格式化和驗證 JSON", category: "code", icon: Braces },
  { id: "regex-playground", name: "正則表達式測試", description: "測試和除錯正則表達式", category: "code", icon: Regex },
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

export function getRelatedTools(toolId: string, limit = 6): Tool[] {
  const tool = getToolById(toolId);
  if (!tool) return [];
  const sameCat = tools.filter(t => t.category === tool.category && t.id !== toolId);
  if (sameCat.length >= limit) return sameCat.slice(0, limit);
  const others = tools.filter(t => t.category !== tool.category && t.id !== toolId);
  return [...sameCat, ...others.slice(0, limit - sameCat.length)];
}
