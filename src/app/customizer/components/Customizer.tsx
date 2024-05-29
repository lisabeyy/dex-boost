"use client";
import SwapCard from "./swap-card";
import { Fragment, useCallback, useRef, useState } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import PopoverPicker from "./PopoverPicker";
import { Slider } from "@nextui-org/react";
import { CopyBlock, dracula } from 'react-code-blocks';
import Header from "@/partials/Header";
import './Customizer.css';
import Button from "@/shortcodes/Button";
import { useTheme } from "next-themes";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export type ColorType = {
  primary: string;
  secondary: string;
  active: string;
  interactive: string;
  onInteractive: string;
  container: string;
  module: string;
  accent: string;
  onAccent: string;
  outline: string;
  success: string;
  dialog: string;
  error: string;
  hint: string;
};

let initialColorDark: ColorType = {
  primary: "#ffffff",
  active: "#4b83fb",
  secondary: "#99a1bd",
  interactive: "#40444f",
  onInteractive: "#ffffff",
  container: "#0e111b",
  module: "#131a2a",
  accent: "#4b83fb",
  onAccent: "#ffffff",
  outline: "#565a69",
  success: "#27ae5f",
  dialog: "#ffffff",
  error: "#fd4040",
  hint: "#878d9b",
};

const initialColorLight: ColorType = {
  active: "#4b83fb",
  primary: "#000000",
  secondary: "#565a69",
  interactive: "#ced0d9",
  onInteractive: "#000000",
  container: "#f7f8fa",
  module: "#e2e3e9",
  accent: "#ff007a",
  onAccent: "#ffffff",
  outline: "#c3c5cb",
  dialog: "#ffffff",
  success: "#27ae5f",
  error: "#fd4040",
  hint: "#878d9b",
};

const defaultColor: ColorType = {
  primary: "",
  secondary: "",
  active: "",
  interactive: "",
  onInteractive: "",
  container: "",
  module: "",
  accent: "",
  onAccent: "",
  outline: "",
  success: "",
  dialog: "",
  error: "",
  hint: "",
};

