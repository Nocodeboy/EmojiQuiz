# EmojiQuiz - Plan de Crecimiento Viral

## Vision

Convertir EmojiQuiz en la app de quiz con emojis #1 en Play Store y redes sociales, alcanzando 100K descargas en los primeros 6 meses.

---

## FASE 1: Pre-lanzamiento (Semanas 1-2)

### 1.1 Preparar la app para Play Store
- [ ] Integrar con Capacitor (wrapper web -> nativo)
- [ ] Crear assets de Play Store:
  - Icono 512x512 (estilo retro pixel con emoji)
  - Feature graphic 1024x500
  - 8 screenshots (gameplay, categorias, logros, game over)
  - Video preview de 30 segundos
- [ ] Ficha de Play Store optimizada para ASO:
  - **Titulo**: "EmojiQuiz - Adivina con Emojis 🎮"
  - **Descripcion corta**: "450+ preguntas de emojis en 10 categorias. ¿Cuanto sabes?"
  - **Keywords**: quiz emojis, trivia, juego educativo, adivinar, preguntas
- [ ] Configurar Google Play Console (cuenta de desarrollador $25)
- [ ] Preparar politica de privacidad (requerido por Play Store)

### 1.2 Redes sociales
- [ ] Crear cuentas oficiales:
  - **TikTok**: @emojiquiz_game (PRIORIDAD #1)
  - **Instagram**: @emojiquiz_game
  - **Twitter/X**: @emojiquiz_game
  - **YouTube Shorts**: EmojiQuiz Game
- [ ] Preparar 20 videos cortos pre-grabados antes del lanzamiento
- [ ] Disenar kit de marca: logo, paleta de colores, plantillas para stories

---

## FASE 2: Mecanicas Virales en la App (Semanas 2-4)

### 2.1 Compartir resultados (CRITICO para viralidad)
- [ ] **Tarjeta de resultado compartible**: Al terminar partida, generar imagen con:
  - Puntuacion final con grado (S/A/B/C)
  - Emojis de la mejor pregunta que acertaste
  - QR code o link a la app
  - "¿Puedes superarme? #EmojiQuiz"
- [ ] **Boton de compartir nativo** (Web Share API + intent Android)
- [ ] **Reto a amigos**: "Reta a un amigo" con link directo al juego
- [ ] **Stories de Instagram**: Generar story optimizada con fondo gradiente

### 2.2 Engagement diario
- [ ] **Desafio Diario**: Mismas 10 preguntas para todos (ya implementado en v2, portar a v1)
- [ ] **Racha diaria**: Icono de fuego + contador de dias consecutivos
- [ ] **Notificaciones push** (via Capacitor): "Tu desafio diario te espera!" a las 10am
- [ ] **Recompensas por login diario**: Power-ups gratis por entrar cada dia

### 2.3 Competicion social
- [ ] **Ranking semanal** ademas del global
- [ ] **Ranking por categoria** (quien es el mejor en Peliculas, Musica, etc.)
- [ ] **Liga de amigos**: Invitar amigos y competir entre grupo
- [ ] **Logro "Viral"**: Compartir resultado en RRSS desbloquea achievement especial

---

## FASE 3: Contenido para RRSS (Semanas 3-8)

### 3.1 TikTok / Reels / Shorts (MOTOR DE CRECIMIENTO PRINCIPAL)

**Formato estrella: "¿Puedes adivinar este emoji?"**

Tipo de video (15-30 segundos):
1. Mostrar emojis en pantalla con musica de suspense
2. Timer visual de 5 segundos
3. Revelar la respuesta con efecto satisfactorio
4. CTA: "Juega 450+ preguntas asi en EmojiQuiz - link en bio"

**Plan de contenido semanal:**
| Dia | Tipo de contenido | Plataforma |
|-----|-------------------|------------|
| Lunes | "Emoji del dia" - 1 pregunta dificil | TikTok + Reels |
| Martes | "Categoria X" - 5 preguntas rapidas | TikTok + Reels |
| Miercoles | "¿Facil o dificil?" - Comparacion | TikTok + Shorts |
| Jueves | "Nadie acierta esta" - Pregunta trampa | TikTok + Reels |
| Viernes | "Speed round" - 10 preguntas en 60s | TikTok + Reels |
| Sabado | Ranking semanal + mejores jugadores | Stories |
| Domingo | "Resumen semanal" + preview proxima semana | TikTok + Reels |

**Hashtags clave:**
- #EmojiQuiz #EmojiChallenge #AdivinaElEmoji #QuizTime
- #EmojiGame #Trivia #JuegoEducativo #RetroGaming

### 3.2 Estrategia de contenido UGC (User Generated Content)
- [ ] **"Crea tu pregunta" challenge**: Usuarios crean emojis y otros adivinan
- [ ] **Duelos en stories**: "Reta a tu mejor amigo con EmojiQuiz"
- [ ] **Reaccion a puntuaciones**: Publicar mejores scores de la comunidad
- [ ] **"Yo jugando EmojiQuiz" trend**: Fomentar que graben su reaccion jugando

### 3.3 Colaboraciones con creadores
- [ ] Contactar micro-influencers de gaming/quiz (5K-50K seguidores)
- [ ] Ofrecer mencion en el juego (nombre en ranking, logro especial)
- [ ] Crear "packs de preguntas de [creador]" como contenido exclusivo
- [ ] Buscar creadores de contenido educativo (target alineado)

---

## FASE 4: Optimizacion Play Store - ASO (Semanas 4-12)

### 4.1 App Store Optimization
- [ ] **Titulo optimizado**: Incluir keywords principales
- [ ] **Descripcion con keywords**: quiz, emoji, trivia, educativo, brain, adivinar
- [ ] **Screenshots A/B testing**: Probar diferentes ordenes y estilos
- [ ] **Localizacion**: Ficha en espanol, ingles, portugues, frances
- [ ] **Responder todas las reviews** (mejora ranking)

### 4.2 Metricas clave a trackear
- **Retention D1**: Target > 40% (jugadores que vuelven al dia siguiente)
- **Retention D7**: Target > 20%
- **Retention D30**: Target > 10%
- **Session length**: Target > 5 minutos
- **Viral coefficient**: Target > 0.6 (cada usuario trae 0.6 usuarios nuevos)
- **Rating**: Target > 4.5 estrellas

### 4.3 Mejorar retention
- [ ] **Onboarding suave**: Tutorial interactivo en primera partida
- [ ] **Progresion visible**: Barra de experiencia, niveles con nombres
- [ ] **Coleccion de emojis**: Album de emojis que has visto
- [ ] **Estadisticas detalladas**: Mejor categoria, peor categoria, tendencia

---

## FASE 5: Monetizacion Sostenible (Mes 2-3)

### 5.1 Modelo freemium (NO agresivo)
- [ ] **Anuncios opcionales**: Ver anuncio = ganar power-up gratis
  - Rewarded video al quedarse sin vidas: "Ver anuncio = +1 vida"
  - Rewarded video en menu: "Ver anuncio = +1 power-up de cada tipo"
- [ ] **Paquete premium** (unico pago ~$2.99):
  - Sin anuncios
  - Temas de color adicionales
  - Pack de power-ups ilimitados por 24h
- [ ] **Packs de preguntas tematicos** ($0.99 cada uno):
  - "Pack Disney" - 30 preguntas extra de peliculas Disney
  - "Pack Mundial" - 30 preguntas de la Copa del Mundo
  - "Pack Artistas" - 30 preguntas de artistas musicales

### 5.2 Lo que NUNCA hacer
- No poner paywall en contenido base (las 450 preguntas siempre gratis)
- No poner anuncios intersticiales agresivos
- No usar lootboxes ni mecanicas de azar
- No hacer pay-to-win (los power-ups se ganan jugando)

---

## FASE 6: Escalado (Mes 3-6)

### 6.1 Modo Multijugador
- [ ] **1v1 en tiempo real**: Mismo set de preguntas, quien responde mas rapido gana
- [ ] **Salas de grupo**: Hasta 8 jugadores compitiendo
- [ ] **Torneos semanales**: Brackets de eliminacion con premios (badges exclusivos)

### 6.2 Contenido generado por la comunidad
- [ ] **Editor de preguntas**: Los usuarios crean y votan preguntas
- [ ] **Categorias de la comunidad**: Packs creados por jugadores
- [ ] **Votacion de preguntas**: Las mejores se anaden al juego oficial

### 6.3 Expansiones
- [ ] **Idiomas nuevos**: Frances, Portugues, Aleman, Italiano
- [ ] **Categorias nuevas** segun demanda: Arte, Videojuegos, Anime, Famosos
- [ ] **Eventos temporales**: Pack de Halloween, Navidad, Verano
- [ ] **App Store (iOS)**: Publicar en App Store con Capacitor

---

## KPIs y Objetivos

| Metrica | Mes 1 | Mes 3 | Mes 6 |
|---------|-------|-------|-------|
| Descargas Play Store | 1,000 | 10,000 | 100,000 |
| Seguidores TikTok | 5,000 | 25,000 | 100,000 |
| Seguidores Instagram | 2,000 | 10,000 | 50,000 |
| DAU (usuarios diarios) | 200 | 2,000 | 15,000 |
| Rating Play Store | 4.3 | 4.5 | 4.6+ |
| Revenue mensual | $0 | $200 | $2,000+ |

---

## Presupuesto Estimado

| Concepto | Coste |
|----------|-------|
| Google Play Developer Account | $25 (unico) |
| Apple Developer Account (futuro) | $99/ano |
| Dominio emojiquiz.com | ~$12/ano |
| Herramientas de diseno (Canva Pro) | $13/mes |
| Micro-influencers (x5) | $500 total |
| Ads iniciales TikTok/Instagram | $200/mes |
| **Total primeros 3 meses** | **~$1,000** |

---

## Cronograma Resumen

```
Semana 1-2:  Preparar Play Store + RRSS + Assets
Semana 3-4:  Lanzar app + Empezar contenido TikTok
Semana 5-8:  Contenido diario + Primeras colaboraciones
Mes 2-3:     Optimizar ASO + Implementar mecanicas virales
Mes 3-4:     Monetizacion + Modo multijugador
Mes 4-6:     Escalar + Nuevos idiomas + iOS
```

---

## Competencia y Diferenciacion

**Competidores directos:**
- Trivia Crack (>100M descargas): Quiz general, no enfocado en emojis
- QuizUp: Murio en 2021, hueco en el mercado
- Logo Quiz: Concepto similar pero con logos, no emojis

**Nuestra ventaja:**
1. **Emojis = universal**: No necesita traduccion visual, solo texto
2. **Estetica retro unica**: Ningun quiz tiene este look cyberpunk
3. **Gratuito de verdad**: Todo el contenido base gratis, siempre
4. **Open source**: La comunidad puede contribuir preguntas
5. **Rapido de jugar**: Partidas de 3-5 minutos, perfecto para redes sociales
