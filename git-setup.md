# 🚀 Comandos para Conectar con GitHub

## 5. Conectar con el repositorio remoto

**IMPORTANTE:** Reemplaza `TU_USUARIO` con tu nombre de usuario real de GitHub

```bash
# Conectar con el repositorio remoto (CAMBIA TU_USUARIO)
git remote add origin https://github.com/JuanferV21/portfolio-juan-fernando.git

# Verificar la conexión
git remote -v

# Cambiar el nombre de la rama principal (recomendado)
git branch -M main

# Subir código por primera vez
git push -u origin main
```

## 📝 Flujo de Trabajo Diario

### Después de hacer cambios locales:

```bash
# Ver qué archivos cambiaron
git status

# Agregar cambios específicos
git add src/components/
git add src/data/profile.ts
# O agregar todos los cambios
git add .

# Ver diferencias antes de commit
git diff --staged

# Hacer commit con mensaje descriptivo
git commit -m "feat: Update profile information and add new project"

# Subir cambios a GitHub
git push
```

### Comandos útiles:

```bash
# Ver historial de commits
git log --oneline

# Ver diferencias sin staged
git diff

# Deshacer cambios no guardados
git checkout -- nombre-archivo.tsx

# Ver ramas
git branch

# Crear nueva rama para experimentar
git checkout -b feature/nueva-funcionalidad

# Cambiar entre ramas
git checkout main
git checkout feature/nueva-funcionalidad

# Mergear rama de funcionalidad
git checkout main
git merge feature/nueva-funcionalidad

# Eliminar rama después de merge
git branch -d feature/nueva-funcionalidad
```

## 🔄 Mantener Sincronizado

Si trabajas desde múltiples computadoras:

```bash
# Antes de empezar a trabajar, actualizar
git pull

# Después de trabajar, subir cambios
git add .
git commit -m "Description of changes"
git push
```

## ⚡ Scripts Rápidos

Puedes agregar estos scripts a tu `package.json`:

```json
{
  "scripts": {
    "deploy:save": "git add . && git commit -m",
    "deploy:push": "git push",
    "deploy:quick": "git add . && git commit -m 'Quick update' && git push"
  }
}
```

Uso:
```bash
# Commit rápido
pnpm run deploy:save "Updated homepage design"
pnpm run deploy:push

# O todo en uno
pnpm run deploy:quick
```