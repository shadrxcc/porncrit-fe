import { FieldAttributes, useField } from "formik";
import ButtonComponent from "./button.component";


type InputProps = {
    label?: string;
    widthClass?: string;
    placeholder?: string;
    signup: () => void;
    loading?: boolean;
    disable?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & FieldAttributes<any>;

const LinkVideoInput: React.FC<InputProps> = ({ label, loading, disable, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <div className={`flex flex-col gap-y-1 w-full`}>
                {" "}
                <label className="text-sm text-brown" htmlFor={props.id || props.name}>{label}</label>

                <div className="flex relative items-center">
                    <input
                        className={`pl-3.5 pr-14 bg-white border-opacity-10 flex-1 border placeholder:text-mauve border-lightpink border-accent text-sm text-brown !outline-none w-full focus:outline-none py-3 primary-input rounded-[35px]`}
                        {...props}
                        {...field}
                    />
                    <ButtonComponent loading={loading} disabled={disable} type="submit" variant="secondary" className="!p-0 absolute !w-fit top-0 right-5 bottom-0">
                        {!loading && <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.2986 0C7.79587 0 4.1786 3.60292 3.84462 8.09068C1.61251 8.6479 0 10.7287 0 13.1389C0 15.9621 2.21249 18.3333 5.04167 18.3333H20.3194C21.0706 18.3333 21.7854 18.1633 22.4271 17.8589C25.0563 16.8171 26.8889 14.1911 26.8889 11.1528C26.8889 7.23269 23.8214 3.97222 19.9375 3.97222C19.7603 3.97222 19.5846 3.97909 19.4105 3.99261C17.9069 1.60348 15.2949 0 12.2986 0ZM12.5802 11.358C13.0575 10.8807 13.8314 10.8807 14.3087 11.358L17.9754 15.0246L16.2469 16.7531L14.6667 15.1729V22H12.2222V15.1729L10.642 16.7531L8.91355 15.0246L12.5802 11.358Z" fill="#F71D7F" />
                        </svg>}
                    </ButtonComponent>
                </div>



                {meta.touched && meta.error && (
                    <div className="error text-red-500 text-xs text-center">
                        {meta.error}
                    </div>
                )}
            </div>
        </>
    );
};

export default LinkVideoInput;
