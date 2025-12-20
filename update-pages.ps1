# Script para actualizar todos los archivos Client.js con los nuevos componentes Navbar y Footer

$files = @(
    "actividades\ActividadesClient.js",
    "biblioteca\BibliotecaClient.js",
    "ministerios\MinisteriosClient.js",
    "nosotros\NosotrosClient.js"
)

foreach ($file in $files) {
    $filePath = "app\$file"
    Write-Host "Actualizando $filePath..."
    
    $content = Get-Content $filePath -Raw
    
    # Reemplazar imports
    $content = $content -replace "import \{ useEffect \} from 'react';", ""
    $content = $content -replace "('use client';[\r\n]+)", "`$1`nimport Navbar from '../components/Navbar';`nimport Footer from '../components/Footer';`n"
    
    # Eliminar el useEffect del navbar
    $content = $content -replace "(?s)useEffect\(\(\) => \{.*?navbarToggle.*?\}, \[\]\);[\r\n]+", ""
    
    # Reemplazar el navbar completo con el componente
    $content = $content -replace "(?s)<nav className=\{`\$\{styles\.navbar\}.*?</nav>", "<Navbar />"
    
    # Reemplazar el footer completo con el componente
    $content = $content -replace "(?s)<footer className=\{styles\.footer\}>.*?</footer>", "<Footer />"
    
    Set-Content $filePath $content
    Write-Host "✓ $filePath actualizado"
}

Write-Host "`n✓ Todos los archivos actualizados!"
