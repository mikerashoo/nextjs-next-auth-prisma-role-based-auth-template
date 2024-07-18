import React, { useState } from "react";
import { ITabContent } from "./AppTab";

function CustomTab({ tabContents }: { tabContents: ITabContent[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="border-b border-gray-200 dark:border-gray-700 w-full">
        <ul className="flex flex-wrap w-full -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {tabContents.map((tabContent, index) => {
            const isActive = index == selectedIndex;

            const { label, icon } = tabContent.head;
            return (
              <li
                className="me-2"
                key={index}
                onClick={() => setSelectedIndex(index)}
              >
                <a
                  href="#"
                  className={`inline-flex items-center justify-center px-4 pb-2 gap-2 border-b-2 ${
                    isActive ? "border-teal-600 text-teal-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  } rounded-t-lg  group`}
                >
                  {icon} {label}
                </a>
              </li>
            );
          })}

          {/* <li className="me-2">
            <a href="#" className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                <svg className="w-4 h-4 me-2 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                </svg>Dashboard
            </a>
        </li> */}

          {/* <li>
            <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
        </li> */}
        </ul>
      </div>
      {
       selectedIndex < tabContents.length ? tabContents[selectedIndex].content : <></>
      }
    </div>
  );
}

export default CustomTab;
