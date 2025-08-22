/**
 * Script simple para verificar duplicados en las preguntas
 * Ejecutar con: node checkDuplicates.js
 */

import { findDuplicateQuestions } from '../data/questions/index.js';

const duplicates = findDuplicateQuestions();
console.log('Buscando preguntas duplicadas...');

if (duplicates.length > 0) {
    console.log(`Se encontraron ${duplicates.length} casos de posibles duplicados:`);
    duplicates.forEach(dup => {
        if (dup.answer) {
            console.log(`  - Respuesta duplicada: "${dup.answer}" (${dup.count} veces)`);
            console.log(`    Ubicaciones: ${dup.instances.join(', ')}`);
        } else if (dup.emojis) {
            console.log(`  - Emojis duplicados: "${dup.emojis}" (${dup.count} veces)`);
            console.log(`    Ubicaciones: ${dup.instances.join(', ')}`);
        }
    });
} else {
    console.log('✅ No se encontraron preguntas duplicadas');
} 