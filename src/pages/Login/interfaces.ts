
export interface InputInterface {
    [index: string]: string | boolean | undefined
    value: string;
    required?: boolean;
}

export interface FormValues {
    [index: string]: InputInterface;
    username: InputInterface;
    password: InputInterface;
}