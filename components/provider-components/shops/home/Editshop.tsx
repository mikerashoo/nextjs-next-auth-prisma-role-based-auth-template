import { shopInformationApiService } from "@/backend-services/provider-api-calls/shops/information";
import {
  IShopUpdateSchema,
  shopUpdateSchema,
} from "@/utils/shared/schemas/provider/shop-information-schema";
import { IDBShop } from "@/utils/shared/shared-types/prisma-models";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { HeadlessButton } from "../../../ui-components/AppButton";
import AppModal from "../../../ui-components/modals/AppModal";
import AppForm from "../../../ui-components/forms/AppForm";
import { InputType } from "../../../ui-components/forms/app-form-types-helpers"; 
import { useShopDetailContext } from "@/contexts/shop-contexts/ShopDetailContext";
import { ActiveStatus } from "@/utils/shared/shared-types/prisma-enums";

export default function EditShop({
  shop, 
}: {
  shop: IDBShop; 
}) {

  const {setLoading, error, loading, onUpdate,  } = useShopDetailContext();
 
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toast = useToast();
  async function onSubmit(data: IShopUpdateSchema) {
    // setLoading(true);
    const success = await shopInformationApiService.update(shop.id, data);

    if (success.data) { 

      toast({
        status: "success",
        position: "top",
        title: "Shop Updated Successfully",
      });
      setLoading(false);

      setIsOpen(false);

      onUpdate(success.data)
    }
    
    setLoading(false);

    return success;
  }

  return (
    <AppModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      loading={loading}
      title={"Edit " + shop.name}
      toggleButton={
        <HeadlessButton editButton>
          <InfoOutlineIcon /> Edit
        </HeadlessButton>
      }
    >
      <AppForm
        submitButtonLabel={"Update " + shop.name}
        formSchema={{
          inputs: [
            {
              label: "Shop Name",
              name: "name",
              inputType: InputType.Text,
            },
            {
              label: "Shop Address",
              name: "address",
              inputType: InputType.Text,
            },
            {
              label: "Status",
              name: "status",
              inputType: InputType.Radio,
              options: [
                {
                  label: "Active",
                  value: ActiveStatus.ACTIVE,
                  customProps: { 
                    colorScheme: "teal",
                  },
                },
                {
                  label: "In Active",
                  value: ActiveStatus.IN_ACTIVE,
                  customProps: { 
                    colorScheme: "red", 
                  },
                },
              ],
            },
          ],
          schema: shopUpdateSchema,
        }}
        //   const options = Object.values(schema.shape[name]._def.schema._def.innerType._def.values) as string[];

        defaultValues={{
          name: shop.name,
          address: shop.address,
          status: shop.status,
        }}
        submitFunction={onSubmit}
      />
    </AppModal>
  );
}
