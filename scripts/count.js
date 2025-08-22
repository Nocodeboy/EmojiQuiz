/**
 * Script simple para contar preguntas
 * Para ejecutar: node scripts/count.js
 */

const fs = require('fs');
const path = require('path');

// Categorías
const categories = [
    'movies',
    'countries',
    'history',
    'science',
    'literature',
    'technology'
];

// Dificultades
const difficulties = ['easy', 'medium', 'hard'];

// Función para contar preguntas en un archivo
function countQuestionsInFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Buscar patrones para cada nivel de dificultad
        const counts = {};
        let total = 0;
        
        difficulties.forEach(difficulty => {
            // Buscar todas las ocurrencias de "{ emojis:" después de la definición de la dificultad
            const pattern = new RegExp(`${difficulty}:\\s*\\[(.*?)\\]\\s*,?\\s*${difficulties.find(d => d !== difficulty) || 'hard|\\}'}`, 's');
            const match = content.match(pattern);
            
            if (match) {
                const section = match[1];
                // Contar ocurrencias de objetos que comienzan con { emojis:
                const count = (section.match(/{\s*emojis:/g) || []).length;
                counts[difficulty] = count;
                total += count;
            } else {
                // Caso especial para la última sección
                if (difficulty === 'hard') {
                    const hardStart = content.indexOf('hard: [');
                    if (hardStart !== -1) {
                        const hardSection = content.substring(hardStart);
                        const count = (hardSection.match(/{\s*emojis:/g) || []).length;
                        counts[difficulty] = count;
                        total += count;
                    } else {
                        counts[difficulty] = 0;
                    }
                } else {
                    counts[difficulty] = 0;
                }
            }
        });
        
        return { counts, total };
    } catch (error) {
        console.error(`Error leyendo ${filePath}:`, error.message);
        return { counts: { easy: 0, medium: 0, hard: 0 }, total: 0 };
    }
}

console.log('CONTEO DE PREGUNTAS POR CATEGORÍA:');
console.log('=================================');

const categoryCounts = {};
let totalQuestions = 0;

// Contar cada categoría
categories.forEach(category => {
    const filePath = path.join(__dirname, '..', 'data', 'questions', `${category}.js`);
    const { counts, total } = countQuestionsInFile(filePath);
    
    categoryCounts[category] = total;
    totalQuestions += total;
    
    console.log(`\nCategoría: ${category.toUpperCase()}`);
    
    difficulties.forEach(difficulty => {
        console.log(`- ${difficulty}: ${counts[difficulty]} preguntas`);
    });
    
    console.log(`TOTAL: ${total} preguntas`);
});

console.log('\n=================================');
console.log(`TOTAL GENERAL: ${totalQuestions} preguntas`);
console.log('=================================');

// Verificar equilibrio entre categorías
console.log('\nCategorías ordenadas por cantidad:');

Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
        console.log(`- ${category}: ${count} preguntas`);
    });

const categoryTotals = Object.values(categoryCounts);
const minQuestions = Math.min(...categoryTotals);
const maxQuestions = Math.max(...categoryTotals);
const imbalance = maxQuestions - minQuestions;

if (imbalance > 3) {
    console.log(`\nDesequilibrio: Diferencia de ${imbalance} preguntas entre categorías`);
} else {
    console.log(`\nCategorías equilibradas (diferencia máxima: ${imbalance})`);
} 