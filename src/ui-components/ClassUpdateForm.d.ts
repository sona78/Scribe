/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Class } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ClassUpdateFormInputValues = {
    Name?: string;
};
export declare type ClassUpdateFormValidationValues = {
    Name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ClassUpdateFormOverridesProps = {
    ClassUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ClassUpdateFormProps = React.PropsWithChildren<{
    overrides?: ClassUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    class?: Class;
    onSubmit?: (fields: ClassUpdateFormInputValues) => ClassUpdateFormInputValues;
    onSuccess?: (fields: ClassUpdateFormInputValues) => void;
    onError?: (fields: ClassUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ClassUpdateFormInputValues) => ClassUpdateFormInputValues;
    onValidate?: ClassUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ClassUpdateForm(props: ClassUpdateFormProps): React.ReactElement;
