import { TextTools } from "./TextTools";
import { TextToolsExtra } from "./TextToolsExtra";
import { MathToolsExtra } from "./MathToolsExtra";
import { BusinessToolsExtra } from "./BusinessToolsExtra";
import { EncodeTools } from "./EncodeTools";
import { EncodeToolsExtra } from "./EncodeToolsExtra";
import { FormatTools } from "./FormatTools";
import { GeneratorTools } from "./GeneratorTools";
import { GeneratorToolsExtra } from "./GeneratorToolsExtra";
import { ConverterTools } from "./ConverterTools";
import { ConverterToolsExtra } from "./ConverterToolsExtra";
import { CalculatorTools } from "./CalculatorTools";
import { CalculatorToolsExtra } from "./CalculatorToolsExtra";
import { DeveloperTools } from "./DeveloperTools";
import { DeveloperToolsExtra } from "./DeveloperToolsExtra";
import { SeoTools } from "./SeoTools";
import { ImageTools } from "./ImageTools";
import { UrlTools } from "./UrlTools";
import { VideoTools } from "./VideoTools";
import { DataTools } from "./DataTools";
import { SecurityTools } from "./SecurityTools";
import { DesignTools } from "./DesignTools";
import { FunTools } from "./FunTools";
import { TimeTools } from "./TimeTools";
import { MathTools } from "./MathTools";
import { WritingTools } from "./WritingTools";
import { NetworkTools } from "./NetworkTools";
import { SocialTools } from "./SocialTools";
import { BusinessTools } from "./BusinessTools";
import { A11yTools } from "./A11yTools";
import { DevOpsTools } from "./DevOpsTools";
import { I18nTools } from "./I18nTools";
import { DocumentTools } from "./DocumentTools";
import { CodeTools } from "./CodeTools";
import { DesignToolsExtra } from "./DesignToolsExtra";

const toolMap: Record<string, React.ComponentType<{}>> = {};

function register(components: Record<string, React.ComponentType<{}>>) {
  Object.assign(toolMap, components);
}

export function ToolRenderer({ toolId }: { toolId: string }) {
  const Component = toolMap[toolId];
  if (!Component) {
    return <p className="text-muted-foreground text-center py-8">此工具即將推出，敬請期待！🚀</p>;
  }
  return <Component />;
}

// Text tools
register({
  "word-counter": TextTools.WordCounter,
  "case-converter": TextTools.CaseConverter,
  "text-reverser": TextTools.TextReverser,
  "duplicate-remover": TextTools.DuplicateRemover,
  "text-sorter": TextTools.TextSorter,
  "whitespace-remover": TextTools.WhitespaceRemover,
  "find-replace": TextTools.FindReplace,
  "text-repeat": TextTools.TextRepeat,
  "text-truncate": TextToolsExtra.TextTruncate,
  "text-to-slug": TextToolsExtra.TextToSlug,
  "text-to-binary": TextToolsExtra.TextToBinary,
  "text-extract-emails": TextToolsExtra.TextExtractEmails,
  "text-extract-urls": TextToolsExtra.TextExtractUrls,
  "text-extract-numbers": TextToolsExtra.TextExtractNumbers,
  "text-to-list": TextToolsExtra.TextToList,
  "text-prefix-suffix": TextToolsExtra.TextPrefixSuffix,
});

// Encode tools
register({
  "base64": EncodeTools.Base64,
  "url-encode": EncodeTools.UrlEncode,
  "html-encode": EncodeTools.HtmlEncode,
  "jwt-decoder": EncodeTools.JwtDecoder,
  "unicode-converter": EncodeTools.UnicodeConverter,
  "morse-code": EncodeTools.MorseCode,
  "hex-encode": EncodeToolsExtra.HexEncode,
  "rot13": EncodeToolsExtra.Rot13,
  "base32-encode": EncodeToolsExtra.Base32Encode,
  "ascii-art": EncodeToolsExtra.AsciiArt,
});

// Format tools
register({
  "json-formatter": FormatTools.JsonFormatter,
  "sql-formatter": FormatTools.SqlFormatter,
  "css-formatter": FormatTools.CssFormatter,
  "xml-formatter": FormatTools.XmlFormatter,
  "html-formatter": FormatTools.HtmlFormatter,
  "js-minifier": FormatTools.JsMinifier,
});

// Generator tools
register({
  "password-generator": GeneratorTools.PasswordGenerator,
  "uuid-generator": GeneratorTools.UuidGenerator,
  "random-number": GeneratorTools.RandomNumber,
  "color-generator": GeneratorTools.ColorGenerator,
  "lorem-ipsum": GeneratorTools.LoremIpsum,
  "hash-generator": GeneratorTools.HashGenerator,
  "fake-data": GeneratorTools.FakeData,
  "credit-card-validator": GeneratorTools.CreditCardValidator,
  "qr-code-gen": GeneratorToolsExtra.QrCodeGen,
  "api-key-gen": GeneratorToolsExtra.ApiKeyGen,
  "cron-gen": GeneratorToolsExtra.CronGen,
  "gitignore-gen": GeneratorToolsExtra.GitignoreGen,
});

