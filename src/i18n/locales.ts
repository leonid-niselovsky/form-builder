import enUS from 'antd/locale/en_US';
import ruRU from 'antd/locale/ru_RU';
import kkKZ from 'antd/locale/kk_KZ';

export type Locale = 'en' | 'ru' | 'kk';

export const LOCALES: { value: Locale; label: string }[] = [
  { value: 'en', label: 'Eng' },
  { value: 'ru', label: 'Рус' },
  { value: 'kk', label: 'Қаз' },
];

export const antdLocales: Record<Locale, typeof enUS> = {
  en: enUS,
  ru: ruRU,
  kk: kkKZ,
};

const en = {
  'fieldType.input': 'Text Input',
  'fieldType.textarea': 'Textarea',
  'fieldType.select': 'Select',
  'fieldType.checkbox': 'Checkbox',
  'fieldType.date': 'Date Picker',
  'fieldType.number': 'Number Input',

  'palette.title': 'Elements',

  'builder.title': 'Form Builder',
  'builder.empty': 'No fields yet. Add your first element from the panel.',

  'preview.title': 'Form Preview',
  'preview.empty': 'Preview will appear here.',

  'settings.duplicate': 'Duplicate field',
  'settings.remove': 'Remove field',
  'settings.label': 'Field label',
  'settings.placeholder': 'Field placeholder',
  'settings.options': 'One option per line, e.g.\nKazakhstan\nGermany\nCanada',
  'settings.min': 'Min',
  'settings.max': 'Max',
  'settings.helper': 'Helper text',
  'settings.showTime': 'Enable time',
  'settings.required': 'Required',

  'save.button': 'Save',
  'save.tooltip': 'Save the current form',
  'save.modalTitle': 'Save form',
  'save.ok': 'Save',
  'save.nameLabel': 'Form name',
  'save.namePlaceholder': 'Enter a form name',
  'save.success': 'Form saved successfully.',

  'load.button': 'Load',
  'load.tooltip': 'Load a saved form',
  'load.modalTitle': 'Saved forms',
  'load.empty': 'No saved forms yet.',
  'load.updated': 'Updated {date}',
  'load.loadLink': 'Load',
  'load.renameTitle': 'Rename form',
  'load.renameOk': 'Rename',
  'load.success': 'Form loaded successfully.',
  'load.deleteTitle': 'Delete form',
  'load.deleteContent': 'Delete "{name}"? This can\'t be undone.',
  'load.deleteOk': 'Delete',
  'load.deleteSuccess': 'Form deleted successfully.',

  'export.button': 'Export',
  'export.tooltip': 'Export the form as a JSON file',

  'import.button': 'Import',
  'import.tooltip': 'Import a form from a JSON file',
  'import.success': 'Form imported successfully.',
  'import.invalid': 'Invalid form: {reason}',
  'import.unknownError': 'Unknown error.',

  'reset.button': 'Reset',
  'reset.tooltip': 'Clear all fields in the current form',
  'reset.title': 'Reset form',
  'reset.content': "Clear all fields in the current form? This can't be undone.",
  'reset.ok': 'Reset',

  'logout.tooltip': 'Log out',

  'theme.toLight': 'Switch to light mode',
  'theme.toDark': 'Switch to dark mode',

  'login.username': 'Username',
  'login.usernameRequired': 'Please enter a username',
  'login.usernamePlaceholder': 'e.g. admin',
  'login.password': 'Password',
  'login.passwordRequired': 'Please enter a password',
  'login.passwordPlaceholder': 'Any password',
  'login.submit': 'Log in',

  'form.nameTooltip': 'Form name - click to edit',

  'language.label': 'Language',

  'common.cancel': 'Cancel',
};

export type TranslationKey = keyof typeof en;

const ru: Record<TranslationKey, string> = {
  'fieldType.input': 'Текстовое поле',
  'fieldType.textarea': 'Многострочное поле',
  'fieldType.select': 'Выпадающий список',
  'fieldType.checkbox': 'Флажок',
  'fieldType.date': 'Выбор даты',
  'fieldType.number': 'Числовое поле',

  'palette.title': 'Элементы',

  'builder.title': 'Конструктор формы',
  'builder.empty': 'Пока нет полей. Добавьте первый элемент из панели.',

  'preview.title': 'Предпросмотр формы',
  'preview.empty': 'Здесь появится предпросмотр.',

  'settings.duplicate': 'Дублировать поле',
  'settings.remove': 'Удалить поле',
  'settings.label': 'Название поля',
  'settings.placeholder': 'Подсказка поля',
  'settings.options': 'По одному варианту в строке, например:\nКазахстан\nГермания\nКанада',
  'settings.min': 'Мин',
  'settings.max': 'Макс',
  'settings.helper': 'Вспомогательный текст',
  'settings.showTime': 'Выбор времени',
  'settings.required': 'Обязательное',

  'save.button': 'Сохранить',
  'save.tooltip': 'Сохранить текущую форму',
  'save.modalTitle': 'Сохранение формы',
  'save.ok': 'Сохранить',
  'save.nameLabel': 'Название формы',
  'save.namePlaceholder': 'Введите название формы',
  'save.success': 'Форма успешно сохранена.',

  'load.button': 'Загрузить',
  'load.tooltip': 'Загрузить сохранённую форму',
  'load.modalTitle': 'Сохранённые формы',
  'load.empty': 'Сохранённых форм пока нет.',
  'load.updated': 'Обновлено {date}',
  'load.loadLink': 'Загрузить',
  'load.renameTitle': 'Переименовать форму',
  'load.renameOk': 'Переименовать',
  'load.success': 'Форма успешно загружена.',
  'load.deleteTitle': 'Удалить форму',
  'load.deleteContent': 'Удалить «{name}»? Это действие нельзя отменить.',
  'load.deleteOk': 'Удалить',
  'load.deleteSuccess': 'Форма успешно удалена.',

  'export.button': 'Экспорт',
  'export.tooltip': 'Экспортировать форму в JSON-файл',

  'import.button': 'Импорт',
  'import.tooltip': 'Импортировать форму из JSON-файла',
  'import.success': 'Форма успешно импортирована.',
  'import.invalid': 'Некорректная форма: {reason}',
  'import.unknownError': 'Неизвестная ошибка.',

  'reset.button': 'Сбросить',
  'reset.tooltip': 'Очистить все поля текущей формы',
  'reset.title': 'Сброс формы',
  'reset.content': 'Очистить все поля текущей формы? Это действие нельзя отменить.',
  'reset.ok': 'Сбросить',

  'logout.tooltip': 'Выйти',

  'theme.toLight': 'Переключить на светлую тему',
  'theme.toDark': 'Переключить на тёмную тему',

  'login.username': 'Имя пользователя',
  'login.usernameRequired': 'Введите имя пользователя',
  'login.usernamePlaceholder': 'например, admin',
  'login.password': 'Пароль',
  'login.passwordRequired': 'Введите пароль',
  'login.passwordPlaceholder': 'Любой пароль',
  'login.submit': 'Войти',

  'form.nameTooltip': 'Название формы - нажмите, чтобы изменить',

  'language.label': 'Язык',

  'common.cancel': 'Отмена',
};

