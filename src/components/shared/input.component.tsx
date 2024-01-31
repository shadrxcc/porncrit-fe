

type InputProps = {
    label: string;
    widthClass?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

const InputComponent: React.FC<InputProps> = ({ label, widthClass, ...props }) => {

    return (
        <>
            <div className={`flex flex-col gap-y-2 ${widthClass}`}>
                {" "}
                <label className="text-sm text-grey" htmlFor={label}>{label}</label>
                <input
                    className={`px-4 bg-white border h-12 border-accent text-sm placeholder:text-lightgray text-grey !outline-none w-full focus:outline-none py-3.5 rounded-lg`}
                    {...props}
                />

            </div>
        </>
    );
};

export default InputComponent;
