import { useParams, useNavigate } from 'react-router-dom';
import projectsData from '../data/projects.json';

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const project = projectsData.projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-bold mb-8">Projet non trouvé</h1>
        <button
          onClick={() => navigate('/', { state: { scrollToProjects: true } })}
          className="px-6 py-3 text-primary hover:text-primary/80 transition-all duration-300"
        >
          Retour aux projets
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <button
        onClick={() => navigate('/', { state: { scrollToProjects: true } })}
        className="mb-8 py-3 text-primary hover:text-primary/80 transition-all duration-300"
      >
        ← Retour aux projets
      </button>

      <div className="relative w-full h-[400px] mb-12 rounded-2xl overflow-hidden">
        <img
          src={project.images.main}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h1 className="text-6xl font-bold mb-8">{project.title}</h1>
        
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xl text-gray-400">{project.date}</span>
          <span className="text-xl text-gray-400">•</span>
          <span className="text-xl text-gray-400">{project.duration}</span>
          <span className="text-xl text-gray-400">•</span>
          <span className="text-xl text-gray-400">Équipe de {project.teamSize} personnes</span>
        </div>

        <p className="text-xl mb-12">{project.fullDescription}</p>

        {project.images.gallery && project.images.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="text-4xl font-semibold mb-6">Galerie d'images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.gallery.map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-semibold mb-6">Fonctionnalités</h2>
            <ul className="list-disc space-y-4">
              {project.features.map((feature, index) => (
                <li key={index} className="text-xl list-none">{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-4xl font-semibold mb-6">Défis techniques</h2>
            <ul className="list-disc space-y-4">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="text-xl list-none">{challenge}</li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-4xl font-semibold mt-12 mb-6">Technologies utilisées</h2>
        <div className="flex flex-wrap gap-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-4 py-2 bg-gray-800 text-white rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-12">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-4 text-primary hover:text-primary/80 transition-all duration-300 text-xl"
          >
            Voir le code source →
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail; 