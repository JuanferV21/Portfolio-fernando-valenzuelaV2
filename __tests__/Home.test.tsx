import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock Next.js components
jest.mock('next/link', () => {
  return function MockedLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<HomePage />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Juan Fernando');
  });

  it('renders the main CTA buttons', () => {
    render(<HomePage />);
    
    const viewProjectsButton = screen.getByRole('link', { name: /ver proyectos/i });
    const downloadCVButton = screen.getByRole('button', { name: /descargar cv/i });
    
    expect(viewProjectsButton).toBeInTheDocument();
    expect(downloadCVButton).toBeInTheDocument();
  });

  it('displays the tagline', () => {
    render(<HomePage />);
    
    expect(screen.getByText(/estudiante de ingeniería en sistemas/i)).toBeInTheDocument();
  });

  it('shows featured projects section', () => {
    render(<HomePage />);
    
    const projectsHeading = screen.getByRole('heading', { name: /proyectos destacados/i });
    expect(projectsHeading).toBeInTheDocument();
  });

  it('displays tech stack section', () => {
    render(<HomePage />);
    
    const stackHeading = screen.getByRole('heading', { name: /stack principal/i });
    expect(stackHeading).toBeInTheDocument();
  });
});