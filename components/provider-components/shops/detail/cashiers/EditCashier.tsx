
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";  
import { HeadlessButton } from "@/components/ui-components/AppButton";
import AppForm from "@/components/ui-components/forms/AppForm";
import { InputType } from "@/components/ui-components/forms/app-form-types-helpers";
import AppModal from "@/components/ui-components/modals/AppModal";
import { ICashierRegisterSchema, ICashierUpdateSchema, cashierUpdateSchema } from "@/utils/shared/schemas/userSchemas";
import { cashierApiCalls } from "@/backend-services/provider-api-calls/cashiers/cashier-management-api-calls";
import { getFullName } from "@/utils/common-hepers";
import { useShopCashiersContext } from "@/contexts/shop-contexts/ShopCashierContext";
import { IUser } from "@/utils/shared/shared-types/userModels";

export default function EditCashier({
  cashier, 
}: {
  cashier: IUser; 
}) {

  const {setLoading, error, loading, reload, onUpdate} = useShopCashiersContext();
 
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toast = useToast();
  async function onSubmit(data: ICashierUpdateSchema) {
    // setLoading(true);
    const success = await cashierApiCalls.update(cashier.id, data);

    if (success.data) {
    console.log("Submit", success)

      toast({
        status: "success",
        position: "top",
        title: "cashier Updated Successfully",
      });
      setLoading(false);
      onUpdate(success.data)

      setIsOpen(!isOpen);
    }
    
    setLoading(false);

    return success;
  }

  return (
    <AppModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      loading={loading}
      title={"Edit " + getFullName(cashier)}
      toggleButton={
        <HeadlessButton editButton>
          <InfoOutlineIcon /> Edit
        </HeadlessButton>
      }
    >
      <AppForm
        submitButtonLabel={"Update " + getFullName(cashier)}
        formSchema={{
          inputs: [
            
            {
              label: "First Name",
              name: "firstName",
              inputType: InputType.Text,
            },
            {
                label: "Last Name",
                name: "lastName",
                inputType: InputType.Text,
              },
              {
                label: "User Name",
                name: "userName",
                inputType: InputType.Text,
              },
              {
                label: "Phone Number",
                name: "phoneNumber",
                inputType: InputType.Tel,
              },
          
          ],
          schema: cashierUpdateSchema,
        }}
        //   const options = Object.values(schema.shape[name]._def.schema._def.innerType._def.values) as string[];

        defaultValues={{
          firstName: cashier.firstName,
          lastName: cashier.lastName,
          userName: cashier.userName,
          phoneNumber: cashier.phoneNumber,
          id: cashier.id
            
        }}
        submitFunction={onSubmit}
      />
    </AppModal>
  );
}
