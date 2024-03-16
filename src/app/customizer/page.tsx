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
    <div className="w-screen h-screen overflow-hidden">
      <NoSSRComponent />
    </div>


  )

};

