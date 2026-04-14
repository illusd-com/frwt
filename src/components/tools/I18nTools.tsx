import { useState } from "react";

// 繁簡轉換映射表（常用字）
const t2s: Record<string, string> = {"國":"国","學":"学","對":"对","開":"开","關":"关","點":"点","長":"长","門":"门","時":"时","書":"书","見":"见","車":"车","話":"话","電":"电","風":"风","馬":"马","魚":"鱼","鳥":"鸟","龍":"龙","齊":"齐","齒":"齿","實":"实","將":"将","從":"从","報":"报","場":"场","還":"还","進":"进","運":"运","過":"过","達":"达","選":"选","邊":"边","號":"号","頭":"头","體":"体","類":"类","題":"题","飛":"飞","聽":"听","說":"说","認":"认","議":"议","變":"变","讓":"让","請":"请","論":"论","設":"设","記":"记","計":"计","許":"许","語":"语","調":"调","護":"护","質":"质","買":"买","費":"费","資":"资","賣":"卖","辦":"办","農":"农","歲":"岁","廣":"广","應":"应","張":"张","後":"后","總":"总","戰":"战","據":"据","機":"机","權":"权","條":"条","來":"来","歡":"欢","氣":"气","決":"决","沒":"没","無":"无","獨":"独","現":"现","環":"环","產":"产","當":"当","發":"发","與":"与","義":"义","習":"习","職":"职","聯":"联","華":"华","處":"处","號":"号","術":"术","裝":"装","親":"亲","解":"解","讀":"读","負":"负","軍":"军","農":"农","連":"连","頭":"头","響":"响","離":"离","難":"难","雲":"云","須":"须","願":"愿","類":"类","饑":"饥","養":"养","馬":"马","驗":"验","驚":"惊","鬥":"斗","黨":"党","齡":"龄","離":"离","難":"难","雜":"杂","雞":"鸡","離":"离","隨":"随","險":"险","陽":"阳","陰":"阴","際":"际","雙":"双","雜":"杂","歷":"历","壓":"压","衛":"卫","藝":"艺","範":"范","蘋":"苹","葉":"叶","節":"节","萬":"万","營":"营","衝":"冲","補":"补","製":"制","規":"规","視":"视","觀":"观","覺":"觉","親":"亲","角":"角","證":"证","評":"评","詞":"词","該":"该","誰":"谁","課":"课","億":"亿","傳":"传","傷":"伤","優":"优","價":"价","儀":"仪","備":"备","億":"亿","儲":"储","黑":"黑","極":"极","構":"构","業":"业","標":"标","樣":"样","樂":"乐","橋":"桥","檢":"检","歐":"欧","歷":"历","殺":"杀","減":"减","溝":"沟","漢":"汉","滿":"满","準":"准","濟":"济","燈":"灯","營":"营","灣":"湾","為":"为","烏":"乌","無":"无","煩":"烦","熱":"热","愛":"爱","態":"态","廳":"厅","廠":"厂","縣":"县","終":"终","組":"组","經":"经","結":"结","統":"统","繼":"继","續":"续","維":"维","網":"网","編":"编","練":"练","線":"线","織":"织","繁":"繁","縮":"缩","績":"绩","鐵":"铁","銀":"银","銷":"销","鋼":"钢","錢":"钱","錄":"录","鏡":"镜","閱":"阅","閉":"闭","間":"间","關":"关","闊":"阔","陳":"陈","衣":"衣","頁":"页","預":"预","領":"领","頻":"频","額":"额","顏":"颜","顧":"顾","顯":"显","飛":"飞","養":"养","餐":"餐","駐":"驻","騎":"骑","驗":"验","骨":"骨","齊":"齐","齒":"齿","龍":"龙"};
const s2t = Object.fromEntries(Object.entries(t2s).map(([k, v]) => [v, k]));

function ChineseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const toSimplified = () => setOutput(input.split("").map(c => t2s[c] || c).join(""));
  const toTraditional = () => setOutput(input.split("").map(c => s2t[c] || c).join(""));

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea min-h-[120px]" value={input} onChange={e => setInput(e.target.value)} placeholder="輸入中文文字..." />
      <div className="flex gap-2">
        <button className="tool-btn" onClick={toSimplified}>繁 → 簡</button>
        <button className="tool-btn" onClick={toTraditional}>簡 → 繁</button>
      </div>
      {output && <div className="tool-result whitespace-pre-wrap">{output}</div>}
      <button className="tool-btn-secondary" onClick={() => navigator.clipboard.writeText(output)}>複製結果</button>
    </div>
  );
}

function CountryCode() {
  const [search, setSearch] = useState("");
  const countries = [
    ["TW","TWN","886","台灣"],["CN","CHN","86","中國"],["JP","JPN","81","日本"],["KR","KOR","82","韓國"],
    ["US","USA","1","美國"],["GB","GBR","44","英國"],["FR","FRA","33","法國"],["DE","DEU","49","德國"],
    ["AU","AUS","61","澳洲"],["CA","CAN","1","加拿大"],["SG","SGP","65","新加坡"],["HK","HKG","852","香港"],
    ["MO","MAC","853","澳門"],["TH","THA","66","泰國"],["VN","VNM","84","越南"],["MY","MYS","60","馬來西亞"],
    ["ID","IDN","62","印尼"],["PH","PHL","63","菲律賓"],["IN","IND","91","印度"],["BR","BRA","55","巴西"],
    ["MX","MEX","52","墨西哥"],["RU","RUS","7","俄羅斯"],["IT","ITA","39","義大利"],["ES","ESP","34","西班牙"],
    ["NL","NLD","31","荷蘭"],["SE","SWE","46","瑞典"],["CH","CHE","41","瑞士"],["NZ","NZL","64","紐西蘭"],
    ["AE","ARE","971","阿聯酋"],["SA","SAU","966","沙烏地阿拉伯"],["IL","ISR","972","以色列"],["EG","EGY","20","埃及"],
  ];
  const filtered = countries.filter(c => c.some(f => f.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="space-y-4">
      <input className="w-full rounded border bg-card p-2 text-sm" value={search} onChange={e => setSearch(e.target.value)} placeholder="搜尋國家..." />
      <div className="overflow-x-auto max-h-[400px]">
        <table className="w-full text-sm border-collapse">
          <thead><tr>{["國家","ISO-2","ISO-3","電話區碼"].map(h => <th key={h} className="border bg-muted/50 p-2 text-left sticky top-0">{h}</th>)}</tr></thead>
          <tbody>{filtered.map(([a2, a3, phone, name]) => (
            <tr key={a2}><td className="border p-2">{name}</td><td className="border p-2 font-mono">{a2}</td><td className="border p-2 font-mono">{a3}</td><td className="border p-2 font-mono">+{phone}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function TimezoneList() {
  const zones = [
    ["UTC-12:00","Baker Island"],["UTC-11:00","American Samoa"],["UTC-10:00","Hawaii"],["UTC-09:00","Alaska"],
    ["UTC-08:00","太平洋時間 (LA)"],["UTC-07:00","山地時間 (Denver)"],["UTC-06:00","中部時間 (Chicago)"],["UTC-05:00","東部時間 (NY)"],
    ["UTC-04:00","大西洋時間"],["UTC-03:00","巴西利亞"],["UTC-02:00","大西洋中部"],["UTC-01:00","亞速爾群島"],
    ["UTC+00:00","倫敦/GMT"],["UTC+01:00","巴黎/柏林"],["UTC+02:00","開羅/雅典"],["UTC+03:00","莫斯科/伊斯坦堡"],
    ["UTC+04:00","杜拜"],["UTC+05:00","喀拉蚩"],["UTC+05:30","孟買"],["UTC+06:00","達卡"],
    ["UTC+07:00","曼谷"],["UTC+08:00","台北/北京/香港"],["UTC+09:00","東京/首爾"],["UTC+09:30","阿德萊德"],
    ["UTC+10:00","雪梨"],["UTC+11:00","所羅門群島"],["UTC+12:00","奧克蘭"],["UTC+13:00","東加"],
  ];
  const now = new Date();

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto max-h-[500px]">
        <table className="w-full text-sm border-collapse">
          <thead><tr>{["時區","代表城市","目前時間"].map(h => <th key={h} className="border bg-muted/50 p-2 text-left sticky top-0">{h}</th>)}</tr></thead>
          <tbody>{zones.map(([tz, city]) => {
            const offset = parseInt(tz.replace("UTC", ""));
            const local = new Date(now.getTime() + (offset - now.getTimezoneOffset() / -60) * 3600000);
            return (
              <tr key={tz}><td className="border p-2 font-mono">{tz}</td><td className="border p-2">{city}</td><td className="border p-2 font-mono">{local.toLocaleTimeString("zh-TW")}</td></tr>
            );
          })}</tbody>
        </table>
      </div>
    </div>
  );
}

function LocaleFormat() {
  const [num] = useState(1234567.89);
  const [date] = useState(new Date());
  const locales = ["zh-TW","zh-CN","en-US","ja-JP","ko-KR","de-DE","fr-FR","es-ES","ar-SA","hi-IN","pt-BR","ru-RU"];

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead><tr>{["地區","數字格式","貨幣格式","日期格式"].map(h => <th key={h} className="border bg-muted/50 p-2 text-left">{h}</th>)}</tr></thead>
          <tbody>{locales.map(locale => (
            <tr key={locale}>
              <td className="border p-2 font-mono">{locale}</td>
              <td className="border p-2 font-mono">{num.toLocaleString(locale)}</td>
              <td className="border p-2 font-mono">{num.toLocaleString(locale, { style: "currency", currency: locale === "zh-TW" ? "TWD" : locale === "ja-JP" ? "JPY" : locale === "en-US" ? "USD" : locale === "zh-CN" ? "CNY" : "EUR" })}</td>
              <td className="border p-2 font-mono">{date.toLocaleDateString(locale)}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function CharsetDetect() {
  const [input, setInput] = useState("");
  const detect = () => {
    if (!input) return [];
    const results: string[] = [];
    const hasAscii = /^[\x00-\x7F]*$/.test(input);
    const hasCJK = /[\u4e00-\u9fff]/.test(input);
    const hasKana = /[\u3040-\u309f\u30a0-\u30ff]/.test(input);
    const hasKorean = /[\uac00-\ud7af]/.test(input);
    const hasEmoji = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}]/u.test(input);
    if (hasAscii && !hasCJK && !hasKana && !hasKorean) results.push("ASCII / UTF-8 (純英文)");
    if (hasCJK) results.push("包含 CJK 統一漢字 (中/日/韓)");
    if (hasKana) results.push("包含日文假名");
    if (hasKorean) results.push("包含韓文");
    if (hasEmoji) results.push("包含 Emoji");
    results.push(`UTF-8 位元組數: ~${new TextEncoder().encode(input).length}`);
    results.push(`UTF-16 碼元數: ${input.length}`);
    results.push(`字元數（含 surrogate pair）: ${[...input].length}`);
    return results;
  };

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={input} onChange={e => setInput(e.target.value)} placeholder="輸入文字以偵測編碼..." />
      {input && (
        <div className="space-y-1">
          {detect().map((r, i) => <div key={i} className="tool-result py-1.5 text-sm">{r}</div>)}
        </div>
      )}
    </div>
  );
}

function I18nKeyGen() {
  const [text, setText] = useState("使用者登入頁面\n忘記密碼\n送出表單\n載入中...");
  const toKey = (s: string) => s.trim().replace(/[^\w\u4e00-\u9fff]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "").toLowerCase();

  const lines = text.split("\n").filter(Boolean);
  const result = JSON.stringify(Object.fromEntries(lines.map(l => [toKey(l) || "key", l.trim()])), null, 2);

  return (
    <div className="space-y-4">
      <textarea className="tool-textarea" value={text} onChange={e => setText(e.target.value)} placeholder="每行一個翻譯文字..." />
      <pre className="tool-result whitespace-pre-wrap text-xs">{result}</pre>
      <button className="tool-btn" onClick={() => navigator.clipboard.writeText(result)}>複製 JSON</button>
    </div>
  );
}

export const I18nTools = { ChineseConverter, CountryCode, TimezoneList, LocaleFormat, CharsetDetect, I18nKeyGen };
