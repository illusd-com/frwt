import { lazy, Suspense } from "react";
import { TextTools } from "./TextTools";
import { EncodeTools } from "./EncodeTools";
import { FormatTools } from "./FormatTools";
import { GeneratorTools } from "./GeneratorTools";
import { ConverterTools } from "./ConverterTools";
import { CalculatorTools } from "./CalculatorTools";
import { DeveloperTools } from "./DeveloperTools";
import { SeoTools } from "./SeoTools";

const toolMap: Record<string, React.ComponentType<{}>> = {};

// Register all tools
function register(components: Record<string, React.ComponentType<{}>>) {
  Object.assign(toolMap, components);
}

export function ToolRenderer({ toolId }: { toolId: string }) {
  const Component = toolMap[toolId];
  if (!Component) {
    return <p className="text-muted-foreground text-center py-8">此工具即將推出</p>;
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
});

// Encode tools
register({
  "base64": EncodeTools.Base64,
  "url-encode": EncodeTools.UrlEncode,
  "html-encode": EncodeTools.HtmlEncode,
  "jwt-decoder": EncodeTools.JwtDecoder,
  "unicode-converter": EncodeTools.UnicodeConverter,
  "morse-code": EncodeTools.MorseCode,
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
});

// Calculator tools
register({
  "percentage-calc": CalculatorTools.PercentageCalc,
  "bmi-calc": CalculatorTools.BmiCalc,
  "age-calc": CalculatorTools.AgeCalc,
  "discount-calc": CalculatorTools.DiscountCalc,
  "tip-calc": CalculatorTools.TipCalc,
  "loan-calc": CalculatorTools.LoanCalc,
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
