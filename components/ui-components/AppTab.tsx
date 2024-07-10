import { Tab, TabIndicator, TabList, Tabs, TabPanel, TabPanels } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
// import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export interface ITabContent {
  key: string;
  head: {
    label: string;
    icon?: any;
  };
  content: ReactNode | any; 
}

export default function AppTab(props: {
  tabContents: ITabContent[];
  isVertical?: boolean;
  isControlled?: {
    currentIndex: number;
    setSelectedIndex : (index: number) => void;
  };
}) {
  const { tabContents, isControlled } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentIndex = isControlled?.currentIndex ?? selectedIndex;

  return (
    <Tabs className="w-full" index={currentIndex}  onChange={isControlled ? isControlled.setSelectedIndex : setSelectedIndex} position='relative' variant='unstyled'>
  <TabList>
  {tabContents.map((content) => (
              <Tab
                key={content.key}
                
              >
                {content.head.label} 
              </Tab>
            ))}
  </TabList>
  <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
  <TabPanels>
  {tabContents.map((content) => (
              <TabPanel key={content.key} >
                {content.content}
              </TabPanel>
            ))}
     
  </TabPanels>
</Tabs>
  )
 
}

 