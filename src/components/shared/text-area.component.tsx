type InputProps = {
    label?: string;
    widthClass?: string;
    placeholder: string;
    rows?: number;
    cols?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

const TextArea: React.FC<InputProps> = ({ label, widthClass, ...props }) => {

    return (
        <>
            <div className={`flex flex-col gap-y-1 ${widthClass}`}>
                {" "}
                <label className="text-lg font-bold text-white" htmlFor={label}>{label}</label>
                <textarea
                    className={`px-2.5 bg-white border-opacity-10 border border-lightpink border-accent text-xs placeholder:text-mauve text-mauve !outline-none w-full focus:outline-none py-2 rounded-[3px]`}
                    {...props}
                ></textarea>

            </div>
        </>
    );
};

export default TextArea;
