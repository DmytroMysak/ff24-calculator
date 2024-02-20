export default {
  appName: 'FF24++',
  aboutUs: 'about us',
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
      profitInUsd: 'Profit in USD',
      profitInUah: 'Profit in UAH',
    },
    instruction: {
      mobileTab: 'Instruction for mobile',
      desktopTab: 'Instruction for PC',
      mobile: {
        header: 'How to get broker report from mobile',
        step1: 'Open Freedom24 app',
        step2: 'Login to your account',
        step3: 'Select "Savings account": Go to menu, account selection and select "Savings account"',
        step4: 'Go to menu and select "Brokerage reports"',
        step5: 'Select period for one year (e.g. 01/01/2023 - 31/12/2023)',
        step6: 'Click on save report by email',
        step7: 'Change format to JSON from PDF',
        step8: 'Send report to email',
        step9: 'Insert the report from the email to the input below',
      },
      desktop: {
        header: 'How to get broker report from PC',
        step1: 'Open site freedom finance 24: https://freedom24.com',
        step2: 'Login to your account',
        step3: 'Select "Savings account"',
        step4: 'Select "Member Area" at the top',
        step5: 'Select "Brokerage reports"',
        step6: 'Select period for one year (e.g. 01/01/2023 - 31/12/2023) and select JSON format',
        step7: 'Click on the right button settings',
        step8: 'Change format to JSON from PDF',
        step9: 'Send report to email',
        step10: 'Insert the report from the email to the input below',
      },
    },
  },
  headerMenu: {
    calculation: 'calculation',
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
};
