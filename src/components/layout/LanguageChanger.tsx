
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Nearly all major world languages (ISO 639-1 codes, subset for brevity, extend as needed)
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "中文" },
  { code: "hi", name: "हिन्दी" },
  { code: "ar", name: "العربية" },
  { code: "pt", name: "Português" },
  { code: "ru", name: "Русский" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "it", name: "Italiano" },
  { code: "tr", name: "Türkçe" },
  { code: "pl", name: "Polski" },
  { code: "uk", name: "Українська" },
  { code: "ur", name: "اردو" },
  { code: "bn", name: "বাংলা" },
  { code: "fa", name: "فارسی" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "th", name: "ไทย" },
  { code: "ms", name: "Bahasa Melayu" },
  { code: "sw", name: "Kiswahili" },
  { code: "ta", name: "தமிழ்" },
  { code: "nl", name: "Nederlands" },
  { code: "el", name: "Ελληνικά" },
  { code: "hu", name: "Magyar" },
  { code: "cs", name: "Čeština" },
  { code: "ro", name: "Română" },
  { code: "he", name: "עברית" },
  { code: "sv", name: "Svenska" },
  { code: "fi", name: "Suomi" },
  { code: "da", name: "Dansk" },
  { code: "no", name: "Norsk" },
  { code: "sk", name: "Slovenčina" },
  // Add more as needed
];

const LanguageChanger = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code);
    // Here you would connect with i18n
    console.log(`Language changed to: ${code}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-900 hover:bg-gray-700 hover:text-white"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px] max-h-80 overflow-y-scroll">
        {languages.map(language => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={currentLanguage === language.code ? "bg-gray-100" : ""}
          >
            {language.name}
            {currentLanguage === language.code && (
              <span className="ml-auto text-xs bg-brandiaga-yellow-400 text-gray-900 px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageChanger;
