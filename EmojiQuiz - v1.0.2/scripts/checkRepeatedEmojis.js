/**
 * Script para verificar si hay emojis repetidos en las preguntas
 * Ejecutar con: node checkRepeatedEmojis.js
 */

import { questions } from '../data/questions/index.js';

console.log('🔍 Buscando emojis repetidos en las preguntas...');
let totalWithRepeatedEmojis = 0;

Object.keys(questions).forEach(category => {
    const categoryQuestions = questions[category];
    
    ['easy', 'medium', 'hard'].forEach(difficulty => {
        const questionSet = categoryQuestions[difficulty] || [];
        
        questionSet.forEach((question, index) => {
            if (!question.emojis || !Array.isArray(question.emojis)) {
                return;
            }
            
            // Verificar patrones de repetición diferentes
            
            // 1. Emojis consecutivos idénticos
            const hasConsecutiveEmojis = question.emojis.some((emoji, i, arr) => 
                i > 0 && emoji === arr[i-1]
            );
            
            // 2. Tres o más emojis idénticos en cualquier posición
            const emojiCounts = {};
            question.emojis.forEach(emoji => {
                emojiCounts[emoji] = (emojiCounts[emoji] || 0) + 1;
            });
            const hasMultipleRepeats = Object.values(emojiCounts).some(count => count >= 3);
            
            // 3. Emojis alternados (patrón A,B,A,B)
            const hasAlternatingPattern = question.emojis.length >= 4 && 
                question.emojis[0] === question.emojis[2] && 
                question.emojis[1] === question.emojis[3];
            
            if (hasConsecutiveEmojis || hasMultipleRepeats || hasAlternatingPattern) {
                console.log(`⚠️ Emojis repetitivos en ${category}.${difficulty}[${index}] - ${question.answer}`);
                console.log(`   Emojis: ${question.emojis.join(' ')}`);
                totalWithRepeatedEmojis++;
            }
        });
    });
});

if (totalWithRepeatedEmojis === 0) {
    console.log('✅ No se encontraron preguntas con emojis repetitivos.');
} else {
    console.log(`❌ Se encontraron ${totalWithRepeatedEmojis} preguntas con emojis repetitivos.`);
} 