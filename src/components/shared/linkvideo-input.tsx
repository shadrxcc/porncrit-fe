import { FieldAttributes, useField } from "formik";
import ButtonComponent from "./button.component";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/services/auth-services/selector";


type InputProps = {
    label?: string;
    widthClass?: string;
    placeholder?: string;
    signup:()=>void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & FieldAttributes<any>;

const LinkVideoInput: React.FC<InputProps> = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <div className={`flex flex-col gap-y-1 w-full`}>
                {" "}
                <label className="text-sm text-brown" htmlFor={props.id || props.name}>{label}</label>
               
                    <div className="flex relative items-center">
                        <input
                            className={`px-6 bg-white border-opacity-10 flex-1 border placeholder:text-mauve border-lightpink border-accent text-sm text-brown !outline-none w-full focus:outline-none py-3 primary-input rounded-[35px]`}
                            {...props}
                            {...field}
                        />
                        <ButtonComponent type="submit" variant="secondary" className="!p-0 absolute !w-fit top-0 right-5 bottom-0"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.75 2.50838e-06C21.3439 2.69091e-07 27.5 6.15608 27.5 13.75C27.5 21.3439 21.3439 27.5 13.75 27.5C6.15609 27.5 3.54561e-06 21.3439 1.30632e-06 13.75C9.74377e-07 6.15609 6.15608 2.84032e-06 13.75 2.50838e-06ZM19.2268 14.4283C19.6015 14.0537 19.6015 13.4463 19.2268 13.0717L16.0292 9.874C15.6545 9.49937 15.0471 9.49937 14.6725 9.874C14.2979 10.2486 14.2979 10.856 14.6725 11.2307L16.2325 12.7907L8.95549 12.7907C8.42568 12.7907 7.99618 13.2202 7.99618 13.75C7.99618 14.2798 8.42568 14.7093 8.95549 14.7093L16.2325 14.7093L14.6725 16.2693C14.2979 16.644 14.2979 17.2514 14.6725 17.626C15.0471 18.0006 15.6545 18.0006 16.0292 17.626L19.2268 14.4283Z" fill="#F71D7F" />
                        </svg>
                        </ButtonComponent>
                    </div>
               


                {meta.touched && meta.error && (
                    <div className="error text-red-500 text-xs">
                        {meta.error}
                    </div>
                )}
            </div>
        </>
    );
};

export default LinkVideoInput;
