import { TabbedLayout } from "/src/layouts/TabbedLayout";
import { Layout as DashboardLayout } from "/src/layouts/index.js";
import tabOptions from "./tabOptions";
import { useForm } from "react-hook-form";
import { ApiGetCall } from "../../../api/ApiCall";
import CippAppPermissionBuilder from "/src/components/CippComponents/CippAppPermissionBuilder";
import CippPageCard from "/src/components/CippCards/CippPageCard";
import { Alert, CardContent, Stack, Typography } from "@mui/material";

const Page = () => {
  const pageTitle = "SAM App Permissions";

  const formControl = useForm({
    mode: "onBlur",
  });

  const execSamAppPermissions = ApiGetCall({
    url: "/api/ExecSAMAppPermissions",
    queryKey: "execSamAppPermissions",
    waiting: true,
  });

  return (
    <CippPageCard hideBackButton={true} title={"SAM App Permissions"}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="body2">Manage the permissions for the CIPP-SAM App.</Typography>
          <Alert color="warning">
            This functionality is in beta and should be treated as such. Removing permissions from
            the CIPP-SAM app is not advised.
          </Alert>
          {execSamAppPermissions?.isLoading && "Loading..."}
          {execSamAppPermissions.isSuccess && (
            <>
              {console.log(execSamAppPermissions.data)}
              <CippAppPermissionBuilder
                postUrl={"/api/execSamAppPermissions"}
                formControl={formControl}
                currentPermissions={execSamAppPermissions?.data}
                removePermissionConfirm={false}
              />
            </>
          )}
        </Stack>
      </CardContent>
    </CippPageCard>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <TabbedLayout tabOptions={tabOptions}>{page}</TabbedLayout>
  </DashboardLayout>
);

export default Page;