const now = new Date();

export default {
  appName: 'FF24++',
  about: {
    subtitle: `We are a team of web developers who have created this website to
      help people simplify the process of calculating tax from Freedom Finance 24 for declaration purposes.`,
    subtitle2: `With our expertise in web technology, we were able to develop a simple and user-friendly tool
      that enables users to calculate their tax easily and accurately.`,
    subtitle3: `We believe that everyone should have access to tools that simplify complex processes such
      as tax calculation, and we hope that our website makes a positive impact on your life.`,
    subtitle4: `If you have any questions or feedback, please don't hesitate to contact us.
      We would love to hear from you!`,
    sendEmail: 'Send Email',
  },
  faq: {
    title: 'Q&A',

    question1: 'What is this site?',
    answer1: '@:about.subtitle',
    url1: '',
    urlText1: '',

    question2: 'What is the address of the "Taxpayer\'s Cabinet" website?',
    answer2: '{url}',
    url2: 'https://cabinet.tax.gov.ua',
    urlText2: 'https://cabinet.tax.gov.ua',

    question3: 'Why is this project free?',
    answer3: `Initially, this project was created in a circle of friends
     to facilitate the submission of the declaration.
     However, given the community's interest in this project, we decided to share this tool with other investors.
     Of course, you can always make your suggestions or indicate possible improvements, which of course
     will be an additional motivation for the development of the project.`,
    url3: '',
    urlText3: '',

    question4: 'Can the generated report contain any errors?',
    answer4: 'Yes, of course. This project is free.',
    url4: '',
    urlText4: '',

    question5: 'Which currencies are supported for converting transaction amounts?',
    answer5: 'Those supported by the {url}',
    url5: 'https://bank.gov.ua/ua/markets/exchangerates',
    urlText5: 'NBU',

    question6: 'What are the deadlines for submitting this declaration?',
    answer6: '{url}',
    url6: `https://tax.gov.ua/deklaratsiyna-kampaniya-${now.getFullYear()}/granichni-stroki-podannya/`,
    urlText6: 'Until April 30 inclusive',

    question7: 'What are the tax payment deadlines for this declaration?',
    answer7: '{url}',
    url7: `https://tax.gov.ua/deklaratsiyna-kampaniya-${now.getFullYear()}/granichni-stroki-podannya/`,
    urlText7: 'Until August 2',

    question8: 'How are my personal data entered by me used on this site?',
    answer8: `No, we don't store anything, but analytics and advertising from Google may collect some data,
     but it is unlikely that these are the data you entered on this site.`,
    url8: '',
    urlText8: '',

    question9: 'I noticed an error on the site, what should I do?',
    answer9: 'Write us about it in {url}',
    url9: '/suggestion',
    urlText9: 'Offers and wishes',
  },
  calculation: {
    header: 'Calculation of tax',
    fileLabel: 'Upload report file here',
    submit: 'Submit',
    total: 'Total ({currency})',
    gainTax: 'Gain tax (18%)',
    militaryTax: 'Military tax (1.5%)',
    period: 'Period',
    uah: 'uah',
    usd: 'usd',
    error: 'Error',
    table: {
      name: 'Calculation details',
      date: 'Date',
      exchangeRate: 'Exchange rate',
      profit: 'Profit in {currency}',
      moreInfo: 'More info',
    },
  },
  instruction: {
    header: 'How to get broker report from PC',
    subHeader: 'Not possible to get broker report from mobile at the moment 😔',
    step1: 'Open site freedom finance 24: https://freedom24.com',
    step2: 'Login to your account',
    step3: 'Select "Savings account"',
    step4: 'Select "Member Area" at the top',
    step5: 'Select "Brokerage reports"',
    step6: 'Select "Trade report for a tax return"',
    step7: 'Select saving account, year, currency and generate report',
    step8: 'Download exel report. Done.',
  },
  menu: {
    calculation: 'calculation',
    instruction: 'get report',
    faq: 'Q&A',
    suggestion: 'Offers and wishes',
    aboutUs: 'about us',
    dark: 'dark',
    light: 'light',
  },
  validation: {
    required: 'File required',
    invalidFormat: 'Invalid file format',
    fileEmpty: 'File is empty',
    fileContain: 'File contain non json data',
    siteUnavailable: 'NBU is unavailable',
    invalidExchangeRate: "Cound'nt find the exchange rate",
  },
  version: 'version',
};
