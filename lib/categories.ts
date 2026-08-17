export type Subcategory = {
  id: string;
  label: string;
};

export type Category = {
  id: string;
  label: string;
  subcategories: Subcategory[];
};

export const CATEGORIES: Category[] = [
  {
    id: 'construction',
    label: 'Строительство и ремонт',
    subcategories: [
      { id: 'repair', label: 'Ремонт' },
      { id: 'finishing', label: 'Отделка' },
      { id: 'electrical', label: 'Электрика' },
      { id: 'plumbing', label: 'Сантехника' },
      { id: 'tile', label: 'Плитка' },
      { id: 'wallpaper', label: 'Обои' },
      { id: 'painting', label: 'Покраска' },
      { id: 'furniture', label: 'Мебель' },
      { id: 'installation', label: 'Монтаж' },
      { id: 'demolition', label: 'Демонтаж' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'movers',
    label: 'Грузчики и переезды',
    subcategories: [
      { id: 'moving', label: 'Переезд' },
      { id: 'loading', label: 'Погрузка' },
      { id: 'unloading', label: 'Разгрузка' },
      { id: 'furniture-moving', label: 'Перенос мебели' },
      { id: 'trash-removal', label: 'Вынос мусора' },
      { id: 'delivery', label: 'Доставка' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'cleaning',
    label: 'Клининговые услуги',
    subcategories: [
      { id: 'apartment', label: 'Уборка квартиры' },
      { id: 'office', label: 'Уборка офиса' },
      { id: 'after-renovation', label: 'Уборка после ремонта' },
      { id: 'windows', label: 'Мытьё окон' },
      { id: 'deep-cleaning', label: 'Генеральная уборка' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'beauty',
    label: 'Красота / Beauty',
    subcategories: [
      { id: 'manicure', label: 'Маникюр' },
      { id: 'home-manicure', label: 'Маникюр на дому' },
      { id: 'pedicure', label: 'Педикюр' },
      { id: 'nail-extension', label: 'Наращивание ногтей' },
      { id: 'brows', label: 'Брови' },
      { id: 'lashes', label: 'Ресницы' },
      { id: 'makeup', label: 'Макияж' },
      { id: 'hairdresser', label: 'Парикмахер' },
      { id: 'haircut', label: 'Стрижка' },
      { id: 'coloring', label: 'Окрашивание' },
      { id: 'styling', label: 'Укладка' },
      { id: 'massage', label: 'Массаж' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'auto',
    label: 'Авто и транспорт',
    subcategories: [
      { id: 'car-wash', label: 'Мойка авто' },
      { id: 'tire-service', label: 'Шиномонтаж' },
      { id: 'tow', label: 'Эвакуатор' },
      { id: 'driver', label: 'Водитель' },
      { id: 'cargo-transport', label: 'Грузоперевозки' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'electronics',
    label: 'Электрика и техника',
    subcategories: [
      { id: 'appliance-repair', label: 'Ремонт техники' },
      { id: 'appliance-install', label: 'Установка техники' },
      { id: 'wiring', label: 'Прокладка проводки' },
      { id: 'smart-home', label: 'Умный дом' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'garden',
    label: 'Сад / дача / территория',
    subcategories: [
      { id: 'lawn', label: 'Покос травы' },
      { id: 'garden-work', label: 'Садовые работы' },
      { id: 'snow-removal', label: 'Уборка снега' },
      { id: 'landscaping', label: 'Благоустройство' },
      { id: 'fence', label: 'Забор и ограждения' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'courier',
    label: 'Доставка и курьеры',
    subcategories: [
      { id: 'documents', label: 'Доставка документов' },
      { id: 'food', label: 'Доставка еды' },
      { id: 'goods', label: 'Доставка товаров' },
      { id: 'express', label: 'Срочная доставка' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'home-help',
    label: 'Помощь по дому',
    subcategories: [
      { id: 'assembly', label: 'Сборка мебели' },
      { id: 'hanging', label: 'Повесить полки / карнизы' },
      { id: 'minor-repairs', label: 'Мелкий ремонт' },
      { id: 'household', label: 'Бытовые поручения' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'pets',
    label: 'Животные',
    subcategories: [
      { id: 'dog-walking', label: 'Выгуливание собак' },
      { id: 'pet-sitting', label: 'Присмотр за питомцем' },
      { id: 'grooming', label: 'Груминг' },
      { id: 'vet-visit', label: 'Сопровождение к ветеринару' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'family',
    label: 'Дети и семья',
    subcategories: [
      { id: 'babysitter', label: 'Няня' },
      { id: 'tutor', label: 'Репетитор' },
      { id: 'elder-care', label: 'Уход за пожилыми' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'education',
    label: 'Обучение',
    subcategories: [
      { id: 'languages', label: 'Иностранные языки' },
      { id: 'music', label: 'Музыка' },
      { id: 'sports-coach', label: 'Спортивный тренер' },
      { id: 'it-courses', label: 'IT-курсы' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'it',
    label: 'Компьютеры / IT',
    subcategories: [
      { id: 'pc-repair', label: 'Ремонт компьютеров' },
      { id: 'network', label: 'Настройка сети' },
      { id: 'software', label: 'Установка ПО' },
      { id: 'data-recovery', label: 'Восстановление данных' },
      { id: 'website', label: 'Сайты и приложения' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'events',
    label: 'Мероприятия',
    subcategories: [
      { id: 'host', label: 'Ведущий' },
      { id: 'photographer', label: 'Фотограф' },
      { id: 'decor', label: 'Оформление' },
      { id: 'catering-help', label: 'Помощь с кейтерингом' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'handyman',
    label: 'Разнорабочие',
    subcategories: [
      { id: 'general-labor', label: 'Разнорабочие' },
      { id: 'helper', label: 'Помощник на объект' },
      { id: 'warehouse', label: 'Складские работы' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'industry',
    label: 'Энергетика / промышленность',
    subcategories: [
      { id: 'maintenance', label: 'Техобслуживание' },
      { id: 'installation-ind', label: 'Монтаж оборудования' },
      { id: 'inspection', label: 'Осмотр и диагностика' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'business',
    label: 'Бизнес / офис',
    subcategories: [
      { id: 'office-moving', label: 'Переезд офиса' },
      { id: 'office-cleaning', label: 'Уборка офиса' },
      { id: 'admin-help', label: 'Административная помощь' },
      { id: 'other', label: 'Другое' },
    ],
  },
  {
    id: 'other',
    label: 'Другое',
    subcategories: [{ id: 'other', label: 'Другое' }],
  },
];

const SEPARATOR = ' — ';

export function formatCategory(mainId: string, subId: string): string {
  const main = CATEGORIES.find((c) => c.id === mainId);
  const sub = main?.subcategories.find((s) => s.id === subId);
  if (!main || !sub) return 'Другое';
  if (main.id === 'other') return 'Другое';
  return `${main.label}${SEPARATOR}${sub.label}`;
}

export function parseCategory(value: string): { mainId: string; subId: string } | null {
  const main = CATEGORIES.find((c) => value.startsWith(`${c.label}${SEPARATOR}`));
  if (!main) return null;
  const subLabel = value.slice(main.label.length + SEPARATOR.length);
  const sub = main.subcategories.find((s) => s.label === subLabel);
  if (!sub) return null;
  return { mainId: main.id, subId: sub.id };
}

export function getCategoryLabel(value: string): string {
  if (!value) return 'Другое';
  const parsed = parseCategory(value);
  if (parsed) {
    const main = CATEGORIES.find((c) => c.id === parsed.mainId);
    const sub = main?.subcategories.find((s) => s.id === parsed.subId);
    if (main && sub) return `${main.label}${SEPARATOR}${sub.label}`;
  }
  return value;
}

export function getMainCategoryLabel(value: string): string {
  const parsed = parseCategory(value);
  if (parsed) {
    return CATEGORIES.find((c) => c.id === parsed.mainId)?.label ?? value;
  }
  return value;
}

export function getSubcategoryLabel(value: string): string {
  const parsed = parseCategory(value);
  if (parsed) {
    const main = CATEGORIES.find((c) => c.id === parsed.mainId);
    return main?.subcategories.find((s) => s.id === parsed.subId)?.label ?? value;
  }
  return value;
}

export function getMainCategories(): Category[] {
  return CATEGORIES;
}

export function getSubcategories(mainId: string): Subcategory[] {
  return CATEGORIES.find((c) => c.id === mainId)?.subcategories ?? CATEGORIES.at(-1)!.subcategories;
}

export function getDefaultMainCategoryId(): string {
  return CATEGORIES[0].id;
}

export function getDefaultSubcategoryId(mainId: string): string {
  return getSubcategories(mainId)[0]?.id ?? 'other';
}

export function matchesMainCategory(orderCategory: string, mainId: string): boolean {
  if (!mainId) return true;
  const main = CATEGORIES.find((c) => c.id === mainId);
  if (!main) return true;
  if (orderCategory === main.label) return true;
  return orderCategory.startsWith(`${main.label}${SEPARATOR}`);
}

export function getFilterOptions(): { id: string; label: string }[] {
  return CATEGORIES.map((c) => ({ id: c.id, label: c.label }));
}
