import { useTranslation } from 'react-i18next';
import { categories } from '../../data/categories.js';
import { questions } from '../../data/questions/index.js';

export default function CategoriesScreen({ level, onBack }) {
  const { t } = useTranslation();

  const getQuestionCount = (catId) => {
    const q = questions[catId];
    if (!q) return 0;
    return (q.easy?.length || 0) + (q.medium?.length || 0) + (q.hard?.length || 0);
  };

  return (
    <div className="screen fade-in" aria-label="Categories">
      <h2>{t('categoriesTitle')}</h2>
      <div className="categories-grid">
        {categories.map(cat => {
          const unlocked = cat.unlocked || (cat.unlockLevel && level >= cat.unlockLevel);
          return (
            <div
              key={cat.id}
              className={`category-card ${unlocked ? '' : 'locked'}`}
              style={{ borderColor: unlocked ? cat.color : 'transparent' }}
              aria-label={`${t(cat.id)} ${unlocked ? '' : 'locked'}`}
            >
              <div className="category-icon">{cat.icon}</div>
              <div className="category-name">{t(cat.id)}</div>
              {unlocked ? (
                <div className="category-count">{getQuestionCount(cat.id)} preguntas</div>
              ) : (
                <div className="lock-icon">
                  🔒 {t('categoryLocked')} {cat.unlockLevel}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button className="back-btn" onClick={onBack}>{t('backButton')}</button>
    </div>
  );
}
