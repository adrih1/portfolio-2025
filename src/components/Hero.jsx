// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import BlurText from "../assets/BlurText/BlurText";

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="flex items-center justify-center min-h-screen relative">
      <div className="flex items-center justify-between gap-16 max-w-7xl w-full mx-auto px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          className="w-80 h-80 rounded-full overflow-hidden flex-shrink-0 w-1/2 flex justify-center"
        >
          <img 
            src="/avatar.jpg" 
            alt="Adrien Hors" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="flex flex-col gap-4 w-1/2">
          <BlurText
            text={t('hero.title')}
            delay={500}
            animateBy="words"
            direction="top"
            className="text-4xl font-bold"
          />
          <motion.p 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            className="text-lg"
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default Hero
