/**
 * Script para validar la integridad de los datos del juego
 * Ejecutar con: node validateData.js
 */

import { questions } from '../data/questions/index.js';
import { categories } from '../data/categories.js';
import { achievements } from '../data/achievements.js';

function validateData() {
    let errors = 0;
    
    console.log('🔍 Validando categorías...');
    categories.forEach(category => {
        if (!category.id || !category.name || !category.icon || !category.description) {
            console.error(`❌ Error: Categoría ${category.id || 'desconocida'} tiene campos faltantes`);
            errors++;
        }
    });
    
    console.log('🔍 Validando preguntas...');
    const categoryIds = categories.map(c => c.id);
    
    Object.keys(questions).forEach(categoryId => {
        if (!categoryIds.includes(categoryId)) {
            console.error(`❌ Error: Preguntas para categoría inexistente: ${categoryId}`);
            errors++;
        }
        
        const difficulties = ['easy', 'medium', 'hard'];
        
        difficulties.forEach(difficulty => {
            const questionsForDifficulty = questions[categoryId][difficulty] || [];
            
            questionsForDifficulty.forEach((question, index) => {
                if (!question.emojis || !question.answer || !question.options) {
                    console.error(`❌ Error: Pregunta incompleta en ${categoryId} (${difficulty}) #${index + 1}`);
                    errors++;
                }
                
                if (!question.options.includes(question.answer)) {
                    console.error(`❌ Error: Respuesta correcta no está entre las opciones: ${categoryId} (${difficulty}) #${index + 1}`);
                    errors++;
                }
                
                if (new Set(question.options).size !== question.options.length) {
                    console.error(`❌ Error: Opciones duplicadas: ${categoryId} (${difficulty}) #${index + 1}`);
                    errors++;
                }
            });
        });
    });
    
    console.log('🔍 Validando logros...');
    achievements.forEach(achievement => {
        if (!achievement.id || !achievement.name || !achievement.description || !achievement.condition) {
            console.error(`❌ Error: Logro ${achievement.id || 'desconocido'} tiene campos faltantes`);
            errors++;
        }
        
        // Intentar evaluar la condición
        try {
            // eslint-disable-next-line no-new-func
            new Function('return ' + achievement.condition.replace(/[a-zA-Z_]+[a-zA-Z0-9_]*/g, '0'));
        } catch (error) {
            console.error(`❌ Error: Condición inválida en logro ${achievement.id}: ${achievement.condition}`);
            errors++;
        }
    });
    
    if (errors === 0) {
        console.log('✅ Todos los datos parecen válidos!');
    } else {
        console.error(`❌ Se encontraron ${errors} errores en los datos.`);
    }
}

validateData(); 