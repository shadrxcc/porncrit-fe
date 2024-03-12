import { FieldAttributes, useField } from "formik";

type InputProps = {
    label?: string;
    widthClass?: string;
    placeholder?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & FieldAttributes<any>;

const TextArea: React.FC<InputProps> = ({ label, widthClass, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <div className={`flex flex-col gap-y-1 ${widthClass}`}>
                {" "}
                <label className="text-lg font-bold text-white" htmlFor={props.id || props.name}>{label}</label>
                <textarea
                    className={`px-2.5 bg-white border-opacity-10 border border-lightpink border-accent text-xs placeholder:text-mauve text-mauve !outline-none w-full focus:outline-none py-2 rounded-[3px]`}
                    {...props} {...field}
                ></textarea>
                {meta.touched && meta.error && (
                    <div className="error text-red-500 text-xs">
                        {meta.error}
                    </div>
                )}
            </div>
        </>
    );
};

export default TextArea;
