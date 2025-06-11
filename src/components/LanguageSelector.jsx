import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('fr')}
        className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors aspect-square w-10 flex items-center justify-center overflow-hidden ${
          i18n.language === 'fr' ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        aria-label="Switch to French"
      >
        <span className="text-xl">🇫🇷</span>
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors aspect-square w-10 flex items-center justify-center overflow-hidden ${
          i18n.language === 'en' ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        aria-label="Switch to English"
      >
        <span className="text-xl">🇬🇧</span>
      </button>
    </div>
  );
}

export default LanguageSelector; 