export type LegalDocumentStatement = {
  main: string;
  supportingTexts?: string[];
};

export type LegalDocumentBody = {
  initial: string;
  statements: LegalDocumentStatement[];
};

export type LegalDocument = {
  title: string;
  body: LegalDocumentBody;
};
