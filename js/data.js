/**
 * EmojiQuiz - data.js
 * Este archivo contiene todos los datos de categorías, preguntas y respuestas del juego
 */

// Objeto principal con todos los datos del juego
const gameData = {
    // Categorías disponibles
    categories: [
        {
            id: "movies",
            name: "Películas",
            icon: "🎬",
            description: "Adivina películas famosas a partir de sus emojis",
            unlocked: true,
            color: "#e74c3c"
        },
        {
            id: "countries",
            name: "Países",
            icon: "🌍",
            description: "Descubre países a través de emojis relacionados",
            unlocked: true,
            color: "#3498db"
        },
        {
            id: "history",
            name: "Historia",
            icon: "📜",
            description: "Eventos históricos representados con emojis",
            unlocked: true,
            color: "#f39c12"
        },
        {
            id: "science",
            name: "Ciencia",
            icon: "🔬",
            description: "Conceptos científicos en forma de emojis",
            unlocked: true,
            color: "#2ecc71"
        },
        {
            id: "literature",
            name: "Literatura",
            icon: "📚",
            description: "Libros y obras literarias en emojis",
            unlocked: false,
            unlockLevel: 2,
            color: "#9b59b6"
        },
        {
            id: "technology",
            name: "Tecnología",
            icon: "💻",
            description: "Conceptos tecnológicos mediante emojis",
            unlocked: false,
            unlockLevel: 2,
            color: "#1abc9c"
        }
    ],
    
    // Preguntas organizadas por categoría y nivel de dificultad
 questions: {
        movies: {
            easy: [
                { emojis: ["🦁", "👑"], answer: "El Rey León", options: ["El Rey León", "Tarzán", "Madagascar", "Jumanji"] },
                { emojis: ["👦", "🧙‍♂️", "⚡"], answer: "Harry Potter", options: ["Harry Potter", "El Señor de los Anillos", "Las Crónicas de Narnia", "Percy Jackson"] },
                { emojis: ["🧊", "❄️", "👑", "⛄"], answer: "Frozen", options: ["La Era de Hielo", "Frozen", "El Muñeco de Nieve", "El Reino Helado"] },
                { emojis: ["🚗", "🏁", "⚡"], answer: "Cars", options: ["Rápido y Furioso", "Cars", "Transformers", "Hot Wheels"] },
                { emojis: ["🧸", "👦", "🤠"], answer: "Toy Story", options: ["Toy Story", "Christopher Robin", "Pinocho", "El Cascanueces"] },
                { emojis: ["🦕", "🏃‍♂️", "🏃‍♂️", "🏃‍♂️"], answer: "Parque Jurásico", options: ["Parque Jurásico", "King Kong", "Godzilla", "La Isla Perdida"] },
                { emojis: ["👻", "👻", "👻", "👻"], answer: "Cazafantasmas", options: ["Cazafantasmas", "Poltergeist", "El Exorcista", "La Profecía"] },
                { emojis: ["🦈", "🌊", "🏊‍♂️", "🏖️"], answer: "Tiburón", options: ["Tiburón", "Profundo Azul", "La Profundidad", "El Mar"] }
            ],
            medium: [
                { emojis: ["🏠", "👦", "🏃‍♂️", "🧔"], answer: "Solo en Casa", options: ["Solo en Casa", "El Intruso", "Papá por Siempre", "Pequeño Fugitivo"] },
                { emojis: ["🚢", "💏", "🧊"], answer: "Titanic", options: ["Titanic", "Poseidón", "Mar Adentro", "La Tormenta Perfecta"] },
                { emojis: ["🦖", "🏝️", "🧬"], answer: "Jurassic Park", options: ["King Kong", "Godzilla", "Jurassic Park", "La Isla Perdida"] },
                { emojis: ["🤖", "❤️", "🌱", "🚀"], answer: "WALL-E", options: ["WALL-E", "Transformers", "Star Wars", "Los Supersónicos"] },
                { emojis: ["🐀", "👨‍🍳", "🍲"], answer: "Ratatouille", options: ["Ratatouille", "El Cocinero", "La Rata Gourmet", "Cocina Conmigo"] },
                { emojis: ["🃏", "👨", "😈", "🎭"], answer: "Joker", options: ["Joker", "El Caballero Oscuro", "Batman", "El Hombre que Ríe"] },
                { emojis: ["🌍", "🌡️", "🌊", "🌪️"], answer: "El Día de Mañana", options: ["El Día de Mañana", "2012", "Impacto Profundo", "La Tormenta Perfecta"] },
                { emojis: ["🤖", "❤️", "🌱", "🌍"], answer: "WALL-E", options: ["WALL-E", "Robots", "Big Hero 6", "Astro Boy"] }
            ],
            hard: [
                { emojis: ["🌊", "💭", "🔍", "👫"], answer: "Origen", options: ["Matrix", "Origen", "El Efecto Mariposa", "La Isla Siniestra"] },
                { emojis: ["👨‍🚀", "🌽", "👨‍👧", "🕰️"], answer: "Interestelar", options: ["Gravity", "Marte", "Interestelar", "Apolo 13"] },
                { emojis: ["🤡", "🃏", "💥", "🦇"], answer: "El Caballero Oscuro", options: ["Joker", "El Caballero Oscuro", "Escuadrón Suicida", "Batman Inicia"] },
                { emojis: ["💍", "👁️", "🧙‍♂️", "🌋"], answer: "El Señor de los Anillos", options: ["Harry Potter", "El Hobbit", "El Señor de los Anillos", "Las Crónicas de Narnia"] },
                { emojis: ["🤵", "🔫", "🍸", "🎰"], answer: "Casino Royale", options: ["Misión Imposible", "Casino Royale", "El Padrino", "Ocean's Eleven"] },
                { emojis: ["🎪", "🎵", "🕺", "🎭"], answer: "El Gran Showman", options: ["El Gran Showman", "La Vida es Bella", "El Circo", "El Artista"] },
                { emojis: ["🎬", "🎵", "🎹", "🎞️"], answer: "La La Land", options: ["La La Land", "Moulin Rouge", "Cantando bajo la Lluvia", "Grease"] },
                { emojis: ["🎥", "🤫", "⚫", "⚪"], answer: "El Artista", options: ["El Artista", "La La Land", "Cantando bajo la Lluvia", "Moulin Rouge"] }
            ]
        },
        countries: {
            easy: [
                { emojis: ["🌮", "🌵", "🔔"], answer: "México", options: ["España", "México", "Colombia", "Perú"] },
                { emojis: ["🍕", "🏛️", "🍝"], answer: "Italia", options: ["Grecia", "Francia", "Italia", "Portugal"] },
                { emojis: ["🐨", "🦘", "🏄‍♂️"], answer: "Australia", options: ["Australia", "Nueva Zelanda", "Sudáfrica", "Brasil"] },
                { emojis: ["🍣", "🗻", "🌸"], answer: "Japón", options: ["China", "Corea", "Japón", "Tailandia"] },
                { emojis: ["🗽", "🍔", "🏈"], answer: "Estados Unidos", options: ["Canadá", "Inglaterra", "Estados Unidos", "Australia"] },
                { emojis: ["🍺", "🍺", "🍺", "🍺"], answer: "Alemania", options: ["Alemania", "Bélgica", "República Checa", "Austria"] },
                { emojis: ["🍜", "🍜", "🍜", "🍜"], answer: "Japón", options: ["Japón", "Corea del Sur", "China", "Vietnam"] },
                { emojis: ["🍕", "🍕", "🍕", "🍕"], answer: "Italia", options: ["Italia", "España", "Grecia", "Portugal"] }
            ],
            medium: [
                { emojis: ["🥐", "🗼", "🍷"], answer: "Francia", options: ["Italia", "Francia", "Bélgica", "Suiza"] },
                { emojis: ["☕", "🌧️", "👑"], answer: "Reino Unido", options: ["Irlanda", "Reino Unido", "Holanda", "Bélgica"] },
                { emojis: ["🏺", "🏛️", "🫒"], answer: "Grecia", options: ["Italia", "Turquía", "Chipre", "Grecia"] },
                { emojis: ["🍺", "🌭", "🏰"], answer: "Alemania", options: ["República Checa", "Austria", "Alemania", "Bélgica"] },
                { emojis: ["🍁", "🏒", "🐻"], answer: "Canadá", options: ["Rusia", "Suecia", "Noruega", "Canadá"] },
                { emojis: ["🏺", "🏛️", "🫒", "🏝️"], answer: "Grecia", options: ["Grecia", "Italia", "España", "Portugal"] },
                { emojis: ["🐫", "🏜️", "🔺", "🏛️"], answer: "Egipto", options: ["Egipto", "Marruecos", "Túnez", "Argelia"] },
                { emojis: ["🐘", "🧘‍♂️", "🌶️", "🕉️"], answer: "India", options: ["India", "Pakistán", "Bangladesh", "Sri Lanka"] }
            ],
            hard: [
                { emojis: ["🐘", "🏏", "🚩", "🕉️"], answer: "India", options: ["Nepal", "India", "Pakistán", "Bangladesh"] },
                { emojis: ["🧉", "🥩", "💃"], answer: "Argentina", options: ["Uruguay", "Argentina", "Chile", "Brasil"] },
                { emojis: ["🐫", "🏜️", "🔺"], answer: "Egipto", options: ["Marruecos", "Arabia Saudita", "Egipto", "Túnez"] },
                { emojis: ["🐯", "🥢", "🧧"], answer: "China", options: ["Japón", "China", "Corea del Sur", "Vietnam"] },
                { emojis: ["🥥", "🏝️", "🏊‍♂️"], answer: "Filipinas", options: ["Tailandia", "Indonesia", "Filipinas", "Malasia"] },
                { emojis: ["⚽", "🌴", "🥥", "🏖️"], answer: "Brasil", options: ["Brasil", "Argentina", "Colombia", "Perú"] },
                { emojis: ["🧸", "❄️", "⛄", "🏔️"], answer: "Rusia", options: ["Rusia", "Ucrania", "Bielorrusia", "Kazajistán"] },
                { emojis: ["🦁", "🌵", "🧭", "🌄"], answer: "Sudáfrica", options: ["Sudáfrica", "Nigeria", "Kenia", "Egipto"] }
            ]
        },
        history: {
            easy: [
                { emojis: ["🏛️", "⚔️", "👑"], answer: "Imperio Romano", options: ["Imperio Romano", "Antigua Grecia", "Edad Media", "Imperio Mongol"] },
                { emojis: ["🚢", "🇺🇸", "🇬🇧", "☕"], answer: "Fiesta del Té de Boston", options: ["Guerra Civil Americana", "Fiesta del Té de Boston", "Guerra de Independencia", "Tratado de Versalles"] },
                { emojis: ["🚀", "👨‍🚀", "🌕", "🇺🇸"], answer: "Llegada a la Luna", options: ["Guerra Fría", "Carrera Espacial", "Llegada a la Luna", "Programa Apollo"] },
                { emojis: ["🏰", "⚔️", "🐎", "👑"], answer: "Edad Media", options: ["Renacimiento", "Edad Media", "Edad Antigua", "Guerra de los Cien Años"] },
                { emojis: ["🗽", "🇫🇷", "🇺🇸", "🎁"], answer: "Estatua de la Libertad", options: ["Revolución Francesa", "Estatua de la Libertad", "Independencia de EE.UU.", "Declaración de los Derechos Humanos"] },
                { emojis: ["👑", "🔪", "🇫🇷", "🗣️"], answer: "Revolución Francesa", options: ["Revolución Francesa", "Revolución Rusa", "Guerra Civil Inglesa", "Caída del Imperio Romano"] },
                { emojis: ["💣", "⚔️", "🌍", "✈️"], answer: "Primera Guerra Mundial", options: ["Primera Guerra Mundial", "Segunda Guerra Mundial", "Guerra Fría", "Guerra de Vietnam"] },
                { emojis: ["🧱", "🔨", "🇩🇪", "🕊️"], answer: "Caída del Muro de Berlín", options: ["Caída del Muro de Berlín", "Revolución Rusa", "Guerra Fría", "Reunificación de Alemania"] }
            ],
            medium: [
                { emojis: ["⚓", "🌊", "🧭", "🌎"], answer: "Descubrimiento de América", options: ["Descubrimiento de América", "Vuelta al Mundo", "Ruta de la Seda", "Conquista del Pacífico"] },
                { emojis: ["👑", "🔪", "🇫🇷", "⚰️"], answer: "Revolución Francesa", options: ["Revolución Francesa", "Revolución Rusa", "Guerra Civil Inglesa", "Caída del Imperio Romano"] },
                { emojis: ["🧱", "🏙️", "🇩🇪", "🔨"], answer: "Caída del Muro de Berlín", options: ["Caída del Muro de Berlín", "Construcción de la Gran Muralla", "Segunda Guerra Mundial", "Reunificación de Italia"] },
                { emojis: ["🤴", "📜", "👑", "🏴󠁧󠁢󠁥󠁮󠁧󠁿"], answer: "Carta Magna", options: ["Declaración de Independencia", "Carta Magna", "Edicto de Milán", "Tratado de Versalles"] },
                { emojis: ["🏭", "💨", "⚙️", "🧵"], answer: "Revolución Industrial", options: ["Revolución Industrial", "Revolución Francesa", "Revolución Americana", "Revolución Rusa"] },
                { emojis: ["🧭", "🌊", "⛵", "🌎"], answer: "Descubrimiento de América", options: ["Descubrimiento de América", "Conquista de México", "Conquista del Perú", "Conquista de Chile"] },
                { emojis: ["🏛️", "🔥", "👑", "⚔️"], answer: "Caída del Imperio Romano", options: ["Caída del Imperio Romano", "Caída de Constantinopla", "Caída de Bizancio", "Caída de Roma"] }
            ],
            hard: [
                { emojis: ["⚔️", "🏞️", "🏰", "⚔️", "🔥"], answer: "Guerra de los Cien Años", options: ["Guerra de los Treinta Años", "Guerra de los Cien Años", "Guerra de las Rosas", "Guerra de Sucesión"] },
                { emojis: ["🧿", "⚱️", "🏺", "📚"], answer: "Biblioteca de Alejandría", options: ["Oráculo de Delfos", "Biblioteca de Alejandría", "Academia de Atenas", "Torre de Babel"] },
                { emojis: ["🧪", "💉", "🦠", "🧫"], answer: "Descubrimiento de la Penicilina", options: ["Teoría de los Gérmenes", "Descubrimiento de la Penicilina", "Vacuna contra la Viruela", "Desarrollo de la Quimioterapia"] },
                { emojis: ["🗿", "🌴", "🏝️", "🔍"], answer: "Isla de Pascua", options: ["Machu Picchu", "Stonehenge", "Isla de Pascua", "Líneas de Nazca"] },
                { emojis: ["🏹", "🏞️", "🏰", "⚔️"], answer: "Guerra de los Cien Años", options: ["Guerra de los Cien Años", "Guerra de las Rosas", "Guerra de los Treinta Años", "Guerra de Sucesión"] },
                { emojis: ["☭", "🇷🇺", "👊", "🪓"], answer: "Revolución Rusa", options: ["Revolución Rusa", "Revolución Francesa", "Revolución Americana", "Revolución Industrial"] },
                { emojis: ["🌿", "🔫", "🚁", "🇻🇳"], answer: "Guerra de Vietnam", options: ["Guerra de Vietnam", "Guerra de Corea", "Guerra Fría", "Guerra de Afganistán"] }
            ]
        },
        science: {
            easy: [
                { emojis: ["🍎", "👨‍🔬", "🌳"], answer: "Ley de la Gravedad", options: ["Ley de la Gravedad", "Teoría de la Evolución", "Leyes de Newton", "Teoría de Cuerdas"] },
                { emojis: ["💡", "⚡", "🔌"], answer: "Electricidad", options: ["Magnetismo", "Electricidad", "Energía", "Ondas"] },
                { emojis: ["🧬", "🧪", "👨‍🔬", "🐑"], answer: "Clonación", options: ["Evolución", "Genética", "Clonación", "ADN"] },
                { emojis: ["☢️", "⚛️", "💥"], answer: "Energía Nuclear", options: ["Reacción Química", "Fusión Nuclear", "Energía Nuclear", "Radiactividad"] },
                { emojis: ["🦖", "🌋", "☄️"], answer: "Extinción de los Dinosaurios", options: ["Era Mesozoica", "Extinción de los Dinosaurios", "Paleontología", "Evolución"] },
                { emojis: ["🐵", "🧬", "👨", "🌳"], answer: "Teoría de la Evolución", options: ["Teoría de la Evolución", "Teoría de la Gravedad", "Teoría de la Relatividad", "Teoría de los Gérmenes"] },
                { emojis: ["🍎", "⬇️", "🌍", "📏"], answer: "Ley de la Gravedad", options: ["Ley de la Gravedad", "Ley de Newton", "Ley de Einstein", "Ley de Galileo"] },
                { emojis: ["🧬", "🔄", "🧪", "🔬"], answer: "ADN", options: ["ADN", "ARN", "Proteínas", "Cromosomas"] }
            ],
            medium: [
                { emojis: ["👁️", "🔍", "🔬", "🧫"], answer: "Microscopio", options: ["Telescopio", "Microscopio", "Espectroscopio", "Microscopio Electrónico"] },
                { emojis: ["🧲", "🧭", "🧪", "⚡"], answer: "Electromagnetismo", options: ["Electromagnetismo", "Ley de Coulomb", "Efecto Doppler", "Inducción Magnética"] },
                { emojis: ["🌊", "🌡️", "💨", "☁️"], answer: "Cambio Climático", options: ["Cambio Climático", "Ciclo del Agua", "Corrientes Marinas", "Efecto Invernadero"] },
                { emojis: ["🧠", "💭", "👁️", "🧪"], answer: "Neurociencia", options: ["Psicología", "Neurociencia", "Psiquiatría", "Cognición"] },
                { emojis: ["⏱️", "💨", "🚀", "📏"], answer: "Teoría de la Relatividad", options: ["Teoría de la Relatividad", "Teoría de la Gravedad", "Teoría de la Evolución", "Teoría de los Gérmenes"] },
                { emojis: ["💥", "🌌", "⭐", "🔭"], answer: "Big Bang", options: ["Big Bang", "Expansión del Universo", "Formación de Galaxias", "Formación de Estrellas"] },
                { emojis: ["🌿", "☀️", "🧪", "🌱"], answer: "Fotosíntesis", options: ["Fotosíntesis", "Respiración Celular", "Digestión", "Circulación"] }
            ],
            hard: [
                { emojis: ["⏱️", "👨‍🔬", "🚄", "📏"], answer: "Teoría de la Relatividad", options: ["Mecánica Cuántica", "Teoría de la Relatividad", "Termodinámica", "Física de Partículas"] },
                { emojis: ["🌌", "💥", "⏳", "🔭"], answer: "Big Bang", options: ["Agujero Negro", "Big Bang", "Expansión del Universo", "Formación Estelar"] },
                { emojis: ["🧬", "🐒", "👨", "⏳"], answer: "Teoría de la Evolución", options: ["Teoría de la Evolución", "Genética Mendeliana", "Selección Natural", "Taxonomía"] },
                { emojis: ["⚗️", "🧪", "📊", "🔬"], answer: "Método Científico", options: ["Experimentación", "Método Científico", "Análisis Estadístico", "Investigación Aplicada"] },
                { emojis: ["⚛️", "🧲", "🔬", "🧪"], answer: "Mecánica Cuántica", options: ["Mecánica Cuántica", "Física Clásica", "Física Relativista", "Física Nuclear"] },
                { emojis: ["🎻", "📏", "🪢", "🌌"], answer: "Teoría de Cuerdas", options: ["Teoría de Cuerdas", "Teoría de la Relatividad", "Teoría de la Gravedad", "Teoría de la Evolución"] },
                { emojis: ["☀️", "⚛️", "💥", "🔥"], answer: "Fusión Nuclear", options: ["Fusión Nuclear", "Fisión Nuclear", "Reacción Química", "Reacción Termonuclear"] }
            ]
        },
        literature: {
            easy: [
                { emojis: ["🏰", "👸", "🐺", "👧"], answer: "Caperucita Roja", options: ["La Bella Durmiente", "Blancanieves", "Caperucita Roja", "La Cenicienta"] },
                { emojis: ["🐷", "🏠", "💨", "🐺"], answer: "Los Tres Cerditos", options: ["Los Tres Cerditos", "El Lobo y los Siete Cabritillos", "Ricitos de Oro", "La Liebre y la Tortuga"] },
                { emojis: ["🏝️", "⛵", "👨", "🦜"], answer: "Robinson Crusoe", options: ["Robinson Crusoe", "Moby Dick", "La Isla del Tesoro", "Viaje al Centro de la Tierra"] },
                { emojis: ["🧙‍♂️", "💍", "🌋", "🧝"], answer: "El Señor de los Anillos", options: ["Harry Potter", "El Hobbit", "El Señor de los Anillos", "Las Crónicas de Narnia"] },
                { emojis: ["👦", "🏢", "🍫", "🎩"], answer: "Charlie y la Fábrica de Chocolate", options: ["Charlie y la Fábrica de Chocolate", "Matilda", "James y el Melocotón Gigante", "El Principito"] },
                { emojis: ["🎭", "🎭", "🎭", "🎭"], answer: "El Principito", options: ["El Principito", "El Pequeño Príncipe", "El Príncipe Feliz", "El Príncipe y el Mendigo"] },
                { emojis: ["🎭", "🎭", "🎭", "🎭"], answer: "Don Quijote", options: ["Don Quijote", "El Ingenioso Hidalgo", "El Caballero de la Triste Figura", "El Caballero de la Mancha"] },
                { emojis: ["🎭", "🎭", "🎭", "🎭"], answer: "La Odisea", options: ["La Odisea", "La Ilíada", "La Eneida", "La Divina Comedia"] },
                { emojis: ["👑", "🌹", "🦊", "🌹"], answer: "El Principito", options: ["El Principito", "El Pequeño Príncipe", "El Príncipe Feliz", "El Príncipe y el Mendigo"] },
                { emojis: ["🐎", "⚔️", "🏰", "🛡️"], answer: "Don Quijote", options: ["Don Quijote", "El Ingenioso Hidalgo", "El Caballero de la Triste Figura", "El Caballero de la Mancha"] },
                { emojis: ["🚢", "🌊", "🏝️", "⚔️"], answer: "La Odisea", options: ["La Odisea", "La Ilíada", "La Eneida", "La Divina Comedia"] }
            ],
            medium: [
                { emojis: ["🐋", "⛵", "🌊", "👨‍✈️"], answer: "Moby Dick", options: ["20.000 Leguas de Viaje Submarino", "Moby Dick", "El Viejo y el Mar", "La Isla del Tesoro"] },
                { emojis: ["🔎", "🧢", "🕵️", "🔫"], answer: "Sherlock Holmes", options: ["Los Crímenes de la Calle Morgue", "Sherlock Holmes", "Hercule Poirot", "Los Miserables"] },
                { emojis: ["👻", "🏰", "🔗", "🎄"], answer: "Cuento de Navidad", options: ["Drácula", "Cuento de Navidad", "Frankenstein", "El Fantasma de la Ópera"] },
                { emojis: ["🗡️", "👑", "🐉", "❄️"], answer: "Juego de Tronos", options: ["El Señor de los Anillos", "Juego de Tronos", "Las Crónicas de Narnia", "La Rueda del Tiempo"] },
                { emojis: ["🎭", "🎭", "🎭", "🎭"], answer: "Crimen y Castigo", options: ["Crimen y Castigo", "Guerra y Paz", "Los Hermanos Karamazov", "El Idiota"] },
                { emojis: ["🎭", "🎭", "🎭", "🎭"], answer: "1984", options: ["1984", "Un Mundo Feliz", "Fahrenheit 451", "La Naranja Mecánica"] },
                { emojis: ["🎭", "🎭", "🎭", "🎭"], answer: "El Gran Gatsby", options: ["El Gran Gatsby", "El Viejo y el Mar", "Las Uvas de la Ira", "Por Quién Doblan las Campanas"] },
                { emojis: ["🔪", "💀", "🏛️", "⚖️"], answer: "Crimen y Castigo", options: ["Crimen y Castigo", "Guerra y Paz", "Los Hermanos Karamazov", "El Idiota"] },
                { emojis: ["👁️", "📹", "👨‍💼", "📝"], answer: "1984", options: ["1984", "Un Mundo Feliz", "Fahrenheit 451", "La Naranja Mecánica"] },
                { emojis: ["💃", "🍸", "💎", "🏰"], answer: "El Gran Gatsby", options: ["El Gran Gatsby", "El Viejo y el Mar", "Las Uvas de la Ira", "Por Quién Doblan las Campanas"] }
            ],
            hard: [
                { emojis: ["🏠", "🧠", "💊", "💊"], answer: "1984", options: ["1984", "Un Mundo Feliz", "Fahrenheit 451", "La Naranja Mecánica"] },
                { emojis: ["🦋", "⏳", "🦖", "🔄"], answer: "El Efecto Mariposa", options: ["El Efecto Mariposa", "Viajes en el Tiempo", "Jurassic Park", "La Máquina del Tiempo"] },
                { emojis: ["🧓", "🌊", "🎣", "🦈"], answer: "El Viejo y el Mar", options: ["Moby Dick", "El Viejo y el Mar", "20.000 Leguas de Viaje Submarino", "La Perla"] },
                { emojis: ["👨‍👩‍👧‍👦", "💔", "⚔️", "🇷🇺"], answer: "Guerra y Paz", options: ["Guerra y Paz", "Ana Karenina", "Crimen y Castigo", "Los Hermanos Karamazov"] },
                { emojis: ["🎭", "🎭", "🎭", "🎭"], answer: "Ulises", options: ["Ulises", "Dublineses", "Retrato del Artista Adolescente", "Finnegans Wake"] },
                { emojis: ["📚", "🏛️", "📖", "📖"], answer: "Ulises", options: ["Ulises", "Dublineses", "Retrato del Artista Adolescente", "Finnegans Wake"] },
                { emojis: ["⏳", "🍪", "☕", "📖"], answer: "En Busca del Tiempo Perdido", options: ["En Busca del Tiempo Perdido", "La Recherche", "El Tiempo Recobrado", "El Tiempo Perdido"] },
                { emojis: ["👿", "😇", "👼", "👑"], answer: "La Divina Comedia", options: ["La Divina Comedia", "La Eneida", "La Ilíada", "La Odisea"] }
            ]
        },
        technology: {
            easy: [
                { emojis: ["📱", "🔋", "📞", "📲"], answer: "Smartphone", options: ["Smartphone", "Tablet", "Ordenador", "Reloj Inteligente"] },
                { emojis: ["💻", "⌨️", "🖥️", "📂"], answer: "Ordenador", options: ["Smartphone", "Tablet", "Ordenador", "Consola"] },
                { emojis: ["🌐", "🔍", "💬", "📝"], answer: "Internet", options: ["Email", "Internet", "Redes Sociales", "Navegador Web"] },
                { emojis: ["🎮", "🕹️", "👾", "🎲"], answer: "Videojuegos", options: ["Videojuegos", "Realidad Virtual", "Consola", "Streaming"] },
                { emojis: ["🖨️", "📄", "🎨", "🔄"], answer: "Impresora", options: ["Escáner", "Impresora", "Fotocopiadora", "Fax"] },
                { emojis: ["📱", "📲", "🔋", "📞"], answer: "Smartphone", options: ["Smartphone", "Tablet", "Ordenador", "Reloj Inteligente"] },
                { emojis: ["🌐", "🖥️", "📱", "🔍"], answer: "Internet", options: ["Internet", "Email", "Redes Sociales", "Navegador Web"] },
                { emojis: ["📡", "📶", "🔄", "📱"], answer: "WiFi", options: ["WiFi", "Bluetooth", "4G", "5G"] },
                { emojis: ["📱", "📱", "📱", "📱"], answer: "Smartphone", options: ["Smartphone", "Tablet", "Ordenador", "Reloj Inteligente"] },
                { emojis: ["🌐", "🌐", "🌐", "🌐"], answer: "Internet", options: ["Internet", "Email", "Redes Sociales", "Navegador Web"] },
                { emojis: ["📡", "📡", "📡", "📡"], answer: "WiFi", options: ["WiFi", "Bluetooth", "4G", "5G"] }
            ],
            medium: [
                { emojis: ["🤖", "🧠", "💻", "🗣️"], answer: "Inteligencia Artificial", options: ["Machine Learning", "Inteligencia Artificial", "Robótica", "Big Data"] },
                { emojis: ["📱", "🔌", "📡", "🏠"], answer: "Internet de las Cosas", options: ["Internet de las Cosas", "Domótica", "Smart Home", "Conectividad 5G"] },
                { emojis: ["👓", "🎮", "3️⃣", "🖼️"], answer: "Realidad Virtual", options: ["Realidad Aumentada", "Realidad Virtual", "Videojuegos 3D", "Simulación"] },
                { emojis: ["⛓️", "💱", "🔐", "📊"], answer: "Blockchain", options: ["Criptomonedas", "Blockchain", "Bitcoin", "Seguridad Digital"] },
                { emojis: ["🤖", "🧠", "💬", "🎲"], answer: "Inteligencia Artificial", options: ["Inteligencia Artificial", "Machine Learning", "Deep Learning", "Neural Networks"] },
                { emojis: ["⛓️", "💱", "💹", "🔐"], answer: "Blockchain", options: ["Blockchain", "Bitcoin", "Criptomonedas", "Smart Contracts"] },
                { emojis: ["☁️", "💾", "🔄", "🌐"], answer: "Cloud Computing", options: ["Cloud Computing", "Servidor Remoto", "Almacenamiento en Línea", "Backup"] }
            ],
            hard: [
                { emojis: ["🧬", "💉", "🧪", "👨‍⚕️"], answer: "Biotecnología", options: ["Biotecnología", "Ingeniería Genética", "Medicina Personalizada", "Nanotecnología"] },
                { emojis: ["☁️", "💾", "📤", "🔄"], answer: "Computación en la Nube", options: ["Computación en la Nube", "Almacenamiento en Línea", "Servidor Remoto", "Backup"] },
                { emojis: ["🔐", "🖥️", "🛡️", "🔍"], answer: "Ciberseguridad", options: ["Antivirus", "Firewall", "Ciberseguridad", "Privacidad"] },
                { emojis: ["📊", "💽", "📈", "🧮"], answer: "Big Data", options: ["Análisis de Datos", "Big Data", "Estadística", "Machine Learning"] },
                { emojis: ["⚛️", "🔢", "🖥️", "🧮"], answer: "Quantum Computing", options: ["Quantum Computing", "Supercomputadora", "Grid Computing", "Distributed Computing"] },
                { emojis: ["🧠", "🔄", "💻", "🧮"], answer: "Neural Networks", options: ["Neural Networks", "Machine Learning", "Deep Learning", "Artificial Intelligence"] },
                { emojis: ["📱", "💾", "🔄", "📡"], answer: "Edge Computing", options: ["Edge Computing", "Cloud Computing", "Fog Computing", "Grid Computing"] }
            ]
        }
    },
    
    // Configuración de power-ups
    powerUps: {
        fiftyFifty: {
            name: "50:50",
            icon: "✂️",
            description: "Elimina dos respuestas incorrectas",
            initialCount: 3
        },
        extraTime: {
            name: "Tiempo Extra",
            icon: "⏱️",
            description: "Añade 10 segundos al temporizador",
            initialCount: 2
        },
        extraHint: {
            name: "Pista Extra",
            icon: "💡",
            description: "Muestra un emoji adicional como pista",
            initialCount: 3
        }
    },
    
    // Configuración de logros
    achievements: [
        {
            id: "first_win",
            name: "Principiante",
            description: "Responde correctamente tu primera pregunta",
            icon: "🎯",
            condition: "correctAnswers >= 1"
        },
        {
            id: "streak_3",
            name: "Racha Caliente",
            description: "Consigue una racha de 3 respuestas correctas",
            icon: "🔥",
            condition: "streak >= 3"
        },
        {
            id: "level_up",
            name: "Subiendo de Nivel",
            description: "Alcanza el nivel 2",
            icon: "⬆️",
            condition: "level >= 2"
        },
        {
            id: "movie_master",
            name: "Cinéfilo",
            description: "Responde correctamente 10 preguntas de películas",
            icon: "🎬",
            condition: "correctAnswersByCategory.movies >= 10"
        },
        {
            id: "globe_trotter",
            name: "Trotamundos",
            description: "Responde correctamente 10 preguntas de países",
            icon: "🌍",
            condition: "correctAnswersByCategory.countries >= 10"
        },
        {
            id: "history_buff",
            name: "Historiador",
            description: "Responde correctamente 10 preguntas de historia",
            icon: "📜",
            condition: "correctAnswersByCategory.history >= 10"
        },
        {
            id: "scientist",
            name: "Científico",
            description: "Responde correctamente 10 preguntas de ciencia",
            icon: "🔬",
            condition: "correctAnswersByCategory.science >= 10"
        },
        {
            id: "bookworm",
            name: "Ratón de Biblioteca",
            description: "Responde correctamente 10 preguntas de literatura",
            icon: "📚",
            condition: "correctAnswersByCategory.literature >= 10"
        },
        {
            id: "tech_savvy",
            name: "Gurú Tecnológico",
            description: "Responde correctamente 10 preguntas de tecnología",
            icon: "💻",
            condition: "correctAnswersByCategory.technology >= 10"
        },
        {
            id: "perfect_streak",
            name: "Perfeccionista",
            description: "Consigue una racha de 10 respuestas correctas",
            icon: "✨",
            condition: "maxStreak >= 10"
        },
        {
            id: "speed_demon",
            name: "Velocista",
            description: "Responde correctamente 5 preguntas en menos de 3 segundos cada una",
            icon: "⚡",
            condition: "score >= 1000" // Simplificado para este ejemplo
        },
        {
            id: "master_of_all",
            name: "Maestro de Todo",
            description: "Responde correctamente al menos 5 preguntas de cada categoría",
            icon: "👑",
            condition: "correctAnswersByCategory.movies >= 5 && correctAnswersByCategory.countries >= 5 && correctAnswersByCategory.history >= 5 && correctAnswersByCategory.science >= 5 && correctAnswersByCategory.literature >= 5 && correctAnswersByCategory.technology >= 5"
        },
        {
            id: "emoji_wizard",
            name: "Mago de los Emojis",
            description: "Alcanza una puntuación total de 5000 puntos",
            icon: "🧙‍♂️",
            condition: "score >= 5000"
        },
        {
            id: "comeback_kid",
            name: "El Regreso",
            description: "Gana una partida después de tener solo 1 vida restante",
            icon: "🎯",
            condition: "lives <= 1 && score >= 1000" // Simplificado para este ejemplo
        },
        {
            id: "explorer",
            name: "Explorador",
            description: "Desbloquea todas las categorías",
            icon: "🧭",
            condition: "level >= 2" // Asumiendo que nivel 2 desbloquea todas las categorías
        }
    ],
    
    // Configuración del juego
    settings: {
        difficulties: {
            easy: {
                timePerQuestion: 15,
                pointsBase: 100,
                pointsTimeBonus: 5,
                pointsStreakBonus: 10,
                pointsLevelBonus: 20
            },
            medium: {
                timePerQuestion: 12,
                pointsBase: 150,
                pointsTimeBonus: 8,
                pointsStreakBonus: 15,
                pointsLevelBonus: 30
            },
            hard: {
                timePerQuestion: 10,
                pointsBase: 200,
                pointsTimeBonus: 10,
                pointsStreakBonus: 20,
                pointsLevelBonus: 40
            }
        },
        questionsPerLevel: 10,
        maxLives: 3,
        maxStreak: 3
    }
};

// Exportar datos del juego
window.gameData = gameData;
