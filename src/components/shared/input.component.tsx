import { FieldAttributes, useField } from "formik";


type InputProps = {
    label?: string;
    widthClass?: string;
    placeholder?:string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & FieldAttributes<any>;

const InputComponent: React.FC<InputProps> = ({ label, widthClass, ...props }) => {

    const [field, meta] = useField(props);

    return (
        <>
            <div className={`flex flex-col gap-y-1 ${widthClass}`}>
                {" "}
                <label className="text-sm text-brown" htmlFor={props.id || props.name}>{label}</label>
                <input
                    className={`px-4 bg-lightpink bg-opacity-10 border-opacity-10 border border-lightpink h-12 border-accent text-sm text-brown !outline-none w-full focus:outline-none py-3.5 rounded-lg`}
                    {...props} {...field}
                />

            </div>
        </>
    );
};

export default InputComponent;
