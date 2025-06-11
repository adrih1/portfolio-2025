// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion"
import { useTranslation } from 'react-i18next'
import ThemeToggle from "./ThemeToggle"
import LanguageSelector from "./LanguageSelector"

function Navbar() {
  const { scrollY } = useScroll()
  const { t, i18n } = useTranslation();


  const width = useTransform(scrollY, [0, 800], ["95%", "60%"])
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(200, 200, 200, 0.6)", "rgba(36, 36, 36, 1)"]
  )
  const textColor = useTransform(
    scrollY,
    [0, 100],
    ["rgb(255, 255, 255)", "rgb(255, 255, 255)"]
  )

  const cvFile = i18n.language === 'en' ? '/cv/cveng.pdf' : '/cv/cvfr.pdf';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.31, duration: 1, ease: "easeOut" }}
      style={{
        width,
        backgroundColor,
      }}
      className="fixed top-0 left-0 right-0 mx-auto my-4 py-4 px-8 backdrop-blur-sm shadow-sm rounded-full z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <div className="flex-1">
          <motion.li style={{ color: textColor }} className="hover:text-gray-300 transition-colors inline-block list-none">
            <a href={cvFile} target="_blank" rel="noopener noreferrer">CV</a>
          </motion.li>
        </div>
        
        <motion.li style={{ color: textColor }} className="text-xl font-medium absolute left-1/2 transform -translate-x-1/2 list-none">
          <a href="/">Adrien</a>
        </motion.li>

        <div className="flex-1 flex items-center justify-end gap-6">
          <motion.li style={{ color: textColor }} className="hover:text-gray-300 transition-colors list-none">
            <a href="mailto:your.email@example.com">Email</a>
          </motion.li>
          <motion.li style={{ color: textColor }} className="hover:text-gray-300 transition-colors list-none">
            <a href="/about">{t('nav.about')}</a>
         
          </motion.li>
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
