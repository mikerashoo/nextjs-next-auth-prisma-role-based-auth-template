import React, { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import CardLoading from "@/components/common/loaders/CardLoading";
import { CashStatCard } from "./CommonReportSummary";
import ReportCard from "@/components/ui-components/ReportCard";
import { DollarSign } from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export enum ChartColor {
  Gray = "#F5F5F4",
  Orange = "#FB923C",
  Red = "#DC2626",
  Green = "#22C55E",
  Teal = "#2DD4BF",
  Yellow = "#FACC15",
}

export type ChartColorKey = keyof typeof ChartColor;

export const ChartColorKeys = new Map<ChartColor, ChartColorKey>(
  Object.entries(ChartColor).map(
    ([key, value]: [ChartColorKey, ChartColor]) => [value, key]
  )
);
export interface IDonutChartValue {
  label: string;
  value: number;
  color?: ChartColor;
}

interface IDonutChartProps {
  statics: IDonutChartValue[];
  loading?: boolean;
  noChart?: boolean;
  icon?: ReactNode;
  suffix?: string;
  totalInfo: {
    title: string;
    value: number;
  };
}

interface IDartOptions {
  series: number[];
  colors: string[];
  labels: string[];
  cardColors: string[];
}

function DonutChart({ statics, totalInfo, loading, noChart, icon, suffix = ''}: IDonutChartProps) {
  const defaultColors = ["#cfddd5", "#f2521c", "#fd8cc6", "#12a2b5", "#16ca61"];

  const propLabels = statics.map((stat) => stat.label);
  const propSeries = statics.map((stat) => stat.value);
  const probColors = statics.map(
    (stat, index) => stat.color ?? defaultColors[index]
  );

  const isEmpty = totalInfo.value == 0;

  const colorName = (color: ChartColor) => {
    //   Object.keys(ChartColor).map((key, value) => value);
    //  const selected = Object.keys(ChartColor);
    const selected = ChartColorKeys.get(color).toLocaleLowerCase();
    console.log("Color Name", selected);
  };

  colorName(ChartColor.Red);

  const getOptions = (): IDartOptions => {
    const cardColors = probColors;

    if (isEmpty)
      return {
        series: [1],
        labels: [],
        colors: ["#f0f0f0"],
        cardColors,
      };
    const series = isEmpty ? [100, ...propSeries] : propSeries;
    const labels = isEmpty ? ["Empty", ...propLabels] : propLabels;

    const colors = isEmpty ? [defaultColors[0], ...probColors] : probColors;
    return {
      colors,
      series,
      labels,
      cardColors,
    };
  };

  const currentOptions = getOptions();
  const series = currentOptions.series;
  const colors = currentOptions.colors;
  const labels = currentOptions.labels;
  const grid = `grid-cols-${statics.length}`;
  const flexDir = isEmpty ? "flex-row" : "flex-col";
  const cardFlex = isEmpty ? "flex-col" : "flex-row";
  return (
    <div
      className={`flex flex-col gap-2  w-full bg-gray-50 rounded-lg shadow dark:bg-gray-800 p-4 md:p-6`}
    >
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
        {totalInfo.title}
      </h5>
      {
        loading ? <CardLoading /> : (
         
          <div className=" w-full flex flex-col dark:bg-gray-700 gap-4 rounded-lg">
              <ReportCard    icon={icon} title={'Total'} value={totalInfo.value}/>

            <div className={`flex w-full flex-col md:grid grid-cols-2 justify-center items-center gap-3 mb-2`}>
             
 
            {statics.map((stat, index) => {
                const { label, value, color } = stat;
                const currentColor = color
                  ? ChartColorKeys.get(color).toLocaleLowerCase()
                  : "orange";
                return (
                 <ReportCard 
                 icon={icon}
                 title={stat.label} value={stat.value} key={stat.label}/>
                );
              })}
            </div> 
          {
            !noChart && (
              <div className="flex justify-center w-full items-center">
              <Chart
                options={{
                  series,
                  colors,
                  chart: {
                    height: 320,
                    width: "100%",
                    type: "donut",
                  },
                  stroke: {
                    colors: ["#01c33e00"],
                  },
                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          name: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: 20,
                          },
                          total: {
                            showAlways: true,
                            show: true,
                            label: totalInfo.title,
                            fontFamily: "Inter, sans-serif",
    
                            formatter: function (w) {
                              return `${totalInfo.value.toString()} ${suffix}`;
                            },
                          },
                          value: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: -20,
                            formatter: function (value) {
                              return `${value.toString()} ${suffix}`;
                              
                            },
                          },
                        },
                        size: "80%",
                      },
                    },
                  },
                  grid: {
                    padding: {
                      top: -2,
                    },
                  },
                  labels: labels,
    
                  noData: {
                    text: undefined,
                    align: "center",
                    verticalAlign: "middle",
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                      color: undefined,
                      fontSize: "14px",
                      fontFamily: undefined,
                    },
                  },
                  tooltip: {
                    enabled: false,
                    shared: false,
                    hideEmptySeries: true,
                  },
                  dataLabels: {
                    enabled: true,
                  },
                  legend: {
                    show: !isEmpty,
                    position: "bottom",
                    fontFamily: "Inter, sans-serif",
                  },
                }}
                series={series}
                type="donut"
                width="320"
              />
            </div>
            )
          }
        
        </div>
        )
      }
    
    </div>
  );
}

export default DonutChart;
