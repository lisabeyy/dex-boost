"use client";
import SwapCard from "./swap-card";
import { Fragment, useCallback, useRef, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import PopoverPicker from "./PopoverPicker";
import { CopyBlock, dracula } from 'react-code-blocks';


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export type ColorType = {
  primary: string;
  secondary: string;
  interactive: string;
  container: string;
  module: string;
  accent: string;
  outline: string;
  dialog: string;
  error: string;
  hint: string;
};

const initialColor: ColorType = {
  primary: "#ffffff",
  secondary: "#99a1bd",
  interactive: "#40444f",
  container: "#0e111b",
  module: "#131a2a",
  accent: "#4b83fb",
  outline: "#565a69",
  dialog: "#ffffff",
  error: "#fd4040",
  hint: "#878d9b",
};

const defaultColor: ColorType = {
  primary: "",
  secondary: "",
  interactive: "",
  container: "",
  module: "",
  accent: "",
  outline: "",
  dialog: "",
  error: "",
  hint: "",
};

const themeOptions = ['Auto', 'Light', 'Dark']
const hideUiOptions = [false, true];
export default function Customizer() {
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0])
  const [selectedConnectionUI, setSelectedConnectionUi] = useState(true)
  const [themeColors, setThemeColors] = useState<ColorType>(defaultColor);

  const handleColorChange = (newColor: string, type: keyof ColorType) => {
    const re = /[0-9A-Fa-f]{6}/g;
    if (re.test(newColor)) {
      setThemeColors(prev => ({ ...prev, [type]: newColor }));
    }
  }

  // ...

  return (
    <div className='grid w-full grid-cols-3 h-full '>
      <div className="overflow-scroll justify-center items-center  h-[60%]">
        <div className=" ml-8 mr-20 mb-4  ">
          <Listbox  value={selectedTheme} onChange={setSelectedTheme}>
            {({ open }) => (
              <>
                <Listbox.Label className="w-auto block text-sm font-medium leading-6 text-white">Theme</Listbox.Label>
                <div className="w-auto mt-2">
                  <Listbox.Button className=" w-auto cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">{selectedTheme}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {themeOptions.map((option) => (
                        <Listbox.Option
                          key={option}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                              'relative cursor-default select-none py-2 pl-3 pr-9'
                            )
                          }
                          value={option}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                {option}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>

        </div>
        <div className=" ml-8 mr-20 mb-4  ">
          <Listbox  value={selectedConnectionUI} onChange={setSelectedConnectionUi}>
            {({ open }) => (
              <>
                <Listbox.Label className="w-auto block text-sm font-medium leading-6 text-white">Hide Connection UI</Listbox.Label>
                <div className="w-auto mt-2">
                  <Listbox.Button className=" w-auto cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">{selectedConnectionUI.toString()}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {hideUiOptions.map((option) => (
                        <Listbox.Option
                          key={option.toString()}
                          className={({ active }) =>
                            classNames(
                              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                              'relative cursor-default select-none py-2 pl-3 pr-9'
                            )
                          }
                          value={option}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                {option.toString()}
                              </span>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                  )}
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>

        </div>

        <div className=" ml-8 mr-20 mb-4">
          <label className="block text-sm font-medium leading-6 text-white">
            Primary color
          </label>
          <PopoverPicker color={themeColors.primary || initialColor.primary} onChange={(newColor) => handleColorChange(newColor, "primary")} />
        </div>

        <div className=" ml-8 mr-20 mb-4">
          <label className="block text-sm font-medium leading-6 text-white">
            Secondary color
          </label>
          <PopoverPicker color={themeColors.secondary || initialColor.secondary} onChange={(newColor) => handleColorChange(newColor, "secondary")} />
        </div>

        <div className=" ml-8 mr-20 mb-4">
          <label className="block text-sm font-medium leading-6 text-white">
            Interactive color
          </label>
          <PopoverPicker color={themeColors.interactive || initialColor.interactive} onChange={(newColor) => handleColorChange(newColor, "interactive")} />
        </div>

        <div className=" ml-8 mr-20 mb-4">
          <label className="block text-sm font-medium leading-6 text-white">
            Container color
          </label>
          <PopoverPicker color={themeColors.container || initialColor.container} onChange={(newColor) => handleColorChange(newColor, "container")} />
        </div>

        <div className=" ml-8 mr-20 mb-4">
          <label className="block text-sm font-medium leading-6 text-white">
            Module color
          </label>
          <PopoverPicker color={themeColors.module || initialColor.module} onChange={(newColor) => handleColorChange(newColor, "module")} />
        </div>

        <div className=" ml-8 mr-20 mb-4">
          <label className="block text-sm font-medium leading-6 text-white">
            Accent color
          </label>
          <PopoverPicker color={themeColors.accent || initialColor.accent} onChange={(newColor) => handleColorChange(newColor, "accent")} />
        </div>

        <div className=" ml-8 mr-20 mb-4">
          <label className="block text-sm font-medium leading-6 text-white">
            Outline color
          </label>
          <PopoverPicker color={themeColors.outline || initialColor.outline} onChange={(newColor) => handleColorChange(newColor, "outline")} />
        </div>

        <div className=" ml-8 mr-20 mb-4">
          <label className="block text-sm font-medium leading-6 text-white">
            Dialog color
          </label>
          <PopoverPicker color={themeColors.dialog || initialColor.dialog} onChange={(newColor) => handleColorChange(newColor, "dialog")} />
        </div>


        <div className=" ml-8 mr-20 mb-4">
          <label className="block text-sm font-medium leading-6 text-white">
            Error color
          </label>
          <PopoverPicker color={themeColors.error || initialColor.error} onChange={(newColor) => handleColorChange(newColor, "error")} />
        </div>


        <div className=" ml-8 mr-20 mb-4">
          <label className="block text-sm font-medium leading-6 text-white">
            Hint color
          </label>
          <PopoverPicker color={themeColors.hint || initialColor.hint} onChange={(newColor) => handleColorChange(newColor, "hint")} />
        </div>

      </div>
      <div className="justify-center items-center">
        <SwapCard
          hideConnectionUI={selectedConnectionUI}
          theme={selectedTheme}
          colors={themeColors}
        />
      </div>
      <div className="justify-center items-center">
        <CopyBlock
          text={`
          import { SwapWidget,  darkTheme, lightTheme } from "@uniswap/widgets"
          
          type ThemeColors = {
            primary: string;
            secondary: string;
            interactive: string;
            container: string;
            module: string;
            accent: string;
            outline: string;
            dialog: string;
            error: string;
            hint: string;
          };

          type Props = {
            theme?: string;
            colors?: ThemeColors;
            hideConnectionUI: boolean
          };

          export default function UniswapSwapCustom(props: Props) {
            let widgetTheme;
            const { theme } = useTheme();
            
            widgetTheme = props.theme
              ? props.theme === 'Dark'
                ? darkTheme
                : props.theme === 'Auto'
                ? theme === 'dark'
                  ? darkTheme
                  : lightTheme
                : lightTheme
              : lightTheme;
          
              //if theme is set to Auto, pass only the color you wish to override

              widgetTheme = {
                ...widgetTheme,
                primary: "${themeColors.primary || initialColor.primary}" ,
                secondary: "${themeColors.secondary || initialColor.secondary}",
                interactive: "${themeColors.interactive || initialColor.interactive}",
                container:  "${themeColors.container || initialColor.container}",
                module: "${themeColors.module || initialColor.module}",
                accent: "${themeColors.accent || initialColor.accent}",
                outline: "${themeColors.outline || initialColor.outline}",
                dialog: "${themeColors.dialog || initialColor.dialog}",
                error: "${themeColors.error || initialColor.error}",
                hint: "${themeColors.hint || initialColor.hint}",
              }
          
            const hideConnectionUI = ${selectedConnectionUI};
          
          
            return (
                  <SwapWidget  disableBranding={true}  theme={widgetTheme} hideConnectionUI={${selectedConnectionUI}} />
                
            );
          }
          
          `}
          codeBlock
          customStyle={{
            overflow: 'scroll',
          }}
          language="js"
          theme={dracula}
        />
      </div>
    </div>
  )
};
