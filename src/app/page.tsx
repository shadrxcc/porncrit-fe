import Header from "@/components/ui/header";
import HeroComponent from "@/components/ui/hero.component";
import PopularListComponent from "@/components/ui/popular-list.component";
import PopularReviewsComponent from "@/components/ui/popular-reviews.component";
import PorndleComponent from "@/components/ui/porndle.component";


export default function Home() {
  return (
    <main className="">
      <Header/>
      <HeroComponent/>
      <div className="flex px-4 lg:px-20 mt-11 flex-col lg:flex-row m-auto gap-10">
        <div className="flex flex-[2_1_0] flex-col gap-y-5">
          <p className="text-base font-bold">Popular reviews this week</p>
          <PopularReviewsComponent/>
        </div>
          
          <div className="flex-[1.8_1_0)] flex flex-col gap-y-5">
          <p className="text-base font-bold">Popular lists</p>
          <PopularListComponent/>
          </div>
      </div>
      
      <div>
       <div className="flex flex-col gap-y-[15px]">
       <p>Porndle</p>
        <p>The daily guess the pornstar game</p>
       </div>

       <PorndleComponent/>
      </div>
    
    </main>
  );
}
