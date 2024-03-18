"use client";
import dynamic from "next/dynamic";

import Header from "@/partials/Header";
import SeoMeta from "@/partials/SeoMeta";
import Footer from "@/partials/Footer";
import PoolsList from "./components/PoolsList";


// Import a component without SSR
const NoSSRComponent = dynamic(() => import("./components/PoolsList"), {
  ssr: false,
});



export default function PoolsPage() {


  return (
   
 <>

 <Header />
 <main>
   <SeoMeta
     title="Pools Uniswap v3"
     meta_title="Pools high APY opportunity on Uniswap v3"
     description="Pools LP opportunities on Uniswap v3"
     image=""
   />
   <section className="section-sm">
     <div className="container">
       <div className="row justify-center">
         <div className="text-center md:col-10 lg:col-7">
           <NoSSRComponent />
         </div>
       </div>
     </div>
   </section>
 </main>
 <Footer />
</>

  )

};

