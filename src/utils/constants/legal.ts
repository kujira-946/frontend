import { LegalDocument } from "../types/legal";

export const termsOfService: LegalDocument = {
  title: `Kujira Terms Of Service`,
  body: {
    initial: `Please read these Terms of Service ("Terms") carefully before using our services.`,
    statements: [
      {
        main: `Agreement to Terms`,
        supportingTexts: [
          `By accessing or using the services provided by Kujira ("Company," "we," or "us"), you agree to be bound by these Terms and any additional terms and conditions referenced herein. If you do not agree to these Terms, please do not use our services.`,
        ],
      },
      {
        main: `Description of Services`,
        supportingTexts: [
          `Kujira provides users with the ability to log and review their monthly purchases. The services may be subject to change or discontinuation without notice.`,
        ],
      },
      {
        main: `User Obligations`,
        supportingTexts: [
          `Eligibility: Our services are available to anyone of any age; however, if you are under the age of 18, you are required to consult and receive consent from your parent or legal guardian when using Kujira. If we become aware that you are under the age of 18 and have not received parental or legal guardian consent, your account and all information related to it is subject to immediate termination. By using our services, you understand and agree to the above statement.`,
          `Account Registration: In order to access certain features or services, you may need to create an account. While we do not share your information with anyone, you are ultimately responsible for maintaining the confidentiality of your account information and are solely responsible for all activities that occur under your account.`,
          `User Content: You are solely responsible for any content you submit, post, or display on or through our services. You warrant that your content does not infringe any third-party rights and complies with applicable laws and regulations.`,
        ],
      },
      {
        main: `Intellectual Property`,
        supportingTexts: [
          `Ownership: The Company retains all rights, title, and interest in and to its services, including all intellectual property rights. You acknowledge that you do not acquire any ownership rights by using our services.`,
          `Use of Company Materials: You may not modify, reproduce, distribute, or create derivative works based on the Company's materials, except as expressly permitted by the Company.`,
        ],
      },
      {
        main: `Limitation of Liability`,
        supportingTexts: [
          `To the maximum extent permitted by law, the Company and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, arising out of or in connection with the use or inability to use our services.`,
        ],
      },
      {
        main: `Indemnification`,
        supportingTexts: [
          `You agree to indemnify and hold the Company and its affiliates, officers, directors, employees, and agents harmless from any claims, liabilities, damages, losses, or expenses arising out of your use of our services or violation of these Terms.`,
        ],
      },
      {
        main: `Termination`,
        supportingTexts: [
          `The Company reserves the right to suspend or terminate your access to our services at any time, with or without cause or notice. Upon termination, all provisions of these Terms which by their nature should survive, shall survive, including but not limited to ownership provisions, warranty disclaimers, and limitations of liability.`,
        ],
      },
      {
        main: `Governing Law and Jurisdiction`,
        supportingTexts: [
          `These Terms shall be governed by and construed in accordance with the laws of the United States of America. Any legal action or proceeding arising out of or relating to these Terms shall be exclusively brought in the courts of the United States of America.`,
        ],
      },
      {
        main: `Miscellaneous`,
        supportingTexts: [
          `Entire Agreement: These Terms constitute the entire agreement between you and the Company regarding the subject matter herein and supersede all prior or contemporaneous agreements, understandings, or representations.`,
          `Severability: If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable.`,
        ],
      },
    ],
  },
};

