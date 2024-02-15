import Image from "next/image";

const ListLikeComponent = () => {
  return (
    <div className="w-fit">
        <div className="flex items-center gap-x-2.5">
          <Image
            src={`/assets/images/user.png`}
            width={45}
            height={45}
            alt="user"
          />
          <div className="flex items-start gap-x-12">
            <div>
            <p className="text-sm">
              <span className="text-pink font-bold">Username</span> liked this
              list
            </p>
            <p className="text-mauve text-sm">2 mins ago</p>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 25 22" fill="none">
  <path d="M3.31335 12.1353L12.0653 20.3568C12.3898 20.6616 12.552 20.814 12.75 20.814C12.948 20.814 13.1102 20.6616 13.4347 20.3568L13.4347 20.3568L22.1867 12.1353C24.6319 9.83824 24.9288 6.05825 22.8723 3.40758L22.4856 2.90918C20.0253 -0.261775 15.087 0.270017 13.3583 3.89206C13.1141 4.4037 12.3859 4.4037 12.1417 3.89206C10.413 0.270017 5.47465 -0.261771 3.01443 2.90918L2.62773 3.40759C0.571184 6.05825 0.868127 9.83824 3.31335 12.1353Z" fill="#F71D7F" stroke="#F71D7F"/>
</svg>
          </div>
          
        </div>
        

    </div>
  );
};

export default ListLikeComponent;
