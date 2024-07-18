import { useRouter } from "next/router";
import { ReactNode, useState, useEffect } from "react";
import PageHeading from "./PageHeading";

export interface ITabContent {
  pageTitle?: string;
  tabTitle: string;
  action?: ReactNode;
  icon?: any;
  content: ReactNode | (() => Promise<{ default: React.ComponentType<any> }>);
}

export default function AppTab(props: {
  tabContents: ITabContent[];
  isVertical?: boolean;
  isControlled?: {
    currentIndex: number;
    setSelectedIndex: (index: number) => void;
  };
}) {
  const { tabContents, isControlled } = props;
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadedContent, setLoadedContent] = useState<ReactNode | null>(null);

  useEffect(() => {
    const tabIndex = parseInt(router.query.tab as string);
    if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex < tabContents.length) {
      setSelectedIndex(tabIndex);
    }
  }, [router.query.tab, tabContents.length]);

  useEffect(() => {
    const loadContent = async () => {
      const selectedTab = tabContents[selectedIndex];
      if (typeof selectedTab.content === 'function') {
        const { default: Component } = await selectedTab.content();
        setLoadedContent(<Component />);
      } else {
        setLoadedContent(selectedTab.content);
      }
    };

    loadContent();
  }, [selectedIndex, tabContents]);

  const handleTabClick = (index: number) => {
    setSelectedIndex(index);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab: index },
    }, undefined, { shallow: true });
  };

  const selectedTab = tabContents[selectedIndex];
  const { pageTitle, action } = selectedTab;

  return (
    <div className="flex flex-col w-full h-full min-h-screen relative bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4 md:p-8">
        {pageTitle && <PageHeading title={pageTitle} action={action} />}
        {loadedContent}
      </div>
      <nav className="sticky bottom-0 w-full bg-white border-t border-gray-200">
        <ul className="flex justify-around p-2">
          {tabContents.map((tabContent, index) => {
            const isSelected = index === selectedIndex;
            return (
              <li key={index} className="text-center">
                <a
                  role="button"
                  onClick={() => handleTabClick(index)}
                  className={`flex flex-col items-center ${
                    isSelected
                      ? "text-teal-600"
                      : "text-gray-600 hover:text-teal-500"
                  }`}
                >
                  {tabContent.icon}
                  <span className="text-xs mt-1">{tabContent.tabTitle}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}