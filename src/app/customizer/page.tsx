"use client";
import SwapCard from "./components/swap-card";
import dynamic from "next/dynamic";
import { Fragment, useCallback, useRef, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { HexColorPicker } from "react-colorful";
import { useClickAway } from "@uidotdev/usehooks";


// Import a component without SSR
const NoSSRComponent = dynamic(() => import("./components/Customizer"), {
  ssr: false,
});

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}




export default function SwapPage() {



  return (
    <section className="section-sm h-screen overflow-hidden">
      <div className="flex justify-center items-center">
        <div className="flex-row justify-center">
          <h2 className="h3 text-center mb-4" >Uniswap Widget Customizer</h2>
          <p className="text-center mb-8">Use the customizer to configure a new theme for uniswap</p>
          <div className="w-full">
            <NoSSRComponent />
          </div>
        </div>
      </div>
    </section>


  )

};

