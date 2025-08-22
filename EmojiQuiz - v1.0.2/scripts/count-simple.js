/**
 * Script muy simple para contar preguntas
 * node scripts/count-simple.js
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

console.log('CONTEO DE PREGUNTAS POR CATEGORÍA:');
console.log('=================================');

let totalQuestions = 0;
const categoryCounts = {};

// Contar cada categoría
categories.forEach(category => {
    const filePath = path.join(__dirname, '..', 'data', 'questions', `${category}.js`);
    try {
        // Leer el contenido del archivo
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Contar preguntas por dificultad
        const easyRegex = /easy:\s*\[([^]*?)\],\s*medium:/;
        const mediumRegex = /medium:\s*\[([^]*?)\],\s*hard:/;
        const hardRegex = /hard:\s*\[([^]*?)\]\s*};/;
        
        const easyMatch = content.match(easyRegex);
        const mediumMatch = content.match(mediumRegex);
        const hardMatch = content.match(hardRegex);
        
        const easyCount = easyMatch ? (easyMatch[1].match(/{\s*emojis:/g) || []).length : 0;
        const mediumCount = mediumMatch ? (mediumMatch[1].match(/{\s*emojis:/g) || []).length : 0;
        const hardCount = hardMatch ? (hardMatch[1].match(/{\s*emojis:/g) || []).length : 0;
        
        const total = easyCount + mediumCount + hardCount;
        categoryCounts[category] = total;
        totalQuestions += total;
        
        console.log(`\nCategoría: ${category.toUpperCase()}`);
        console.log(`- easy: ${easyCount} preguntas`);
        console.log(`- medium: ${mediumCount} preguntas`);
        console.log(`- hard: ${hardCount} preguntas`);
        console.log(`TOTAL: ${total} preguntas`);
        
    } catch (error) {
        console.error(`Error leyendo ${filePath}:`, error.message);
        categoryCounts[category] = 0;
    }
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