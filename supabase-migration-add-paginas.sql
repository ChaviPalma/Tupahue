-- Agregar columna 'paginas' a la tabla 'libros'
-- Esta columna almacenará el número de páginas de cada libro
-- para calcular el tiempo de préstamo (7 días si < 100 páginas, 14 días si >= 100 páginas)

ALTER TABLE libros 
ADD COLUMN IF NOT EXISTS paginas INTEGER DEFAULT 100;

-- Actualizar libros existentes con valores por defecto
-- Puedes ajustar estos valores según tus libros reales
UPDATE libros SET paginas = 150 WHERE paginas IS NULL;

-- Comentario: Después de ejecutar esta migración, actualiza manualmente
-- el número de páginas de cada libro según corresponda