// Converter tools
register({
  "length-converter": ConverterTools.LengthConverter,
  "weight-converter": ConverterTools.WeightConverter,
  "temperature-converter": ConverterTools.TemperatureConverter,
  "time-converter": ConverterTools.TimeConverter,
  "speed-converter": ConverterTools.SpeedConverter,
  "data-size-converter": ConverterTools.DataSizeConverter,
  "number-base": ConverterTools.NumberBase,
  "color-converter": ConverterTools.ColorConverter,
  "area-converter": ConverterToolsExtra.AreaConverter,
  "volume-converter": ConverterToolsExtra.VolumeConverter,
  "pressure-converter": ConverterToolsExtra.PressureConverter,
  "energy-converter": ConverterToolsExtra.EnergyConverter,
  "angle-converter": ConverterToolsExtra.AngleConverter,
  "roman-numeral": ConverterToolsExtra.RomanNumeral,
  "cooking-converter": ConverterToolsExtra.CookingConverter,
});

// Calculator tools
register({
  "percentage-calc": CalculatorTools.PercentageCalc,
  "bmi-calc": CalculatorTools.BmiCalc,
  "age-calc": CalculatorTools.AgeCalc,
  "discount-calc": CalculatorTools.DiscountCalc,
  "tip-calc": CalculatorTools.TipCalc,
  "loan-calc": CalculatorTools.LoanCalc,
  "compound-interest": CalculatorToolsExtra.CompoundInterest,
  "tax-calc": CalculatorToolsExtra.TaxCalc,
  "margin-calc": CalculatorToolsExtra.MarginCalc,
  "calorie-calc": CalculatorToolsExtra.CalorieCalc,
  "electricity-calc": CalculatorToolsExtra.ElectricityCalc,
});

// Developer tools
register({
  "regex-tester": DeveloperTools.RegexTester,
  "markdown-preview": DeveloperTools.MarkdownPreview,
  "diff-checker": DeveloperTools.DiffChecker,
  "json-to-csv": DeveloperTools.JsonToCsv,
  "csv-to-json": DeveloperTools.CsvToJson,
  "timestamp-converter": DeveloperTools.TimestampConverter,
  "json-path": DeveloperTools.JsonPath,
  "pixel-converter": DeveloperTools.PixelConverter,
  "json-to-ts": DeveloperToolsExtra.JsonToTs,
  "html-to-jsx": DeveloperToolsExtra.HtmlToJsx,
  "json-to-yaml": DeveloperToolsExtra.JsonToYaml,
  "json-schema-gen": DeveloperToolsExtra.JsonSchemaGen,
});

// SEO tools
register({
  "meta-generator": SeoTools.MetaGenerator,
  "robots-generator": SeoTools.RobotsGenerator,
  "og-preview": SeoTools.OgPreview,
  "sitemap-generator": SeoTools.SitemapGenerator,
  "slug-generator": SeoTools.SlugGenerator,
  "char-counter-seo": SeoTools.CharCounterSeo,
});

// Image tools
register({
  "image-compress": ImageTools.ImageCompress,
  "image-resize": ImageTools.ImageResize,
  "image-crop": ImageTools.ImageCrop,
  "image-rotate": ImageTools.ImageRotate,
  "image-to-base64": ImageTools.ImageToBase64,
  "base64-to-image": ImageTools.Base64ToImage,
  "image-format-convert": ImageTools.ImageFormatConvert,
  "image-filter": ImageTools.ImageFilter,
  "image-grayscale": ImageTools.ImageGrayscale,
  "image-brightness": ImageTools.ImageBrightness,
  "image-watermark": ImageTools.ImageWatermark,
  "image-palette": ImageTools.ImagePalette,
  "svg-to-png": ImageTools.SvgToPng,
  "image-blur": ImageTools.ImageBlur,
  "favicon-gen": ImageTools.FaviconGen,
  "image-placeholder": ImageTools.ImagePlaceholder,
});

// URL tools
register({
  "url-shortener": UrlTools.UrlShortener,
  "url-parser": UrlTools.UrlParser,
  "url-builder": UrlTools.UrlBuilder,
  "utm-builder": UrlTools.UtmBuilder,
  "url-validator": UrlTools.UrlValidator,
  "url-compare": UrlTools.UrlCompare,
  "text-share": UrlTools.TextShare,
  "image-share": UrlTools.ImageShare,
  "file-share": UrlTools.FileShare,
});

// Video/Audio tools
register({
  "subtitle-gen": VideoTools.SubtitleGen,
  "audio-recorder": VideoTools.AudioRecorder,
  "media-info": VideoTools.MediaInfo,
});

// Data tools
register({
  "csv-editor": DataTools.CsvEditor,
  "json-viewer": DataTools.JsonViewer,
  "data-filter": DataTools.DataFilter,
  "json-diff": DataTools.JsonDiff,
  "xml-to-json": DataTools.XmlToJson,
  "yaml-to-json": DataTools.YamlToJson,
});