const themeOptions = ['Auto', 'Light', 'Dark']
const hideUiOptions = [false, true];
export default function Customizer() {
  const { theme } = useTheme();
  console.log('theme', theme);
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0])
  const [selectedConnectionUI, setSelectedConnectionUi] = useState(true)
  const [selectedBrandingOption, setSelectedBrandingOption] = useState(true)
  const [themeColors, setThemeColors] = useState<ColorType>(defaultColor);
  const [borderRadius, setBorderRadius] = useState<number>(1);
  const [openCode, setOpenCode] = useState(false);
  const [showDrawer, setShowDrawer] = useState(true);
  const [initialColor, setInitialColor] = useState(theme == "dark" ? initialColorDark : initialColorLight);

  const handleColorChange = (newColor: string, type: keyof ColorType) => {
    const re = /[0-9A-Fa-f]{6}/g;
    if (re.test(newColor as string)) {
      setThemeColors(prev => ({ ...prev, [type]: newColor }));
    }
  }

  const handleThemeChange = (value: string) => {
    setInitialColor(value == "Dark" ? initialColorDark : initialColorLight)
    setSelectedTheme(value);
  }

  const resetVariable = () => {
    setThemeColors(defaultColor);
    setBorderRadius(1);
  }

  // ...

  return (
    <>

      <div className="flex customizerWidget ">
        <>
          <input type="checkbox" id="drawer-toggle" className="relative sr-only peer" checked={showDrawer} />
          <label onClick={() => setShowDrawer(!showDrawer)} className="absolute cursor-pointer hover:brightness-75 top-20 z-50 left-0 inline-block p-2 transition-all duration-500 bg-blue-500 hover:bg-blue-700 rounded-lg peer-checked:rotate-180 peer-checked:left-72">


            <ChevronRightIcon className="inline-block h-8 w-8 text-white font-bold" aria-hidden="true" />

          </label>
          <div className="fixed sm:max-md:w-full top-0 left-0 z-40 w-80 h-full transition-all duration-500 transform -translate-x-full overflow-y-scroll bg-theme-light  dark:bg-darkmode-theme-light shadow-lg peer-checked:translate-x-0">
            <p className="w-full hidden sm:max-md:inline-block text-center mt-8 ">Sorry you can&apos;t use this on small screen :(</p>
            <div className="px-6 py-4 sm:max-md:hidden">
              <h4 className="text-center my-6">Customize <br /> Uniswap Widget </h4>

              <div className="h-[80%] justify-center items-center overflow-y-scroll ">
                <div className=" ml-8 mr-8 mb-4  ">
                  <Listbox value={selectedTheme} onChange={(e) => handleThemeChange(e)}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="w-auto block text-sm font-medium leading-6 ">Theme</Listbox.Label>
                        <div className="w-auto mt-2">
                          <Listbox.Button className=" w-auto relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                                      active ? 'bg-indigo-600  text-white' : 'text-gray-900',
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
                                            active ? '' : 'text-indigo-600',
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
                <div className=" ml-8 mr-8 mb-4  ">
                  <Listbox value={selectedConnectionUI} onChange={setSelectedConnectionUi}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="w-auto block text-sm font-medium leading-6 ">Hide Connect Wallet UI</Listbox.Label>
                        <div className="w-auto mt-2">
                          <Listbox.Button className=" w-auto relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <span className="block truncate">{selectedConnectionUI ? 'Yes' : 'No'}</span>
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
                                        {option ? 'Yes' : 'No'}
                                      </span>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active ? '' : 'text-indigo-600',
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

                <div className=" ml-8 mr-8 mb-4  ">
                  <Listbox value={selectedBrandingOption} onChange={setSelectedBrandingOption}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="w-auto block text-sm font-medium leading-6 ">Hide Uniswap Branding</Listbox.Label>
                        <div className="w-auto mt-2">
                          <Listbox.Button className=" w-auto relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <span className="block truncate">{selectedBrandingOption ? 'Yes' : 'No'}</span>
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
                                        {option ? 'Yes' : 'No'}
                                      </span>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active ? '' : 'text-indigo-600',
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

                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Primary color
                  </label>
                  <PopoverPicker color={themeColors.primary || initialColor.primary} onChange={(newColor) => handleColorChange(newColor, "primary")} />
                </div>

                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Secondary color
                  </label>
                  <PopoverPicker color={themeColors.secondary || initialColor.secondary} onChange={(newColor) => handleColorChange(newColor, "secondary")} />
                </div>

                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Active color
                  </label>
                  <PopoverPicker color={themeColors.active || initialColor.active} onChange={(newColor) => handleColorChange(newColor, "active")} />
                </div>

                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Interactive color
                  </label>
                  <PopoverPicker color={themeColors.interactive || initialColor.interactive} onChange={(newColor) => handleColorChange(newColor, "interactive")} />
                </div>

                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Interactive Text color
                  </label>
                  <PopoverPicker color={themeColors.onInteractive || initialColor.onInteractive} onChange={(newColor) => handleColorChange(newColor, "onInteractive")} />
                </div>

                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Container color
                  </label>
                  <PopoverPicker color={themeColors.container || initialColor.container} onChange={(newColor) => handleColorChange(newColor, "container")} />
                </div>

                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Module color
                  </label>
                  <PopoverPicker color={themeColors.module || initialColor.module} onChange={(newColor) => handleColorChange(newColor, "module")} />
                </div>

                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Accent color
                  </label>
                  <PopoverPicker color={themeColors.accent || initialColor.accent} onChange={(newColor) => handleColorChange(newColor, "accent")} />
                </div>

                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Accent Text color
                  </label>
                  <PopoverPicker color={themeColors.onAccent || initialColor.onAccent} onChange={(newColor) => handleColorChange(newColor, "onAccent")} />
                </div>

                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Outline color
                  </label>
                  <PopoverPicker color={themeColors.outline || initialColor.outline} onChange={(newColor) => handleColorChange(newColor, "outline")} />
                </div>

                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Dialog color
                  </label>
                  <PopoverPicker color={themeColors.dialog || initialColor.dialog} onChange={(newColor) => handleColorChange(newColor, "dialog")} />
                </div>

                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Success color
                  </label>
                  <PopoverPicker color={themeColors.success || initialColor.success} onChange={(newColor) => handleColorChange(newColor, "success")} />
                </div>



                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Error color
                  </label>
                  <PopoverPicker color={themeColors.error || initialColor.error} onChange={(newColor) => handleColorChange(newColor, "error")} />
                </div>


                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Hint color
                  </label>
                  <PopoverPicker color={themeColors.hint || initialColor.hint} onChange={(newColor) => handleColorChange(newColor, "hint")} />
                </div>

                <div className=" ml-8 mr-8 mb-4">
                  <label className="block text-sm font-medium leading-6 text-primary dark:text-white">
                    Border Radius
                  </label>

                  <Slider
                    label=""
                    step={0.01}
                    maxValue={1}
                    minValue={0}
                    onChange={(val) => setBorderRadius(val as number)}
                    defaultValue={borderRadius}
                    className="max-w-md"
                  />
                </div>


                <div className=" ml-8 mr-8 mb-4 mt-2 text-center">

                  <button onClick={() => resetVariable()} className=" btn btn-outline-primary  font-bold py-2 px-4 rounded"> Reset to default</button>


                </div>

              </div>
            </div>
          </div>
        </>



        <main className="w-full h-screen text-center">
          <div className="w-full">
            <Header />
          </div>
          <div className="w-full md:max-lg:w-[130%] mt-24 flex  justify-center items-center">
            <SwapCard
              hideConnectionUI={selectedConnectionUI}
              disableBranding={selectedBrandingOption}
              borderRadius={borderRadius}
              theme={selectedTheme}
              colors={themeColors}
            />



          </div>

          <button onClick={() => setOpenCode(true)} className="mt-32 btn btn-primary  py-2 px-4 "> &lt;&gt; View Embed Code</button>


        </main>
      </div>


      <Transition.Root show={openCode} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpenCode}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 max-h-full  w-screen overflow-y-auto">
            <div className="flex items-end justify-center p-4 text-center h-full sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >

                <Dialog.Panel className="relative h-[80%] transform overflow-y-scroll rounded-lg  bg-theme-light  dark:bg-darkmode-theme-light px-4 pb-4 pt-5 text-left shadow-xl transition-all ">
                  <div>

                    <Dialog.Title as="h3" className="text-center font-semibold leading-6 mb-8 text-gray-900">
                      Uniswap Widget code for ReactJS / NextKS
                    </Dialog.Title>
                    <div className="mt-2">
                            <h5 className="mb-2">Use this version of Uniswap Widget @uniswap/widgets@2.18.0 </h5> 

                            <h5 className="mb-4">Add this CSS fix in .css file</h5>

                      <CopyBlock   theme={dracula} showLineNumbers={false} language="css" text={`
[class^="TokenOptions__OnHover"] {
  display: none !important;
}`}></CopyBlock>
                      <h5 className="mt-4 mb-4">Code  to display widget component</h5>
                      <CopyBlock
                        text={`

                        // We recommend using version "@uniswap/widgets@2.18.0" for the best experience
                        // the latest versions will throw error on nextJS when trying to fetch a new trade
          import { SwapWidget,  darkTheme, lightTheme } from "@uniswap/widgets"
          const TOKEN_LIST = 'https://ipfs.io/ipns/tokens.uniswap.org'
  
        
          type ThemeConfig = {
            primary: string;
            secondary: string;
            active: string;
            interactive: string;
            onInteractive: string;
            container: string;
            module: string;
            accent: string;
            onAccent: onAccent;
            outline: string;
            success: string;
            dialog: string;
            error: string;
            hint: string;
            borderRadius: number;
          };

          type Props = {
            theme?: string;
            colors?: ThemeConfig;
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
                active: "${themeColors.active || initialColor.active}",
                interactive: "${themeColors.interactive || initialColor.interactive}",
                onInteractive: "${themeColors.onInteractive || initialColor.onInteractive}",
                container:  "${themeColors.container || initialColor.container}",
                module: "${themeColors.module || initialColor.module}",
                accent: "${themeColors.accent || initialColor.accent}",
                onAccent: "${themeColors.onAccent || initialColor.onAccent}",
                outline: "${themeColors.outline || initialColor.outline}",
                dialog: "${themeColors.dialog || initialColor.dialog}",
                success: "${themeColors.success || initialColor.success}",
                error: "${themeColors.error || initialColor.error}",
                hint: "${themeColors.hint || initialColor.hint}",
                borderRadius: "${borderRadius}",
              }
          
            const hideConnectionUI = ${selectedConnectionUI};
          
          
            return (
                  <SwapWidget   tokenList={TOKEN_LIST} disableBranding={${selectedBrandingOption}}  theme={widgetTheme} hideConnectionUI={${selectedConnectionUI}} />
                
            );
          }
          
          `}
                        codeBlock
                        customStyle={{
                          overflow: 'scroll',
                        }}
                        language="js"
                        theme={dracula}
                        showLineNumbers={false}
                      />


                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setOpenCode(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>


    </>

  )
};
