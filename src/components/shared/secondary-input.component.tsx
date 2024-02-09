

type InputProps = {
    label: string;
    widthClass?: string;
    placeholder?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

const SecondaryInputComponent: React.FC<InputProps> = ({ label, widthClass, ...props }) => {

    return (
        <>
            <div className={`flex flex-col gap-y-3 ${widthClass}`}>
                {" "}
                <label className="text-sm text-white" htmlFor={label}>{label}</label>
                <input
                    className={`px-4 bg-white bg-opacity-10 text-rose border-opacity-10 border border-white h-12 border-accent text-sm !outline-none focus:outline-none py-3.5 rounded-lg`}
                    {...props}
                />

            </div>
        </>
    );
};

export default SecondaryInputComponent;