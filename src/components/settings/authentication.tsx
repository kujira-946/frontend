import dynamic from "next/dynamic";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSignal } from "@preact/signals-react";
import { AnimatePresence } from "framer-motion";

import * as Globals from "@/components";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { logoutRequest } from "@/sagas/auth.saga";
import { deleteUserRequest } from "@/sagas/users.saga";
import { ClientRoutes } from "@/utils/constants";
import { ThemeProps } from "../layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  width: 100%;
`;

const DeleteAccountButton = styled(Globals.Button)`
  color: ${(props: ThemeProps) => props.theme.backgroundSix};
  border: ${(props: ThemeProps) => `${props.theme.backgroundFour} solid 1px`};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.text};
      border: ${(props: ThemeProps) => {
        return `${props.theme.backgroundSix} solid 1px`;
      }};
    }
  }
`;

// ========================================================================================= //
// [ DYNAMIC IMPORT ] =================================================================== //
// ========================================================================================= //

const DynamicDeleteConfirmation = dynamic(() =>
  import("../modals/delete-confirmation").then((mod) => mod.DeleteConfirmation)
);

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const Authentication = () => {
  const router = useRouter();
  const dispatch = Functions.useAppDispatch();

  const { currentUser } = Functions.useEntitiesSlice();

  const confirmAccountDelete = useSignal(false);

  function logOut(): void {
    if (currentUser) {
      dispatch(logoutRequest(currentUser.id));
      router.push(ClientRoutes.LANDING);
    }
  }

  function deleteAccount(): void {
    if (currentUser) {
      dispatch(deleteUserRequest(currentUser.id));
      router.push(ClientRoutes.LANDING);
    }
  }

  return (
    <Container>
      <AnimatePresence>
        {confirmAccountDelete.value && (
          <DynamicDeleteConfirmation
            title="Are you sure you want to delete your account?"
            body="Once deleted, your account cannot be recovered."
            submitText="Yes, delete my account."
            open={confirmAccountDelete}
            onClose={() => (confirmAccountDelete.value = false)}
            onConfirm={deleteAccount}
            fixed
          />
        )}
      </AnimatePresence>

      <Globals.Button type="button" onClick={logOut} size="large" primary>
        Log Out
      </Globals.Button>

      <DeleteAccountButton
        type="button"
        onClick={() => (confirmAccountDelete.value = true)}
        size="large"
        outlined
      >
        Delete Account
      </DeleteAccountButton>
    </Container>
  );
};
