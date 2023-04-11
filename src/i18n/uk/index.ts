export default {
  appName: 'FF24++',
  aboutUs: 'про нас',
  about: {
    subtitle: `Ми - команда веб-розробників, які створили цей веб-сайт, щоб допомогти людям спростити процес
      обчислення податку з Freedom Finance 24 для подачі щорічної декларації.`,
    subtitle2: `Завдяки нашому досвіду в веб-технологіях, ми змогли розробити простий та зручний інструмент,
      який дозволяє користувачам легко та точно розраховувати свій податок.`,
    subtitle3: `Ми вважаємо, що кожен повинен мати доступ до інструментів, які спрощують складні процеси,
      такі як обчислення податку, і сподіваємося, що наш веб-сайт позитивно вплине на ваше життя`,
    subtitle4: `Якщо у вас є будь-які питання або зауваження, будь ласка, не соромтеся зв'язатися з нами.
      Ми будемо раді почути від вас! (postglory12345@gmail.com)`,
  },
  calculation: {
    header: 'Обрахунок податків',
    subtitle:
      // eslint-disable-next-line max-len
      'Для обрахунку податків з FF24 (freedom finance) на зберігальному рахунку необхідно завантажити сюди брокерський звіт.',
    subtitle2: "Для цього необхідно відкрити FF24, перейти в 'Кабінет' -> 'Звіти брокера'",
    subtitle3: 'Вибрати період, від початку до кінця року (наприклад 01/01/2023 - 31/12/2023) і вибрати формат JSON.',
    subtitle4: 'Звіт буде надісланий на вказану пошту. Після цього необхідно вставити файл з пошти нижче.',
    fileLabel: 'Завантажуй звіт сюди',
    submit: 'Обрахувати',
    total: 'Сумарний дохід ({currency})',
    gainTax: 'Податок на дохід (18%)',
    militaryTax: 'Військовий збір (1.5%)',
    uah: 'грн',
    usd: 'usd',
    error: 'Помилка',
    table: {
      name: 'Деталі обрахунку',
      date: 'Дата',
      exchangeRate: 'Курс обміну',
      profitInUsd: 'Дохід в USD',
      profitInUah: 'Дохід в UAH',
    },
  },
  headerMenu: {
    calculation: 'обрахунок',
    dark: 'ніч',
    light: 'день',
  },
  validation: {
    required: "Файл обов'язковий",
    invalidFormat: 'Файл з неправильним розширенням',
    fileEmpty: 'Файл пустий',
    fileContain: 'У файлі погані дані',
    siteUnavailable: 'Неможливо отримати дані з НБУ. Спробуйте пізніше',
    invalidExchangeRate: 'На певний день курс обміну не знайдено',
  },
};
