import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import "./OptionsBar.css";

import TimeSearch from "./TimeSearch";
import VehicleSearch from "./VehicleSearch";

const OptionsBar = ({ handleOptions }) => {
  const [state, setState] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    color: "",
    state: "",
    licensePlate: "",
  });

  const handleTimes = (times) => {
    setState((prevState) => ({
      ...prevState,
      startDate: times.startDate,
      endDate: times.endDate,
      startTime: times.startTime,
      endTime: times.endTime,
    }));
  };

  const handleVehicle = (vehicle) => {
    setState((prevState) => ({
      ...prevState,
      color: vehicle.color,
      state: vehicle.state,
      licensePlate: vehicle.licensePlate,
    }))
  }

  return (
    <>
      <Accordion.Root className="AccordionRoot" type="single" collapsible>
        <Accordion.Item className="AccordionItem" value="item-1">
          <Accordion.Header className="AccordionHeader">
            <Accordion.Trigger className="AccordionTrigger">
              Time Options
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="AccordionContent">
            <TimeSearch handleTimes={handleTimes}/>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item className="AccordionItem" value="item-2">
          <Accordion.Header className="AccordionHeader">
            <Accordion.Trigger className="AccordionTrigger">
              Vehicle Options
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="AccordionContent">
            <VehicleSearch handleVehicle={handleVehicle}/>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
};

export default OptionsBar;
