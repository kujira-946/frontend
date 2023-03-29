type Copy = {
  title: string;
  bodyTexts: string[];
  submitButtonText: string;
};

export const onboardingCopies: Copy[] = [
  {
    title: "Hi, and welcome to Kujira!",
    bodyTexts: [
      "In a nutshell, this app was created to help you manage your financial health and reach your financial goals.",
      "You’re going to have to fill in some important information in the following steps, and it’s very important that you fill in all fields with as much accuracy as possible, down to the cents. Please do not round any values. Rest assured, all information is private to you and will never be shared with anyone else.",
      "With that said, let’s do some setup, starting with your take-home income!",
    ],
    submitButtonText: "Let's Go!",
  },
  {
    title: "Your take-home income.",
    bodyTexts: [
      "Enter your leftover monthly income after your employer and/or business deducts all taxes and other required expenses.",
    ],
    submitButtonText: "Monthly Recurring Expenses",
  },
  {
    title: "Your monthly recurring expenses.",
    bodyTexts: [
      "Most people have required monthly expenses that can be calculated and/or grouped into monthly segments, such as rent, grocery budget, gas, public transportation, subscription services, etc. If you have any expenses that occur on or can be grouped into consistent monthly payments, enter them all below.",
    ],
    submitButtonText: "Incoming Purchases",
  },
  {
    title: "Your incoming purchases.",
    bodyTexts: [
      "Are you aware of any purchases that will eventually come down your way but are not sure when you have to pay for them? Or do you have any incoming payments that you want to jot down for later? If so, enter them all below.",
    ],
    submitButtonText: "Savings",
  },
  {
    title: "Your Savings",
    bodyTexts: [
      "You never know when you’re going to have a rainy period in your life, so it’s important to set aside a part of your cash into your savings so that you can rely on it when that time comes.",
      "Enter the portion of your take-home income you’d like to save every month as a percentage in the input field below.",
      "If you’re not sure how much you want to save, a common percentage-based budget is the 50/30/20 rule, where 50% of your income goes to your needs, 30% goes to your wants, and 20% goes to your savings. If you want to start with that, enter “20” (without the quotes) below and proceed to the next step.",
    ],
    submitButtonText: "Final Step",
  },
  {
    title: "Final Step",
    bodyTexts: [
      "Congratulations! You’re done with your initial setup. Thank you for taking the time to fill in everything until now. If there is anything you want to go back and change, simply use the arrow situated on the top-right corner of this window. Or, if you’re ready to proceed, you can always make future changes in your overview tab. Click on the button below whenever you’re ready.",
    ],
    submitButtonText: "To My Dashboard",
  },
];
