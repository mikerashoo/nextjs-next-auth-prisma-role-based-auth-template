import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  Alert,
  AlertIcon,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { HeadlessButton } from "../AppButton";
import AppInput from "./AppInput";
import { ZodSchema, z } from "zod";
import {
  InputType,
  ISchemaInputProps,
  IAppFormSchemaInputs,
  IInputOption,
} from "./app-form-types-helpers";
import { ICallAPiResponse } from "@/lib/callAPi";

interface IAppFormProps {
  submitButtonLabel: string;
  formSchema: IAppFormSchemaInputs;
  submitFunction: (data: any) => Promise<ICallAPiResponse<any>>;
  defaultValues?: any;
}

function validateSchemaInputs(appFormSchemaInputs: IAppFormSchemaInputs): void {
  const { schema, inputs } = appFormSchemaInputs;
  const schemaFields = schema.shape;

  inputs.forEach((input) => {
    if (!(input.name in schemaFields)) {
      throw new Error(
        `Input name "${input.name}" does not exist in the schema.`
      );
    }
  });
}

export default function AppForm({
  submitButtonLabel,
  formSchema,
  submitFunction,
  defaultValues,
}: IAppFormProps) {
  validateSchemaInputs(formSchema); // Validate input props

  const { schema, inputs } = formSchema;

  type ISchema = z.infer<typeof schema>;

  const [submitError, setSubmitError] = useState<string | null>(null); 
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ISchema>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: defaultValues,
  });
 
  async function onSubmit(data: ISchema, e?: React.BaseSyntheticEvent) {
    try {
    e.preventDefault();

      setSubmitError(null);
      const response = await submitFunction(data);
      if (response.errorMessage) {
        setSubmitError(response.errorMessage);
        return;
      } else {
        reset();
      }
    } catch (error) {
      setSubmitError("An error occurred while submitting the form.");
    }
  }

  const renderField = (input: ISchemaInputProps) => {
    const { name, label, options: givenOptions, inputType } = input;
    if(inputType == InputType.Hidden) return <input type="hidden" {...register(name)} />

    if (inputType === InputType.Radio) {
      // const inputSchema = schema.shape[name]._def.schema ?? schema.shape[name]._def.innerType;
      // console.log("Input Type", inputSchema)
      // let options = [];

      // if (inputSchema.isOptional()) {
      //   // // if optional
      //   let fieldType = inputSchema;
      //   while (
      //     fieldType._def &&
      //     (fieldType._def.typeName === "ZodOptional" ||
      //       fieldType._def.typeName === "ZodNullable")
      //   ) {
      //     fieldType = fieldType._def.innerType;
      //   }

      //   options = Object.values(fieldType._def.values) as string[];
      // } else {
      //   options = inputSchema._def.values;
      // }

      return (
        <FormControl key={name} isInvalid={!!errors[name]}>
          <FormLabel>{label}</FormLabel>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <RadioGroup {...field}>
                <Stack direction="row">
                  {givenOptions.map((customOption: IInputOption) => {
                    // const customOption =  givenOptions.find((gOption : IInputOption) => gOption.value == option);
                    
                    return (
                    
                    <Radio  key={customOption.value} value={customOption.value} {...(customOption?.customProps || {})}>
                      {customOption.label}
                    </Radio>
                  )}
                  
                  )}
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>
            {errors[name]?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
      );
    }

    if (inputType == InputType.Switch) {
      return (
        <FormControl key={name} display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            {label}
          </FormLabel>

          <Controller
            name={name}
            control={control}
            render={({ field }) => <Switch {...field} id={name} />}
          />
        </FormControl>
      );
    }

    return (
      <AppInput
        key={name}
        register={register}
        label={label}
        name={name}
        type={inputType}
        isInvalid={!!errors[name]}
        error={errors[name]?.message.toString()} 
      />
    );
  };

  console.log("Errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="5">
        <Stack spacing="5">{inputs.map(renderField)}</Stack>
        <Stack spacing="6">
          {submitError && (
            <Alert status="error">
              <AlertIcon />
              {submitError}
            </Alert>
          )}
          <HeadlessButton
            className="text-xl font-bold py-2 shadow-lg"
            size={"lg"}
            addButton
            loading={isSubmitting}
            loadinglabel="Submitting"
            type="submit"
            full
          >
            {submitButtonLabel}
          </HeadlessButton>
        </Stack>
      </Stack>
    </form>
  );
}
