// Script para contar las preguntas por categoría y dificultad
// Ejecutar con: node countQuestions.js

const questions = require('../data/questions/index.js').questions;

console.log('CONTEO DE PREGUNTAS POR CATEGORÍA:');
console.log('=================================');

const difficulties = ['easy', 'medium', 'hard'];
let totalQuestions = 0;
const categoryCounts = {};

Object.keys(questions).forEach(category => {
    const categoryQuestions = questions[category];
    let categoryTotal = 0;
    
    console.log(`\nCategoría: ${category.toUpperCase()}`);
    
    difficulties.forEach(difficulty => {
        const questionSet = categoryQuestions[difficulty] || [];
        const count = questionSet.length;
        categoryTotal += count;
        totalQuestions += count;
        
        console.log(`- ${difficulty}: ${count} preguntas`);
    });
    
    categoryCounts[category] = categoryTotal;
    console.log(`TOTAL: ${categoryTotal} preguntas`);
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

function getDifficultyEmoji(difficulty) {
    switch(difficulty) {
        case 'easy': return '🟢';
        case 'medium': return '🟡';
        case 'hard': return '🔴';
        default: return '⚪';
    }
} 