/**
 * EmojiQuiz - utils/questionManager.js
 * Utilidades para gestionar preguntas
 */

import fs from 'fs';
import path from 'path';

/**
 * Añade una nueva pregunta a una categoría y dificultad
 * @param {Object} questionData - Datos de la pregunta
 * @param {string} questionData.category - Categoría (movies, countries, etc.)
 * @param {string} questionData.difficulty - Dificultad (easy, medium, hard)
 * @param {Array} questionData.emojis - Array de emojis de la pregunta
 * @param {string} questionData.answer - Respuesta correcta
 * @param {Array} questionData.options - Opciones de respuesta (incluyendo la correcta)
 * @returns {boolean} - True si la operación fue exitosa
 */
export async function addQuestion({ category, difficulty, emojis, answer, options }) {
    try {
        // Validar datos
        if (!category || !difficulty || !emojis || !answer || !options) {
            throw new Error('Datos de pregunta incompletos');
        }
        
        if (!options.includes(answer)) {
            throw new Error('La respuesta correcta debe estar entre las opciones');
        }
        
        // Cargar archivo de preguntas existente
        const filePath = path.resolve(`data/questions/${category}.js`);
        
        if (!fs.existsSync(filePath)) {
            throw new Error(`La categoría ${category} no existe`);
        }
        
        let fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Preparar nueva pregunta en formato JSON
        const newQuestion = JSON.stringify({ 
            emojis, 
            answer, 
            options 
        }, null, 4).replace(/"([^"]+)":/g, '$1:');
        
        // Encontrar dónde insertar la nueva pregunta
        const difficultyRegex = new RegExp(`${difficulty}: \\[([\\s\\S]*?)\\]`, 'm');
        const match = fileContent.match(difficultyRegex);
        
        if (!match) {
            throw new Error(`Dificultad ${difficulty} no encontrada en categoría ${category}`);
        }
        
        // Insertar la nueva pregunta al final del array
        const currentQuestions = match[1];
        const updatedQuestions = currentQuestions.endsWith(',') 
            ? `${currentQuestions}\n        ${newQuestion},`
            : `${currentQuestions},\n        ${newQuestion}`;
        
        fileContent = fileContent.replace(difficultyRegex, `${difficulty}: [${updatedQuestions}]`);
        
        // Guardar archivo actualizado
        fs.writeFileSync(filePath, fileContent);
        
        console.log(`✅ Pregunta añadida a ${category} (${difficulty}): "${answer}"`);
        return true;
        
    } catch (error) {
        console.error('❌ Error al añadir pregunta:', error);
        return false;
    }
} 