// Security tools
register({
  "password-strength": SecurityTools.PasswordStrength,
  "aes-encrypt": SecurityTools.AesEncrypt,
  "hash-compare": SecurityTools.HashCompare,
  "csp-gen": SecurityTools.CspGen,
  "totp-gen": SecurityTools.TotpGen,
});

// Design tools
register({
  "gradient-gen": DesignTools.GradientGen,
  "shadow-gen": DesignTools.ShadowGen,
  "border-radius-gen": DesignTools.BorderRadiusGen,
  "glassmorphism-gen": DesignTools.GlassmorphismGen,
  "color-palette-gen": DesignTools.ColorPaletteGen,
  "flexbox-gen": DesignTools.FlexboxGen,
});

// Fun tools
register({
  "dice-roller": FunTools.DiceRoller,
  "coin-flip": FunTools.CoinFlip,
  "random-picker": FunTools.RandomPicker,
  "wheel-spinner": FunTools.WheelSpinner,
  "decision-maker": FunTools.DecisionMaker,
  "typing-test": FunTools.TypingTest,
  "love-calc": FunTools.LoveCalc,
  "emoji-picker": FunTools.EmojiPicker,
});

// Time tools
register({
  "countdown-timer": TimeTools.CountdownTimer,
  "stopwatch": TimeTools.Stopwatch,
  "world-clock": TimeTools.WorldClock,
  "date-diff": TimeTools.DateDiff,
  "pomodoro": TimeTools.Pomodoro,
  "working-days": TimeTools.WorkingDays,
});

// Math tools
register({
  "scientific-calc": MathTools.ScientificCalc,
  "prime-checker": MathTools.PrimeChecker,
  "gcd-lcm": MathTools.GcdLcm,
  "statistics-calc": MathTools.StatisticsCalc,
  "fibonacci-gen": MathTools.FibonacciGen,
  "permutation-calc": MathTools.PermutationCalc,
});

// Writing tools
register({
  "readability-score": WritingTools.ReadabilityScore,
  "title-gen": WritingTools.TitleGen,
  "citation-gen": WritingTools.CitationGen,
  "writing-prompt": WritingTools.WritingPrompt,
  "essay-counter": WritingTools.EssayCounter,
});

// Network tools
register({
  "subnet-calc": NetworkTools.SubnetCalc,
  "user-agent": NetworkTools.UserAgentParser,
  "http-status": NetworkTools.HttpStatusCodes,
});

// Social tools
register({
  "social-image-size": SocialTools.SocialImageSize,
  "hashtag-gen": SocialTools.HashtagGen,
  "follower-count": SocialTools.FollowerCount,
  "engagement-calc": SocialTools.EngagementCalc,
});

// Business tools
register({
  "roi-calc": BusinessTools.RoiCalc,
  "salary-calc": BusinessTools.SalaryCalc,
  "meeting-cost": BusinessTools.MeetingCost,
  "break-even-calc": BusinessTools.BreakEvenCalc,
});

// Accessibility tools
register({
  "contrast-checker": A11yTools.ContrastChecker,
  "color-blind-sim": A11yTools.ColorBlindSim,
  "font-size-calc": A11yTools.FontSizeCalc,
});

// DevOps tools
register({
  "docker-compose": DevOpsTools.DockerCompose,
  "env-gen": DevOpsTools.EnvGen,
  "nginx-config": DevOpsTools.NginxConfig,
  "yaml-validator": DevOpsTools.YamlValidator,
  "json-validator": DevOpsTools.JsonValidator,
  "changelog-gen": DevOpsTools.ChangelogGen,
  "readme-gen": DevOpsTools.ReadmeGen,
  "license-gen": DevOpsTools.LicenseGen,
  "semver-calc": DevOpsTools.SemverCalc,
});

// I18n tools
register({
  "chinese-converter": I18nTools.ChineseConverter,
  "country-code": I18nTools.CountryCode,
  "timezone-list": I18nTools.TimezoneList,
  "locale-format": I18nTools.LocaleFormat,
  "charset-detect": I18nTools.CharsetDetect,
  "i18n-key-gen": I18nTools.I18nKeyGen,
});

// Document tools
register({
  "markdown-to-html": DocumentTools.MarkdownToHtml,
  "text-to-pdf": DocumentTools.TextToPdf,
  "resume-gen": DocumentTools.ResumeGen,
  "invoice-gen": DocumentTools.InvoiceGen,
  "letter-gen": DocumentTools.LetterGen,
  "table-to-csv": DocumentTools.TableToCsv,
  "doc-word-count": DocumentTools.DocWordCount,
});

// Code tools
register({
  "html-preview": CodeTools.HtmlPreview,
  "js-runner": CodeTools.JsRunner,
  "css-playground": CodeTools.CssPlayground,
  "json-formatter-pro": CodeTools.JsonFormatter,
  "regex-playground": CodeTools.RegexPlayground,
});

// Design extra tools
register({
  "css-animation-gen": DesignToolsExtra.CssAnimationGen,
  "grid-gen": DesignToolsExtra.GridGen,
  "clip-path-gen": DesignToolsExtra.ClipPathGen,
  "transform-gen": DesignToolsExtra.TransformGen,
});
