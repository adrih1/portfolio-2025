import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import BlurText from '../assets/BlurText/BlurText';


const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto px-8">
        <BlurText
            text={t('about.greeting')}
            delay={100}
            animateBy="words"
            direction="top"
            className="text-7xl font-bold mb-12"
        />
        <div className="text-xl leading-relaxed space-y-6 mb-12">
          <p>
            {t('about.paragraph1')}
          </p>
          <p>
            {t('about.paragraph2')}
          </p>
        </div>
        <div className="flex gap-4">
          <a 
            href="https://www.linkedin.com/in/adrien-hors/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-full"
            title="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
          </a>
          <a 
            href="mailto:adrienhors1@gmail.com"
            className="w-12 h-12 flex items-center justify-center border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white transition-all duration-300 rounded-full"
            title="adrienhors1@gmail.com"
          >
            <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
