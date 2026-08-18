export const categoryGroups = [
  ['construction','Строительство и ремонт',['Ремонт квартиры','Отделочные работы','Малярные работы','Штукатурка','Поклейка обоев','Укладка ламината','Укладка плитки','Электрика','Сантехника','Сборка мебели','Установка дверей','Мелкий ремонт','Демонтаж','Другое']],
  ['moving','Грузчики и переезд',['Грузчик','Помощь с переездом','Перенос мебели','Поднять мебель','Спустить мебель','Вынос мусора','Погрузка','Разгрузка','Доставка вещей','Перевозка мебели','Другое']],
  ['cleaning','Клининг',['Уборка квартиры','Уборка дома','Генеральная уборка','Уборка после ремонта','Мытьё окон','Чистка мебели','Химчистка','Уборка офиса','Вывоз мусора','Другое']],
  ['beauty','Красота / Beauty',['Маникюр','Маникюр на дому','Педикюр','Наращивание ногтей','Брови','Ресницы','Макияж','Макияж на дому','Парикмахер','Стрижка','Окрашивание волос','Барбер','Массаж','Другое']],
  ['auto','Авто и транспорт',['Ремонт автомобиля','Диагностика автомобиля','Замена масла','Шиномонтаж','Помощь на дороге','Прикурить автомобиль','Буксировка','Эвакуатор','Мойка автомобиля','Другое']],
  ['tech','Электрика и техника',['Электрик','Установка розетки','Установка люстры','Подключение техники','Ремонт бытовой техники','Установка кондиционера','Компьютерная помощь','Настройка Wi-Fi','Другое']],
  ['garden','Сад / дача / территория',['Покос травы','Уборка участка','Уборка снега','Обрезка деревьев','Посадка растений','Земляные работы','Другое']],
  ['delivery','Доставка и курьеры',['Курьер','Доставка документов','Доставка еды','Доставка вещей','Забрать заказ','Купить и привезти','Другое']],
  ['home','Помощь по дому',['Собрать шкаф','Повесить телевизор','Повесить зеркало','Установить карниз','Передвинуть мебель','Мелкие бытовые работы','Другое']],
  ['animals','Животные',['Выгул собаки','Передержка животных','Уход за животными','Груминг','Другое']],
  ['family','Дети и семья',['Няня','Забрать ребёнка','Отвести ребёнка','Помощь с ребёнком','Другое']],
  ['education','Обучение',['Репетитор','Математика','Английский язык','Русский язык','Казахский язык','Физика','Информатика','Подготовка к экзаменам','Другое']],
  ['it','Компьютеры / IT',['Настройка компьютера','Ремонт ПК','Установка Windows','Настройка принтера','Создание сайта','Дизайн','Монтаж видео','Программирование','Помощь с телефоном','Другое']],
  ['events','Мероприятия',['Фотограф','Видеограф','Декоратор','Ведущий','Музыка / DJ','Официант на мероприятие','Другое']],
  ['general','Разнорабочие',['Разнорабочий','Помощник','Рабочий на день','Рабочий на несколько часов','Помощь на стройке','Помощь на складе','Другое']],
  ['industry','Энергетика / промышленность',['Электромонтаж','Обслуживание оборудования','Монтаж оборудования','Ремонт оборудования','Сварочные работы','Слесарные работы','Другое']],
  ['business','Бизнес / офис',['Помощь в офисе','Документы','Таблицы / Excel','Оператор','Промоутер','Другое']],
  ['other','Другое',['Другое']],
] as const;
export const categories = categoryGroups.map(([slug,label,items])=>({slug,label,items}));
export function categoryLabel(value:string){ const [group,item]=value.split(':'); const found=categories.find(c=>c.slug===group); return found ? (item||found.label) : value; }

export const CATEGORIES = categories.map((category) => ({
  id: category.slug,
  label: category.label,
  subcategories: category.items.map((label, index) => ({ id: String(index), label })),
}));
export function getSubcategories(mainCategory: string) { return CATEGORIES.find((category) => category.id === mainCategory)?.subcategories || []; }
export function getDefaultMainCategoryId() { return CATEGORIES[0]?.id || 'other'; }
export function getDefaultSubcategoryId(mainCategory: string) { return getSubcategories(mainCategory)[0]?.id || '0'; }
export function formatCategory(mainCategory: string, subCategory: string) { return `${mainCategory}:${subCategory}`; }
export function getCategoryLabel(value: string) {
  const [mainCategory, subCategory] = value.split(':');
  const category = CATEGORIES.find((item) => item.id === mainCategory);
  if (!category) return value;
  return category.subcategories.find((item) => item.id === subCategory)?.label || category.label;
}
export function matchesMainCategory(value: string, mainCategory: string) { return !mainCategory || value.split(':')[0] === mainCategory; }
export function getFilterOptions() { return CATEGORIES.map(({ id, label }) => ({ id, label })); }
