import { useField } from "formik";

type CheckBoxProps = {
    children: React.ReactNode;
    name: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({ name, children, ...props }) => {
    const [field, meta] = useField({ name, type: "checkbox", ...props });

    return (
        <>
            <div className="space-y-1.5">
                <label className="checkbox items-center justify-start flex gap-x-3.5">
                    <input className="w-4 h-4" {...field} type="checkbox" />
                    {children}
                </label>
                {meta.touched && meta.error && (
                    <div className="error text-red-500 text-xs">
                        {meta.error}
                    </div>
                )}
            </div>
        </>
    );
};

export default CheckBox;


