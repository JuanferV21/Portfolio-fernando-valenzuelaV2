import { render, screen, fireEvent } from '@testing-library/react';
import ProjectsPage from '@/app/projects/page';

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

describe('Projects Page', () => {
  it('renders the main heading', () => {
    render(<ProjectsPage />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/mis proyectos/i);
  });

  it('displays search input', () => {
    render(<ProjectsPage />);
    
    const searchInput = screen.getByPlaceholderText(/buscar proyectos/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('shows category filter buttons', () => {
    render(<ProjectsPage />);
    
    const allButton = screen.getByRole('button', { name: /todos/i });
    const csharpButton = screen.getByRole('button', { name: /c# \/ \.net/i });
    const pythonButton = screen.getByRole('button', { name: /python/i });
    const laravelButton = screen.getByRole('button', { name: /laravel/i });
    
    expect(allButton).toBeInTheDocument();
    expect(csharpButton).toBeInTheDocument();
    expect(pythonButton).toBeInTheDocument();
    expect(laravelButton).toBeInTheDocument();
  });

  it('displays projects grid', () => {
    render(<ProjectsPage />);
    
    // Should have project cards
    const projectCards = screen.getAllByText(/github|demo|en desarrollo/i);
    expect(projectCards.length).toBeGreaterThan(0);
  });

  it('filters projects by category when button is clicked', () => {
    render(<ProjectsPage />);
    
    const pythonButton = screen.getByRole('button', { name: /python/i });
    fireEvent.click(pythonButton);
    
    // The button should be selected (have default variant)
    expect(pythonButton).toHaveClass(/bg-primary/);
  });

  it('shows stats at the bottom', () => {
    render(<ProjectsPage />);
    
    expect(screen.getByText(/proyectos totales/i)).toBeInTheDocument();
    expect(screen.getByText(/destacados/i)).toBeInTheDocument();
  });
});