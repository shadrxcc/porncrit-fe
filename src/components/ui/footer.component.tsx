import Link from "next/link";

const FooterComponent = () => {
  return (
    <div className="bg-black flex flex-col lg:flex-row lg:items-center px-4 gap-y-7 sm:px-8 lg:px-20 py-5 mt-20 justify-between">
      <div className="flex flex-col lg:flex-row text-sm gap-y-5 gap-x-10">
        <Link href={`#`}>
          <p>Porncrit Ltd.</p>
        </Link>
        <Link href={`/terms`}>
          <p>Terms</p>
        </Link>
        <Link href={`#`}>
          <p>Contact us</p>
        </Link>
      </div>
      <div>
        <p className="text-sm">Made by fans on planet Earth</p>
      </div>
      <div className="flex items-center gap-x-12">
        <Link href={`#`}>
          {" "}
          <img width={20} src="/assets/icons/reddit.png" alt="reddit" />
        </Link>
        <Link href={`#`}>
          {" "}
          <img width={20} src="/assets/icons/instagram.png" alt="instagram" />
        </Link>
        <Link href={`#`}>
          <img width={20} src="/assets/icons/x.png" alt="x" />
        </Link>
      </div>
    </div>
  );
};

export default FooterComponent;
