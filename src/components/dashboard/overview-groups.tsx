import styled from "styled-components";

import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { useEffect } from "react";
import { fetchOverviewOverviewGroupsRequest } from "@/sagas/overview-groups.saga";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.sixteen};

  border: red solid 1px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const OverviewGroups = () => {
  const dispatch = Functions.useAppDispatch();

  const { overviews, overviewGroups } = Functions.useEntitiesSlice();

  useEffect(() => {
    if (overviews && !overviewGroups) {
      const overview = Object.values(overviews)[0];
      dispatch(fetchOverviewOverviewGroupsRequest(overview.id));
    }
  }, [overviews, overviewGroups]);

  return <Container></Container>;
};
