import { AddIcon } from "@chakra-ui/icons";
import {
  useToast,
  CloseButton,
} from "@chakra-ui/react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React, { useState } from "react";
import { HeadlessButton } from "../../../../ui-components/AppButton";
import { useShopDetailContext } from "@/contexts/shop-contexts/ShopDetailContext";
import {
  ICashierRegisterSchema,
  cashierREgisterSchema,
} from "@/utils/shared/schemas/userSchemas"; 
import AppForm from "@/components/ui-components/forms/AppForm";
import { InputType } from "@/components/ui-components/forms/app-form-types-helpers"; 
import { shopInformationApiService } from "@/backend-services/provider-api-calls/shops/information";

function AddCashierToShop({ shopId }: { shopId: string }) {
  const { error, loading, reload } = useShopDetailContext();

  let [isOpen, setIsOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  const toast = useToast();
  async function onSubmit(data: ICashierRegisterSchema) {
    console.log("On Submit called", data)
    // setLoading(true);
    const success = await shopInformationApiService.addCashier(shopId, data);

    if (success.data) {
      console.log("Submit", success);

      toast({
        status: "success",
        position: "top",
        title: "Shop Updated Successfully",
      });
      // setLoading(false);
 
      // setIsOpen(true);
      closeModal();
      reload();
    }

    // setLoading(false);

    return success;
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <HeadlessButton
      addButton
        disabled={loading || error != null}
        onClick={() => setIsOpen(true)}
      >
        <AddIcon /> Add Cashier
      </HeadlessButton>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="w-full max-w-xl space-y-4 bg-white p-12 border">
            <DialogTitle className="font-extrabold flex flex-row justify-between text-teal-500">
              Add New Shop{" "}
              <CloseButton color={"red.800"} onClick={closeModal} size={"md"} />
            </DialogTitle>

            <AppForm
              submitButtonLabel={"Add Cashier "}
              formSchema={{
                inputs: [
                  {
                    label: "FirstName",
                    name: "firstName",
                    inputType: InputType.Text,
                  },
                  {
                    label: "LastName",
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
                  {
                    label: "Password",
                    name: "password",
                    inputType: InputType.Password,
                  },
                ],
                schema: cashierREgisterSchema,
              }}
              //   const options = Object.values(schema.shape[name]._def.schema._def.innerType._def.values) as string[];

              submitFunction={onSubmit}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default AddCashierToShop;
