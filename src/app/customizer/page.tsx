"use client";
import SwapCard from "./components/swap-card";


export default function SwapPage() {

  return (
    <section className="section-sm h-screen">
      <div className="flex justify-center items-center">
        <div className="flex-row justify-center">
        <h2 className="h3 text-center mb-6" >Uniswap Widget Customizer</h2>
        <p className="text-center">Use the customizer to configure a new theme for uniswap</p>
          <div className="flex text-center md:col-10 lg:col-7">
          <div className='flex items-center justify-center'>
            <div className='flex items-center py-4'>
              <div className="grid gap-2">
                <div className="grid">
                  <SwapCard/>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>


  )

};

