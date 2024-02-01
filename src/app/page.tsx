import ButtonComponent from "@/components/shared/button.component";
import Header from "@/components/ui/header";
import HeroComponent from "@/components/ui/hero.component";
import IndustryNewsComponent from "@/components/ui/industry-news.component";
import PopularFanComponent from "@/components/ui/popular-fan.component";
import PopularListComponent from "@/components/ui/popular-list.component";
import PopularReviewsComponent from "@/components/ui/popular-reviews.component";
import PorndleComponent from "@/components/ui/porndle.component";
import FooterComponent from "../components/ui/footer.component";
import SignupComponent from "@/components/ui/signup-form.component";

export default function Home() {
  return (
    <main className="">
      <Header />
      <HeroComponent />
      <div className="flex px-4 lg:px-20 mt-11 flex-col lg:flex-row m-auto gap-10">
        <div className="flex flex-[2_1_0] flex-col gap-y-5">
          <p className="text-xl font-bold">Popular reviews this week</p>
          <PopularReviewsComponent />
        </div>

        <div className="flex-[1.8_1_0)] flex flex-col gap-y-5">
          <p className="text-xl font-bold">Popular lists</p>
          <PopularListComponent />
        </div>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row px-4 lg:px-20 justify-between mt-11">
        <div className="flex-1 flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-3.5">
            <p className="text-xl font-bold">Porndle</p>
            <p className="text-sm">The daily guess the pornstar game</p>
          </div>

          <PorndleComponent />
        </div>

        <div className="flex-1">
          <p className="text-xl font-bold">Most popular fan</p>
          <PopularFanComponent/>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row px-4 gap-10 lg:px-20 justify-between mt-11">
        <div className="flex flex-col gap-y-5">
        <p className="text-xl font-bold">Popular tags this week</p>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonComponent className="rounded-[20px]" variant="tags">Big boobs</ButtonComponent>
            <ButtonComponent className="rounded-[20px]" variant="tags">Brunette</ButtonComponent>
            <ButtonComponent className="rounded-[20px]" variant="tags">Masturbation</ButtonComponent>
            <ButtonComponent className="rounded-[20px]" variant="tags">Solo</ButtonComponent>
            <ButtonComponent className="rounded-[20px]" variant="tags">Jilling</ButtonComponent>

          </div>
        </div>

        <div className="flex flex-col gap-y-3">
        <p className="text-xl font-bold">Popular tags this week</p>
          <div className="flex items-center gap-x-2">
          <img width={50} src="/assets/images/tori.png" alt="tori" />
         <ButtonComponent className="rounded-[20px]" variant="tags">Tori Black</ButtonComponent>
        </div>
        </div>

        
      </div>

      <div className="px-4 sm:px-8 lg:px-20 flex flex-col gap-y-9 mt-11">
        <p className="text-xl font-bold">Industry news</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-7 gap-x-10">
           {[1, 2, 3].map(
                                        (e) => (
                                               <IndustryNewsComponent/>
                                        )
                                    )}
        </div>
       
     
      </div>
      <FooterComponent/>
    </main>
  );
}
