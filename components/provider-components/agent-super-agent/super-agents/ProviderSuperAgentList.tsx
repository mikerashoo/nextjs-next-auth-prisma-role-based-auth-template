import AppTable, {
  IAppTableRowProps,
} from "@/components/ui-components/AppTable";
import { ActiveStatus } from "@/utils/shared/shared-types/prisma-enums";
import { IUser } from "@/utils/shared/shared-types/userModels";
import { useToast } from "@chakra-ui/react";
import React from "react";
import ChangeAgentStatus from "../../agent-super-agent/ChangeAgentStatus";
import Link from "next/link";
import { IProviderSuperAgentsProps } from "./ProviderSuperAgentsPageWrapper";
import { getFullName } from "@/utils/common-hepers";
import AppLink from "@/components/ui-components/AppLink";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import StatusIcon from "@/components/ui-components/StatusIcon";

function ProviderSuperAgentList({superAgents, error} : IProviderSuperAgentsProps) {
  // const { error, loading, superAgents, onDelete, onUpdate, reload } =
  //   useProviderSuperAgentsContext();
  const columns = ["Name", "User Name", "Phone Number", "Status", ""];

  const toast = useToast();

  const sortedByName: IUser[] = (superAgents ?? []).sort((a, b) =>
    a.firstName > b.lastName ? 1 : a.firstName < b.lastName ? -1 : 0
  );

  const rows: IAppTableRowProps[] = sortedByName.map((superAgent: IUser) => {
    return {
      key: superAgent.id.slice(5),
      href: superAgent.userName,
      columns: [
         getFullName(superAgent),
        `${superAgent.userName}`,
        `${superAgent.phoneNumber}`,

        <span key={"status"}>
        <StatusIcon isActive={superAgent.status == ActiveStatus.ACTIVE} />
        </span>,

<AppLink key={superAgent.userName + 'detail'} href={superAgent.userName}>
<><InfoOutlineIcon /> Detail </>
</AppLink>
      ],
    };
  });
  return (
    <div className="w-full">
      <AppTable
        caption={
          {
            // title: "SuperAgents",
          }
        }
        // loading={loading}
        // error={error}
        columns={columns}
        // onReload={reload}
        rows={rows}
        columnsToHideOnMobile={[1, 2]}
      />
    </div>
  );
}

export default ProviderSuperAgentList;
