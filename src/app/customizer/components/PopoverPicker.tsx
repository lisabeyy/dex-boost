"use client";

import useClickOutside from "@/components/UseClickOutside";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useCallback, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface PopoverPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export default function PopoverPicker({ color, onChange }: PopoverPickerProps) {

  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  //useDebounce(() => onChange(color), 200);

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(popover, close);

  return (
    <div className="picker">
      <div className="inline-block ">
        <div
          className="inline-block  align-middle swatch w-[28px] h-[28px] mr-2 rounded-lg border-solid border-3 border-white "
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(true)}
        />
        <HexColorInput className="inline-block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          color={color} onChange={onChange} />
      </div>



      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
