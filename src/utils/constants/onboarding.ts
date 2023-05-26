type Copy = {
  title: string;
  bodyTexts: string[];
  submitButtonText: string;
};

export const onboardingCopies: Copy[] = [
  {
    title: "Hi, and welcome to Kujira!",
    bodyTexts: [
      "This app was created to help you manage your financial health. In order to help you with that, however, you’re going to have to fill in some important information in the following steps with as much accuracy as possible. Please do not round any values.",
      "Rest assured, all information you provide in the next few steps is private to you and will never be shared with anyone else. With that said, let’s do some setup, starting with your take-home income!",
    ],
    submitButtonText: "Let's Go",
  },
  {
    title: "Your take-home income.",
    bodyTexts: [
      "Enter your leftover monthly income after your employer and/or business deducts all taxes and other required expenses.",
    ],
    submitButtonText: "Savings",
  },
  {
    title: "Your Savings",
    bodyTexts: [
      "You never know when you’re going to have a rainy day, so it’s important to save some of your cash to rely on when that time comes.",
      "Enter the percentage of your take-home income you’d like to save every month in the input field below.",
      "If you’re not sure how much you want to save, a common percentage-based budget is the 50/30/20 rule, where 50% of your income goes to your needs, 30% goes to your wants, and 20% goes to your savings. If you want to start with that, enter “20” (without the quotes) below and proceed to the next step.",
    ],
    submitButtonText: "Monthly Recurring Purchases",
  },
  {
    title: "Your monthly recurring purchases.",
    bodyTexts: [
      "Most people have required monthly expenses that can be calculated and/or grouped into monthly segments, such as rent, grocery budget, gas, public transportation, and subscription services. If you have any expenses that occur on or can be grouped into consistent monthly payments, enter them all below.",
    ],
    submitButtonText: "Incoming Purchases",
  },
  {
    title: "Your incoming purchases.",
    bodyTexts: [
      "Are you aware of any incoming purchases that will eventually come down your way but are not sure when you have to pay for them? Or do you have any payments in general that you want to jot down for later? If so, enter them all below.",
    ],
    submitButtonText: "Final Step",
  },
  {
    title: "Final Step",
    bodyTexts: [
      "Congratulations and thank you for taking the time to fill in everything until now. You’re done with your initial setup! If there is anything you want to go back and change, simply click on or tap the arrow button situated on the top-left corner of this window. Keep in mind that you can always make changes in the app.",
      "If you’re ready to proceed, click on the button below to start using Kujira!",
    ],
    submitButtonText: "To My Dashboard",
  },
];
