import { Component } from '@angular/core';
import { Project } from './projects.interface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  selectedProject: Project | null = null;
  showModal = false;

  projects: Project[] = [
    {
      id: 1,
      title: 'Previous Portfolio',
      description:
        'Um portfólio anterior desenvolvido para mostrar meus projetos e habilidades como desenvolvedor. Interface moderna e responsiva com animações suaves.',
      image: 'assets/project-1.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Angular'],
      link: 'https://dev-jean-gomes.netlify.app/',
      github: 'https://github.com/jean-gomes/portfolio-anterior',
    },
    {
      id: 2,
      title: 'Fantastic Animals Blog',
      description:
        'Blog sobre animais fantásticos com sistema de posts, categorias e busca. Desenvolvido com foco em performance e SEO.',
      image: 'assets/project-2.png',
      technologies: ['React', 'TypeScript', 'Next.js', 'Styled Components'],
      link: 'https://animais-fantasticos-js.vercel.app/',
      github: 'https://github.com/jean-gomes/fantastic-animals-blog',
    },
    {
      id: 3,
      title: 'Landing Page Clinic',
      description:
        'Landing page para clínica médica com design moderno e responsivo. Inclui seções de serviços, sobre a clínica e formulário de contato.',
      image: 'assets/project-3.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      link: 'https://html-tailwind-responsive.vercel.app/',
      client: 'Clínica Médica São Paulo',
    },
    {
      id: 4,
      title: 'My To-Do List',
      description:
        'Aplicação de lista de tarefas com funcionalidades de adicionar, editar, excluir e marcar como concluída. Dados persistidos no localStorage.',
      image: 'assets/project-4.png',
      technologies: ['React', 'TypeScript', 'CSS Modules', 'LocalStorage'],
      link: 'https://to-do-list-angular-phi.vercel.app/',
      github: 'https://github.com/jean-gomes/todo-list-app',
    },
    {
      id: 5,
      title: 'Ignite Feed',
      description:
        'Rede social simples para aprendizado de React com TypeScript. Inclui sistema de posts, comentários e interações sociais.',
      image: 'assets/project-5.png',
      technologies: ['React', 'TypeScript', 'Vite', 'CSS Modules'],
      link: 'https://project-ignite-feed-ts.vercel.app/',
      github: 'https://github.com/jean-gomes/ignite-feed-ts',
      client: 'Rocketseat',
    },
    {
      id: 6,
      title: 'Case RIO Analytics Dashboard',
      description:
        'Dashboard de analytics para análise de dados com gráficos interativos e relatórios em tempo real. Desenvolvido para case de estudo.',
      image: 'assets/project-6.png',
      technologies: ['Angular', 'TypeScript', 'Chart.js', 'Bootstrap'],
      link: 'https://rio-analytics-dashboard.vercel.app',
      github: 'https://github.com/jean-gomes/rio-analytics-dashboard',
    },
  ];

  openModal(project: Project): void {
    this.selectedProject = project;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProject = null;
  }
}