const kk: Record<TranslationKey, string> = {
  'fieldType.input': 'Мәтіндік өріс',
  'fieldType.textarea': 'Мәтін аймағы',
  'fieldType.select': 'Ашылмалы тізім',
  'fieldType.checkbox': 'Құсбелгі',
  'fieldType.date': 'Күн таңдағыш',
  'fieldType.number': 'Сандық өріс',

  'palette.title': 'Элементтер',

  'builder.title': 'Форма құрастырғыш',
  'builder.empty': 'Әзірге өрістер жоқ. Панельден алғашқы элементті қосыңыз.',

  'preview.title': 'Форманы алдын ала қарау',
  'preview.empty': 'Алдын ала қарау осында көрсетіледі.',

  'settings.duplicate': 'Өрісті көшіру',
  'settings.remove': 'Өрісті жою',
  'settings.label': 'Өріс атауы',
  'settings.placeholder': 'Өріс толтырғышы',
  'settings.options': 'Әр жолда бір нұсқа, мысалы:\nҚазақстан\nГермания\nКанада',
  'settings.min': 'Мин',
  'settings.max': 'Макс',
  'settings.helper': 'Көмекші мәтін',
  'settings.showTime': 'Уақытты таңдау',
  'settings.required': 'Міндетті',

  'save.button': 'Сақтау',
  'save.tooltip': 'Ағымдағы форманы сақтау',
  'save.modalTitle': 'Форманы сақтау',
  'save.ok': 'Сақтау',
  'save.nameLabel': 'Форма атауы',
  'save.namePlaceholder': 'Форма атауын енгізіңіз',
  'save.success': 'Форма сәтті сақталды.',

  'load.button': 'Жүктеу',
  'load.tooltip': 'Сақталған форманы жүктеу',
  'load.modalTitle': 'Сақталған формалар',
  'load.empty': 'Сақталған формалар әзірге жоқ.',
  'load.updated': 'Жаңартылған {date}',
  'load.loadLink': 'Жүктеу',
  'load.renameTitle': 'Форманы қайта атау',
  'load.renameOk': 'Қайта атау',
  'load.success': 'Форма сәтті жүктелді.',
  'load.deleteTitle': 'Форманы жою',
  'load.deleteContent': '«{name}» жойылсын ба? Бұны қайтару мүмкін емес.',
  'load.deleteOk': 'Жою',
  'load.deleteSuccess': 'Форма сәтті жойылды.',

  'export.button': 'Экспорт',
  'export.tooltip': 'Форманы JSON файл ретінде экспорттау',

  'import.button': 'Импорт',
  'import.tooltip': 'JSON файлдан форманы импорттау',
  'import.success': 'Форма сәтті импортталды.',
  'import.invalid': 'Жарамсыз форма: {reason}',
  'import.unknownError': 'Белгісіз қате.',

  'reset.button': 'Тазалау',
  'reset.tooltip': 'Ағымдағы форманың барлық өрістерін тазалау',
  'reset.title': 'Форманы тазалау',
  'reset.content': 'Ағымдағы форманың барлық өрістерін тазалау керек пе? Бұны қайтару мүмкін емес.',
  'reset.ok': 'Тазалау',

  'logout.tooltip': 'Шығу',

  'theme.toLight': 'Ашық тақырыпқа ауысу',
  'theme.toDark': 'Қараңғы тақырыпқа ауысу',

  'login.username': 'Пайдаланушы аты',
  'login.usernameRequired': 'Пайдаланушы атын енгізіңіз',
  'login.usernamePlaceholder': 'мысалы, admin',
  'login.password': 'Құпиясөз',
  'login.passwordRequired': 'Құпиясөзді енгізіңіз',
  'login.passwordPlaceholder': 'Кез келген құпиясөз',
  'login.submit': 'Кіру',

  'form.nameTooltip': 'Форма атауы - өзгерту үшін басыңыз',

  'language.label': 'Тіл',

  'common.cancel': 'Болдырмау',
};

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en,
  ru,
  kk,
};
