import React from "react";
import {
  AtSymbolIcon,
  PhoneIcon,
  CalendarDaysIcon,
} from "@heroicons/react/20/solid";
import { getFullName } from "@/utils/common-hepers";
import { useProviderSuperAgentDetailContext } from "@/contexts/super-agents/details/ProviderSuperAgentDetailContext";
import PageHeadingCustom from "../../../ui-components/PageHeadingCustom";
import ChangeAgentStatus from "../common/ChangeAgentStatus";
import { IUser } from "@/utils/shared/shared-types/userModels";
import router from "next/router";
import ChangeAgentPassword from "../common/ChangeAgentPassword";
import DeleteAgent from "../common/DeleteAgent";
import EditAgentModal from "../common/EditAgentModal";

function ProviderSuperAgentHeader() {
  const { profile, onUpdate } = useProviderSuperAgentDetailContext();
  return (
    <PageHeadingCustom
      title={getFullName(profile)}
      statics={[
        {
          icon: <AtSymbolIcon width={16} />,
          label: `${profile.userName}`,
        },
        {
          label: `${profile.phoneNumber}`,
          icon: <PhoneIcon width={16} />,
        },
        {
          label:
            "Added at: " + new Date(profile.createdAt).toLocaleDateString(),
          icon: <CalendarDaysIcon width={16} />,
        },
        {
          label: (
            <ChangeAgentStatus
              agent={profile}
              onUpdate={(user) => {
                onUpdate({
                  ...profile,
                  ...user,
                });
              }}
            />
          ),
        },
      ]}
      actions={[
        <ChangeAgentPassword
          key={"change-password"}
          agent={profile as IUser}
        />,

        <EditAgentModal
          key={"change-profile"}
          onUpdate={(user) => {
            onUpdate({
              ...profile,
              ...user,
            });
          }}
          agent={profile as IUser}
        />,

        <DeleteAgent
          key={"delete-password"}
          onDelete={(id) => {
            router.back();
          }}
          agent={profile as IUser}
        />,
      ]}
    />
  );
}

export default ProviderSuperAgentHeader;
