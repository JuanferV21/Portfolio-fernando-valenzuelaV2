export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  tags: string[];
  category: string;
  featured: boolean;
  imageUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "desarrollo-web-moderno-react-typescript",
    slug: "desarrollo-web-moderno-react-typescript",
    title: "Desarrollo Web Moderno con React y TypeScript",
    excerpt: "Una guía completa para dominar el desarrollo web moderno utilizando React, TypeScript y las mejores prácticas de la industria.",
    content: `
# Desarrollo Web Moderno con React y TypeScript

El mundo del desarrollo web ha evolucionado dramáticamente en los últimos años. Con la llegada de tecnologías como React y TypeScript, los desarrolladores pueden crear aplicaciones más robustas, escalables y mantenibles.

## ¿Por qué React y TypeScript?

**React** se ha consolidado como una de las bibliotecas más populares para construir interfaces de usuario debido a su:
- Arquitectura basada en componentes
- Virtual DOM para optimización de rendimiento
- Ecosistema rico y comunidad activa
- Flexibilidad y reutilización de código

**TypeScript**, por su parte, añade superpoderes a JavaScript mediante:
- Tipado estático que previene errores
- Autocompletado inteligente en IDEs
- Refactoring seguro
- Mejor documentación del código

## Configuración del Entorno de Desarrollo

Para comenzar un proyecto moderno con React y TypeScript, recomiendo usar **Next.js** que proporciona:

\`\`\`bash
npx create-next-app@latest mi-proyecto --typescript --tailwind --eslint
cd mi-proyecto
npm run dev
\`\`\`

Esta configuración incluye:
- **TypeScript** configurado
- **Tailwind CSS** para estilos
- **ESLint** para calidad de código
- **Next.js** con App Router

## Mejores Prácticas

### 1. Estructura de Componentes

\`\`\`typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium',
        variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
\`\`\`

### 2. Manejo de Estado

Para el estado local, usa \`useState\`:

\`\`\`typescript
function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Incrementar
      </button>
    </div>
  );
}
\`\`\`

### 3. Hooks Personalizados

\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}
\`\`\`

## Herramientas Esenciales

### Testing
- **Vitest** para unit tests
- **Testing Library** para testing de componentes
- **Playwright** para e2e testing

### Desarrollo
- **Vite** para desarrollo rápido
- **Storybook** para documentar componentes
- **Prettier** + **ESLint** para formateo

### Performance
- **React DevTools** para debugging
- **Lighthouse** para auditorías
- **Bundle Analyzer** para optimización

## Conclusión

React con TypeScript ofrece una base sólida para desarrollar aplicaciones web modernas. La inversión inicial en aprender estas tecnologías se paga con creces en términos de productividad, mantenibilidad y calidad del código.

**¿Qué sigue?** Te recomiendo:
1. Práctica constante construyendo proyectos
2. Contribuye a proyectos open source
3. Mantente actualizado con las últimas versiones
4. Únete a la comunidad y comparte conocimiento

¡Happy coding!
    `,
    author: "Juan Fernando Valenzuela",
    publishedAt: "2024-08-15",
    readTime: "8 min",
    tags: ["React", "TypeScript", "Web Development", "Next.js", "JavaScript"],
    category: "Frontend",
    featured: true,
    imageUrl: "/blog/react-typescript.jpg"
  },
  {
    id: "analisis-datos-python-pandas",
    slug: "analisis-datos-python-pandas",
    title: "Análisis de Datos con Python y Pandas",
    excerpt: "Descubre cómo utilizar Python y Pandas para transformar datos en insights valiosos para la toma de decisiones de negocio.",
    content: `
# Análisis de Datos con Python y Pandas

Python se ha convertido en el lenguaje de facto para el análisis de datos gracias a su simplicidad y el poderoso ecosistema de bibliotecas especializadas.

## ¿Por qué Python para Datos?

- **Sintaxis clara y legible**
- **Bibliotecas especializadas** (Pandas, NumPy, Matplotlib)
- **Gran comunidad** y recursos de aprendizaje
- **Integración** con herramientas de ML y visualización

## Configuración del Entorno

\`\`\`bash
pip install pandas numpy matplotlib seaborn jupyter
\`\`\`

## Conceptos Fundamentales

### DataFrames y Series

\`\`\`python
import pandas as pd
import numpy as np

# Crear DataFrame desde diccionario
data = {
    'nombre': ['Ana', 'Juan', 'María', 'Carlos'],
    'edad': [25, 30, 35, 28],
    'salario': [50000, 60000, 70000, 55000]
}

df = pd.DataFrame(data)
print(df.head())
\`\`\`

### Limpieza de Datos

\`\`\`python
# Manejar valores nulos
df.isnull().sum()
df.dropna()  # Eliminar filas con valores nulos
df.fillna(df.mean())  # Llenar con la media

# Detectar duplicados
df.drop_duplicates()
\`\`\`

### Análisis Exploratorio

\`\`\`python
# Estadísticas descriptivas
df.describe()

# Correlaciones
df.corr()

# Agrupaciones
df.groupby('categoria').mean()
\`\`\`

## Visualización de Datos

\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# Gráfico de barras
df.plot(kind='bar')

# Distribución
plt.hist(df['salario'], bins=20)

# Correlación heatmap
sns.heatmap(df.corr(), annot=True)
\`\`\`

## Casos de Uso Reales

1. **Análisis de ventas**
2. **Segmentación de clientes**
3. **Detección de anomalías**
4. **Forecasting básico**

## Conclusión

El análisis de datos con Python y Pandas abre un mundo de posibilidades para extraer insights valiosos de los datos y tomar decisiones informadas.
    `,
    author: "Juan Fernando Valenzuela",
    publishedAt: "2024-07-22",
    readTime: "6 min",
    tags: ["Python", "Pandas", "Data Analysis", "NumPy", "Data Science"],
    category: "Data Science",
    featured: false,
    imageUrl: "/blog/python-pandas.jpg"
  },
  {
    id: "arquitectura-apis-rest-csharp",
    slug: "arquitectura-apis-rest-csharp",
    title: "Arquitectura de APIs REST con C# y .NET Core",
    excerpt: "Aprende a diseñar y construir APIs REST robustas y escalables utilizando C#, .NET Core y las mejores prácticas de la industria.",
    content: `
# Arquitectura de APIs REST con C# y .NET Core

Construir APIs REST robustas es fundamental en el desarrollo de aplicaciones modernas. En este artículo, exploraremos cómo diseñar y implementar APIs utilizando C# y .NET Core.

## Principios de Diseño REST

REST (Representational State Transfer) define un conjunto de principios:

1. **Sin estado**: Cada request debe contener toda la información necesaria
2. **Cacheable**: Las responses deben ser explícitamente cacheables o no
3. **Interfaz uniforme**: Uso consistente de métodos HTTP
4. **Sistema en capas**: Arquitectura modular y separada

## Estructura del Proyecto

\`\`\`
ApiProject/
├── Controllers/
├── Models/
├── Services/
├── Data/
├── DTOs/
└── Middleware/
\`\`\`

## Implementación Básica

### Controlador

\`\`\`csharp
[ApiController]
[Route("api/[controller]")]
public class ProductosController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductosController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductos()
    {
        var productos = await _productService.GetAllAsync();
        return Ok(productos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProducto(int id)
    {
        var producto = await _productService.GetByIdAsync(id);
        if (producto == null)
        {
            return NotFound();
        }
        return Ok(producto);
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProducto(CreateProductDto createDto)
    {
        var producto = await _productService.CreateAsync(createDto);
        return CreatedAtAction(nameof(GetProducto), new { id = producto.Id }, producto);
    }
}
\`\`\`

### Service Layer

\`\`\`csharp
public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllAsync();
    Task<ProductDto?> GetByIdAsync(int id);
    Task<ProductDto> CreateAsync(CreateProductDto createDto);
    Task<bool> UpdateAsync(int id, UpdateProductDto updateDto);
    Task<bool> DeleteAsync(int id);
}

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;
    private readonly IMapper _mapper;

    public ProductService(IProductRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ProductDto>> GetAllAsync()
    {
        var productos = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<ProductDto>>(productos);
    }
}
\`\`\`

## Middleware y Filtros

### Global Exception Handler

\`\`\`csharp
public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        
        var response = new
        {
            error = "Internal server error",
            message = exception.Message
        };

        context.Response.StatusCode = exception switch
        {
            NotFoundException => 404,
            ValidationException => 400,
            UnauthorizedException => 401,
            _ => 500
        };

        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}
\`\`\`

## Validación y DTOs

\`\`\`csharp
public class CreateProductDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }

    [StringLength(500)]
    public string? Description { get; set; }
}

[ApiController]
public class BaseController : ControllerBase
{
    protected ActionResult<T> HandleResult<T>(Result<T> result)
    {
        if (result.IsSuccess)
            return Ok(result.Value);
            
        return result.Error.Type switch
        {
            ErrorType.NotFound => NotFound(result.Error.Message),
            ErrorType.Validation => BadRequest(result.Error.Message),
            _ => StatusCode(500, result.Error.Message)
        };
    }
}
\`\`\`

## Testing

\`\`\`csharp
public class ProductsControllerTests
{
    private readonly Mock<IProductService> _mockService;
    private readonly ProductsController _controller;

    public ProductsControllerTests()
    {
        _mockService = new Mock<IProductService>();
        _controller = new ProductsController(_mockService.Object);
    }

    [Fact]
    public async Task GetProducts_ReturnsOkResult_WithProducts()
    {
        // Arrange
        var productos = new List<ProductDto>
        {
            new ProductDto { Id = 1, Name = "Producto 1" }
        };
        _mockService.Setup(s => s.GetAllAsync()).ReturnsAsync(productos);

        // Act
        var result = await _controller.GetProductos();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<List<ProductDto>>(okResult.Value);
        Assert.Single(returnValue);
    }
}
\`\`\`

## Mejores Prácticas

1. **Versionado de API**: Usa headers o URL path
2. **Paginación**: Para grandes datasets
3. **Rate Limiting**: Protege contra abuso
4. **CORS**: Configura correctamente para frontend
5. **Documentación**: Usa Swagger/OpenAPI
6. **Logging**: Implementa logging estructurado
7. **Monitoring**: Usa Application Insights

## Conclusión

Una API REST bien diseñada es la base de aplicaciones escalables. Seguir estos patrones y prácticas te ayudará a construir APIs mantenibles y robustas.
    `,
    author: "Juan Fernando Valenzuela",
    publishedAt: "2024-06-10",
    readTime: "12 min",
    tags: ["C#", ".NET Core", "API", "REST", "Web API", "Backend"],
    category: "Backend",
    featured: true,
    imageUrl: "/blog/csharp-api.jpg"
  }
];

export const categories = [
  { id: "all", label: "Todos", count: blogPosts.length },
  { id: "frontend", label: "Frontend", count: blogPosts.filter(p => p.category === "Frontend").length },
  { id: "backend", label: "Backend", count: blogPosts.filter(p => p.category === "Backend").length },
  { id: "data-science", label: "Data Science", count: blogPosts.filter(p => p.category === "Data Science").length },
];

export function getBlogPostsByCategory(category: string) {
  if (category === "all") return blogPosts;
  return blogPosts.filter(post => post.category.toLowerCase().replace(" ", "-") === category.toLowerCase());
}

export function getFeaturedBlogPosts() {
  return blogPosts.filter(post => post.featured);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllTags() {
  const tagCounts: Record<string, number> = {};
  
  blogPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getBlogPostsByTag(tag: string) {
  return blogPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}