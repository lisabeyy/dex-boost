"use client";
import dynamic from "next/dynamic";

import Header from "@/partials/Header";
import SeoMeta from "@/partials/SeoMeta";
import Footer from "@/partials/Footer";
import { NextUIProvider } from "@nextui-org/react";

// Import a component without SSR
const NoSSRComponent = dynamic(() => import("./components/PoolsList"), {
  ssr: false,
});



export default function PoolsPage() {


  return (

    <>



      <Header />
      <NextUIProvider>
        <main>
          <SeoMeta
            title="Pools Uniswap v3"
            meta_title="Pools high APY opportunity on Uniswap v3"
            description="Pools LP opportunities on Uniswap v3"
            image=""
          />
          <section className="section-sm min-h-screen w-full">
            <div className="container">
              <div className="row justify-center">
                <div className="text-center">
                  <NoSSRComponent />
                </div>
              </div>
            </div>
          </section>
        </main>
      </NextUIProvider>

      <Footer />
    </>

  )

};

