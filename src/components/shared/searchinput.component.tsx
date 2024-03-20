import SearchSvg from "./searchsvg.component";


type InputProps = {
    widthClass?: string;
    placeholder: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

const SearchInputComponent: React.FC<InputProps> = ({ widthClass, ...props }) => {

    return (
        <>
            <div className={`flex justify-between gap-y-2 pl-[19px] w-full pr-2.5 bg-whitealpha-10 border border-mauve py-2.5 rounded-primary ${widthClass}`}>
                {" "}
                <input
                    className={`bg-transparent text-[#BDA7B1] text-sm  !outline-none w-full focus:outline-none`}
                    {...props}
                />
                <SearchSvg />

            </div>
        </>
    );
};

export default SearchInputComponent;
