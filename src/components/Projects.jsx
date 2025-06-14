import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import projectsData from '../data/projects.json';
import CircularText from '../assets/CircularText/CircularText';

function Projects() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const projects = [...projectsData.projects].sort((a, b) => new Date(b.date) - new Date(a.date));
    const [isThreeJSHovered, setIsThreeJSHovered] = useState(false);
    
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 40;
      const rotateY = (centerX - x) / 40;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = (e) => {
      const card = e.currentTarget;
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };
  
    return (
      <section id="projects" className="py-8 md:py-16">
        {isThreeJSHovered && (
          <div 
            className="fixed pointer-events-none z-50"
            style={{
              left: 'var(--mouse-x, 50%)',
              top: 'var(--mouse-y, 50%)',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <CircularText
              text="WORK*IN*PROGRESS*"
              onHover="speedUp"
              spinDuration={10}
              className="w-30 h-30 text-md"
            />
          </div>
        )}
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-16 pl-4">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center"
              >
                <a
                  href={project.id === 'threejs' ? '#' : `/projects/${project.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (project.id === 'threejs') {
                      return;
                    }
                    navigate(`/projects/${project.id}`);
                  }}
                  className="relative rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 w-full h-[300px] md:h-[400px] group bg-gray-900 cursor-pointer"
                  onMouseMove={(e) => {
                    handleMouseMove(e);
                    if (project.id === 'threejs') {
                      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
                      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
                    }
                  }}
                  onMouseLeave={(e) => {
                    handleMouseLeave(e);
                    if (project.id === 'threejs') {
                      setIsThreeJSHovered(false);
                    }
                  }}
                  onMouseEnter={() => {
                    if (project.id === 'threejs') {
                      setIsThreeJSHovered(true);
                    }
                  }}
                  style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
                >
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-120">
                    <img 
                      src={project.images.main} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 transition-opacity duration-300 group-hover:opacity-60" />
                  <div className="relative p-4 md:p-8 h-full flex flex-col justify-between text-white" style={{ transform: 'translateZ(20px)' }}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 max-w-full md:max-w-[70%]">
                        {project.technologies.slice(0, 2).map((tech, i) => (
                          <span 
                            key={i} 
                            className="px-2 md:px-4 py-1 md:py-2 bg-white/20 backdrop-blur-xs rounded-full text-sm md:text-lg min-w-12 md:min-w-16 text-center 
                                     hover:bg-white/30 hover:scale-105 transition-all duration-300 cursor-default whitespace-nowrap"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 2 && (
                          <span className="px-2 md:px-4 py-1 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm md:text-lg min-w-12 md:min-w-16 text-center 
                                         hover:bg-white/30 hover:scale-105 transition-all duration-300 cursor-default">
                            +{project.technologies.length - 2}
                          </span>
                        )}
                      </div>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-300 font-medium text-base md:text-xl inline-block transition-colors duration-300 whitespace-nowrap relative z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t('projects.sourceCode')} →
                      </a>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-2xl md:text-4xl font-semibold">{project.title}</h3>
                      </div>
                      <p className="text-gray-200 text-base md:text-xl leading-relaxed">{project.shortDescription}</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (project.id !== 'threejs') {
                            navigate(`/projects/${project.id}`);
                          }
                        }}
                        className={`mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-300 text-sm md:text-base ${
                          project.id !== 'threejs'
                            ? 'bg-white/20 hover:bg-white/30 hover:cursor-pointer' 
                            : 'bg-white/10 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {t('projects.learnMore')}
                      </button>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
export default Projects