export const privacyPolicy: LegalDocument = {
  title: `Kujira Privacy Policy`,
  body: {
    initial: `We at Kujira ("Company," "we," or "us") respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services. Please read this Privacy Policy carefully. By accessing or using our services, you consent to the practices described in this Privacy Policy.`,
    statements: [
      {
        main: `Information We Collect`,
        supportingTexts: [
          `Personal Information: We may collect personal information that can be used to identify you, such as your name, contact information, email address, and other information you provide to us voluntarily.`,
          `Non-Personal Information: We may also collect non-personal information, such as anonymous usage data, device information, IP addresses, and aggregated demographic information, which does not personally identify you.`,
        ],
      },
      {
        main: `Use of Information`,
        supportingTexts: [
          `We may use the information we collect for various purposes, including, but not limited to providing and maintaining our services, personalizing your experience, improving our services, responding to your inquiries or requests, sending you marketing and promotional communications, and protecting our rights and enforcing our policies.`,
          `We will not sell, rent, or share your personal information with third parties without your consent, except as described in this Privacy Policy.`,
        ],
      },
      {
        main: `Disclosure of Information`,
        supportingTexts: [
          `We may disclose your information to third parties, including service providers and business partners who assist us in operating our business and providing our services and law enforcement or government agencies when required by applicable law or in response to a legal process.`,
          `We may disclose non-personal information to third parties for various purposes, such as analytics, research, or marketing.`,
        ],
      },
      {
        main: `Security of Information`,
        supportingTexts: [
          `We employ reasonable security measures to protect your information from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.`,
        ],
      },
      {
        main: `Purchase Information`,
        supportingTexts: [
          `If you use any of our purchased services, whether that be a one-time purchase or a recurring subscription, we may collect information in regards to the purchase, such as your payment information, credit card number, payment account authentication information, billing address, and shipping address.`,
        ],
      },
      {
        main: `Location Information`,
        supportingTexts: [
          `With your consent, we may collect and process information about your precise location to better personalize and tailor our services to you. `,
        ],
      },
      {
        main: `Third-Party Websites and Services`,
        supportingTexts: [
          `Our services may contain links to third-party websites or services. We are not responsible for the privacy practices or content of such third parties. We encourage you to review the privacy policies of those third parties before providing any personal information.`,
        ],
      },
      {
        main: `Children's Privacy`,
        supportingTexts: [
          `Our services are not intended for children under the age of 13. We do not knowingly collect or solicit personal information from children. If we become aware that we have collected personal information from anyone under the age of 18 without parental or legal guardian consent, we will promptly delete such information and terminate their account.`,
        ],
      },
      {
        main: `Your Choices`,
        supportingTexts: [
          `You may opt-out of receiving marketing and promotional communications from us by following the instructions provided in our communications or by contacting us directly. Please note that even if you opt-out, we may still send you non-promotional messages related to your use of our services.`,
        ],
      },
      {
        main: `Changes to this Privacy Policy`,
        supportingTexts: [
          `We reserve the right to modify this Privacy Policy at any time. We will notify you of any changes by updating the "Effective Date" at the top of this policy. Your continued use of our services after the changes indicate your acceptance of the updated Privacy Policy.`,
        ],
      },
      {
        main: `Contact Us`,
        supportingTexts: [
          `If you have any questions, concerns, or suggestions regarding this Privacy Policy, please contact us at kujira.help@outlook.com.`,
        ],
      },
    ],
  },
};

export const cookiePolicy: LegalDocument = {
  title: `Kujira Cookie Policy`,
  body: {
    initial: `This Cookie Policy explains how Kujira ("Company," "we," or "us") uses cookies and similar tracking technologies on our website. By using our website, you consent to the use of cookies as described in this policy.`,
    statements: [
      {
        main: `What are Cookies?`,
        supportingTexts: [
          `Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They allow the website to recognize your device and store certain information about your preferences or actions.`,
        ],
      },
      {
        main: `Types of Cookies We Use`,
        supportingTexts: [
          `Necessary Cookies: These cookies are essential for the operation of our products and services and enable you to navigate and use their features. Without these cookies, certain functionalities may not be available.`,
          `Performance and Analytics Cookies: These cookies collect information about how visitors use our products and services, such as which pages are visited most frequently or any error messages encountered. This information is used to improve the performance and enhance the user experience of our products and services.`,
          `Functionality Cookies: These cookies allow our products and services to remember choices you make (such as your language preferences or login credentials) and provide enhanced, personalized features.`,
          `Targeting and Advertising Cookies: These cookies are used to deliver relevant advertisements and track the effectiveness of advertising campaigns. They may collect information about your browsing habits and how you utilize our products and services to display targeted ads on other websites.`,
        ],
      },
      {
        main: `Third-Party Cookies`,
        supportingTexts: [
          `We may use third-party services or applications on our website that utilize cookies. These third-party cookies are subject to the respective third party's cookie policies, and we recommend reviewing their privacy policies for more information.`,
        ],
      },
      {
        main: `Cookie Management`,
        supportingTexts: [
          `Cookie Consent: By continuing to use our website, you consent to the placement of cookies on your device as described in this policy. You can withdraw your consent or modify your cookie settings at any time by adjusting your browser settings.`,
          `Browser Settings: Most web browsers allow you to control and manage cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser. Please note that disabling or blocking certain cookies may impact the functionality of our website.`,
          `Opt-Out Tools: You can also opt-out of certain third-party cookies or online advertising networks through tools provided by industry associations or through the settings provided by those third parties.`,
        ],
      },
      {
        main: `Changes to this Cookie Policy`,
        supportingTexts: [
          `We reserve the right to modify this Cookie Policy at any time. We will notify you of any changes by updating the "Effective Date" at the top of this policy. Your continued use of our website after the changes indicate your acceptance of the updated Cookie Policy.`,
        ],
      },
      {
        main: `Contact Us`,
        supportingTexts: [
          `If you have any questions, concerns, or suggestions regarding this Cookie Policy, please contact us at kujira.help@outlook.com.`,
        ],
      },
    ],
  },
};
