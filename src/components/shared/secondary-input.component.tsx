import { FieldAttributes, useField } from "formik";


type InputProps = {
    label?: string;
    widthClass?: string;
    placeholder?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & FieldAttributes<any>;

const SecondaryInputComponent: React.FC<InputProps> = ({ label, widthClass, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className={`flex flex-col gap-y-3 ${widthClass}`}>
                {" "}
                <label className="text-lg font-bold text-white" htmlFor={props.id || props.name}>{label}</label>
                <input
                    className={`px-4 bg-white text-mauve placeholder:text-mauve border-opacity-10 border border-white text-sm !outline-none focus:outline-none py-2.5 rounded-lg`}
                    {...props} {...field}
                />
                {meta.touched && meta.error && (
                    <div className="error text-red-500 text-xs">
                        {meta.error}
                    </div>
                )}
            </div>
        </>
    );
};

export default SecondaryInputComponent;