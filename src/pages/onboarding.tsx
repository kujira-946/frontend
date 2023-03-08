import { ConfirmationModal } from "@/components";
import { useSignal } from "@preact/signals-react";
import Head from "next/head";
import styled from "styled-components";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Main = styled.main``;

// ========================================================================================= //
// [ PAGE CONTENTS ] ======================================================================= //
// ========================================================================================= //

type Page = {
  title: string;
  bodyTexts: string[];
  submitButtonText: string;
};

const pages: Page[] = [
  {
    title: "Hi, and welcome to Kujira!",
    bodyTexts: [
      "In a nutshell, this app was created to help you manage your financial health and reach your financial goals.",
      "You’re going to have to fill in some important information in the following steps, and it’s very important that you fill in all fields with as much accuracy as possible, down to the cents. Please do not round any values. Rest assured, all information is private to you and will never be shared with anyone else.",
      "With that said, let’s do some setup, starting with your take-home income!",
    ],
    submitButtonText: "Let's Go!",
  },
];

const maxPage = pages.length;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

const Onboarding = () => {
  const currentPage = useSignal(1);

  function toPreviousPage(): void {
    if (currentPage.value - 1 > 0) currentPage.value -= 1;
    else currentPage.value = 1;
  }

  function toNextPage(): void {
    if (currentPage.value + 1 <= maxPage) currentPage.value += 1;
    else currentPage.value = maxPage;
  }

  console.log("currentPage:", currentPage.value);

  return (
    <>
      <Head>
        <title>Kujira | Onboarding</title>
        <meta name="description" content="Kujira app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <ConfirmationModal
          backButtonAction={toPreviousPage}
          title={pages[currentPage.value - 1].title}
          currentPage={currentPage.value}
          maxPage={maxPage}
          bodyTexts={pages[currentPage.value - 1].bodyTexts}
          submitButtonAction={toNextPage}
          submitButtonText={pages[currentPage.value - 1].submitButtonText}
          showArrow
        />
      </Main>
    </>
  );
};

export default Onboarding;
